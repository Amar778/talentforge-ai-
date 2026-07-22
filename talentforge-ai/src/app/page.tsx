'use client';

import React, { useState } from 'react';
import { UserRole, ResumeData } from './types';
import { initialResume } from './mockData';
import { Navbar } from '../components/Navbar';
import { CandidatePortal } from '../components/CandidatePortal';
import { RecruiterPortal } from '../components/RecruiterPortal';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Bot, Users } from 'lucide-react';

export default function Home() {
  const [currentRole, setCurrentRole] = useState<UserRole>('candidate');
  const [aiCredits, setAiCredits] = useState<number>(2450);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResume);

  const handleUseCredits = (amount: number) => {
    setAiCredits((prev) => Math.max(0, prev - amount));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        aiCredits={aiCredits}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8 space-y-8">
        
        {/* Top Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl glass-card border border-white/10 p-8 lg:p-10 bg-gradient-to-r from-indigo-950/70 via-purple-950/40 to-slate-900/90">
          
          {/* Decorative ambient background glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Dual Candidate & Recruiter Copilot</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {currentRole === 'candidate' ? (
                  <>Forge Your AI-Powered <span className="gradient-text">Career Path</span></>
                ) : (
                  <>Supercharge <span className="gradient-text">Talent Acquisition</span> with AI</>
                )}
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {currentRole === 'candidate'
                  ? "Optimize your resume against ATS algorithms, simulate real-time AI mock technical interviews, and master in-demand AI competencies."
                  : "Rank candidate pools with contextual vector semantic search, audit job descriptions for gender neutrality, and speed up time-to-hire by 58%."
                }
              </p>
            </div>

            {/* Quick Stat Pill */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 shrink-0 space-y-3 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300">
                  {currentRole === 'candidate' ? <Bot className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium block">
                    {currentRole === 'candidate' ? 'ATS Match Readiness' : 'Active Candidate Pool'}
                  </span>
                  <span className="text-xl font-bold text-white">
                    {currentRole === 'candidate' ? `${resumeData.atsScore}% Score` : '248 Top Applicants'}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300">
                <span>Mode: {currentRole === 'candidate' ? 'Job Seeker' : 'Recruiter Suite'}</span>
                <button
                  onClick={() => setCurrentRole(currentRole === 'candidate' ? 'recruiter' : 'candidate')}
                  className="font-bold underline hover:text-white flex items-center space-x-1"
                >
                  <span>Switch Mode</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Portal View */}
        {currentRole === 'candidate' ? (
          <CandidatePortal
            resume={resumeData}
            onUpdateResume={setResumeData}
            onUseCredits={handleUseCredits}
          />
        ) : (
          <RecruiterPortal
            onUseCredits={handleUseCredits}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 glass-card mt-12 py-6 px-4 text-center text-xs text-gray-500 space-y-2">
        <p>© 2026 TalentForge AI. All rights reserved. Powered by Next.js 14 & Tailwind CSS.</p>
        <p className="text-[11px] text-gray-600">Enterprise AI Talent Acquisition & Career Optimization Platform</p>
      </footer>

    </div>
  );
}
