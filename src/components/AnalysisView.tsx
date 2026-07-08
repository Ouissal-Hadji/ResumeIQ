import React, { useState, useRef } from 'react';
import { 
  Upload, FileText, ArrowRight, CheckCircle, AlertTriangle, 
  Sparkles, RefreshCw, Briefcase, Plus, Loader2, Copy, Check, Info, Download
} from 'lucide-react';
import { ResumeAnalysis, AnalysisStage } from '../types';
import { generateMockAnalysis } from '../data';

const JOB_TITLE_OPTIONS = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile App Developer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Analyst",
  "Data Engineer",
  "QA Engineer",
  "UI/UX Designer",
  "Graphic Designer",
  "Product Manager",
  "Project Manager",
  "Scrum Master",
  "Solutions Architect",
  "Cybersecurity Analyst",
  "System Administrator",
  "Business Analyst",
  "Digital Marketing Manager",
  "SEO Specialist",
  "Content Writer",
  "Social Media Specialist",
  "Sales Representative",
  "Account Executive",
  "Customer Success Manager",
  "Human Resources Generalist",
  "Financial Analyst",
  "Operations Manager",
  "Other"
];

interface AnalysisViewProps {
  onAddAnalysis: (res: ResumeAnalysis) => void;
  isLoadingExisting?: boolean;
  latestScan?: ResumeAnalysis | null;
  onPrintReport?: () => void;
}

