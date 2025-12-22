import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Monitor, 
  Clock, 
  Code, 
  Brain, 
  Eye,
  CheckCircle,
  ArrowRight,
  Play,
  Users,
  BarChart3,
  Lock
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Proctoring",
      description: "Advanced monitoring with face detection, tab switching alerts, and real-time violation tracking."
    },
    {
      icon: Code,
      title: "Integrated Code Editor",
      description: "Built-in compiler supporting C, C++, Java, Python with real-time execution and test cases."
    },
    {
      icon: Clock,
      title: "Timed Sections",
      description: "Individual time limits per section with automatic switching and submission on expiry."
    },
    {
      icon: Shield,
      title: "Secure Environment",
      description: "Full-screen enforcement, copy-paste blocking, and encrypted data transmission."
    },
    {
      icon: Monitor,
      title: "Live Monitoring",
      description: "Real-time admin dashboard to monitor all candidates with instant violation alerts."
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Comprehensive reports with violation logs, time analysis, and performance metrics."
    }
  ];

  const examSections = [
    { name: "Aptitude", questions: 20, time: "30 min", color: "from-cyan-500 to-blue-500" },
    { name: "Logical Reasoning", questions: 15, time: "25 min", color: "from-violet-500 to-purple-500" },
    { name: "Technical MCQs", questions: 25, time: "35 min", color: "from-emerald-500 to-teal-500" },
    { name: "Coding Round", questions: 3, time: "60 min", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ProctorExam</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#sections" className="text-muted-foreground hover:text-foreground transition-colors">Exam Sections</a>
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">Security</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button variant="gradient">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm text-muted-foreground">AI-Powered Online Examination Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              Secure Online
              <span className="block text-gradient">Assessments</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Conduct proctored exams with AI monitoring, integrated coding environments, 
              and comprehensive analytics. Built for CSE students and professionals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/auth?mode=signup">
                <Button size="xl" variant="gradient" className="group">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="xl" variant="outline" className="group">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Free for up to 50 students
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                24/7 Support
              </div>
            </div>
          </div>

          {/* Hero Image/Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="glass-card p-2 max-w-5xl mx-auto">
              <div className="bg-secondary rounded-lg overflow-hidden">
                {/* Mock Dashboard Preview */}
                <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-warning/50" />
                    <div className="w-3 h-3 rounded-full bg-success/50" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-full bg-secondary text-xs text-muted-foreground">
                      exam.proctorexam.com
                    </div>
                  </div>
                </div>
                <div className="p-6 min-h-[400px] bg-gradient-to-br from-card to-secondary">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="h-8 w-48 bg-muted/50 rounded animate-pulse" />
                      <div className="glass-card p-4">
                        <div className="h-4 w-full bg-muted/30 rounded mb-3" />
                        <div className="h-4 w-3/4 bg-muted/30 rounded mb-3" />
                        <div className="h-4 w-1/2 bg-muted/30 rounded" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-4 h-24" />
                        <div className="glass-card p-4 h-24" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="glass-card p-4 h-32 flex items-center justify-center">
                        <Eye className="w-12 h-12 text-primary/50" />
                      </div>
                      <div className="glass-card p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-4 h-4 text-success" />
                          <span className="text-sm">Proctoring Active</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 w-full bg-success/30 rounded" />
                          <div className="h-2 w-3/4 bg-muted/30 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need for
              <span className="text-gradient"> Secure Exams</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools for conducting fair and secure online assessments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 group hover:border-primary/50 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Sections */}
      <section id="sections" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Multi-Section
              <span className="text-gradient"> Assessments</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive evaluation across aptitude, reasoning, technical, and coding skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {examSections.map((section, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center group hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{section.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{section.questions} Questions</p>
                  <p className="text-primary font-medium">{section.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Enterprise-Grade
                <span className="text-gradient"> Security</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our platform ensures exam integrity with multiple layers of security and AI-powered proctoring.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Eye, text: "Real-time webcam monitoring with face detection" },
                  { icon: Monitor, text: "Full-screen enforcement with exit detection" },
                  { icon: Lock, text: "Tab switching and window change alerts" },
                  { icon: Shield, text: "Automatic termination after violation threshold" },
                  { icon: Users, text: "Live admin monitoring dashboard" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center mb-4">
                    <Shield className="w-10 h-10 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold">Proctoring Status</h3>
                  <p className="text-success text-sm">All systems active</p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Webcam", status: true },
                    { label: "Full Screen", status: true },
                    { label: "Screen Share", status: true },
                    { label: "Tab Focus", status: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-sm">{item.label}</span>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                      }`}>
                        {item.status ? "Active" : "Inactive"}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">0 Violations</p>
                      <p className="text-xs text-muted-foreground">Exam in progress</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="glass-card p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Assessments?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of educators conducting secure online exams with ProctorExam.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=signup">
                <Button size="xl" variant="gradient">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="xl" variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Code className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">ProctorExam</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ProctorExam. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
