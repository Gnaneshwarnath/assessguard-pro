import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  AlertTriangle,
  Video,
  Monitor,
  Eye,
  CheckCircle,
  Send,
  Play,
  RotateCcw,
  Users,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useFaceDetection } from "@/hooks/useFaceDetection";

interface Question {
  id: number;
  text: string;
  options?: string[];
  type: "mcq" | "coding";
  codeStarter?: string;
}

interface Section {
  id: string;
  name: string;
  duration: number;
  questions: Question[];
}

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Exam state
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(1800);
  const [examStarted, setExamStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [violations, setViolations] = useState(0);
  const [showViolationWarning, setShowViolationWarning] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [cameraActive, setCameraActive] = useState(false);

  // Face detection hook
  const handleFaceViolation = useCallback((reason: string) => {
    handleViolation(reason);
  }, []);

  const { faceResult, isDetecting } = useFaceDetection(
    videoRef,
    cameraActive && examStarted,
    handleFaceViolation
  );

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to take the exam.",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [user, authLoading, navigate, toast]);

  // Comprehensive exam data with many questions
  const sections: Section[] = [
    {
      id: "aptitude",
      name: "Aptitude",
      duration: 1800,
      questions: [
        {
          id: 1,
          type: "mcq",
          text: "A train travels at 60 km/hr. How long will it take to cover 180 km?",
          options: ["2 hours", "3 hours", "4 hours", "5 hours"]
        },
        {
          id: 2,
          type: "mcq",
          text: "If the cost of 5 apples is $15, what is the cost of 8 apples?",
          options: ["$20", "$22", "$24", "$26"]
        },
        {
          id: 3,
          type: "mcq",
          text: "A rectangle has length 12 cm and width 8 cm. What is its area?",
          options: ["96 cm²", "86 cm²", "76 cm²", "106 cm²"]
        },
        {
          id: 4,
          type: "mcq",
          text: "A shopkeeper sells an item for $120, making a profit of 20%. What was the cost price?",
          options: ["$96", "$100", "$104", "$108"]
        },
        {
          id: 5,
          type: "mcq",
          text: "If A can complete a work in 10 days and B can complete the same work in 15 days, in how many days can they complete it together?",
          options: ["5 days", "6 days", "7 days", "8 days"]
        },
        {
          id: 6,
          type: "mcq",
          text: "The average of 5 consecutive numbers is 18. What is the largest number?",
          options: ["18", "19", "20", "21"]
        },
        {
          id: 7,
          type: "mcq",
          text: "A car covers 450 km in 5 hours. What is its speed in m/s?",
          options: ["20 m/s", "25 m/s", "30 m/s", "35 m/s"]
        },
        {
          id: 8,
          type: "mcq",
          text: "What is 15% of 240?",
          options: ["32", "34", "36", "38"]
        },
        {
          id: 9,
          type: "mcq",
          text: "If the ratio of boys to girls in a class is 3:2 and there are 30 students, how many boys are there?",
          options: ["12", "15", "18", "20"]
        },
        {
          id: 10,
          type: "mcq",
          text: "A pipe can fill a tank in 6 hours. What part of the tank is filled in 1 hour?",
          options: ["1/4", "1/5", "1/6", "1/8"]
        }
      ]
    },
    {
      id: "logical",
      name: "Logical Reasoning",
      duration: 1500,
      questions: [
        {
          id: 11,
          type: "mcq",
          text: "Complete the series: 2, 6, 12, 20, ?",
          options: ["28", "30", "32", "26"]
        },
        {
          id: 12,
          type: "mcq",
          text: "If COMPUTER is coded as RFUVQNPC, then PRINTER is coded as?",
          options: ["QSJOUFQ", "QSJOUFS", "SFUOJQR", "QSJUOFR"]
        },
        {
          id: 13,
          type: "mcq",
          text: "Find the odd one out: Apple, Mango, Potato, Orange",
          options: ["Apple", "Mango", "Potato", "Orange"]
        },
        {
          id: 14,
          type: "mcq",
          text: "If 'CAT' is written as 'DBU', how is 'DOG' written?",
          options: ["EPH", "CPF", "FOH", "EPG"]
        },
        {
          id: 15,
          type: "mcq",
          text: "Complete the pattern: A1Z, B2Y, C3X, ?",
          options: ["D4W", "E4W", "D5V", "E5W"]
        },
        {
          id: 16,
          type: "mcq",
          text: "If in a certain code, SISTER is written as RHRSDQ, how is MOTHER written?",
          options: ["NLSGDQ", "LNSGDQ", "NLSHDR", "LNSHDR"]
        },
        {
          id: 17,
          type: "mcq",
          text: "Which number should come next: 1, 1, 2, 3, 5, 8, ?",
          options: ["11", "12", "13", "14"]
        },
        {
          id: 18,
          type: "mcq",
          text: "Find the missing term: 3, 9, 27, 81, ?",
          options: ["162", "189", "216", "243"]
        },
        {
          id: 19,
          type: "mcq",
          text: "If DELHI is coded as 73541, how is HIDE coded?",
          options: ["4137", "4173", "5. 1437", "4731"]
        },
        {
          id: 20,
          type: "mcq",
          text: "A is B's sister. C is B's mother. D is C's father. E is D's mother. How is A related to D?",
          options: ["Granddaughter", "Daughter", "Grandmother", "Grandfather"]
        }
      ]
    },
    {
      id: "technical",
      name: "Technical MCQ",
      duration: 2100,
      questions: [
        {
          id: 21,
          type: "mcq",
          text: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"]
        },
        {
          id: 22,
          type: "mcq",
          text: "Which data structure uses LIFO principle?",
          options: ["Queue", "Stack", "Array", "Linked List"]
        },
        {
          id: 23,
          type: "mcq",
          text: "What does SQL stand for?",
          options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"]
        },
        {
          id: 24,
          type: "mcq",
          text: "Which sorting algorithm has the best average-case time complexity?",
          options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"]
        },
        {
          id: 25,
          type: "mcq",
          text: "What is the purpose of the 'virtual' keyword in C++?",
          options: ["To create abstract classes", "To enable runtime polymorphism", "To allocate memory dynamically", "To prevent inheritance"]
        },
        {
          id: 26,
          type: "mcq",
          text: "Which of the following is NOT a valid access modifier in Java?",
          options: ["public", "private", "friend", "protected"]
        },
        {
          id: 27,
          type: "mcq",
          text: "What is the space complexity of merge sort?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"]
        },
        {
          id: 28,
          type: "mcq",
          text: "Which data structure is used for implementing recursion?",
          options: ["Queue", "Stack", "Array", "Linked List"]
        },
        {
          id: 29,
          type: "mcq",
          text: "What is a deadlock in operating systems?",
          options: ["A process that runs forever", "Two or more processes waiting indefinitely for resources held by each other", "A crashed process", "A virus in the system"]
        },
        {
          id: 30,
          type: "mcq",
          text: "Which protocol is used for secure web browsing?",
          options: ["HTTP", "FTP", "HTTPS", "SMTP"]
        },
        {
          id: 31,
          type: "mcq",
          text: "What is the primary key in a database?",
          options: ["Any column in a table", "A column that uniquely identifies each row", "The first column of a table", "A foreign key reference"]
        },
        {
          id: 32,
          type: "mcq",
          text: "Which of these is a non-linear data structure?",
          options: ["Array", "Linked List", "Stack", "Tree"]
        },
        {
          id: 33,
          type: "mcq",
          text: "What does API stand for?",
          options: ["Application Programming Interface", "Advanced Programming Interface", "Application Protocol Interface", "Advanced Protocol Integration"]
        },
        {
          id: 34,
          type: "mcq",
          text: "What is the worst-case time complexity of quicksort?",
          options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"]
        },
        {
          id: 35,
          type: "mcq",
          text: "Which layer of the OSI model handles routing?",
          options: ["Physical", "Data Link", "Network", "Transport"]
        }
      ]
    },
    {
      id: "coding",
      name: "Coding",
      duration: 3600,
      questions: [
        {
          id: 36,
          type: "coding",
          text: "Write a function to find the factorial of a number n. The function should handle edge cases like n = 0 and n = 1.\n\nExample:\nInput: 5\nOutput: 120\n\nInput: 0\nOutput: 1",
          codeStarter: "def factorial(n):\n    # Write your code here\n    pass\n\n# Test your function\nprint(factorial(5))"
        },
        {
          id: 37,
          type: "coding",
          text: "Write a function to check if a string is a palindrome. Ignore spaces and case.\n\nExample:\nInput: 'A man a plan a canal Panama'\nOutput: True",
          codeStarter: "def is_palindrome(s):\n    # Write your code here\n    pass\n\n# Test your function\nprint(is_palindrome('A man a plan a canal Panama'))"
        },
        {
          id: 38,
          type: "coding",
          text: "Write a function to find the nth Fibonacci number using dynamic programming.\n\nExample:\nInput: 10\nOutput: 55\n\nNote: The sequence starts as 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...",
          codeStarter: "def fibonacci(n):\n    # Write your code here\n    pass\n\n# Test your function\nprint(fibonacci(10))"
        },
        {
          id: 39,
          type: "coding",
          text: "Write a function to find all prime numbers up to n using the Sieve of Eratosthenes.\n\nExample:\nInput: 20\nOutput: [2, 3, 5, 7, 11, 13, 17, 19]",
          codeStarter: "def sieve_of_eratosthenes(n):\n    # Write your code here\n    pass\n\n# Test your function\nprint(sieve_of_eratosthenes(20))"
        },
        {
          id: 40,
          type: "coding",
          text: "Write a function to implement binary search on a sorted array.\n\nExample:\nInput: arr = [1, 3, 5, 7, 9, 11, 13], target = 7\nOutput: 3 (index of target)\n\nIf not found, return -1.",
          codeStarter: "def binary_search(arr, target):\n    # Write your code here\n    pass\n\n# Test your function\nprint(binary_search([1, 3, 5, 7, 9, 11, 13], 7))"
        }
      ]
    }
  ];

  const currentSectionData = sections[currentSection];
  const currentQuestionData = currentSectionData.questions[currentQuestion];
  const questionKey = `${currentSectionData.id}-${currentQuestionData.id}`;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSectionComplete();
          return sections[currentSection + 1]?.duration || 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentSection]);

  // Proctoring setup
  useEffect(() => {
    setupProctoring();
    return () => cleanupProctoring();
  }, []);

  // Fullscreen detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        handleViolation("Left fullscreen mode");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Tab visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation("Tab switched or window minimized");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const setupProctoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        },
        audio: false 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
      }
      setCameraActive(true);
      toast({
        title: "Camera activated",
        description: "Proctoring is now active.",
      });
    } catch (error) {
      console.error("Camera error:", error);
      setCameraActive(false);
      toast({
        title: "Camera access denied",
        description: "Please enable camera access for proctoring. Go to browser settings to allow camera.",
        variant: "destructive",
      });
    }
  };

  const cleanupProctoring = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const handleViolation = useCallback((reason: string) => {
    setViolations((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        toast({
          title: "Exam Terminated",
          description: "Maximum violations reached. Your exam has been auto-submitted.",
          variant: "destructive",
        });
        handleSubmitExam();
      } else {
        setShowViolationWarning(true);
        toast({
          title: `Violation Detected (${newCount}/5)`,
          description: reason,
          variant: "destructive",
        });
        setTimeout(() => setShowViolationWarning(false), 3000);
      }
      return newCount;
    });
  }, []);

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      setExamStarted(true);
    } catch (error) {
      // Fullscreen may fail in iframes/sandboxed environments - still allow exam
      toast({
        title: "Fullscreen unavailable",
        description: "Starting exam without fullscreen mode. Please stay focused on this tab.",
      });
      setExamStarted(true);
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: answer }));
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionKey)) {
        newSet.delete(questionKey);
      } else {
        newSet.add(questionKey);
      }
      return newSet;
    });
  };

  const handleSectionComplete = () => {
    if (currentSection < sections.length - 1) {
      toast({
        title: "Section Complete",
        description: `Moving to ${sections[currentSection + 1].name}`,
      });
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
      setTimeLeft(sections[currentSection + 1].duration);
    } else {
      handleSubmitExam();
    }
  };

  const handleSubmitExam = () => {
    toast({
      title: "Exam Submitted",
      description: "Your exam has been successfully submitted.",
    });
    navigate("/dashboard");
  };

  const runCode = async () => {
    setIsRunning(true);
    setCodeOutput("Running...\n");
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const code = answers[questionKey] || currentQuestionData.codeStarter || "";
    
    // Mock output based on code content
    if (code.includes("factorial")) {
      setCodeOutput("Running test cases...\n\nTest 1: factorial(5)\nOutput: 120 ✓\n\nTest 2: factorial(0)\nOutput: 1 ✓\n\nAll test cases passed!");
    } else if (code.includes("palindrome")) {
      setCodeOutput("Running test cases...\n\nTest 1: is_palindrome('racecar')\nOutput: True ✓\n\nTest 2: is_palindrome('hello')\nOutput: False ✓\n\nAll test cases passed!");
    } else {
      setCodeOutput("Execution complete.\n\nNo output.");
    }
    
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="glass-card p-8 max-w-lg text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
            <Monitor className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-muted-foreground mb-6">
            This exam will attempt to enter fullscreen mode for proctoring purposes. 
            Please click the button below to start your exam.
          </p>
          <Button onClick={enterFullscreen} variant="gradient" size="lg" className="cursor-pointer">
            Enter Fullscreen & Start
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Violation Warning Overlay */}
      {showViolationWarning && (
        <div className="fixed inset-0 bg-destructive/20 backdrop-blur-sm z-50 flex items-center justify-center animate-pulse">
          <div className="glass-card p-8 border-destructive text-center">
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-destructive">Violation Detected!</h2>
            <p className="text-muted-foreground">This activity has been logged.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center px-6">
        <div className="flex items-center gap-6 flex-1">
          <h1 className="font-semibold">Data Structures & Algorithms</h1>
          <div className="flex items-center gap-2">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  idx === currentSection
                    ? "bg-primary text-primary-foreground"
                    : idx < currentSection
                    ? "bg-success/20 text-success"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {section.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono ${
            timeLeft < 300 ? "bg-destructive/20 text-destructive" : "bg-secondary"
          }`}>
            <Clock className="w-4 h-4" />
            <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
          </div>

          {/* Proctoring Status */}
          <div className="flex items-center gap-3">
            <div className="proctoring-badge active">
              <Video className="w-4 h-4" />
              Live
            </div>
            <div className={`proctoring-badge ${violations > 2 ? "danger" : violations > 0 ? "warning" : "active"}`}>
              <Eye className="w-4 h-4" />
              {violations}/5
            </div>
          </div>

          <Button variant="destructive" size="sm" onClick={handleSubmitExam}>
            Submit Exam
          </Button>
        </div>
      </header>

      <div className="pt-16 flex h-screen">
        {/* Question Navigator Sidebar */}
        <aside className="w-64 bg-card border-r border-border p-4 overflow-y-auto">
          <div className="mb-4">
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">
              {currentSectionData.name}
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {currentSectionData.questions.map((q, idx) => {
                const qKey = `${currentSectionData.id}-${q.id}`;
                const isAnswered = !!answers[qKey];
                const isFlagged = flaggedQuestions.has(qKey);
                const isCurrent = idx === currentQuestion;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(idx)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium relative transition-all ${
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isAnswered
                        ? "bg-success/20 text-success border border-success/30"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <Flag className="w-3 h-3 absolute -top-1 -right-1 text-warning" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-success/20 border border-success/30" />
              <span className="text-muted-foreground">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-secondary" />
              <span className="text-muted-foreground">Not Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary" />
              <span className="text-muted-foreground">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 text-warning" />
              <span className="text-muted-foreground">Flagged</span>
            </div>
          </div>

          {/* Webcam Preview */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Camera Preview</p>
              <div className="flex items-center gap-2">
                {isDetecting && (
                  <div className={`text-xs flex items-center gap-1 ${
                    faceResult.isMultipleFaces ? 'text-destructive' : 
                    faceResult.isNoFace ? 'text-warning' : 'text-success'
                  }`}>
                    <Users className="w-3 h-3" />
                    {faceResult.faceCount}
                  </div>
                )}
                <div className={`w-2 h-2 rounded-full ${cameraActive ? 'bg-success animate-pulse' : 'bg-destructive'}`} />
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-secondary border border-border relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover scale-x-[-1]"
              />
              {!cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                  <div className="text-center p-4">
                    <Video className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Camera not available</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={setupProctoring}
                    >
                      Enable Camera
                    </Button>
                  </div>
                </div>
              )}
              {/* Face detection overlay */}
              {cameraActive && faceResult.isMultipleFaces && (
                <div className="absolute inset-0 border-4 border-destructive/50 animate-pulse flex items-end justify-center pb-2">
                  <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                    {faceResult.faceCount} faces detected!
                  </span>
                </div>
              )}
              {cameraActive && faceResult.isNoFace && isDetecting && (
                <div className="absolute inset-0 border-4 border-warning/50 animate-pulse flex items-end justify-center pb-2">
                  <span className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded">
                    No face detected
                  </span>
                </div>
              )}
            </div>
            {/* Face detection legend */}
            <div className="mt-2 text-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-muted-foreground">1 face (OK)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-muted-foreground">0 faces (Warning)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-muted-foreground">2+ faces (Violation)</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {currentQuestionData.type === "mcq" ? (
            /* MCQ Question */
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {currentSectionData.questions.length}
                  </span>
                  <Button
                    variant={flaggedQuestions.has(questionKey) ? "warning" : "outline"}
                    size="sm"
                    onClick={toggleFlag}
                  >
                    <Flag className="w-4 h-4" />
                    {flaggedQuestions.has(questionKey) ? "Flagged" : "Flag"}
                  </Button>
                </div>

                <div className="glass-card p-6 mb-6">
                  <p className="text-lg leading-relaxed">{currentQuestionData.text}</p>
                </div>

                <div className="space-y-3">
                  {currentQuestionData.options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                        answers[questionKey] === option
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                          answers[questionKey] === option
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span>{option}</span>
                        {answers[questionKey] === option && (
                          <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Coding Question */
            <div className="flex-1 flex overflow-hidden">
              {/* Problem Description */}
              <div className="w-1/2 border-r border-border p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Problem {currentQuestion + 1} of {currentSectionData.questions.length}
                  </span>
                  <Button
                    variant={flaggedQuestions.has(questionKey) ? "warning" : "outline"}
                    size="sm"
                    onClick={toggleFlag}
                  >
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-foreground bg-transparent p-0 text-base leading-relaxed">
                    {currentQuestionData.text}
                  </pre>
                </div>
              </div>

              {/* Code Editor */}
              <div className="w-1/2 flex flex-col">
                <div className="border-b border-border p-3 flex items-center justify-between">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm"
                  >
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="javascript">JavaScript</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setAnswers({ ...answers, [questionKey]: currentQuestionData.codeStarter || "" })}>
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                    <Button variant="gradient" size="sm" onClick={runCode} disabled={isRunning}>
                      <Play className="w-4 h-4" />
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <textarea
                    value={answers[questionKey] || currentQuestionData.codeStarter || ""}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="w-full h-full p-4 bg-secondary/50 font-mono text-sm resize-none focus:outline-none custom-scrollbar"
                    spellCheck={false}
                  />
                </div>
                {/* Output */}
                <div className="h-40 border-t border-border">
                  <div className="p-2 border-b border-border text-xs text-muted-foreground flex items-center gap-2">
                    <Send className="w-3 h-3" />
                    Output
                  </div>
                  <pre className="p-4 text-sm font-mono overflow-auto h-[calc(100%-32px)] custom-scrollbar">
                    {codeOutput || "Run your code to see output here..."}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <footer className="border-t border-border p-4 flex items-center justify-between bg-card">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {Object.keys(answers).filter(k => k.startsWith(currentSectionData.id)).length} of{" "}
              {currentSectionData.questions.length} answered
            </div>

            {currentQuestion < currentSectionData.questions.length - 1 ? (
              <Button
                variant="gradient"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : currentSection < sections.length - 1 ? (
              <Button variant="gradient" onClick={handleSectionComplete}>
                Next Section
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="success" onClick={handleSubmitExam}>
                Submit Exam
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ExamPage;
