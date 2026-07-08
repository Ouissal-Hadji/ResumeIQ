/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Cpu, Target, FileText, Activity, AlertCircle, HelpCircle, GraduationCap } from 'lucide-react';
import ResumeIQLogo from './ResumeIQLogo';

interface LandingPageProps {
  onAnalyzeResume: () => void;
  onViewDemo: () => void;
  onNavLogin: () => void;
  onNavRegister: () => void;
}

export default function LandingPage({
  onAnalyzeResume,
  onViewDemo,
  onNavLogin,
  onNavRegister
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 font-sans">
      
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 dark:bg-slate-900/75 border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ResumeIQLogo size="sm" showText={true} />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">How It Works</a>
            <a href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Testimonials</a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavLogin}
              id="btn_nav_login"
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Log in
            </button>
            <button
              onClick={onNavRegister}
              id="btn_nav_signup"
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/10 hover:shadow-indigo-600/20 transition active:scale-97"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 sm:pt-20 sm:pb-32">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15"></div>
          <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/60 transition shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              AI-POWERED ATS SYSTEM v2.0
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Optimize Your Resume <br className="hidden sm:inline" />
              with <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">AI Analyzer</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Get ATS scores, identify missing keywords, match relevant skills, and instantly improve your chances of landing first-round recruiter interviews.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onAnalyzeResume}
                id="hero_btn_analyze"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 transition flex items-center justify-center gap-2 active:scale-97 group cursor-pointer"
              >
                Analyze Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onViewDemo}
                id="hero_btn_demo"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-100 font-bold rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                View Demo
              </button>
            </div>

            {/* Testimonials snippet */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex -space-x-3">
                <img className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Hiring Manager Review" referrerPolicy="no-referrer" />
                <img className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Tech Lead Review" referrerPolicy="no-referrer" />
                <img className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Staff Engineer Review" referrerPolicy="no-referrer" />
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 text-center sm:text-left">
                Join <strong className="text-indigo-600 dark:text-indigo-400">10,000+ job seekers</strong> who improved their resumes.
              </span>
            </div>
          </div>

          {/* Right Column Illustration Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors duration-300"
            >
              {/* Glowing decorative rings */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>

              {/* Floating score pill */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 font-bold text-sm">
                  82%
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ATS Score</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">Ready to Apply</div>
                </div>
              </div>

              {/* Header inside mockup */}
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Software_Engineer_Resume.pdf</h4>
                  <p className="text-xs text-slate-400">Uploaded 2 mins ago &bull; 2.4 MB</p>
                </div>
              </div>

              {/* Simulated insights content */}
              <div className="py-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <span>Critical Keywords</span>
                    <span className="text-indigo-600 dark:text-indigo-400">4 / 8 Found</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">React</span>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">Node.js</span>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/40">Kubernetes</span>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">Python</span>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/40">GraphQL</span>
                  </div>
                </div>

                {/* Score bar */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <span>Job match evaluation</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">Good Match (75%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                {/* Quality list bullet */}
                <div className="p-3.5 rounded-xl bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-50 dark:border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Before & After optimization active:</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 italic">
                    &quot;Developed 12 responsive dashboards, boosting retention by 25%.&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Block */}
      <section className="bg-white/80 dark:bg-slate-900/40 py-10 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Created in compliance with the hiring standards at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-60 dark:opacity-40">
            <span className="font-sans font-bold text-lg sm:text-xl text-slate-600 dark:text-white">Google</span>
            <span className="font-sans font-bold text-lg sm:text-xl text-slate-600 dark:text-white">Microsoft</span>
            <span className="font-sans font-bold text-lg sm:text-xl text-slate-600 dark:text-white">Amazon</span>
            <span className="font-sans font-bold text-lg sm:text-xl text-slate-600 dark:text-white">Tesla</span>
            <span className="font-sans font-bold text-lg sm:text-xl text-slate-600 dark:text-white">Airbnb</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 scroll-mt-16 bg-white dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Powerful Features to Boost Your Resume
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Everything you need to scan, evaluate, and transform your resume into an interview magnet.
            </p>
          </div>

          {/* Features Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* ATS Score */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">ATS Score Checker</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Determine exactly how modern Applicant Tracking Systems rate your layout, headers, and professional structural syntax.
              </p>
            </div>

            {/* Skill Gap Detection */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Skill Gap Detection</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Identify system differences between your listed technological competencies and the actual requirements of target job description parameters.
              </p>
            </div>

            {/* Keyword Optimization */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Keyword Optimization</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Map essential industry-specific search keywords. Check which high-relevance phrases are present and which are missing completely.
              </p>
            </div>

            {/* Resume Feedback */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Structure & Quality Feedback</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Get distinct, clean breakdown cards of your resume&apos;s architectural strengths and formatting weakness bottlenecks.
              </p>
            </div>

            {/* Job Matching */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Role Job Matching</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Compare your overall competency scores specifically mapped against individual key roles such as Software, PM, Data, design, and growth.
              </p>
            </div>

            {/* AI Recommendations */}
            <div className="group p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Quantifiable Recommendations</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Receive instant before-and-after formatting copy improvements to frame simple tasks with highly impressive metric counts.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 sm:py-32 bg-slate-100 dark:bg-slate-900/40 scroll-mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">How It Works</h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Four simple, automated steps that go from quick upload to professional job search readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Upload Resume</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Drag and drop your resume file in PDF or Word (DOCX) format up to 10MB into our analyzer.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">AI Analysis</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Our scanning system assesses formatting, identifies technical words, and evaluates bullet metrics rules.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Get Insights</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Review your final ATS Compatibility, Quality Scores, keyword matches, and strengths instantly.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                4
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Improve & Apply</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Apply suggested wording changes to optimize your CV and submit to your target application pipelines with high confidence.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 sm:py-32 bg-white dark:bg-slate-950 scroll-mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              What Our Users Say
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Discover how candidates utilized ResumeIQ to unlock tech interviews and job offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between shadow-sm">
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 italic mb-6 leading-relaxed">
                &quot;ResumeIQ completely changed my job hunting lifecycle. My ATS score started at a low 45. After applying the dynamic bullet suggestions, I boosted it to 82% and landed three recruiter screens in my very first week.&quot;
              </p>
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover border border-slate-200" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Sarah Johnson" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">Sarah Johnson</h5>
                  <p className="text-xs text-slate-500">Software Engineer @ Stripe</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between shadow-sm">
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 italic mb-6 leading-relaxed">
                &quot;The keyword gap analyzer has to be the best tool ever made for tech applications. It instantly showed me that my Product Manager resume lacked terms like &quot;roadmap velocity&quot; or &quot;user stories&quot;. Incredible accuracy.&quot;
              </p>
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover border border-slate-200" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80" alt="Michael Chen" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">Michael Chen</h5>
                  <p className="text-xs text-slate-500">Lead Senior Product Manager</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between shadow-sm">
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 italic mb-6 leading-relaxed">
                &quot;The before-and-after templates alone are worth every penny of a subscription. Seeing passive phrases replaced with highly impressive quantifiable metrics is like having a resume review agency on your desktop.&quot;
              </p>
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover border border-slate-200" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Emily Davis" referrerPolicy="no-referrer" />
                <div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">Emily Davis</h5>
                  <p className="text-xs text-slate-500">Senior Data Analyst @ Netflix</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section (Static Only) */}
      <section id="pricing" className="py-24 sm:py-32 bg-slate-100 dark:bg-slate-900/30 scroll-mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Affordable Pricing Plans</h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Select the option that matches your career search scale. No hidden fees. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Free Plan */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-8 relative">
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Free Starter</div>
                <div className="flex items-baseline text-slate-900 dark:text-white">
                  <span className="text-4xl font-extrabold">$0</span>
                  <span className="text-xs text-slate-400 ml-1">/forever</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                  Best for a quick initial health check of your current active resume version.
                </p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-450">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Basic Score Assessment</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Identify 2 crucial keywords</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Single resume scanning</div>
                  <div className="flex items-center gap-2 text-slate-400"><CheckCircle2 className="w-4 h-4 text-slate-300 dark:text-slate-800" /> Detailed before & after suggestions</div>
                </div>
              </div>
              <button onClick={onAnalyzeResume} className="w-full py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition active:scale-97 cursor-pointer">
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-indigo-600 dark:border-indigo-500 shadow-xl flex flex-col justify-between space-y-8 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3.5 py-1 rounded-full text-2xs font-extrabold uppercase tracking-widest leading-none">
                Most Popular
              </div>
              
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Pro Career</div>
                <div className="flex items-baseline text-slate-900 dark:text-white">
                  <span className="text-4xl font-extrabold">$19</span>
                  <span className="text-xs text-slate-400 ml-1">/month</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                  Ideal for active applicants applying to highly competitive tech roles.
                </p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-450">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% full ATS Score checker</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Complete Skills Gap Analyzer</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Unlimited resume scans & history</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> All Before & After copy templates</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom role job-match rating</div>
                </div>
              </div>
              
              <button onClick={onAnalyzeResume} className="w-full py-3 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition active:scale-97 cursor-pointer">
                Unlock Pro Access
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/60 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-8 relative">
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Enterprise / Coach</div>
                <div className="flex items-baseline text-slate-900 dark:text-white">
                  <span className="text-4xl font-extrabold">$89</span>
                  <span className="text-xs text-slate-400 ml-1">/month</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                  Tailored for universities, career coaches, and recruitment firms.
                </p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-450">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Everything inside the Pro tier</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-seat login structures (10 seats)</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> PDF report exports & downloads</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Priority developer support access</div>
                </div>
              </div>
              <button onClick={onAnalyzeResume} className="w-full py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition active:scale-97 cursor-pointer">
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800/80 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <ResumeIQLogo size="sm" showText={true} />
            <p className="text-xs leading-relaxed max-w-sm">
              Helping modern software teams and job applicants match skills, pass automated vetting filters, and get hired cleanly.
            </p>
          </div>

          <div>
            <h6 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">Product</h6>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <li><a href="#features" className="hover:text-indigo-600 transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-indigo-600 transition">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-indigo-600 transition">Pricing Plans</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">Resources</h6>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <li><span className="cursor-default hover:text-indigo-600 transition">Career Blog</span></li>
              <li><span className="cursor-default hover:text-indigo-600 transition font-medium">ATS Help Center</span></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-4">Company</h6>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
              <li><span className="cursor-default hover:text-indigo-600 transition">Privacy Policy</span></li>
              <li><span className="cursor-default hover:text-indigo-600 transition font-medium">Terms of Service</span></li>
              <li><span className="cursor-default hover:text-indigo-600 transition">Contact Support</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-100 dark:border-slate-900 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} ResumeIQ Corporation. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