export default function AnalysisView({ onAddAnalysis, latestScan, onPrintReport }: AnalysisViewProps) {
  // Input workflow states
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<{ name: string; size: string; data: string; mimeType: string } | null>(null);
  const [selectedJobOption, setSelectedJobOption] = useState('Software Engineer');
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Mid Level');
  const [pasteResumeText, setPasteResumeText] = useState('');
  
  // Scoring parameters & general loaders
  const [customError, setCustomError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [stages, setStages] = useState<AnalysisStage[]>([
    { id: '1', label: 'Reading Resume & Parsing Structure', status: 'idle', duration: 1000 },
    { id: '2', label: 'Extracting Core Tools & Competencies', status: 'idle', duration: 1200 },
    { id: '3', label: 'ATS Target Vetting Alignment Test', status: 'idle', duration: 1500 },
    { id: '4', label: 'Linguistic Metric Keyword Analysis', status: 'idle', duration: 1200 },
    { id: '5', label: 'Generating Quantitative Suggestions', status: 'idle', duration: 1000 }
  ]);

  // File picker reference
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    const isAllowedType = 
      selectedFile.name.endsWith('.pdf') || 
      selectedFile.name.endsWith('.docx') || 
      selectedFile.name.endsWith('.txt') ||
      selectedFile.type === "application/pdf" || 
      selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
      selectedFile.type === "text/plain";
      
    if (!isAllowedType) {
      setCustomError('Invalid file type. Please upload a PDF, DOCX or TXT file.');
      return;
    }

    setCustomError('');
    const sizeStr = selectedFile.size > 1024 * 1024 
      ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(selectedFile.size / 1024).toFixed(0)} KB`;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        setFile({
          name: selectedFile.name,
          size: sizeStr,
          data: event.target.result as string,
          mimeType: selectedFile.type || 'application/pdf'
        });
      }
    };
    reader.onerror = () => {
      setCustomError('Could not read the uploaded file.');
    };
    reader.readAsDataURL(selectedFile);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Run real analysis workflow using Gemini
  const handleStartAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !pasteResumeText.trim()) {
      setCustomError('Please drag/upload a resume file or paste your resume content first.');
      return;
    }

    const activeTargetJob = selectedJobOption === 'Other' ? customJobTitle.trim() : selectedJobOption;
    if (!activeTargetJob) {
      setCustomError('Please specify/type the target job title under the Other option.');
      return;
    }

    setIsAnalyzing(true);
    setCurrentStageIdx(0);
    setCustomError('');

    // Reset stages
    setStages(prev => prev.map(s => ({ ...s, status: 'idle' })));

    // Trigger API analysis execution in the background immediately
    const apiPromise = fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: file ? {
          name: file.name,
          size: file.size,
          data: file.data,
          mimeType: file.mimeType
        } : null,
        pasteResumeText: pasteResumeText.trim() || undefined,
        targetJob: activeTargetJob,
        experienceLevel
      })
    }).then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'The server returned an error during resume analysis.');
      }
      return res.json();
    });

    let stageIndex = 0;
    
    // Simulate stage animation for premium dashboard vibe
    const runStage = () => {
      if (stageIndex < stages.length) {
        setStages(prev => prev.map((s, idx) => {
          if (idx === stageIndex) return { ...s, status: 'running' };
          if (idx < stageIndex) return { ...s, status: 'completed' };
          return s;
        }));
        setCurrentStageIdx(stageIndex);

        setTimeout(() => {
          stageIndex++;
          runStage();
        }, stages[stageIndex].duration);
      } else {
        stagesCompleted();
      }
    };

    runStage();

    const stagesCompleted = async () => {
      try {
        const resObj = await apiPromise;
        setStages(prev => prev.map(s => ({ ...s, status: 'completed' })));
        onAddAnalysis(resObj);
        setIsAnalyzing(false);
        // Clear input states
        setFile(null);
        setPasteResumeText('');
      } catch (err: any) {
        console.error('Analysis error:', err);
        setIsAnalyzing(false);
        setCustomError(err.message || 'Analysis failed. Please verify your file contents or API configuration.');
      }
    };
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Visual Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 border border-sky-100 dark:border-sky-900/30">
          <Sparkles className="w-3.5 h-3.5" /> Direct GCS Sandbox Scanning Active
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-4xl text-sans">
          Resume ATS Scoring & Wording Optimizer
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed">
          Upload your resume alongside target job expectations. Get real, live metrics evaluation and instant sentence rewrites.
        </p>
      </div>

      {latestScan && !isAnalyzing && (
        <div className="bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-100/50 dark:bg-sky-900/30 rounded-xl text-sky-600 dark:text-sky-400 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Latest Resume Assessment</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-xs">{latestScan.fileName}</p>
              <p className="text-xs text-zinc-500">Scanned for {latestScan.targetJobTitle} • ATS Score: <span className="text-teal-600 dark:text-teal-400 font-bold">{latestScan.atsScore}%</span></p>
            </div>
          </div>
          <button
            type="button"
            onClick={onPrintReport}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      )}

      {/* Main Panel */}
      {!isAnalyzing ? (
        <form onSubmit={handleStartAnalysis} className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          
          {/* Settings Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 tracking-wider uppercase block">Target Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                <select 
                  value={selectedJobOption}
                  onChange={(e) => setSelectedJobOption(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none cursor-pointer"
                >
                  {JOB_TITLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="dark:bg-zinc-900">{opt}</option>
                  ))}
                </select>
              </div>
              {selectedJobOption === 'Other' && (
                <div className="pt-2 animate-fade-in">
                  <input 
                    type="text" 
                    value={customJobTitle}
                    onChange={(e) => setCustomJobTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none" 
                    placeholder="Type your custom target job title..."
                    required
                  />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400 tracking-wider uppercase block">Experience Level</label>
              <select 
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value="Entry Level" className="dark:bg-zinc-900">Entry Level (0-2 years)</option>
                <option value="Mid Level" className="dark:bg-zinc-900">Mid Level (2-5 years)</option>
                <option value="Senior Level" className="dark:bg-zinc-900">Senior Level (5-10 years)</option>
                <option value="Lead / Architect" className="dark:bg-zinc-900">Lead / Architect (10+ years)</option>
              </select>
            </div>
          </div>

          {/* Toggle File or Paste */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase">Upload Document or Paste Content</span>
              {file && (
                <button 
                  type="button" 
                  onClick={() => setFile(null)}
                  className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 flex items-center gap-1 font-medium cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* Drag Box */}
            {!file ? (
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 bg-zinc-50/30 dark:bg-zinc-950/20 ${
                  dragActive 
                    ? 'border-sky-500 bg-sky-50/10 dark:bg-sky-950/10' 
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-sky-400 dark:hover:border-sky-700'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileInput}
                  className="hidden" 
                  accept=".pdf,.docx,.txt"
                />
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-sky-100/65 dark:bg-sky-950/30 rounded-xl text-sky-600 dark:text-sky-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      Drag & drop your resume file here
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Supports PDF, DOCX, or TXT formats (Max 15MB)
                    </p>
                  </div>
                  <button 
                    type="button"
                    className="mt-2 text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline cursor-pointer"
                  >
                    Or browse local files
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-sky-100 dark:border-sky-900/30 bg-sky-50/20 dark:bg-sky-950/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 bg-sky-100/50 dark:bg-sky-900/40 rounded-lg text-sky-600 dark:text-sky-400 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {file.size} • Uploaded Ready to SCAN
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sky-600 dark:text-sky-400 gap-1 text-xs font-bold font-mono">
                  <CheckCircle className="w-4 h-4 text-sky-500" /> FILE SECURED
                </div>
              </div>
            )}

            {/* Paste Plain Text Option */}
            {!file && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-zinc-400 uppercase">Or Paste Plain Text Version Below</span>
                </div>
                <textarea 
                  value={pasteResumeText}
                  onChange={(e) => setPasteResumeText(e.target.value)}
                  className="w-full text-sm font-sans p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none" 
                  rows={8}
                  placeholder="Paste your resume content, experience history, or bio description details here..."
                />
              </div>
            )}
          </div>

          {customError && (
            <div className="p-3 bg-red-50 dark:bg-red-955/10 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs font-medium rounded-lg flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {customError}
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit"
              className="w-full py-3 px-6 rounded-xl text-white font-semibold transition-all duration-300 bg-indigo-600 hover:bg-indigo-500 text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              Analyze Your Resume <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      ) : (
        /* Animated Scanning Stages Vibe */
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-2xl shadow-sm p-8 max-w-lg mx-auto text-center space-y-6">
          <div className="relative flex justify-center py-4">
            <div className="absolute w-16 h-16 rounded-full border-4 border-sky-100 dark:border-sky-950/50 animate-ping"></div>
            <div className="relative p-5 bg-sky-100 dark:bg-sky-900/30 rounded-full text-sky-650 dark:text-sky-400 animate-pulse">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Analyzing with Gemini AI</h3>
            <p className="text-xs text-zinc-400">This takes around 10-15 seconds for a full layout check.</p>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-4 text-left max-w-sm mx-auto">
            {stages.map((stage, idx) => (
              <div 
                key={stage.id}
                className={`flex items-center gap-3 transition-opacity duration-300 ${
                  stage.status === 'idle' ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="flex-shrink-0">
                  {stage.status === 'running' && (
                    <div className="w-5 h-5 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                  )}
                  {stage.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-sky-500" />
                  )}
                  {stage.status === 'idle' && (
                    <div className="w-5 h-5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-transparent flex items-center justify-center text-[10px] font-bold text-zinc-400">
                      {stage.id}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-medium ${
                    stage.status === 'running' 
                      ? 'text-sky-600 dark:text-sky-400 font-bold' 
                      : 'text-zinc-750 dark:text-zinc-300'
                  }`}>
                    {stage.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
