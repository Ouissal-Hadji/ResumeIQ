/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Eye, Trash2, Calendar, Search, Filter, Cpu, DownloadCloud, AlertTriangle } from 'lucide-react';
import { ResumeAnalysis } from '../types';

interface HistoryViewProps {
  analyses: ResumeAnalysis[];
  onSelectAnalysis: (analysis: ResumeAnalysis) => void;
  onDeleteAnalysis: (id: string) => void;
  onNavigateToAnalyze: () => void;
}

export default function HistoryView({
  analyses,
  onSelectAnalysis,
  onDeleteAnalysis,
  onNavigateToAnalyze
}: HistoryViewProps) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Filter lists
  const filtered = analyses.filter(item => {
    const matchesSearch = item.fileName.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || item.targetJobTitle === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 font-sans">
      
      <div>
        <h1 className="text-2xl font-black">Scanning History</h1>
        <p className="text-sm text-slate-500 mt-1">Review, filter, and compare all your uploaded resume scans and metrics</p>
      </div>

      {/* Filter bar layouts */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4.5 rounded-xl border border-slate-200/60 dark:border-slate-800/80">
        
        {/* Left search */}
        <div className="relative w-full sm:max-w-72">
          <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search resumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8.5 pr-3 py-2.5 border border-slate-200 dark:border-slate-805 bg-slate-50 dark:bg-slate-950 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Right filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs p-2.5 border border-slate-200 dark:border-slate-805 bg-slate-50 dark:bg-slate-950 rounded-lg focus:outline-none w-full sm:w-auto text-slate-700 dark:text-slate-100"
          >
            <option value="All">All Job Roles</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Product Designer">Product Designer</option>
            <option value="Marketing Specialist">Marketing Specialist</option>
          </select>
        </div>

      </div>

      {/* History Cards container */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 transition duration-300 relative"
            >
              <div className="space-y-4">
                
                {/* File title */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5 truncate flex-1">
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white truncate">
                      {item.fileName}
                    </h3>
                    <p className="text-3xs font-extrabold text-slate-400 uppercase tracking-widest">{item.fileSize}</p>
                  </div>
                </div>

                {/* Score Indicators group */}
                <div className="grid grid-cols-3 gap-2 py-2.5 bg-slate-50 dark:bg-slate-950/50 rounded-xl text-center">
                  
                  <div>
                    <span className="text-3xs text-slate-450 uppercase tracking-wider block font-bold">ATS Score</span>
                    <span className="text-base font-black text-slate-900 dark:text-white leading-tight">{item.atsScore}%</span>
                  </div>

                  <div className="border-x border-slate-200/60 dark:border-slate-800">
                    <span className="text-3xs text-slate-450 uppercase tracking-wider block font-bold">Quality</span>
                    <span className="text-base font-black text-slate-900 dark:text-white leading-tight">{item.qualityScore}%</span>
                  </div>

                  <div>
                    <span className="text-3xs text-slate-450 uppercase tracking-wider block font-bold">Matching</span>
                    <span className="text-base font-black text-slate-900 dark:text-white leading-tight">{item.jobMatchScore}%</span>
                  </div>

                </div>

                {/* Details list */}
                <div className="space-y-1 text-2xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Target: <strong>{item.targetJobTitle}</strong> ({item.experienceLevel})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Analyzed {item.date}</span>
                  </div>
                </div>

              </div>

              {/* Action buttons footer */}
              <div className="pt-4 mt-6 border-t border-slate-50 dark:border-slate-805 flex items-center justify-between text-xs">
                
                <button
                  onClick={() => onSelectAnalysis(item)}
                  id={`history_btn_details_${item.id}`}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-100 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer select-none"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onDeleteAnalysis(item.id)}
                  id={`history_btn_delete_${item.id}`}
                  className="p-1.5 hover:bg-rose-50 hover:text-red-600 dark:hover:bg-red-950/20 text-slate-400 rounded-lg transition cursor-pointer select-none"
                  title="Delete scan record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty searches */
        <div className="bg-white dark:bg-slate-900 text-center rounded-2xl py-16 px-4 border border-slate-200 dark:border-slate-800">
          <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-sm font-bold">No historical matches</h3>
          <p className="text-xs text-slate-450 mt-1 max-w-sm mx-auto">Either refine your searches filter or trigger a new AI resume score check.</p>
          <button
            onClick={onNavigateToAnalyze}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Upload Resume
          </button>
        </div>
      )}

    </div>
  );
}
