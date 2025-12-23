import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Clock, 
  BookOpen, 
  Brain, 
  Terminal,
  ChevronRight,
  Bell,
  User,
  Calendar,
  CheckCircle,
  AlertCircle,
  Play,
  LogOut,
  Loader2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Redirect to auth if not logged in or not a student
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const upcomingExams = [
    {
      id: 1,
      title: "Data Structures & Algorithms",
      date: "Dec 25, 2024",
      time: "10:00 AM",
      duration: "150 min",
      sections: ["Aptitude", "Logical", "MCQ", "Coding"],
      status: "scheduled"
    },
    {
      id: 2,
      title: "Database Management Systems",
      date: "Dec 28, 2024",
      time: "2:00 PM",
      duration: "120 min",
      sections: ["MCQ", "Coding"],
      status: "scheduled"
    },
    {
      id: 3,
      title: "Operating Systems Fundamentals",
      date: "Jan 2, 2025",
      time: "11:00 AM",
      duration: "90 min",
      sections: ["Aptitude", "MCQ"],
      status: "scheduled"
    }
  ];

  const completedExams = [
    {
      id: 4,
      title: "Computer Networks",
      date: "Dec 15, 2024",
      score: 85,
      maxScore: 100,
      status: "passed"
    },
    {
      id: 5,
      title: "Web Development Basics",
      date: "Dec 10, 2024",
      score: 92,
      maxScore: 100,
      status: "passed"
    }
  ];

  const stats = [
    { icon: BookOpen, label: "Total Exams", value: "12", color: "text-primary" },
    { icon: CheckCircle, label: "Completed", value: "7", color: "text-success" },
    { icon: Calendar, label: "Upcoming", value: "3", color: "text-warning" },
    { icon: Brain, label: "Avg Score", value: "88%", color: "text-accent" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Get user display name from email
  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student';

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ProctorExam</span>
          </Link>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole || 'Student'}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {displayName}! 👋</h1>
          <p className="text-muted-foreground">Here's an overview of your exam schedule and progress.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exams Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-secondary rounded-xl">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "upcoming"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Upcoming Exams
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "completed"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Completed
              </button>
            </div>

            {/* Exam Cards */}
            <div className="space-y-4">
              {activeTab === "upcoming" ? (
                upcomingExams.map((exam) => (
                  <div key={exam.id} className="glass-card p-6 hover:border-primary/50 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{exam.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {exam.date}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {exam.time}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {exam.duration}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {exam.sections.map((section, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                              {section}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link to={`/exam/${exam.id}`}>
                        <Button variant="gradient" className="group">
                          <Play className="w-4 h-4" />
                          Start Exam
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                completedExams.map((exam) => (
                  <div key={exam.id} className="glass-card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{exam.title}</h3>
                        <p className="text-sm text-muted-foreground">{exam.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gradient">{exam.score}/{exam.maxScore}</p>
                        <span className="inline-flex items-center gap-1 text-sm text-success">
                          <CheckCircle className="w-4 h-4" />
                          Passed
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/exam/practice" className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Practice Coding</p>
                    <p className="text-xs text-muted-foreground">Solve problems</p>
                  </div>
                </Link>
                <Link to="/profile" className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">View Profile</p>
                    <p className="text-xs text-muted-foreground">Manage settings</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* System Requirements */}
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">System Check</h3>
              <div className="space-y-3">
                {[
                  { label: "Webcam", status: true },
                  { label: "Microphone", status: true },
                  { label: "Screen Share", status: true },
                  { label: "Stable Internet", status: true },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    {item.status ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                Run Full Check
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
