'use client';

import React, { useState } from 'react';
import { CandidateMatcher } from './CandidateMatcher';
import { JobPostStudio } from './JobPostStudio';
import { RecruitmentAnalytics } from './RecruitmentAnalytics';
import { Users, Briefcase, BarChart3 } from 'lucide-react';

interface RecruiterPortalProps {
  onUseCredits: (amount: number) => void;
}

export const RecruiterPortal: React.FC<RecruiterPortalProps> = ({ onUseCredits }) => {
  const [activeTab, setActiveTab] = useState<'candidates' | 'jobs' | 'analytics'>('candidates');

  return (
    <div className="space-y-6">
      
      {/* Sub Tab selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('candidates')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'candidates'
              ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-600/30'
              : 'glass-card text-gray-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>AI Candidate Matcher & Screener</span>
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'jobs'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
              : 'glass-card text-gray-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>AI Job Description & Bias Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'analytics'
              ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-600/30'
              : 'glass-card text-gray-400 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Recruitment Pipeline Analytics</span>
        </button>
      </div>

      {activeTab === 'candidates' && <CandidateMatcher onUseCredits={onUseCredits} />}
      {activeTab === 'jobs' && <JobPostStudio onUseCredits={onUseCredits} />}
      {activeTab === 'analytics' && <RecruitmentAnalytics />}

    </div>
  );
};
