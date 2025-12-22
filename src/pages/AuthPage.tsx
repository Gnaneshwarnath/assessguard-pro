import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code, Eye, EyeOff, ArrowLeft, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"student" | "admin">("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: isLogin 
        ? "You have successfully logged in." 
        : "Your account has been created successfully.",
    });

    // Navigate based on user type
    if (userType === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Start your journey with ProctorExam"}
            </p>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setUserType("student")}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                userType === "student"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
              }`}
            >
              <User className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Student</p>
            </button>
            <button
              type="button"
              onClick={() => setUserType("admin")}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                userType === "admin"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
              }`}
            >
              <Shield className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">Admin</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            )}

            <Button 
              type="submit" 
              variant="gradient" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-primary/20 via-accent/10 to-background items-center justify-center p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        </div>

        <div className="relative z-10 text-center max-w-lg">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-8">
            <Code className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4">ProctorExam</h2>
          <p className="text-muted-foreground text-lg mb-8">
            The most trusted platform for conducting secure online assessments with AI-powered proctoring.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "10K+", label: "Students" },
              { value: "500+", label: "Exams" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index} className="glass-card p-4">
                <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
