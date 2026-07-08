import React, { useState } from 'react';
import { 
  FileText, Sparkles, CheckCircle, ArrowRight, ShieldCheck, Mail, Lock, User, Briefcase, ChevronRight, Layers, Target, HelpCircle, Award
} from 'lucide-react';
import ResumeIQLogo from './ResumeIQLogo';

interface HomeLandingViewProps {
  onLogin: (user: { name: string; email: string; role: string; bio: string; location: string }) => void;
}

const ROLE_CATEGORIES = [
  // Technology & Engineering
  { value: "Senior Software Engineer", label: "Technology: Senior Software Engineer" },
  { value: "Full Stack Developer", label: "Technology: Full Stack Developer" },
  { value: "Cybersecurity Specialist", label: "Technology: Cybersecurity Specialist" },
  { value: "Data Scientist / AI Engineer", label: "Technology: AI & Data Science" },
  { value: "Product Manager / Scrum Master", label: "Technology: Product / Project Manager" },

  // Medicine & Healthcare
  { value: "Physician / MD", label: "Medicine: Physician / MD" },
  { value: "Registered Nurse (RN)", label: "Medicine: Registered Nurse/Practitioner" },
  { value: "Medical Researcher / Chemist", label: "Medicine: Scientist & Clinical Researcher" },
  { value: "Pharmacist / Therapist", label: "Medicine: Pharmacist & Therapist" },
  
  // Education & Academia
  { value: "Academic Educator / Teacher", label: "Education: School Teacher / Educator" },
  { value: "University Professor / Lecturer", label: "Education: Professor / Lecturer" },
  { value: "Educational Counselor", label: "Education: Counselor or Advisor" },
  { value: "Curriculum Specialist", label: "Education: Curriculum Developer" },
  
  // Physics & Hard Sciences
  { value: "Research Physicist / Astrophysicist", label: "Physics & Science: Research Physicist" },
  { value: "Theoretical Physicist / Researcher", label: "Physics & Science: Theoretical Physicist" },
  { value: "Chemical Lab Scientist", label: "Physics & Science: Chemist & Lab Expert" },
  { value: "Geologist / Environmental Analyst", label: "Physics & Science: Earth & Environmental Scientist" },

  // Business, Accounting & Finance
  { value: "Financial Analyst / Banker", label: "Finance: Analyst or Investment Banker" },
  { value: "Chartered Accountant / Auditor", label: "Finance: Accountant or Auditor" },
  { value: "Marketing Director / Manager", label: "Business: Marketing / Brand Manager" },
  { value: "HR Director / Generalist", label: "Business: HR & Talent Acquisition" },

  // Creative & Liberal Arts
  { value: "Graphic / UI Creative Designer", label: "Creative: Graphic & UI Designer" },
  { value: "Journalist / Professional Writer", label: "Creative: Professional Writer / Journalist" },
  { value: "UX Researcher / Designer", label: "Creative: UX Specialist" },

  // Other Custom Fields (Type custom)
  { value: "Other", label: "Other / Custom Target Role..." }
];

