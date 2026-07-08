import React, { useState, useEffect } from 'react';
import { 
  FileText, History, User, Settings as SettingsIcon, LineChart, 
  Moon, Sun, HelpCircle, LucideIcon, Sparkles, BookOpen, LogOut,
  X, Copy, Check, Download, Printer, ExternalLink
} from 'lucide-react';
import { ResumeAnalysis } from './types';
import { generateMockAnalysis } from './data';
import AnalysisView from './components/AnalysisView';
import DashboardView from './components/DashboardView';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';
import HomeLandingView from './components/HomeLandingView';
import ResumeIQLogo from './components/ResumeIQLogo';

export default function App() {
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string; bio: string; location: string } | null>(null);
  const [view, setView] = useState<'dashboard' | 'analyze' | 'profile' | 'settings'>('dashboard');
  const [scans, setScans] = useState<ResumeAnalysis[]>([]);
  const [selectedScan, setSelectedScan] = useState<ResumeAnalysis | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  // Load active session status on mounting
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('theme') === 'dark';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const savedUserStr = localStorage.getItem('resume_user');
    if (savedUserStr) {
      try {
        const parsedUser = JSON.parse(savedUserStr);
        setCurrentUser(parsedUser);
        
        // Load scans specific to this logged in email profile
        const userScansKey = `resume_scans_${parsedUser.email}`;
        const savedScans = localStorage.getItem(userScansKey);
        if (savedScans) {
          const parsedScans = JSON.parse(savedScans);
          setScans(parsedScans);
          if (parsedScans.length > 0) {
            setSelectedScan(parsedScans[0]);
          }
        } else {
          // Initialize empty profile as requested by user
          setScans([]);
          setSelectedScan(null);
        }
      } catch (err) {
        console.error('Failed to parse saved user credentials:', err);
      }
    }
  }, []);

  // Update theme helper
  const handleToggleDarkMode = () => {
    const newVal = !isDarkMode;
    setIsDarkMode(newVal);
    if (newVal) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Login handler
  const handleLogin = (user: { name: string; email: string; role: string; bio: string; location: string }) => {
    setCurrentUser(user);
    localStorage.setItem('resume_user', JSON.stringify(user));
    
    // Load this specific user's saved scans
    const userScansKey = `resume_scans_${user.email}`;
    const savedScans = localStorage.getItem(userScansKey);
    if (savedScans) {
      const parsedScans = JSON.parse(savedScans);
      setScans(parsedScans);
      if (parsedScans.length > 0) {
        setSelectedScan(parsedScans[0]);
      } else {
        setSelectedScan(null);
      }
    } else {
      // Clean starting empty profile for the authenticated profile!
      setScans([]);
      setSelectedScan(null);
    }
    setView('dashboard');
  };

  // Logout handler 
  const handleLogout = () => {
    localStorage.removeItem('resume_user');
    setCurrentUser(null);
    setScans([]);
    setSelectedScan(null);
    setView('dashboard');
  };

  // Profile fields updates
  const handleUpdateProfile = (updatedFields: { name: string; role: string; bio: string; location: string }) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedFields };
    setCurrentUser(updatedUser);
    localStorage.setItem('resume_user', JSON.stringify(updatedUser));

    // Also update in registered_users database
    const registeredUsers = localStorage.getItem('registered_users');
    if (registeredUsers) {
      try {
        const parsedUsers = JSON.parse(registeredUsers);
        if (parsedUsers[currentUser.email]) {
          parsedUsers[currentUser.email] = { ...parsedUsers[currentUser.email], ...updatedFields };
          localStorage.setItem('registered_users', JSON.stringify(parsedUsers));
        }
      } catch (e) {
        console.error('Error updating registered users list:', e);
      }
    }
  };

  // State update handlers
  const handleAddAnalysis = (newAnalysis: ResumeAnalysis) => {
    if (!currentUser) return;
    const updated = [newAnalysis, ...scans];
    setScans(updated);
    setSelectedScan(newAnalysis);
    setView('dashboard');

    // Save with user-specific isolation prefix
    const userScansKey = `resume_scans_${currentUser.email}`;
    localStorage.setItem(userScansKey, JSON.stringify(updated));
  };

  const handleClearScans = () => {
    if (!currentUser) return;
    setScans([]);
    setSelectedScan(null);
    
    const userScansKey = `resume_scans_${currentUser.email}`;
    localStorage.removeItem(userScansKey);
  };

  const getReportHtmlString = (selectedScan: ResumeAnalysis) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ResumeIQ ATS Report - ${selectedScan.fileName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
    body {
      font-family: 'Inter', sans-serif;
      color: #18181b;
      background: #ffffff;
      margin: 1.5cm;
      line-height: 1.5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      border-bottom: 4px solid #181c24;
      padding-bottom: 20px;
      margin-bottom: 25px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .logo {
      font-size: 24px;
      font-weight: 900;
      color: #1e1b4b;
    }
    .logo-dot {
      color: #06b6d4;
    }
    .report-title {
      font-size: 20px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.5px;
      margin: 0 0 4px 0;
    }
    .report-subtitle {
      font-size: 10px;
      color: #71717a;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 2px;
      margin: 0;
    }
    .date-badge {
      font-size: 10px;
      color: #a1a1aa;
      font-family: 'JetBrains Mono', monospace;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      background: #f4f4f5;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 25px;
    }
    .metadata-label {
      font-size: 9px;
      font-weight: 900;
      text-transform: uppercase;
      color: #71717a;
      letter-spacing: 1px;
    }
    .metadata-val {
      font-size: 13px;
      font-weight: 700;
      margin: 4px 0 0 0;
    }
    .metadata-sub {
      font-size: 10px;
      color: #71717a;
      margin: 2px 0 0 0;
    }
    .section-title {
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #71717a;
      border-bottom: 1px solid #e4e4e7;
      padding-bottom: 4px;
      margin: 30px 0 15px 0;
    }
    .scores-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    .score-card {
      border: 1px solid #e4e4e7;
      padding: 15px;
      text-align: center;
      border-radius: 8px;
    }
    .score-card-title {
      font-size: 9px;
      text-transform: uppercase;
      font-weight: 900;
      color: #71717a;
    }
    .score-card-val {
      font-size: 32px;
      font-weight: 900;
      margin: 8px 0;
      font-family: 'JetBrains Mono', monospace;
    }
    .score-emerald { color: #06b6d4; }
    .score-sky { color: #0284c7; }
    .score-purple { color: #7c3aed; }
    .score-desc {
      font-size: 9px;
      color: #71717a;
    }
    .flex-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    .bullet-section-title {
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      padding-bottom: 4px;
      margin-bottom: 15px;
    }
    .title-emerald {
      color: #0d9488;
      border-bottom: 2px solid #06b6d4;
    }
    .title-orange {
      color: #c2410c;
      border-bottom: 2px solid #f97316;
    }
    .bullet-item {
      border-left: 2px solid #e4e4e7;
      padding-left: 12px;
      margin-bottom: 12px;
    }
    .bullet-item-emerald { border-left-color: #06b6d4; }
    .bullet-item-orange { border-left-color: #f97316; }
    .bullet-title {
      font-size: 12px;
      font-weight: 900;
      margin: 0 0 2px 0;
    }
    .bullet-desc {
      font-size: 11px;
      color: #52525b;
      margin: 0;
    }
    .badge-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .badge {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: 700;
    }
    .badge-zinc {
      background: #e4e4e7;
      color: #27272a;
      border: 1px solid #d4d4d8;
    }
    .badge-red {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
    .table-container {
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }
    th {
      background: #f4f4f5;
      font-weight: 900;
      color: #71717a;
      text-align: left;
      padding: 8px 12px;
      border-bottom: 1px solid #e4e4e7;
      font-family: 'JetBrains Mono', monospace;
    }
    td {
      padding: 8px 12px;
      border-bottom: 1px solid #e4e4e7;
    }
    .tr-kw {
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
    }
    .status-found {
      background: #d1fae5;
      color: #065f46;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 8px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .status-omitted {
      background: #fee2e2;
      color: #991b1b;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 8px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .priority-pill {
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 8px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .prio-high { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .prio-medium { background: #fff7ed; color: #9a3412; border: 1px solid #ffedd5; }
    .prio-low { background: #eff6ff; color: #1e40af; border: 1px solid #dbeafe; }
    
    .recommendation-card {
      border: 1px solid #e4e4e7;
      background: #fafafa;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
    }
    .rec-top {
      display: flex;
      justify-content: space-between;
      font-size: 8px;
      font-weight: 900;
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 8px;
    }
    .rec-item-title {
      font-size: 11px;
      font-weight: 900;
      margin-bottom: 2px;
    }
    .rec-issue {
      font-style: italic;
      color: #71717a;
      margin: 0;
      font-size: 10px;
    }
    .rec-remedy {
      color: #047857;
      font-weight: 700;
      font-size: 11px;
      margin: 8px 0 0 0;
    }
    .wording-card {
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      margin-bottom: 10px;
      font-size: 10px;
    }
    .wording-header {
      background: #f4f4f5;
      padding: 6px 12px;
      font-weight: 900;
      color: #71717a;
      border-bottom: 1px solid #e4e4e7;
      font-family: 'JetBrains Mono', monospace;
    }
    .wording-body {
      padding: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    .wording-title-label {
      font-size: 8px;
      font-weight: 900;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .text-before { color: #b91c1c; border-left: 2px solid #fca5a5; padding-left: 8px; margin: 0; font-style: italic; }
    .text-after { color: #047857; border-left: 2px solid #34d399; padding-left: 8px; margin: 0; font-weight: 700; background: #f0fdf4; padding: 6px; border-radius: 4px; }
    
    .footer {
      border-top: 1px solid #e4e4e7;
      padding-top: 20px;
      text-align: center;
      font-size: 9px;
      color: #a1a1aa;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 1.5px;
      margin-top: 40px;
    }
    .page-break {
      page-break-after: always;
      break-after: page;
    }
    @media print {
      body { margin: 1cm; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div>
        <h1 class="report-title">RESUME COMPREHENSIVE ATS SEGMENT ASSESSMENT REPORT</h1>
        <p class="report-subtitle">ATS PARSING ENGINE ASSESSMENT ANALYSIS &bull; SECURED DOCUMENT PREVIEW</p>
      </div>
      <div style="text-align: right;">
        <span class="logo">Resume<span class="logo-dot">IQ</span></span>
        <p class="date-badge" style="margin: 4px 0 0 0;">DATE PROTOCOL: ${selectedScan.date}</p>
      </div>
    </div>

    <!-- Metadata Grid -->
    <div class="grid-2">
      <div>
        <span class="metadata-label">Analyzed Resource</span>
        <p class="metadata-val">${selectedScan.fileName}</p>
        <p class="metadata-sub">FILE PROFILE SIZE: ${selectedScan.fileSize || 'N/A'}</p>
      </div>
      <div style="border-left: 1px solid #e4e4e7; padding-left: 20px;">
        <span class="metadata-label">Target Application Metrics</span>
        <p class="metadata-val">${selectedScan.targetJobTitle}</p>
        <p class="metadata-sub" style="color: #059669; font-weight: 700;">${selectedScan.experienceLevel}</p>
      </div>
    </div>

    <!-- Executive Performance Measures -->
    <div class="section-title">EXECUTIVE PERFORMANCE MEASURES</div>
    <div class="scores-container">
      <div class="score-card">
        <span class="score-card-title">ATS Parsing Score</span>
        <div class="score-card-val score-emerald">${selectedScan.atsScore}%</div>
        <span class="score-desc">Compliance index across target recruitment screens</span>
      </div>
      <div class="score-card">
        <span class="score-card-title">Layout Integrity</span>
        <div class="score-card-val score-sky">${selectedScan.qualityScore}%</div>
        <span class="score-desc">Structural layout orderliness and font consistency</span>
      </div>
      <div class="score-card">
        <span class="score-card-title">Target Job Match</span>
        <div class="score-card-val score-purple">${selectedScan.jobMatchScore}%</div>
        <span class="score-desc">Relevance alignment with baseline job role duties</span>
      </div>
    </div>

    <!-- Strengths and Weaknesses -->
    <div style="margin-top: 30px;" class="flex-grid">
      <div>
        <div class="bullet-section-title title-emerald">✓ KEY COMPLIANCE STRENGTHS</div>
        ${selectedScan.strengths?.map(str => `
          <div class="bullet-item bullet-item-emerald">
            <h5 class="bullet-title">${str.title}</h5>
            <p class="bullet-desc">${str.description}</p>
          </div>
        `).join('') || '<p style="font-size: 11px; color: #71717a;">No major strengths detected.</p>'}
      </div>
      <div>
        <div class="bullet-section-title title-orange">⚠ DETECTED FORMATTING & FORMAT FLAWS</div>
         ${selectedScan.weaknesses?.map(wk => `
          <div class="bullet-item bullet-item-orange">
            <h5 class="bullet-title">${wk.title}</h5>
            <p class="bullet-desc">${wk.description}</p>
          </div>
        `).join('') || '<p style="font-size: 11px; color: #71717a;">No critical flaws highlighted.</p>'}
      </div>
    </div>

    <!-- Page Break -->
    <div class="page-break"></div>

    <!-- Section B -->
    <div class="header" style="margin-top: 0;">
      <div>
        <h1 class="report-title" style="font-size: 18px;">SECTION B: KEYWORD GAP & COMPETENCY ANALYSIS</h1>
        <p class="report-subtitle">COMPREHENSIVE LEXICAL AUDIT</p>
      </div>
      <span class="date-badge">Page 2 of 3</span>
    </div>

    <!-- Skills badges lists -->
    <div class="flex-grid">
      <div>
        <span class="metadata-label" style="display: block; margin-bottom: 10px;">Identified Competencies Checklist</span>
        <div class="badge-container">
          ${selectedScan.detectedSkills?.map(s => `<span class="badge badge-zinc">${s}</span>`).join('') || '<span style="font-size: 11px; color: #71717a;">None detected</span>'}
        </div>
      </div>
      <div>
        <span class="metadata-label" style="display: block; margin-bottom: 10px; color: #b91c1c;">Missing Vital Target Criteria</span>
        <div class="badge-container">
          ${selectedScan.missingSkills?.map(s => `<span class="badge badge-red">${s}</span>`).join('') || '<span style="font-size: 11px; color: #71717a;">None specified</span>'}
        </div>
      </div>
    </div>

    <!-- Keyword list table -->
    <div class="section-title">Linguistic Keyword Audit Ledger</div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Criteria Core Keyword</th>
            <th>Assessment Status</th>
            <th style="text-align: right;">Job Relevance Level</th>
          </tr>
        </thead>
        <tbody>
          ${selectedScan.keywords?.map(kw => `
            <tr>
              <td class="tr-kw">${kw.keyword}</td>
              <td>
                <span class="${kw.found ? 'status-found' : 'status-omitted'}">${kw.found ? 'Found' : 'Omitted'}</span>
              </td>
              <td style="text-align: right;">
                <span class="priority-pill ${kw.importance === 'High' ? 'prio-high' : kw.importance === 'Medium' ? 'prio-medium' : 'prio-low'}">${kw.importance} Priority</span>
              </td>
            </tr>
          `).join('') || '<tr><td colspan="3">No keywords specified</td></tr>'}
        </tbody>
      </table>
    </div>

    <!-- Page Break -->
    <div class="page-break"></div>

    <!-- Section C -->
    <div class="header" style="margin-top: 0;">
      <div>
        <h1 class="report-title" style="font-size: 18px;">SECTION C: PRESCRIBED ACTION PROTOCOL & WORDING OPTIMIZER</h1>
        <p class="report-subtitle">SYSTEM ROADMAP & ACTIVE VERB CONVERSION</p>
      </div>
      <span class="date-badge">Page 3 of 3</span>
    </div>

    <!-- Recommendations Roadmap -->
    <div class="section-title" style="margin-top: 0;">Optimization Steps Priority Roadmap</div>
    ${selectedScan.recommendations?.map(rec => `
      <div class="recommendation-card">
        <div class="rec-top">
          <span class="priority-pill ${rec.priority === 'High' ? 'prio-high' : 'prio-medium'}">${rec.priority} PRIORITY ROADMAP</span>
          <span style="color: #059669;">Expected Impact Value: ${rec.expectedImpact}</span>
        </div>
        <div class="rec-item-title">Diagnosed ATS Obstacle:</div>
        <p class="rec-issue">"${rec.issue}"</p>
        <div class="rec-item-title" style="margin-top: 10px; color: #047857;">Prescribed Remedy Optimization Step:</div>
        <p class="rec-remedy">${rec.recommendation}</p>
      </div>
    `).join('') || '<p style="font-size: 11px; color: #71717a;">No specific recommendations</p>'}

    <!-- Wording suggestions -->
    <div class="section-title">Active-Verb Sentence Conversion Log</div>
    ${selectedScan.suggestions?.map(sug => `
      <div class="wording-card">
        <div class="wording-header">Target Category Ref: ${sug.description}</div>
        <div class="wording-body">
          <div>
            <div class="wording-title-label" style="color: #b91c1c;">Before / Basic Bullet Statement</div>
            <p class="text-before">"${sug.before}"</p>
          </div>
          <div>
            <div class="wording-title-label" style="color: #059669;">After / Quantified Corporate Alignment</div>
            <p class="text-after">"${sug.after}"</p>
          </div>
        </div>
      </div>
    `).join('') || '<p style="font-size: 11px; color: #71717a;">No wording suggestions</p>'}

    <!-- Footer -->
    <div class="footer">
      END OF REPORT • COMPILATION CRITERIA 100% ASSESSED VIA RESUMEAI PIPELINE 2026
    </div>
  </div>

  <script>
    // Automatically trigger browser print prompt on page build load
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 350);
    }
  </script>
</body>
</html>`;
  };

  const handlePrintReport = () => {
    setShowExportModal(true);
  };

  // If the user is logged out, show the gorgeous Home and Authentication Landing Page
  if (!currentUser) {
    return <HomeLandingView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Navigation Top Header Bar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-8 py-3.5 flex justify-between items-center gap-4">
        
        {/* Brand Left Header Block */}
        <div className="flex items-center gap-2.5">
          <ResumeIQLogo size="sm" showText={true} />
        </div>

        {/* Tab Items Menu */}
        <div className="flex items-center gap-1.5">
          <nav className="hidden sm:flex items-center gap-1.5 border-r border-zinc-200/60 dark:border-zinc-800 pr-4 mr-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LineChart },
              { id: 'analyze', label: 'Scan Resume', icon: Sparkles },
              { id: 'profile', label: 'User Profile', icon: User },
              { id: 'settings', label: 'Preferences', icon: SettingsIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    view === tab.id
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" /> {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Quick theme toggler button */}
          <button 
            onClick={handleToggleDarkMode}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-emerald-500" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          {/* Safe logout control button */}
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl border border-red-200 dark:border-red-900/20 bg-red-50/5 hover:bg-red-50/10 dark:hover:bg-red-950/20 text-red-500 dark:text-red-400 transition-colors font-semibold text-xs flex items-center gap-1 cursor-pointer"
            title="Secure Logout"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden md:inline font-bold">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Body Layout content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-16">
        {view === 'dashboard' && (
          <DashboardView 
            scans={scans}
            selectedScan={selectedScan}
            onSelectScan={setSelectedScan}
            onClearScans={handleClearScans}
            onNavigateToScan={() => setView('analyze')}
            onPrintReport={handlePrintReport}
          />
        )}
        {view === 'analyze' && (
          <AnalysisView 
            onAddAnalysis={handleAddAnalysis}
            latestScan={selectedScan}
            onPrintReport={handlePrintReport}
          />
        )}
        {view === 'profile' && (
          <ProfileView 
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
            scans={scans}
            onNavigateToScan={() => setView('analyze')}
          />
        )}
        {view === 'settings' && (
          <SettingsView 
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        )}
      </main>

      {/* Responsive mobile bottom tab navigator */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200/80 dark:border-zinc-805/80 px-4 py-2 flex justify-around">
        {[
          { id: 'dashboard', label: 'History', icon: LineChart },
          { id: 'analyze', label: 'Scan', icon: Sparkles },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'settings', label: 'Settings', icon: SettingsIcon }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-semibold cursor-pointer ${
                view === tab.id
                  ? 'text-emerald-600 dark:text-emerald-450 font-bold'
                  : 'text-zinc-400 dark:text-zinc-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tiny clean professional footer */}
      <footer className="py-6 border-t border-zinc-200/50 dark:border-zinc-900 px-4 bg-white/10 text-center text-[11px] text-zinc-400 font-mono tracking-tight pb-14 sm:pb-8">
        RESUMEAI • WORKSPACE RUN TIME 2026
      </footer>

      {/* Hidden printable PDF summary element */}
      {selectedScan && (
        <div id="print-section" className="bg-white text-zinc-900 font-sans p-8 max-w-4xl mx-auto space-y-8">
          {/* Cover Header */}
          <div className="border-b-4 border-zinc-900 pb-5 mb-5 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900">RESUME COMPREHENSIVE ATS SEGMENT ASSESSMENT REPORT</h1>
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">ATS PARSING ENGINE ASSESSMENT ANALYSIS • SECURED DOCUMENT PREVIEW</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-lg font-black font-sans tracking-tight bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-600 bg-clip-text text-transparent dark:from-teal-400 dark:via-sky-400 dark:to-indigo-400 block">ResumeIQ</span>
              <span className="text-[9px] text-zinc-400 font-mono block">DATE PROTOCOL: {selectedScan.date}</span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-6 bg-zinc-50 p-4 border border-zinc-200 rounded-lg">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block">Analyzed Resource</span>
              <p className="text-xs font-bold text-zinc-900 truncate">{selectedScan.fileName}</p>
              <p className="text-[10px] text-zinc-400 font-mono">FILE PROFILE SIZE: {selectedScan.fileSize}</p>
            </div>
            <div className="space-y-1 border-l border-zinc-200 pl-6">
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block">Target Application Metrics</span>
              <p className="text-xs font-bold text-zinc-900">{selectedScan.targetJobTitle}</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{selectedScan.experienceLevel}</p>
            </div>
          </div>

          {/* Quantitative Score Metrics Card Section */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-zinc-400 border-b border-zinc-200 pb-1">EXECUTIVE PERFORMANCE MEASURES</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border border-zinc-300 text-center rounded-lg bg-zinc-50/20">
                <span className="block text-[9px] uppercase font-black text-zinc-400 tracking-wider">ATS Parsing Score</span>
                <span className="block text-3xl font-black text-emerald-600 font-mono my-1">{selectedScan.atsScore}%</span>
                <span className="block text-[9px] text-zinc-500 leading-normal">Compliance index across target recruitment screens</span>
              </div>
              <div className="p-4 border border-zinc-300 text-center rounded-lg bg-zinc-50/20">
                <span className="block text-[9px] uppercase font-black text-zinc-400 tracking-wider">Layout Integrity</span>
                <span className="block text-3xl font-black text-sky-600 font-mono my-1">{selectedScan.qualityScore}%</span>
                <span className="block text-[9px] text-zinc-500 leading-normal">Structural layout orderliness and font consistency</span>
              </div>
              <div className="p-4 border border-zinc-300 text-center rounded-lg bg-zinc-50/20">
                <span className="block text-[9px] uppercase font-black text-zinc-400 tracking-wider">Target Job Match</span>
                <span className="block text-3xl font-black text-purple-600 font-mono my-1">{selectedScan.jobMatchScore}%</span>
                <span className="block text-[9px] text-zinc-500 leading-normal">Relevance alignment with baseline job role duties</span>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses Panel */}
          <div className="grid grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase text-teal-700 tracking-wider border-b-2 border-teal-600 pb-1">
                ✓ KEY COMPLIANCE STRENGTHS
              </h4>
              <div className="space-y-3">
                {selectedScan.strengths?.map((str, idx) => (
                  <div key={idx} className="border-l-2 border-teal-500 pl-3">
                    <p className="text-xs font-black text-zinc-900">{str.title}</p>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-0.5 font-medium">{str.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase text-orange-700 tracking-wider border-b-2 border-orange-500 pb-1">
                ⚠ DETECTED FORMATTING & FORMAT FLAWS
              </h4>
              <div className="space-y-3">
                {selectedScan.weaknesses?.map((wk, idx) => (
                  <div key={idx} className="border-l-2 border-orange-500 pl-3">
                    <p className="text-xs font-black text-zinc-900">{wk.title}</p>
                    <p className="text-[11px] text-zinc-500 leading-normal mt-0.5 font-medium">{wk.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Force page break for page 2 */}
          <div className="page-break"></div>

          {/* Page 2 Cover Elements */}
          <div className="border-b-4 border-zinc-900 pb-2 mb-4 flex justify-between items-end">
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">SECTION B: KEYWORD GAP & COMPETENCY ANALYSIS</h2>
              <p className="text-[9px] text-zinc-500 font-mono tracking-wider">COMPREHENSIVE LEXICAL AUDIT</p>
            </div>
            <span className="text-[9px] text-zinc-400 font-mono">Page 2 of 3</span>
          </div>

          {/* Competency Gap Badges Map */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg space-y-2">
              <span className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">Identified Competencies Checklist</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedScan.detectedSkills?.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-zinc-200 text-zinc-800 rounded text-[9px] font-bold font-mono border border-zinc-300 font-sans">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 bg-red-50/20 border border-red-150 rounded-lg space-y-2">
              <span className="block text-[10px] font-black text-red-700 uppercase tracking-widest">Missing Vital Target Criteria</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedScan.missingSkills?.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-red-50 text-red-800 rounded text-[9px] font-bold font-mono border border-red-200 font-sans">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Keyword Match Matrix Table */}
          <div className="space-y-3 pt-4">
            <span className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest border-l-2 border-zinc-900 pl-2">Linguistic Keyword Audit Ledger</span>
            <div className="border border-zinc-300 rounded-lg overflow-hidden overflow-x-auto w-full">
              <table className="w-full min-w-[540px] text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-zinc-100 text-zinc-500 border-b border-zinc-300 font-black">
                    <th className="p-2.5 font-bold uppercase tracking-wider">Criteria Core Keyword</th>
                    <th className="p-2.5 font-bold uppercase tracking-wider">Assessment Status</th>
                    <th className="p-2.5 font-bold uppercase tracking-wider text-right">Job Relevance Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-medium">
                  {selectedScan.keywords?.map((kw, idx) => (
                    <tr key={idx} className="text-zinc-700">
                      <td className="p-2.5 font-black font-mono text-zinc-900">{kw.keyword}</td>
                      <td className="p-2.5">
                        {kw.found ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black bg-teal-50 text-teal-800 border border-teal-200 uppercase font-mono">
                            Found
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-black bg-red-100 text-red-800 border border-red-200 uppercase font-mono">
                            Omitted
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-black border uppercase font-mono ${
                          kw.importance === 'High' 
                            ? 'bg-red-50 text-red-800 border-red-200' 
                            : kw.importance === 'Medium' 
                              ? 'bg-orange-50 text-orange-850 border-orange-200'
                              : 'bg-blue-50 text-blue-800 border-blue-200'
                        }`}>
                          {kw.importance} Priority
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Force page break for page 3 */}
          <div className="page-break"></div>

          {/* Page 3 Cover Elements */}
          <div className="border-b-4 border-zinc-900 pb-2 mb-4 flex justify-between items-end">
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">SECTION C: PRESCRIBED ACTION PROTOCOL & WORDING OPTIMIZER</h2>
              <p className="text-[9px] text-zinc-500 font-mono tracking-wider">SYSTEM ROADMAP & ACTIVE VERB CONVERSION</p>
            </div>
            <span className="text-[9px] text-zinc-400 font-mono">Page 3 of 3</span>
          </div>

          {/* Action Roadmap */}
          <div className="space-y-4">
            <span className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest border-l-2 border-zinc-900 pl-2">Optimization Steps Priority Roadmap</span>
            <div className="space-y-4">
              {selectedScan.recommendations?.map((rec, idx) => (
                <div key={idx} className="p-4 border border-zinc-200 rounded-lg space-y-2 bg-zinc-50/50">
                  <div className="flex justify-between items-center text-[9px] font-black uppercase font-mono">
                    <span className={`px-2 py-0.5 rounded font-black ${
                      rec.priority === 'High' 
                        ? 'bg-red-105 text-red-800 border border-red-200' 
                        : 'bg-orange-105 text-orange-800 border border-orange-205'
                    }`}>
                      {rec.priority} PRIORITY ROADMAP
                    </span>
                    <span className="text-teal-600 dark:text-teal-400 font-black">
                      ★ Expected Impact Value: {rec.expectedImpact}
                    </span>
                  </div>
                  <div className="text-[11px] space-y-0.5">
                    <span className="font-black text-zinc-900 text-xs block">Diagnosed ATS Obstacle:</span>
                    <p className="text-zinc-500 leading-normal italic pl-2 border-l border-zinc-300 font-medium">{rec.issue}</p>
                  </div>
                  <div className="text-[11px] space-y-0.5 pt-1.5 border-t border-zinc-200">
                    <span className="font-black text-teal-600 dark:text-teal-400 text-xs block">Prescribed Remedy Optimization Step:</span>
                    <p className="text-zinc-800 leading-relaxed font-black">{rec.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantitative Wording Suggestions */}
          <div className="space-y-4 pt-4">
            <span className="block text-[11px] font-black text-zinc-400 uppercase tracking-widest border-l-2 border-zinc-900 pl-2">Active-Verb Sentence Conversion Log</span>
            <div className="space-y-3.5">
              {selectedScan.suggestions?.map((sug) => (
                <div key={sug.id} className="border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50/20 text-[10px]">
                  <div className="bg-zinc-100 px-3 py-1.5 border-b border-zinc-200 font-black uppercase text-[8px] text-zinc-500 font-mono tracking-wider">
                    Target Category Ref: {sug.description}
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[8px] font-mono font-black text-red-650 uppercase mb-1">Before / Basic Bullet Statement</span>
                      <p className="text-zinc-500 italic pl-2 border-l border-red-300 leading-relaxed font-medium">{sug.before}</p>
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono font-black text-sky-650 uppercase mb-1">After / Quantified Corporate Alignment</span>
                      <p className="text-zinc-800 font-black pl-2 border-l border-sky-500 leading-relaxed bg-sky-50/20 p-2 rounded-lg border border-sky-100/50 italic">
                        {sug.after}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Stamp block */}
          <div className="border-t border-zinc-300 pt-6 text-center text-[9px] text-zinc-400 font-mono tracking-widest uppercase">
            END OF REPORT • COMPILATION CRITERIA 100% ASSESSED VIA RESUMEIQ PIPELINE 2026
          </div>
        </div>
      )}

      {/* Export Report Modal Overlay Container */}
      {showExportModal && selectedScan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <div 
            className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm cursor-pointer" 
            onClick={() => setShowExportModal(false)}
          />
          
          {/* Modal Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative z-10 animate-fade-in transition-all">
            <button 
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-sky-105 dark:bg-sky-950/55 text-sky-600 dark:text-sky-450 rounded-xl">
                  <FileText className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">Export ATS Report</h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Select your preferred export method</p>
                </div>
              </div>

              {/* Sandboxed notice explanation */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/25 text-[11px] text-amber-800 dark:text-amber-400 rounded-xl border border-amber-250/30 dark:border-amber-900/15 leading-relaxed font-sans space-y-1.5">
                <p className="font-bold flex items-center gap-1">
                  ⚠️ Environment Notice
                </p>
                <p>
                  Inside sandboxed preview containers, direct file downloads are sometimes restricted by browser policies.
                </p>
                <p className="font-semibold">
                  <strong>Fix:</strong> Open standard app in a <strong>New Tab</strong> via the top-right button, or use the clipboard helper below!
                </p>
              </div>

              {/* Action buttons list */}
              <div className="space-y-2.5 pt-2">
                
                {/* 1. Download HTML button */}
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedScan) return;
                    const htmlCode = getReportHtmlString(selectedScan);
                    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `ResumeIQ_ATS_Report_${selectedScan.fileName.replace(/\.[^/.]+$/, "")}.html`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100/50 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-sky-500" />
                    <div className="text-left">
                      <span className="block text-xs font-bold text-zinc-900 dark:text-white group-hover:text-sky-500 transition-colors">Download Offline HTML</span>
                      <span className="block text-[10px] text-zinc-400">Self-contained styled report file</span>
                    </div>
                  </div>
                </button>

                {/* 2. Copy report HTML code button */}
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedScan) return;
                    const htmlCode = getReportHtmlString(selectedScan);
                    navigator.clipboard.writeText(htmlCode).then(() => {
                      setCopiedReport(true);
                      setTimeout(() => setCopiedReport(false), 2000);
                    });
                  }}
                  className="w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100/50 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {copiedReport ? <Check className="w-4 h-4 text-sky-400 animate-bounce" /> : <Copy className="w-4 h-4 text-sky-500" />}
                    <div className="text-left">
                      <span className="block text-xs font-bold text-zinc-900 dark:text-white group-hover:text-sky-500 transition-colors">
                        {copiedReport ? "Report Copied to Clipboard!" : "Copy Full Report HTML"}
                      </span>
                      <span className="block text-[10px] text-zinc-400">Copy & save anywhere locally as .html</span>
                    </div>
                  </div>
                </button>

                {/* 3. Open system print */}
                <button
                  type="button"
                  onClick={() => {
                    setShowExportModal(false);
                    setTimeout(() => {
                      try {
                        window.print();
                      } catch (e) {
                        console.warn(e);
                      }
                    }, 200);
                  }}
                  className="w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100/50 dark:bg-zinc-950 dark:hover:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Printer className="w-4 h-4 text-sky-500" />
                    <div className="text-left">
                      <span className="block text-xs font-bold text-zinc-900 dark:text-white group-hover:text-sky-500 transition-colors">Save as PDF / Print</span>
                      <span className="block text-[10px] text-zinc-400">Launch standard print options</span>
                    </div>
                  </div>
                </button>

              </div>
              
              <div className="text-center pt-2">
                <button 
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="text-[11px] font-bold text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  Close Export Portal
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
