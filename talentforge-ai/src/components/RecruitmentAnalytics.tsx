'use client';

import React from 'react';
import { BarChart3, Users, Clock, Award, TrendingUp, CheckCircle2, Zap } from 'lucide-react';

export const RecruitmentAnalytics: React.FC = () => {
  const funnelMetrics = [
    { label: "Total Applications", count: 248, percentage: 100, color: "from-indigo-600 to-indigo-500" },
    { label: "AI ATS Screened", count: 132, percentage: 53, color: "from-purple-600 to-purple-500" },
    { label: "AI Interview Completed", count: 45, percentage: 18, color: "from-pink-600 to-pink-500" },
    { label: "Final Offer Sent", count: 12, percentage: 5, color: "from-emerald-600 to-emerald-500" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>AI Talent Pipeline & Intelligence</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Recruitment Performance & Analytics</h2>
          <p className="text-sm text-gray-300 mt-1 max-w-xl">
            Real-time pipeline speed, time-to-hire metrics, candidate quality index, and sourcing channel metrics.
          </p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Total Sourced Applicants</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white">248</span>
            <span className="text-xs text-emerald-400 font-semibold">+24% vs last month</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Avg. Candidate Match Index</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-purple-300">89.4%</span>
            <span className="text-xs text-emerald-400 font-semibold">+6.2% quality bump</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Avg. Time to Hire</span>
            <Clock className="w-4 h-4 text-pink-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-pink-300">14.2 Days</span>
            <span className="text-xs text-emerald-400 font-semibold">58% faster than avg</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Recruiter Time Saved</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-amber-300">42 hrs/wk</span>
            <span className="text-xs text-gray-400 font-semibold">via AI Auto-Screen</span>
          </div>
        </div>

      </div>

      {/* Recruitment Funnel Visualizer */}
      <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
        <h3 className="text-base font-bold text-white">Recruitment Pipeline Conversion Funnel</h3>

        <div className="space-y-4">
          {funnelMetrics.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-200">{item.label}</span>
                <span className="text-gray-400">{item.count} Candidates ({item.percentage}%)</span>
              </div>

              <div className="w-full bg-slate-900 rounded-xl h-4 overflow-hidden p-0.5 border border-white/5">
                <div
                  className={`bg-gradient-to-r ${item.color} h-full rounded-lg transition-all duration-1000`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
