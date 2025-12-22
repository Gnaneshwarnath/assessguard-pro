import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Code, 
  Bell,
  User,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BookOpen,
  PlusCircle,
  Search,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Monitor
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { icon: Users, label: "Total Students", value: "1,234", change: "+12%", trend: "up" },
    { icon: FileText, label: "Active Exams", value: "8", change: "+3", trend: "up" },
    { icon: CheckCircle, label: "Completed Today", value: "45", change: "+18%", trend: "up" },
    { icon: AlertTriangle, label: "Violations", value: "12", change: "-5%", trend: "down" },
  ];

  const recentExams = [
    { id: 1, title: "Data Structures Final", students: 156, date: "Dec 22, 2024", status: "live" },
    { id: 2, title: "Web Development Test", students: 89, date: "Dec 21, 2024", status: "completed" },
    { id: 3, title: "Database Concepts Quiz", students: 112, date: "Dec 20, 2024", status: "completed" },
    { id: 4, title: "OS Fundamentals", students: 78, date: "Dec 25, 2024", status: "scheduled" },
  ];

  const liveStudents = [
    { id: 1, name: "Alice Johnson", exam: "Data Structures", progress: 65, violations: 0, status: "active" },
    { id: 2, name: "Bob Smith", exam: "Data Structures", progress: 48, violations: 1, status: "warning" },
    { id: 3, name: "Carol Williams", exam: "Data Structures", progress: 82, violations: 0, status: "active" },
    { id: 4, name: "David Brown", exam: "Data Structures", progress: 35, violations: 2, status: "danger" },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: FileText, label: "Exams", id: "exams" },
    { icon: BookOpen, label: "Question Bank", id: "questions" },
    { icon: Users, label: "Students", id: "students" },
    { icon: Monitor, label: "Live Monitor", id: "monitor" },
    { icon: BarChart3, label: "Analytics", id: "analytics" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ProctorExam</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@proctorexam.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="glass-card p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <TrendingUp className={`w-4 h-4 ${stat.trend === "up" ? "text-success" : "text-destructive"}`} />
                      <span className={`text-sm font-medium ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground">vs last week</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Exams */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Recent Exams</h2>
                    <Button variant="gradient" size="sm">
                      <PlusCircle className="w-4 h-4" />
                      Create Exam
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {recentExams.map((exam) => (
                      <div key={exam.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            exam.status === "live"
                              ? "bg-success/20"
                              : exam.status === "scheduled"
                              ? "bg-warning/20"
                              : "bg-muted"
                          }`}>
                            <FileText className={`w-5 h-5 ${
                              exam.status === "live"
                                ? "text-success"
                                : exam.status === "scheduled"
                                ? "text-warning"
                                : "text-muted-foreground"
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium">{exam.title}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {exam.students} students
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {exam.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                            exam.status === "live"
                              ? "bg-success/20 text-success"
                              : exam.status === "scheduled"
                              ? "bg-warning/20 text-warning"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {exam.status}
                          </span>
                          <button className="p-1 hover:bg-secondary rounded">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Monitoring */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Live Monitoring</h2>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("monitor")}>
                      <Eye className="w-4 h-4" />
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {liveStudents.map((student) => (
                      <div key={student.id} className="p-4 rounded-xl bg-secondary/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              student.status === "active"
                                ? "bg-success"
                                : student.status === "warning"
                                ? "bg-warning"
                                : "bg-destructive"
                            }`} />
                            <p className="font-medium">{student.name}</p>
                          </div>
                          <div className={`px-2 py-0.5 rounded-full text-xs ${
                            student.violations === 0
                              ? "bg-success/20 text-success"
                              : student.violations === 1
                              ? "bg-warning/20 text-warning"
                              : "bg-destructive/20 text-destructive"
                          }`}>
                            {student.violations} violations
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12">
                            {student.progress}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "exams" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Exam Management</h2>
                  <p className="text-muted-foreground">Create and manage your exams</p>
                </div>
                <Button variant="gradient">
                  <PlusCircle className="w-4 h-4" />
                  Create New Exam
                </Button>
              </div>

              <div className="glass-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-muted-foreground">Exam Title</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Duration</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Students</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: "Data Structures Final", date: "Dec 25, 2024", duration: "150 min", students: 156, status: "scheduled" },
                      { title: "Algorithms Midterm", date: "Dec 22, 2024", duration: "120 min", students: 89, status: "live" },
                      { title: "Web Dev Assessment", date: "Dec 20, 2024", duration: "90 min", students: 112, status: "completed" },
                      { title: "Database Quiz", date: "Dec 18, 2024", duration: "60 min", students: 78, status: "completed" },
                    ].map((exam, idx) => (
                      <tr key={idx} className="border-t border-border hover:bg-secondary/30 transition-colors">
                        <td className="p-4 font-medium">{exam.title}</td>
                        <td className="p-4 text-muted-foreground">{exam.date}</td>
                        <td className="p-4 text-muted-foreground">{exam.duration}</td>
                        <td className="p-4 text-muted-foreground">{exam.students}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                            exam.status === "live"
                              ? "bg-success/20 text-success"
                              : exam.status === "scheduled"
                              ? "bg-warning/20 text-warning"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {exam.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "monitor" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Live Monitoring</h2>
                  <p className="text-muted-foreground">Monitor students in real-time during exams</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/20 text-success text-sm">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    4 Students Live
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {liveStudents.map((student) => (
                  <div key={student.id} className="glass-card p-4">
                    <div className="aspect-video rounded-lg bg-secondary mb-4 flex items-center justify-center">
                      <User className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{student.name}</p>
                      <div className={`w-2 h-2 rounded-full ${
                        student.status === "active"
                          ? "bg-success"
                          : student.status === "warning"
                          ? "bg-warning"
                          : "bg-destructive"
                      }`} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span>Progress: {student.progress}%</span>
                      <span className={student.violations > 0 ? "text-destructive" : ""}>
                        {student.violations} violations
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "questions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Question Bank</h2>
                  <p className="text-muted-foreground">Manage your question library</p>
                </div>
                <Button variant="gradient">
                  <PlusCircle className="w-4 h-4" />
                  Add Question
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {[
                  { category: "Aptitude", count: 150, color: "from-cyan-500 to-blue-500" },
                  { category: "Logical Reasoning", count: 120, color: "from-violet-500 to-purple-500" },
                  { category: "Technical MCQ", count: 280, color: "from-emerald-500 to-teal-500" },
                  { category: "Coding Problems", count: 85, color: "from-orange-500 to-red-500" },
                ].map((item, idx) => (
                  <div key={idx} className="glass-card p-6 hover:border-primary/50 transition-all cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.category}</h3>
                    <p className="text-2xl font-bold text-gradient">{item.count}</p>
                    <p className="text-sm text-muted-foreground">questions</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Students</h2>
                  <p className="text-muted-foreground">Manage student accounts and results</p>
                </div>
                <Button variant="gradient">
                  <PlusCircle className="w-4 h-4" />
                  Add Student
                </Button>
              </div>

              <div className="glass-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-muted-foreground">Student</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Exams Taken</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Avg Score</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Alice Johnson", email: "alice@university.edu", exams: 8, score: 92, status: "active" },
                      { name: "Bob Smith", email: "bob@university.edu", exams: 6, score: 78, status: "active" },
                      { name: "Carol Williams", email: "carol@university.edu", exams: 10, score: 88, status: "active" },
                      { name: "David Brown", email: "david@university.edu", exams: 4, score: 65, status: "suspended" },
                    ].map((student, idx) => (
                      <tr key={idx} className="border-t border-border hover:bg-secondary/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                              <span className="text-sm font-medium text-primary-foreground">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{student.email}</td>
                        <td className="p-4 text-muted-foreground">{student.exams}</td>
                        <td className="p-4">
                          <span className={`font-medium ${
                            student.score >= 80 ? "text-success" : student.score >= 60 ? "text-warning" : "text-destructive"
                          }`}>
                            {student.score}%
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                            student.status === "active"
                              ? "bg-success/20 text-success"
                              : "bg-destructive/20 text-destructive"
                          }`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
