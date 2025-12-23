import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FaceDetectionResult {
  faceCount: number;
  isMultipleFaces: boolean;
  isNoFace: boolean;
  confidence: number;
}

export const useFaceDetection = (
  videoRef: React.RefObject<HTMLVideoElement>,
  isActive: boolean,
  onViolation?: (reason: string) => void
) => {
  const [faceResult, setFaceResult] = useState<FaceDetectionResult>({
    faceCount: 0,
    isMultipleFaces: false,
    isNoFace: true,
    confidence: 0
  });
  const [isDetecting, setIsDetecting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const detectionIntervalRef = useRef<number | null>(null);
  const consecutiveMultiFaceRef = useRef(0);
  const consecutiveNoFaceRef = useRef(0);
  const { toast } = useToast();

  // Simple face detection using skin color and contour analysis
  const detectFaces = useCallback(() => {
    if (!videoRef.current || !isActive) return;

    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    // Create canvas if not exists
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Detect skin-colored regions (simplified face detection)
    const skinPixels: { x: number; y: number }[] = [];
    const step = 4; // Sample every 4th pixel for performance

    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const i = (y * canvas.width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Skin color detection in RGB
        if (isSkinColor(r, g, b)) {
          skinPixels.push({ x, y });
        }
      }
    }

    // Cluster skin pixels to find faces
    const clusters = clusterPixels(skinPixels, 50);
    
    // Filter clusters by size (faces should be a certain minimum size)
    const minFaceSize = (canvas.width * canvas.height) / 100; // At least 1% of frame
    const maxFaceSize = (canvas.width * canvas.height) / 4; // At most 25% of frame
    
    const faceClusters = clusters.filter(cluster => {
      const size = cluster.length * step * step;
      return size > minFaceSize && size < maxFaceSize;
    });

    const faceCount = faceClusters.length;
    const isMultipleFaces = faceCount > 1;
    const isNoFace = faceCount === 0;
    const confidence = faceCount > 0 ? Math.min(100, (faceClusters[0]?.length || 0) / 10) : 0;

    setFaceResult({ faceCount, isMultipleFaces, isNoFace, confidence });

    // Track consecutive violations
    if (isMultipleFaces) {
      consecutiveMultiFaceRef.current++;
      consecutiveNoFaceRef.current = 0;
      
      if (consecutiveMultiFaceRef.current >= 3) {
        toast({
          title: "⚠️ Multiple Faces Detected!",
          description: `${faceCount} people detected in camera. Only the candidate should be visible.`,
          variant: "destructive",
        });
        onViolation?.(`Multiple faces detected (${faceCount} people)`);
        consecutiveMultiFaceRef.current = 0;
      }
    } else if (isNoFace) {
      consecutiveNoFaceRef.current++;
      consecutiveMultiFaceRef.current = 0;
      
      if (consecutiveNoFaceRef.current >= 5) {
        toast({
          title: "⚠️ No Face Detected!",
          description: "Please ensure your face is visible in the camera.",
          variant: "destructive",
        });
        onViolation?.("No face detected in camera");
        consecutiveNoFaceRef.current = 0;
      }
    } else {
      consecutiveMultiFaceRef.current = 0;
      consecutiveNoFaceRef.current = 0;
    }
  }, [videoRef, isActive, onViolation, toast]);

  useEffect(() => {
    if (isActive) {
      setIsDetecting(true);
      // Run detection every 500ms
      detectionIntervalRef.current = window.setInterval(detectFaces, 500);
    } else {
      setIsDetecting(false);
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
        detectionIntervalRef.current = null;
      }
    }

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [isActive, detectFaces]);

  return { faceResult, isDetecting };
};

// Helper function to detect skin color
function isSkinColor(r: number, g: number, b: number): boolean {
  // Multiple skin tone ranges
  const rgbCondition = r > 95 && g > 40 && b > 20 &&
    Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
    Math.abs(r - g) > 15 && r > g && r > b;

  // YCbCr color space check
  const y = 0.299 * r + 0.587 * g + 0.114 * b;
  const cb = 128 - 0.169 * r - 0.331 * g + 0.5 * b;
  const cr = 128 + 0.5 * r - 0.419 * g - 0.081 * b;
  const ycbcrCondition = y > 80 && cb > 85 && cb < 135 && cr > 135 && cr < 180;

  return rgbCondition || ycbcrCondition;
}

// Simple clustering algorithm
function clusterPixels(pixels: { x: number; y: number }[], threshold: number): { x: number; y: number }[][] {
  if (pixels.length === 0) return [];

  const clusters: { x: number; y: number }[][] = [];
  const visited = new Set<number>();

  for (let i = 0; i < pixels.length; i++) {
    if (visited.has(i)) continue;

    const cluster: { x: number; y: number }[] = [];
    const queue = [i];

    while (queue.length > 0) {
      const idx = queue.shift()!;
      if (visited.has(idx)) continue;
      visited.add(idx);
      cluster.push(pixels[idx]);

      // Find neighbors
      for (let j = 0; j < pixels.length; j++) {
        if (visited.has(j)) continue;
        const dx = pixels[idx].x - pixels[j].x;
        const dy = pixels[idx].y - pixels[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < threshold) {
          queue.push(j);
        }
      }
    }

    if (cluster.length > 10) { // Minimum cluster size
      clusters.push(cluster);
    }
  }

  return clusters;
}
