'use client';

import React, { useState } from 'react';
import { CandidateProfile } from '../app/types';
import { sampleCandidates } from '../app/mockData';
import { 
  Users, Search, Filter, Sparkles, CheckCircle2, 
  MapPin, DollarSign, Briefcase, Eye, ChevronRight, X, UserCheck, ArrowRightLeft
} from 'lucide-react';

interface CandidateMatcherProps {
  onUseCredits: (amount: number) => void;
}

export const CandidateMatcher: React.FC<CandidateMatcherProps> = ({ onUseCredits }) => {
  const [candidates, setCandidates] = useState<CandidateProfile[]>(sampleCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [minScore, setMinScore] = useState<number>(80);
  const [activeCandidate, setActiveCandidate] = useState<CandidateProfile | null>(null);
  const [isScreening, setIsScreening] = useState(false);
  const [comparedCandidateIds, setComparedCandidateIds] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    const matchesScore = c.matchScore >= minScore;
    return matchesSearch && matchesStatus && matchesScore;
  });

  const handleRunAiBatchScreen = () => {
    setIsScreening(true);
    onUseCredits(75);
    setTimeout(() => {
      setIsScreening(false);
      setCandidates(candidates.map(c => {
        if (c.id === 'cand-2') return { ...c, status: 'Screened', matchScore: 93 };
        return c;
      }));
    }, 1800);
  };

  const handleStatusChange = (candId: string, newStatus: CandidateProfile['status']) => {
    setCandidates(candidates.map(c => c.id === candId ? { ...c, status: newStatus } : c));
    if (activeCandidate && activeCandidate.id === candId) {
      setActiveCandidate({ ...activeCandidate, status: newStatus });
    }
  };

  const toggleCompare = (candId: string) => {
    if (comparedCandidateIds.includes(candId)) {
      setComparedCandidateIds(comparedCandidateIds.filter(id => id !== candId));
    } else {
      if (comparedCandidateIds.length >= 2) {
        setComparedCandidateIds([comparedCandidateIds[1], candId]);
      } else {
        setComparedCandidateIds([...comparedCandidateIds, candId]);
      }
    }
  };

  const comparedCandidates = candidates.filter(c => comparedCandidateIds.includes(c.id));

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-pink-500/20 bg-gradient-to-r from-pink-950/40 via-purple-950/20 to-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-pink-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>AI Candidate Ranker & Semantic Screener</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Smart AI Candidate Matcher</h2>
          <p className="text-sm text-gray-300 mt-1 max-w-xl">
            Semantic vector scoring evaluates applicant resumes against your exact Job Description parameters with contextual match reasoning.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          {comparedCandidateIds.length >= 2 && (
            <button
              onClick={() => setShowComparisonModal(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2 transition-all"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Compare ({comparedCandidateIds.length}) Side-by-Side</span>
            </button>
          )}

          <button
            onClick={handleRunAiBatchScreen}
            disabled={isScreening}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-pink-600/30 flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            {isScreening ? (
              <span>AI Batch Screening In Progress...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Batch Screener (75 Credits)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, title, or skill..."
            className="bg-slate-900/90 text-white text-xs pl-9 pr-3 py-2 rounded-lg border border-white/10 w-full focus:border-pink-500 focus:outline-none"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs text-gray-400 mr-1 hidden sm:inline">Status:</span>
          {['All', 'New', 'Screened', 'Interviewed', 'Offered'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === st
                  ? 'bg-pink-600/30 text-pink-300 border border-pink-500/30'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Min Score Slider */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-gray-400 whitespace-nowrap">Min Match: <strong className="text-white">{minScore}%</strong></span>
          <input
            type="range"
            min={60}
            max={95}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="accent-pink-500 cursor-pointer w-24 sm:w-32"
          />
        </div>

      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCandidates.map((cand) => {
          const isSelectedForCompare = comparedCandidateIds.includes(cand.id);

          return (
            <div
              key={cand.id}
              className={`glass-card glass-card-hover p-6 rounded-2xl border space-y-4 flex flex-col justify-between transition-all ${
                isSelectedForCompare ? 'border-purple-500 ring-2 ring-purple-500/20 bg-purple-950/20' : 'border-white/10'
              }`}
            >
              <div>
                {/* Header Avatar & Match Score */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={cand.avatarUrl}
                      alt={cand.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-pink-500/30"
                    />
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight">{cand.name}</h3>
                      <p className="text-xs text-pink-400 font-medium">{cand.title}</p>
                    </div>
                  </div>

                  {/* Match Badge */}
                  <div className="bg-pink-950/60 border border-pink-500/30 px-3 py-1 rounded-xl text-center">
                    <span className="text-base font-extrabold text-pink-300">{cand.matchScore}%</span>
                    <span className="text-[9px] text-gray-400 block uppercase font-semibold">AI Match</span>
                  </div>
                </div>

                {/* Quick Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-3 border-t border-white/5 mt-3">
                  <span className="flex items-center space-x-1">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{cand.experienceYears} Years Exp</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{cand.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{cand.salaryExpectation}</span>
                  </span>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {cand.skills.slice(0, 5).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-slate-900 text-gray-300 text-[11px] px-2.5 py-0.5 rounded-md border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                  {cand.skills.length > 5 && (
                    <span className="text-[10px] text-gray-400 font-medium py-0.5">+{cand.skills.length - 5} more</span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    cand.status === 'Offered' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                    cand.status === 'Interviewed' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                    cand.status === 'Screened' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' :
                    'bg-gray-800 text-gray-300 border-gray-700'
                  }`}>
                    {cand.status}
                  </span>

                  <button
                    onClick={() => toggleCompare(cand.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                      isSelectedForCompare 
                        ? 'bg-purple-600 text-white border-purple-500' 
                        : 'bg-white/5 text-gray-400 hover:text-white border-white/10'
                    }`}
                  >
                    {isSelectedForCompare ? "✓ Compare Selected" : "+ Compare"}
                  </button>
                </div>

                <button
                  onClick={() => setActiveCandidate(cand)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center space-x-1 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Card</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showComparisonModal && comparedCandidates.length >= 2 && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-4xl w-full rounded-2xl border border-white/15 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <ArrowRightLeft className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Side-by-Side Candidate Comparison</h3>
              </div>

              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid 2 Candidates */}
            <div className="grid grid-cols-2 gap-6">
              {comparedCandidates.map((c) => (
                <div key={c.id} className="p-5 bg-slate-900/80 rounded-xl border border-white/10 space-y-4">
                  <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                    <img src={c.avatarUrl} alt={c.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-base">{c.name}</h4>
                      <p className="text-xs text-pink-400">{c.title}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-pink-950/30 border border-pink-500/20 rounded-lg text-center">
                    <span className="text-2xl font-extrabold text-pink-300">{c.matchScore}%</span>
                    <span className="text-[10px] text-gray-400 block uppercase">Overall AI Match</span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-300">
                    <p><strong>Experience:</strong> {c.experienceYears} Years</p>
                    <p><strong>Location:</strong> {c.location}</p>
                    <p><strong>Salary Expectation:</strong> {c.salaryExpectation}</p>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-gray-400 font-semibold block">Skills Breakdown:</span>
                    <div className="flex flex-wrap gap-1">
                      {c.skills.map((s, idx) => (
                        <span key={idx} className="bg-white/5 text-gray-300 text-[10px] px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-gray-400 font-semibold block">Highlights:</span>
                    <ul className="list-disc list-inside text-gray-300 space-y-0.5">
                      {c.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-white/10"
              >
                Close Comparison
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Candidate Modal */}
      {activeCandidate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-2xl w-full rounded-2xl border border-white/15 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={activeCandidate.avatarUrl}
                  alt={activeCandidate.name}
                  className="w-14 h-14 rounded-xl object-cover ring-2 ring-pink-500/40"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{activeCandidate.name}</h3>
                  <p className="text-xs text-pink-400 font-semibold">{activeCandidate.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activeCandidate.location}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveCandidate(null)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Breakdown */}
            <div className="p-4 bg-pink-950/20 border border-pink-500/30 rounded-xl space-y-3">
              <span className="text-xs font-bold text-pink-300 block uppercase tracking-wider">AI Semantic Match Analysis</span>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 bg-slate-900/60 rounded-lg">
                  <span className="text-[10px] text-gray-400 block">Skills Match</span>
                  <span className="text-sm font-bold text-white">{activeCandidate.matchBreakdown.skillMatch}%</span>
                </div>
                <div className="p-2 bg-slate-900/60 rounded-lg">
                  <span className="text-[10px] text-gray-400 block">Experience Match</span>
                  <span className="text-sm font-bold text-white">{activeCandidate.matchBreakdown.experienceMatch}%</span>
                </div>
                <div className="p-2 bg-slate-900/60 rounded-lg">
                  <span className="text-[10px] text-gray-400 block">Culture Match</span>
                  <span className="text-sm font-bold text-white">{activeCandidate.matchBreakdown.cultureMatch}%</span>
                </div>
              </div>
            </div>

            {/* Resume Summary & Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Executive Summary</h4>
              <p className="text-xs text-gray-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-white/5">
                {activeCandidate.resumeSummary}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Key Highlights & Achievements</h4>
              <div className="space-y-2">
                {activeCandidate.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-gray-300 p-2.5 bg-slate-900/40 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Change Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Update Pipeline Status:</span>
                <select
                  value={activeCandidate.status}
                  onChange={(e) => handleStatusChange(activeCandidate.id, e.target.value as any)}
                  className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 focus:border-pink-500 focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Screened">Screened</option>
                  <option value="Interviewed">Interviewed</option>
                  <option value="Offered">Offered</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <button
                onClick={() => setActiveCandidate(null)}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-lg shadow-pink-600/30"
              >
                Save & Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
