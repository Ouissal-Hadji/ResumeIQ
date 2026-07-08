import React, { useState } from 'react';
import { Settings, Shield, Moon, Sun, Sliders, Bell, Cpu, Cloud } from 'lucide-react';

interface SettingsViewProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function SettingsView({ isDarkMode, onToggleDarkMode }: SettingsViewProps) {
  const [atsThreshold, setAtsThreshold] = useState(80);
  const [useLiveGemini, setUseLiveGemini] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Title */}
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <Settings className="w-6 h-6 text-emerald-500" />
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Workspace Preferences</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Configure theme rendering and automated system thresholds.</p>
          </div>
        </div>

        {/* Setting Items */}
        <div className="space-y-6">
          
          {/* Dark Mode toggle */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                {isDarkMode ? <Moon className="w-4 h-4 text-emerald-500" /> : <Sun className="w-4 h-4 text-emerald-500" />}
                Interface Styling Vibe
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Toggle dark mode and responsive layout styles instantly.</p>
            </div>
            <button 
              type="button"
              onClick={onToggleDarkMode}
              className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors cursor-pointer shadow-sm"
            >
              Set {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>

          {/* ATS Limit slider */}
          <div className="flex flex-col gap-3 p-4 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-500" />
                Target ATS Quality Threshold ({atsThreshold}%)
              </p>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {atsThreshold}% Goal
              </span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="95" 
              value={atsThreshold}
              onChange={(e) => setAtsThreshold(parseInt(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Resumes with scores beneath this threshold will trigger warning banners on the dashboard.</p>
          </div>

          {/* Cloud run configuration info */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <Cloud className="w-4 h-4 text-emerald-500" />
                AI Studio Server-Side Gemini API Proxy
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Direct server-side scanning to safeguard your private API keys.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono border border-emerald-250 dark:border-emerald-900/30">
                ● LIVE
              </span>
            </div>
          </div>

          {/* Sandbox security details */}
          <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                Document Sanitization & Vault Storage
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">All uploaded resumes are sanitized in-memory to prevent macro execution.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono border border-zinc-200 dark:border-zinc-700">
                SECURED
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
