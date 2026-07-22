'use client';

import React, { useState } from 'react';
import { SkillItem } from '../app/types';
import { initialSkillsList } from '../app/mockData';
import { Compass, TrendingUp, BookOpen, Award, Sparkles, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

interface SkillRoadmapProps {
  onUseCredits: (amount: number) => void;
}

export const SkillRoadmap: React.FC<SkillRoadmapProps> = ({ onUseCredits }) => {
  const [skills, setSkills] = useState<SkillItem[]>(initialSkillsList);
  const [isGeneratingPath, setIsGeneratingPath] = useState(false);
  const [activeTab, setActiveTab] = useState<'matrix' | 'roadmap'>('matrix');

  const roadmapMilestones = [
    {
      phase: "Phase 1: Foundation & Retrieval Optimization",
      timeframe: "Weeks 1 - 4",
      focus: "Vector Search & Hybrid Indexing",
      status: "In Progress",
      modules: [
        "Pinecone HNSW Index Tuning & Distance Metrics",
        "Hybrid Sparse-Dense Retrieval (BM25 + OpenAI Embeddings)",
        "Re-ranking models using Cohere Rerank v3"
      ]
    },
    {
      phase: "Phase 2: Scalable LLM Orchestration",
      timeframe: "Weeks 5 - 8",
      focus: "Streaming & Microservices",
      status: "Upcoming",
      modules: [
        "Asynchronous Event Loops with Server-Sent Events",
        "LangChain Expression Language (LCEL) pipelines",
        "Guardrail implementation using Llama Guard"
      ]
    },
    {
      phase: "Phase 3: Production MLOps & System Architecture",
      timeframe: "Weeks 9 - 12",
      focus: "Deployment & Auto-scaling",
      status: "Upcoming",
      modules: [
        "Kubernetes Helm Chart Deployment for Vector DBs",
        "Latency Benchmarking & GPU Inference Cost Optimization"
      ]
    }
  ];

  const handleGenerateCustomRoadmap = () => {
    setIsGeneratingPath(true);
    onUseCredits(40);
    setTimeout(() => {
      setIsGeneratingPath(false);
      setActiveTab('roadmap');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-indigo-950/20 to-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>AI Career & Skill Trajectory</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Skill Matrix & Learning Pathway</h2>
          <p className="text-sm text-gray-300 mt-1 max-w-xl">
            Identify technical skill gaps against current tech market demand and generate a personalized 12-week learning roadmap.
          </p>
        </div>

        <button
          onClick={handleGenerateCustomRoadmap}
          disabled={isGeneratingPath}
          className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-600/30 flex items-center space-x-2 transition-all disabled:opacity-50 shrink-0"
        >
          {isGeneratingPath ? (
            <span>Generating AI Pathway...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Learning Roadmap (40 Credits)</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'matrix'
              ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Skill Gap Matrix ({skills.length})
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'roadmap'
              ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          12-Week AI Learning Pathway
        </button>
      </div>

      {activeTab === 'matrix' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Skill Bars */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-white">Current Competencies vs Target Levels</h3>

            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="glass-card p-5 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-white">{skill.name}</span>
                      <span className="text-xs text-gray-400 ml-2">({skill.category})</span>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      skill.demandTrend === 'Critical'
                        ? 'bg-pink-500/20 text-pink-300 border-pink-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                    }`}>
                      {skill.demandTrend} Demand
                    </span>
                  </div>

                  {/* Level Bars */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Current Proficiency: <strong className="text-white">{skill.currentLevel}%</strong></span>
                      <span>Target Level: <strong className="text-cyan-400">{skill.targetLevel}%</strong></span>
                    </div>

                    <div className="relative w-full bg-slate-900 rounded-full h-3 overflow-hidden">
                      {/* Target background indicator */}
                      <div className="absolute top-0 bottom-0 bg-cyan-900/60 rounded-full" style={{ width: `${skill.targetLevel}%` }}></div>
                      {/* Current progress */}
                      <div className="relative bg-gradient-to-r from-indigo-500 to-cyan-400 h-3 rounded-full" style={{ width: `${skill.currentLevel}%` }}></div>
                    </div>
                  </div>

                  {/* Recommended Courses */}
                  <div className="pt-1 flex items-center space-x-2 text-xs text-gray-400">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Recommended Course: <strong className="text-gray-200">{skill.recommendedCourses[0]}</strong></span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Right Insights */}
          <div className="space-y-6">
            <div className="glass-card p-5 rounded-xl border border-white/10 space-y-4">
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>Market Demand Insights</span>
              </h3>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5 space-y-2 text-xs text-gray-300">
                <span className="font-semibold text-white">Top 1% In-Demand Skill:</span>
                <p>Vector Search Indexing & Hybrid Sparse-Dense Retrieval have seen a <strong>340% increase</strong> in job posting mentions this quarter.</p>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5 space-y-2 text-xs text-gray-300">
                <span className="font-semibold text-white">Estimated Salary Uplift:</span>
                <p>Closing your target skill gap in Vector DBs & LLM MLOps is projected to increase base offer range by <strong>+$25,000/yr</strong>.</p>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Roadmap View */
        <div className="space-y-6">
          <div className="space-y-4">
            {roadmapMilestones.map((ms, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-cyan-500/20 bg-slate-900/60 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-sm">{ms.phase}</h4>
                      <span className="text-xs text-gray-400">{ms.timeframe} • Focus: {ms.focus}</span>
                    </div>
                  </div>

                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                    ms.status === 'In Progress'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-gray-800 text-gray-400 border-gray-700'
                  }`}>
                    {ms.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {ms.modules.map((mod, mIdx) => (
                    <div key={mIdx} className="flex items-center space-x-2 text-xs text-gray-300 p-2.5 bg-slate-950/60 rounded-lg border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