export default function HomeLandingView({ onLogin }: HomeLandingViewProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Senior Software Engineer');
  const [customRole, setCustomRole] = useState('');
  const [errorMess, setErrorMess] = useState('');

  // Submit Handler for user authentication
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMess('');

    if (!email || !password) {
      setErrorMess('Please specify both your email address and password credentials.');
      return;
    }

    if (activeTab === 'signup' && !name) {
      setErrorMess('Please provide your full screen name for personalizing your workspace.');
      return;
    }

    if (activeTab === 'signup' && role === 'Other' && !customRole.trim()) {
      setErrorMess('Please specify your custom target role category.');
      return;
    }

    // Load or create corresponding account
    const registeredUsers = localStorage.getItem('registered_users');
    let usersList = registeredUsers ? JSON.parse(registeredUsers) : {};

    if (activeTab === 'signup') {
      if (usersList[email]) {
        setErrorMess('This email address has already been registered in this environment. Please authenticate via the Login tab.');
        return;
      }

      const finalRole = (role === 'Other' ? customRole : role).trim() || 'Professional';

      // Safeguard a fresh, clean empty profile structure
      const newUser = {
        name: name.trim(),
        email: email.trim(),
        role: finalRole,
        bio: `Passionate ${finalRole} specialized in professional development, strategic goals, and robust execution capabilities.`,
        location: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        password: password
      };

      usersList[email] = newUser;
      localStorage.setItem('registered_users', JSON.stringify(usersList));
      onLogin(newUser);
    } else {
      // Login validation
      const existingUser = usersList[email];
      if (!existingUser) {
        setErrorMess('No account is associated with this email address. Please select the "Create Account" tab above to register first.');
        return;
      }

      if (existingUser.password !== password) {
        setErrorMess('Incorrect password. Please verify your credentials and try again.');
        return;
      }

      onLogin(existingUser);
    }
  };

  const scrollToAuth = (mode?: 'login' | 'signup') => {
    if (mode) {
      setActiveTab(mode);
    }
    const element = document.getElementById('auth-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 font-sans flex flex-col transition-colors duration-300">
      
      {/* Upper Brand Section */}
      <header className="px-4 sm:px-8 py-5 border-b border-zinc-100 dark:border-zinc-900/65 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ResumeIQLogo size="sm" showText={true} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-sky-50 dark:bg-sky-950/40 text-sky-750 dark:text-sky-400 px-3 py-1 rounded-full border border-sky-100 dark:border-sky-900/45 font-mono font-bold">
              AI SCANNER v2.0
            </span>
          </div>
        </div>
      </header>

      {/* Hero Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Pitch and Visual Explanatory Boxes */}
        <div className="col-span-1 lg:col-span-7 space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-350 border border-zinc-200/50 dark:border-zinc-800/80">
              <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" /> Uncover Hiring Potential
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-zinc-900 dark:text-white">
              Optimize Your CV for <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-600 dark:from-teal-400 dark:via-sky-400 dark:to-indigo-400 font-black">ATS Systems</span> Instantly
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-medium">
              Corporate HR filter applications before humans see them. ResumeIQ leverages server-side Gemini models to evaluate layout balance, detect missing job-specific keywords, and upgrade your achievements with quantified, high-impact statements.
            </p>
            
            {/* Direct Navigation Touchpoints */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToAuth('login')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToAuth('signup')}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-805/85 text-zinc-700 dark:text-zinc-200 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Interactive Feature Demo Snippets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Box 1 */}
            <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="p-2.5 bg-teal-50/70 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 rounded-xl w-fit">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">ATS Score Grading</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                Real-time layout checklists evaluate formatting, font density, scoring markers, and structure issues.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="p-2.5 bg-teal-55 dark:bg-zinc-950/40 text-teal-600 dark:text-teal-400 rounded-xl w-fit">
                <Target className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Linguistic Audit</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                Compares your CV terms with target job criteria to isolate and suggest vital missing skills.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="p-2.5 bg-sky-55 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 rounded-xl w-fit">
                <Award className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Sentence Rewrites</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                Replaces soft narrative descriptions with professional, quantified accomplishment models.
              </p>
            </div>

          </div>

          <div className="p-4 rounded-xl border border-dashed border-sky-500/20 bg-sky-50/10 dark:bg-sky-950/5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-500 flex-shrink-0" />
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Your profile is initialized empty. Once logged in, you paste your text or upload a document to build your separate database of evaluations which persist securely.
            </p>
          </div>
        </div>

        {/* Right Side: Beautiful, Tidy Signup & Login Form Box */}
        <div className="col-span-1 lg:col-span-5">
          <div id="auth-container" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            
            {/* Soft decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
            
            {/* Header Tabs with pill styling */}
            <div className="flex bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded-2xl border border-zinc-100 dark:border-zinc-800 relative z-10">
              <button 
                type="button"
                onClick={() => { setActiveTab('login'); setErrorMess(''); }}
                className={`flex-1 py-2 rounded-xl text-center text-xs font-bold transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
              >
                Log In
              </button>
              <button 
                type="button"
                onClick={() => { setActiveTab('signup'); setErrorMess(''); }}
                className={`flex-1 py-2 rounded-xl text-center text-xs font-bold transition-all duration-200 ${
                  activeTab === 'signup'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Explanatory introduction */}
            <div className="space-y-1 relative z-10">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                {activeTab === 'login' ? 'Welcome Back!' : 'Initialize Your Space'}
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                {activeTab === 'login' 
                  ? 'Access your private ATS scores and keyword maps.' 
                  : 'Start from scratch with a pristine, isolated workspace.'}
              </p>
            </div>

            {/* Main authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              
              {activeTab === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Full Screen Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-400" />
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-655 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                      placeholder="e.g. Alex Morgan"
                      required
                    />
                  </div>
                </div>
              )}

              {activeTab === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Target Role Category</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-zinc-400 z-10 pointer-events-none" />
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none cursor-pointer"
                    >
                      {ROLE_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value} className="dark:bg-zinc-900">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'signup' && role === 'Other' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Your Custom Target Role</label>
                  <div className="relative">
                    <Target className="absolute left-3 top-3.5 w-4 h-4 text-zinc-400 font-bold" />
                    <input 
                      type="text"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-655 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                      placeholder="e.g. Pediatrician, High School Physics Teacher"
                      required={role === 'Other'}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-400" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-655 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Credential Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-400" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-655 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {errorMess && (
                <div className="text-[11px] p-3 text-red-600 bg-red-50/40 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 rounded-xl leading-normal">
                  {errorMess}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-indigo-600/10 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {activeTab === 'login' ? 'Unlock Assessment Portal' : 'Register Secure Space'} <ChevronRight className="w-4 h-4" />
              </button>

            </form>

            {/* Registration Guidance Tip */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 text-[10.5px] text-zinc-500 dark:text-zinc-400 rounded-xl leading-relaxed border border-zinc-150/40 dark:border-zinc-800">
              💡 <strong className="text-zinc-700 dark:text-zinc-200">First-time user?</strong> Click on the <strong className="text-sky-600 dark:text-sky-450">"Create Account"</strong> tab to register. Registered accounts persist securely in local sandbox storage.
            </div>

          </div>
        </div>

      </main>

      {/* Aesthetic layout footer */}
      <footer className="py-6 border-t border-zinc-100 dark:border-zinc-900 bg-white/5 text-center text-[10px] text-zinc-400 dark:text-zinc-500 font-mono tracking-wider">
        SECURE ATS SCANNING • DATA PRESERVATION COHESIVE SYSTEM 2026
      </footer>

    </div>
  );
}
