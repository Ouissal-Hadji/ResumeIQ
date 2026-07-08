import React, { useState } from 'react';
import { 
  History, Calendar, FileText, Check, Copy, AlertCircle, 
  ArrowRight, FileBadge, CheckCircle, HelpCircle, Award, Target, Sparkles, AlertTriangle, ShieldCheck, RefreshCw, Layers, Plus, Download
} from 'lucide-react';
import { ResumeAnalysis } from '../types';

interface DashboardViewProps {
  scans: ResumeAnalysis[];
  selectedScan: ResumeAnalysis | null;
  onSelectScan: (scan: ResumeAnalysis) => void;
  onClearScans: () => void;
  onNavigateToScan: () => void;
  onPrintReport?: () => void;
}

export default function DashboardView({ scans, selectedScan, onSelectScan, onClearScans, onNavigateToScan, onPrintReport }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'recommendations' | 'wording'>('overview');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Aggregated analytics metrics
  const totalScans = scans.length;
  const averageAts = totalScans > 0 ? Math.round(scans.reduce((sum, s) => sum + s.atsScore, 0) / totalScans) : 0;
  const averageQuality = totalScans > 0 ? Math.round(scans.reduce((sum, s) => sum + s.qualityScore, 0) / totalScans) : 0;
  const averageMatch = totalScans > 0 ? Math.round(scans.reduce((sum, s) => sum + s.jobMatchScore, 0) / totalScans) : 0;

  // Let's check: if there are no scans, we show a gorgeous, inspiring onboarding container!
  if (totalScans === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-150/60 dark:border-neutral-800/85 rounded-3xl p-8 sm:p-12 text-center shadow-xl space-y-6 relative overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl" />
          
          <div className="relative max-w-xl mx-auto space-y-6 flex flex-col items-center">
            {/* Visual Header */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-800/80">
              <Layers className="w-3.5 h-3.5 text-sky-500" /> Landing Terminal Active
            </div>

            <div className="p-5 bg-sky-55 dark:bg-sky-950/30 rounded-3xl text-sky-600 dark:text-sky-400">
              <FileText className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-3xl font-sans">
                Welcome to Your Active ATS Workspace
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans">
                Your profile was created successfully and is initialized clean. To unlock advanced scoring analytics, keyword target maps, and side-by-side wording optimizations, please process your index CV document.
              </p>
            </div>

            {/* Quick Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full p-2.5">
              <div className="p-4 bg-neutral-50/50 dark:bg-neutral-950/40 rounded-2xl border border-neutral-100 dark:border-neutral-850 text-left space-y-1">
                <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">1. Score Vetting</p>
                <p className="text-[10px] text-neutral-400 leading-normal">Evaluates keyword density, layout orderliness, and formatting flaws.</p>
              </div>
              <div className="p-4 bg-neutral-50/50 dark:bg-neutral-950/40 rounded-2xl border border-neutral-100 dark:border-neutral-855 text-left space-y-1">
                <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">2. Missing Keywords</p>
                <p className="text-[10px] text-neutral-400 leading-normal font-sans">Uncovers target requirements omitted from your drafts.</p>
              </div>
              <div className="p-4 bg-neutral-50/50 dark:bg-neutral-950/40 rounded-2xl border border-neutral-100 dark:border-neutral-855 text-left space-y-1">
                <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">3. Wording Verbs</p>
                <p className="text-[10px] text-neutral-400 leading-normal">Transforms basic summaries into quantitative bullet achievements.</p>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="pt-2 w-full max-w-sm">
            <button
                onClick={onNavigateToScan}
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-indigo-600/10 flex items-center justify-center gap-1.5"
              >
                Scan or Paste Your CV <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-[10px] text-neutral-400 font-mono">
              PRESERVED LOCALLY & CRYPTOGRAPHICALLY SEPARATE PER USER
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Active dashboard view when scans exist
  return (
    <div className="space-y-6">
      
      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-neutral-400 dark:text-neutral-500 flex-shrink-0">
            <History className="w-5 h-5 text-sky-500" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Total Scans</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-white font-mono">{totalScans}</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-500 flex-shrink-0">
            <FileBadge className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Average ATS</p>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400 font-mono">{averageAts}%</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-500 flex-shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Quality score</p>
            <p className="text-2xl font-bold text-sky-600 dark:text-sky-400 font-mono">{averageQuality}%</p>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-xl flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500 flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Job match</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 font-mono">{averageMatch}%</p>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Historical Scans List */}
        <div className="col-span-1 lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-xl p-5 space-y-4">
          <div className="flex justify-between items-center pb-2.5 border-b border-neutral-50 dark:border-neutral-800/80">
            <h2 className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <History className="w-4 h-4 text-sky-500" /> Index CVs List
            </h2>
            <button 
              onClick={onClearScans}
              className="text-[10px] text-red-500 dark:text-red-405 hover:underline font-bold uppercase tracking-wider"
            >
              Reset History
            </button>
          </div>

          <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
            {scans.map((scan) => (
              <button
                key={scan.id}
                onClick={() => onSelectScan(scan)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex justify-between items-center gap-3 relative overflow-hidden ${
                  selectedScan?.id === scan.id
                    ? 'border-sky-500 bg-sky-50/10 dark:bg-sky-950/20'
                    : 'border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-800 bg-neutral-50/20 dark:bg-neutral-950/10'
                }`}
              >
                {selectedScan?.id === scan.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-500" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                    {scan.fileName}
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-0.5 truncate uppercase font-medium">
                    {scan.targetJobTitle} • {scan.experienceLevel}
                  </p>
                  <p className="text-[9px] text-neutral-400 mt-1 flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3" /> {scan.date}
                  </p>
                </div>
                
                <div className="flex-shrink-0 text-right space-y-0.5">
                  <span className="block text-xs font-bold font-mono text-sky-600 dark:text-sky-455">
                    {scan.atsScore}% Score
                  </span>
                  <span className="block text-[8px] text-slate-400 font-mono">
                    Match: {scan.jobMatchScore}%
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 bg-neutral-50/20 dark:bg-neutral-950/10 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
            <p className="text-[10px] text-neutral-400 leading-normal font-sans text-center">
              Want to calibrate another resume? Run a scan by pasting your text bio or document directly.
            </p>
            <button
              onClick={onNavigateToScan}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Scan Another CV
            </button>
          </div>
        </div>

        {/* Right column: Detailed Analysis report */}
        <div className="col-span-1 lg:col-span-8">
          {selectedScan ? (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden">
              
              {/* Report Header */}
              <div className="p-6 bg-neutral-50/50 dark:bg-neutral-950/25 border-b border-neutral-150 dark:border-neutral-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-400 border border-sky-100/60 dark:border-sky-900/10 font-mono tracking-wider">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED ATS ASSESSMENT
                    </span>
                    <button
                      key="download-report-btn"
                      onClick={onPrintReport}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all cursor-pointer shadow-sm"
                      title="Download clean, printable PDF report"
                    >
                      <Download className="w-3 h-3" /> Download Report
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white truncate">{selectedScan.fileName}</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium font-sans">
                    Job Target: <strong className="text-neutral-700 dark:text-neutral-200 font-semibold">{selectedScan.targetJobTitle} ({selectedScan.experienceLevel})</strong>
                  </p>
                </div>
                
                {/* Score Indicators Grid */}
                <div className="flex items-center gap-3">
                  <div className="text-center bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-2.5 rounded-xl shadow-md min-w-[75px] space-y-0.5">
                    <span className="block text-[9px] text-neutral-400 font-bold uppercase tracking-wider">ATS Score</span>
                    <span className="block text-lg font-extrabold font-mono text-teal-600 dark:text-teal-400">{selectedScan.atsScore}%</span>
                  </div>
                  <div className="text-center bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-2.5 rounded-xl shadow-md min-w-[75px] space-y-0.5">
                    <span className="block text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Formatting</span>
                    <span className="block text-lg font-extrabold font-mono text-sky-600 dark:text-sky-400">{selectedScan.qualityScore}%</span>
                  </div>
                  <div className="text-center bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 p-2.5 rounded-xl shadow-md min-w-[75px] space-y-0.5">
                    <span className="block text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Target Match</span>
                    <span className="block text-lg font-extrabold font-mono text-purple-600 dark:text-purple-400">{selectedScan.jobMatchScore}%</span>
                  </div>
                </div>
              </div>

              {/* Pill Tabs Segment Controls */}
              <div className="p-3 bg-neutral-50/30 dark:bg-neutral-950/15 border-b border-neutral-100 dark:border-neutral-800 flex flex-wrap gap-1">
                {[
                  { id: 'overview', label: 'Overview Metrics', icon: Layers },
                  { id: 'skills', label: 'Keyword Audit', icon: Target },
                  { id: 'recommendations', label: 'Step Roadmap', icon: HelpCircle },
                  { id: 'wording', label: 'Wording Optimizer', icon: Sparkles }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeTab === item.id
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-black shadow-md'
                          : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Content Panel */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[500px] overflow-y-auto font-sans">
                
                {/* 1. OVERVIEW METRICS */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Section Strengths */}
                      <div className="p-5 bg-teal-50/10 dark:bg-teal-950/10 border border-teal-100/40 dark:border-teal-900/10 rounded-2xl space-y-3.5">
                        <h4 className="text-xs font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" /> Structuring Strengths
                        </h4>
                        <div className="space-y-3">
                          {selectedScan.strengths?.map((str, idx) => (
                            <div key={idx} className="space-y-0.5 border-l-2 border-teal-400 pl-3.5">
                              <p className="text-xs font-bold text-neutral-950 dark:text-white">{str.title}</p>
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal mt-0.5">{str.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section Flaws */}
                      <div className="p-5 bg-orange-50/10 dark:bg-orange-950/10 border border-orange-100/40 dark:border-orange-900/10 rounded-2xl space-y-3.5">
                        <h4 className="text-xs font-bold text-orange-800 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0" /> ATS Compatibility Flaws
                        </h4>
                        <div className="space-y-3">
                          {selectedScan.weaknesses?.map((wk, idx) => (
                            <div key={idx} className="space-y-0.5 border-l-2 border-orange-400 pl-3.5">
                              <p className="text-xs font-bold text-neutral-950 dark:text-white">{wk.title}</p>
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal mt-0.5">{wk.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-blue-50 dark:border-blue-900/20 bg-blue-50/10 dark:bg-blue-950/10 flex gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-550 dark:text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-neutral-900 dark:text-white">How Score Weighting Evaluates Your PDF</p>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed mt-0.5 font-sans">
                          A target value above 80% is high status for leading corporate screening filters. For immediate enhancement, focus on embedding the terms flagged as 'Absent' in the Keyword Audit tab.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. KEYWORD TARGET ALIGNMENT */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Found Competencies Badge List</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedScan.detectedSkills?.map((skill, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-teal-105/50 dark:bg-teal-950/30 text-teal-850 dark:text-teal-300 border border-teal-200/50 dark:border-teal-900/35 rounded-lg text-[10px] font-bold font-mono">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Missing Vital Requirements</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedScan.missingSkills?.map((skill, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100/60 dark:border-red-900/20 rounded-lg text-[10px] font-bold font-mono">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Linguistic Keyword Audit Grid</span>
                      <div className="border border-neutral-100 dark:border-neutral-800 rounded-xl overflow-hidden overflow-x-auto w-full">
                        <table className="w-full min-w-[540px] text-left border-collapse text-[11px] font-sans">
                          <thead>
                            <tr className="bg-neutral-50 dark:bg-neutral-950 text-neutral-400 border-b border-neutral-100 dark:border-neutral-800/80">
                              <th className="p-3.5 font-bold uppercase tracking-wider">Keyword Criteria</th>
                              <th className="p-3.5 font-bold uppercase tracking-wider">Status</th>
                              <th className="p-3.5 font-bold uppercase tracking-wider text-right">Job Relevance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-50 dark:divide-neutral-800/80">
                            {selectedScan.keywords?.map((kw, idx) => (
                              <tr key={idx} className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50/20 dark:hover:bg-neutral-800/10">
                                <td className="p-3.5 font-bold font-mono text-neutral-900 dark:text-neutral-100">{kw.keyword}</td>
                                <td className="p-3.5">
                                  {kw.found ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                                      Found in CV
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                      Omitted
                                    </span>
                                  )}
                                </td>
                                <td className="p-3.5 text-right font-semibold">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                    kw.importance === 'High' 
                                      ? 'bg-red-50/55 text-red-700 dark:bg-red-950/25 dark:text-red-400' 
                                      : kw.importance === 'Medium' 
                                        ? 'bg-orange-50/55 text-orange-700 dark:bg-orange-950/25 dark:text-orange-400' 
                                        : 'bg-indigo-50/55 text-indigo-700 dark:bg-indigo-950/25 dark:text-indigo-400'
                                  }`}>
                                    {kw.importance} Importance
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. STEP ROADMAP */}
                {activeTab === 'recommendations' && (
                  <div className="space-y-4">
                    <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Actionable Section Road Map</span>
                    
                    {selectedScan.recommendations?.map((rec, idx) => (
                      <div key={idx} className="p-5 border border-neutral-100 dark:border-neutral-800 rounded-2xl bg-neutral-50/25 dark:bg-neutral-950/20 space-y-3">
                        <div className="flex justify-between items-center gap-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            rec.priority === 'High' 
                              ? 'bg-red-50 text-red-700 dark:bg-red-950/35 dark:text-red-300' 
                              : 'bg-orange-50 text-orange-700 dark:bg-orange-950/35 dark:text-orange-300'
                          }`}>
                            {rec.priority} Action Priority
                          </span>
                          <span className="text-[10px] text-sky-600 dark:text-sky-400 font-extrabold font-mono flex items-center gap-1">
                            🚀 {rec.expectedImpact}
                          </span>
                        </div>
                        <div className="space-y-1 font-sans text-xs">
                          <p className="font-extrabold text-neutral-900 dark:text-white">Detected Issue:</p>
                          <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed italic">{rec.issue}</p>
                        </div>
                        <div className="space-y-1 font-sans text-xs pt-1.5 border-t border-neutral-100 dark:border-neutral-800">
                          <p className="font-bold text-sky-600 dark:text-sky-450 font-semibold">Prescribed Optimization Step:</p>
                          <p className="text-neutral-700 dark:text-neutral-350 leading-relaxed font-semibold">{rec.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. WORDING OPTIMIZER */}
                {activeTab === 'wording' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 mb-2 p-1">
                      <Sparkles className="w-5 h-5 text-sky-500" />
                      <div>
                        <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest">Quantitative Wording Deck</span>
                        <p className="text-[11px] text-neutral-450">Clicking any button copies the parsed high-impact rewrite with metrics and active action verbs.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedScan.suggestions?.map((sug) => (
                        <div 
                          key={sug.id} 
                          className="border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden bg-neutral-50/20"
                        >
                          <div className="bg-neutral-50 dark:bg-neutral-950 px-4 py-3 flex justify-between items-center gap-3 border-b border-neutral-100 dark:border-neutral-800">
                            <span className="text-[10px] font-black text-sky-600 dark:text-sky-450 uppercase font-mono tracking-wider">
                              Category: {sug.description}
                            </span>
                            
                            <button
                              onClick={() => handleCopyText(sug.after, sug.id)}
                              className="text-[10px] text-sky-600 dark:text-sky-400 hover:text-sky-500 flex items-center gap-1.5 transition-colors font-black font-mono bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900/30 px-2.5 py-1 rounded-lg"
                            >
                              {copiedId === sug.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-sky-500" /> COPIED!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" /> COPY RAW REWRITE
                                </>
                              )}
                            </button>
                          </div>
                          
                          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <span className="block text-[10px] font-bold text-red-500 uppercase tracking-wider">Draft Bullet / bio statement</span>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 italic pl-2.5 border-l-2 border-red-400 leading-relaxed">{sug.before}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="block text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1 flex-row">
                                Premium Quantified Alignment
                              </span>
                              <p className="text-xs text-neutral-800 dark:text-neutral-200 font-bold pl-2.5 border-l-2 border-sky-500 leading-relaxed bg-sky-50/10 dark:bg-sky-950/10 p-2 rounded-xl">
                                {sug.after}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl p-12 text-center text-neutral-400 space-y-4">
              <History className="w-16 h-16 mx-auto opacity-35 text-neutral-300 dark:text-neutral-800" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-800 dark:text-white">Select a CV Report</h3>
                <p className="text-xs max-w-sm mx-auto leading-normal">
                  You have active scans saved in history. Click on any resume block on the sidebar explorer to examine its parsed feedback report layout.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
