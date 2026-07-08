import React, { useState } from 'react';
import { User, Mail, Award, CheckCircle, FileText, MapPin, Briefcase, Plus, Save, Edit2, X, TrendingUp, Calendar } from 'lucide-react';
import { ResumeAnalysis } from '../types';

interface ProfileViewProps {
  currentUser: {
    name: string;
    email: string;
    role: string;
    bio: string;
    location: string;
  };
  onUpdateProfile: (updated: { name: string; role: string; bio: string; location: string }) => void;
  scans: ResumeAnalysis[];
  onNavigateToScan: () => void;
}

export default function ProfileView({ currentUser, onUpdateProfile, scans, onNavigateToScan }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    role: currentUser.role || 'Software Professional',
    location: currentUser.location || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    bio: currentUser.bio || 'Enter your bio description details here to present in your resume scanner workspace...'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Profile Details Container */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 sm:p-8 transition-all">
        
        {!isEditing ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl border border-sky-100 dark:border-zinc-800 shadow-sm">
                {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
              </div>
              <div className="space-y-1.5">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  {currentUser.name}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 dark:bg-sky-950/40 text-sky-850 dark:text-sky-300 font-mono border border-sky-200 dark:border-sky-900/30">
                    VERIFIED MEMBER
                  </span>
                </h1>
                <p className="text-sm text-zinc-650 dark:text-zinc-300 font-medium flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-sky-500 flex-shrink-0" /> {currentUser.role || 'Software Professional'}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {currentUser.email}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" /> Today's Date: {todayDate}
                  </p>
                </div>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => {
                setFormData({
                  name: currentUser.name,
                  role: currentUser.role || 'Software Professional',
                  location: currentUser.location || todayDate,
                  bio: currentUser.bio || ''
                });
                setIsEditing(true);
              }}
              className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Edit2 className="w-3.5 h-3.5 text-sky-500" /> Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-5">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Modify Workspace Bio</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400">Full Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-450 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400">Target Role Title</label>
                <input 
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-455 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400">Professional Summary Overview</label>
              <textarea 
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full text-xs p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder-zinc-455 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-none"
                placeholder="Briefly state your core technical expertise..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-455 hover:bg-zinc-100 dark:hover:bg-zinc-808/50 text-xs font-semibold rounded-lg transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5 inline mr-1" /> Cancel
              </button>
              <button 
                type="submit"
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" /> Save Profile Details
              </button>
            </div>
          </form>
        )}

        <div className="border-t border-zinc-150 dark:border-zinc-800 my-6 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/50 dark:border-zinc-800 space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Target Job Category</p>
            <p className="text-sm font-semibold text-zinc-800 dark:text-white flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-sky-500 flex-shrink-0" /> Technology / Devs
            </p>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/50 dark:border-zinc-800 space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Database Level Score</p>
            <p className="text-sm font-semibold text-zinc-800 dark:text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-500 flex-shrink-0" /> Senior (Vetted Verified)
            </p>
          </div>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200/50 dark:border-zinc-800 space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Premium Cloud Scanning</p>
            <p className="text-sm font-semibold text-zinc-800 dark:text-white flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-sky-500 flex-shrink-0" /> Unlimited API Scans Left
            </p>
          </div>
        </div>

        <div className="space-y-1.5 bg-zinc-50/50 dark:bg-zinc-950/20 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80">
          <p className="text-[10px] font-bold text-zinc-450 uppercase tracking-wider">Career biography</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-355 leading-relaxed">{currentUser.bio || 'No career bio provided. Click edit profile to add your personalized professional summary.'}</p>
        </div>
      </div>

      {/* Uploaded Documents List */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">Uploaded CV Profiles ({scans.length})</h2>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">All documents parsed and preserved securely under your workspace profile.</p>
          </div>
          <button 
            onClick={onNavigateToScan}
            className="text-xs bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-950/80 text-sky-700 dark:text-sky-400 px-3 py-1.5 rounded-lg border border-sky-150 dark:border-sky-900/30 transition-all font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Scan Document
          </button>
        </div>

        {scans.length === 0 ? (
          <div className="py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center text-zinc-455 space-y-4">
            <FileText className="w-12 h-12 mx-auto text-zinc-350 dark:text-zinc-700" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">No resumes processed yet</p>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">Your saved collection is empty. Scanned resume results automatically show up here and are associated specifically with your login account.</p>
            </div>
            <button
              onClick={onNavigateToScan}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Scan Your First Resume
            </button>
          </div>
        ) : (
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {scans.map((res, idx) => (
              <div key={res.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/40 text-teal-650 dark:text-teal-400 rounded-lg flex-shrink-0">
                    <FileText className="w-5 h-5 text-sky-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{res.fileName}</p>
                    <p className="text-xs text-zinc-400 flex flex-wrap gap-x-2">
                      <span>{res.targetJobTitle}</span>
                      <span>•</span>
                      <span>Scanned on {res.date}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-sky-50 dark:bg-sky-955/40 text-sky-700 dark:text-sky-400 border border-sky-100 dark:border-sky-900/30">
                      ATS Score: {res.atsScore}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
