'use client';

import React, { useState } from 'react';
import { ResumeData } from '../app/types';
import { ResumeForge } from './ResumeForge';
import { InterviewSimulator } from './InterviewSimulator';
import { SkillRoadmap } from './SkillRoadmap';
import { FileText, Bot, Compass } from 'lucide-react';

interface CandidatePortalProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  onUseCredits: (amount: number) => void;
}

export const CandidatePortal: React.FC<CandidatePortalProps> = ({ resume, onUpdateResume, onUseCredits }) => {
  const [activeTab, setActiveTab] = useState<'resume' | 'interview' | 'roadmap'>('resume');

  return (
    <div className="space-y-6">
      
      {/* Tab Selector Pill Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('resume')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'resume'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
              : 'glass-card text-gray-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>AI Resume & ATS Optimizer</span>
        </button>

        <button
          onClick={() => setActiveTab('interview')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'interview'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30'
              : 'glass-card text-gray-400 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>AI Mock Interview Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'roadmap'
              ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-600/30'
              : 'glass-card text-gray-400 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Skill Matrix & Learning Pathway</span>
        </button>
      </div>

      {/* Main Active Tab Content */}
      {activeTab === 'resume' && (
        <ResumeForge resume={resume} onUpdateResume={onUpdateResume} onUseCredits={onUseCredits} />
      )}

      {activeTab === 'interview' && (
        <InterviewSimulator onUseCredits={onUseCredits} />
      )}

      {activeTab === 'roadmap' && (
        <SkillRoadmap onUseCredits={onUseCredits} />
      )}

    </div>
  );
};
