'use client';

import React, { useState } from 'react';
import { JobPost } from '../app/types';
import { sampleJobPosts } from '../app/mockData';
import { Briefcase, Wand2, ShieldCheck, DollarSign, Plus, CheckCircle2, Sparkles, RefreshCw, Calculator, TrendingUp } from 'lucide-react';

interface JobPostStudioProps {
  onUseCredits: (amount: number) => void;
}

export const JobPostStudio: React.FC<JobPostStudioProps> = ({ onUseCredits }) => {
  const [jobPosts, setJobPosts] = useState<JobPost[]>(sampleJobPosts);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [techStack, setTechStack] = useState('TypeScript, Next.js, Python, Vector DBs');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [biasScore, setBiasScore] = useState<number | null>(null);

  // Salary Calculator State
  const [calcRole, setCalcRole] = useState('Senior AI Engineer');
  const [calcLocation, setCalcLocation] = useState('SF / Bay Area');
  const [calcSeniority, setCalcSeniority] = useState('Senior (5-8 yrs)');
  const [calcBaseMin, setCalcBaseMin] = useState(190000);
  const [calcBaseMax, setCalcBaseMax] = useState(235000);
  const [calcEquity, setCalcEquity] = useState('0.15% - 0.35%');

  const handleRecalculateSalary = (role: string, loc: string, sen: string) => {
    setCalcRole(role);
    setCalcLocation(loc);
    setCalcSeniority(sen);

    let mult = 1.0;
    if (loc.includes('SF')) mult = 1.25;
    else if (loc.includes('NY')) mult = 1.20;
    else if (loc.includes('Austin')) mult = 1.05;
    else mult = 1.0;

    let base = 150000;
    if (sen.includes('Senior')) base = 180000;
    if (sen.includes('Principal')) base = 220000;

    const minVal = Math.round(base * mult);
    const maxVal = Math.round((base + 45000) * mult);
    setCalcBaseMin(minVal);
    setCalcBaseMax(maxVal);

    if (sen.includes('Principal')) setCalcEquity('0.30% - 0.75%');
    else if (sen.includes('Senior')) setCalcEquity('0.15% - 0.40%');
    else setCalcEquity('0.05% - 0.15%');
  };

  const handleAiGenerateJob = () => {
    if (!title.trim()) return;
    setIsGenerating(true);
    onUseCredits(60);
    setTimeout(() => {
      setIsGenerating(false);
      setBiasScore(97);
      setGeneratedDescription(
        `We are looking for a ${title} to join our ${department} team in ${location}. In this role, you will lead the architecture and deployment of scalable AI applications using ${techStack}. We foster an inclusive, high-ownership engineering culture with competitive compensation.`
      );
    }, 1600);
  };

  const handlePublishJob = () => {
    if (!title.trim()) return;
    const newJob: JobPost = {
      id: `job-${Date.now()}`,
      title,
      department,
      location,
      type: 'Full-Time',
      salaryRange: `$${(calcBaseMin/1000).toFixed(0)}k - $${(calcBaseMax/1000).toFixed(0)}k`,
      applicantsCount: 0,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      description: generatedDescription || `Senior role for ${title}`,
      requiredSkills: techStack.split(',').map(s => s.trim()),
      biasAuditScore: biasScore || 95
    };
    setJobPosts([newJob, ...jobPosts]);
    setTitle('');
    setGeneratedDescription('');
    setBiasScore(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-pink-950/20 to-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>AI Job Description & Bias Audit Studio</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Smart AI Job Studio</h2>
          <p className="text-sm text-gray-300 mt-1 max-w-xl">
            Generate high-converting, inclusive job posts with built-in gender-bias audits and real-time salary benchmarks.
          </p>
        </div>
      </div>

      {/* Main Grid: Creator + Published list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Creator 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Prompt-Driven AI Job Creator</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Job Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (e.target.value.length > 3) handleRecalculateSalary(e.target.value, calcLocation, calcSeniority);
                  }}
                  placeholder="e.g. Lead AI Platform Engineer"
                  className="bg-slate-900/90 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 w-full focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="bg-slate-900 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 w-full focus:border-purple-500 focus:outline-none"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="AI Research">AI Research</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Location Market</label>
                <select
                  value={calcLocation}
                  onChange={(e) => handleRecalculateSalary(calcRole, e.target.value, calcSeniority)}
                  className="bg-slate-900 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 w-full focus:border-purple-500 focus:outline-none"
                >
                  <option value="SF / Bay Area">SF / Bay Area</option>
                  <option value="New York, NY">New York, NY</option>
                  <option value="Austin, TX">Austin, TX</option>
                  <option value="Remote (US)">Remote (US)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Required Tech Stack (Comma Separated)</label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  className="bg-slate-900/90 text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 w-full focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleAiGenerateJob}
              disabled={isGenerating || !title.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 flex items-center space-x-2 transition-all disabled:opacity-40"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Generating Description & Bias Audit...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Job Description & Bias Audit (60 Credits)</span>
                </>
              )}
            </button>

            {generatedDescription && (
              <div className="pt-4 space-y-4 border-t border-white/10">
                
                {/* Bias score pill */}
                {biasScore && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs">
                    <span className="flex items-center space-x-1.5 text-emerald-300 font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Inclusive Bias Audit Pass</span>
                    </span>
                    <span className="font-bold text-white bg-emerald-900/60 px-2.5 py-0.5 rounded-md">
                      {biasScore}% Inclusive Score
                    </span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs text-gray-400 block font-semibold">Generated Job Description Preview</label>
                  <textarea
                    rows={4}
                    value={generatedDescription}
                    onChange={(e) => setGeneratedDescription(e.target.value)}
                    className="bg-slate-900/90 text-white text-xs p-3 rounded-xl border border-white/10 w-full leading-relaxed focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handlePublishJob}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-lg flex items-center space-x-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Active Job Post</span>
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* AI Compensation Benchmark Calculator Card */}
          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>AI Market Compensation Benchmark</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block">Base Salary Range</span>
                <span className="text-base font-extrabold text-emerald-400 mt-1 block">
                  ${(calcBaseMin/1000).toFixed(0)}k - ${(calcBaseMax/1000).toFixed(0)}k
                </span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block">Estimated Equity Package</span>
                <span className="text-base font-extrabold text-purple-300 mt-1 block">{calcEquity}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-400 block">Market Demand Tier</span>
                <span className="text-base font-extrabold text-pink-400 mt-1 block">Top 1% High</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Active Job Listings */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white">Active Job Listings ({jobPosts.length})</h3>

          <div className="space-y-3">
            {jobPosts.map((job) => (
              <div key={job.id} className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-white">{job.title}</h4>
                    <span className="text-[11px] text-purple-400">{job.department} • {job.location}</span>
                  </div>

                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    {job.applicantsCount} Applicants
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/5">
                  <span>Salary: <strong className="text-emerald-400">{job.salaryRange}</strong></span>
                  <span className="text-emerald-400 font-semibold">{job.biasAuditScore}% Inclusive</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
