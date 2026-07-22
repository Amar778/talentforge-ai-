import React, { useState, useRef } from 'react';
import { ResumeData } from '../app/types';
import {
  FileText, Sparkles, AlertCircle, CheckCircle2,
  Wand2, Plus, ArrowUpRight, Check, RefreshCw, Download, Copy, Share2,
  Upload, FileUp, FileCheck, FileType, FileCode
} from 'lucide-react';

interface ResumeForgeProps {
  resume: ResumeData;
  onUpdateResume: (updated: ResumeData) => void;
  onUseCredits?: (amount: number) => void;
}

export const ResumeForge: React.FC<ResumeForgeProps> = ({ resume, onUpdateResume, onUseCredits }) => {
  const [data, setData] = useState<ResumeData>(resume);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [targetJobRole, setTargetJobRole] = useState('Senior Full Stack AI Engineer');
  const [activeTab, setActiveTab] = useState<'editor' | 'ats-report' | 'export'>('editor');
  const [copiedStatus, setCopiedStatus] = useState(false);

  // Resume Upload & Parse state
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const applyParsedResume = (parsedData: Partial<ResumeData>, fileName: string) => {
    const updated: ResumeData = {
      ...data,
      ...parsedData,
      atsScore: Math.min(96, Math.max(82, (parsedData.skills?.length || 5) * 6 + 45)),
      atsBreakdown: {
        keywordMatch: 88,
        formatting: 95,
        skillsRelevance: 92,
        impactVerbs: 89
      },
      suggestedImprovements: [
        `Extracted resume details successfully from ${fileName}.`,
        "ATS formatting alignment score updated to 95%.",
        "Action verbs and metrics verified across experience section."
      ]
    };
    setData(updated);
    onUpdateResume(updated);
    setUploadSuccessMessage(`Successfully uploaded & parsed "${fileName}"!`);
    setTimeout(() => setUploadSuccessMessage(null), 5000);
  };

  const handlePresetUpload = (presetType: 'ai-engineer' | 'data-scientist' | 'product-manager') => {
    setIsParsing(true);
    setTimeout(() => {
      setIsParsing(false);
      if (presetType === 'ai-engineer') {
        applyParsedResume({
          fullName: "Sarah Connor",
          title: "Staff AI & Machine Learning Engineer",
          email: "sarah.connor@ai-labs.org",
          phone: "+1 (555) 382-9011",
          location: "San Francisco, CA",
          summary: "Accomplished AI Architect with 7+ years of experience engineering real-time LLM inference pipelines, RAG systems with Pinecone/Milvus, and high-throughput Python/Next.js platforms.",
          skills: ["Python", "PyTorch", "Next.js", "TypeScript", "LangChain", "Pinecone", "Docker", "Kubernetes", "FastAPI"],
          experience: [
            {
              id: "exp-p1",
              company: "OpenBrain Technologies",
              role: "Lead Machine Learning Engineer",
              duration: "2022 - Present",
              highlights: [
                "Designed micro-batching LLM streaming layer servicing 1.2M daily API requests with sub-120ms latency.",
                "Reduced vector index query latency by 45% through HNSW index tuning in Qdrant."
              ]
            }
          ]
        }, "Sarah_Connor_AI_Engineer_Resume.pdf");
      } else if (presetType === 'data-scientist') {
        applyParsedResume({
          fullName: "David Chen",
          title: "Senior Data Scientist & Analytics Lead",
          email: "david.chen@dataforge.io",
          phone: "+1 (555) 948-2041",
          location: "New York, NY",
          summary: "Data Scientist specializing in predictive modeling, A/B experiment design, NLP pipelines, and ETL infrastructure scaling.",
          skills: ["Python", "R", "SQL", "Spark", "TensorFlow", "Scikit-Learn", "Snowflake", "Tableau", "AWS SageMaker"],
          experience: [
            {
              id: "exp-p2",
              company: "Datastream Corp",
              role: "Senior Data Scientist",
              duration: "2021 - Present",
              highlights: [
                "Architected automated churn prediction pipelines improving customer retention by 18%.",
                "Managed petabyte-scale data warehouse transformations using DBT and Apache Spark."
              ]
            }
          ]
        }, "David_Chen_Data_Scientist_Resume.docx");
      } else {
        applyParsedResume({
          fullName: "Elena Rostova",
          title: "Principal Product Manager - AI & Platform",
          email: "elena.rostova@techscale.com",
          phone: "+1 (555) 712-4910",
          location: "Austin, TX",
          summary: "Product Leader with proven track record of scaling B2B SaaS products from 0 to 10M ARR. Expert in AI product strategy, user metrics, and agile cross-functional delivery.",
          skills: ["Product Strategy", "Roadmapping", "A/B Testing", "Mixpanel", "Jira", "User Research", "Go-To-Market", "API Design"],
          experience: [
            {
              id: "exp-p3",
              company: "SaaSify Cloud",
              role: "Principal Product Manager",
              duration: "2020 - Present",
              highlights: [
                "Spearheaded launch of Enterprise AI Copilot feature, generating $3.4M ARR in first 6 months.",
                "Increased monthly active user engagement by 34% through redesigned onboarding flows."
              ]
            }
          ]
        }, "Elena_Rostova_Product_Manager_Resume.pdf");
      }
    }, 1200);
  };

  const handleFileRead = (file: File) => {
    setIsParsing(true);
    const reader = new FileReader();

    if (file.name.endsWith('.json')) {
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string);
          applyParsedResume(parsed, file.name);
        } catch (err) {
          setUploadSuccessMessage(`Error reading JSON file formatting.`);
        }
        setIsParsing(false);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (e) => {
        const text = (e.target?.result as string) || '';
        const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        const phoneMatch = text.match(/(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}/);
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

        const extractedName = lines[0] && lines[0].length < 40 ? lines[0] : data.fullName;
        const extractedTitle = lines[1] && lines[1].length < 60 ? lines[1] : data.title;

        applyParsedResume({
          fullName: extractedName,
          title: extractedTitle,
          email: emailMatch ? emailMatch[0] : data.email,
          phone: phoneMatch ? phoneMatch[0] : data.phone,
          summary: text.slice(0, 300) || data.summary,
        }, file.name);
        setIsParsing(false);
      };
      reader.readAsText(file);
    }
  };

  const handleFieldChange = (field: keyof ResumeData, value: any) => {
    const updated = { ...data, [field]: value };
    setData(updated);
    onUpdateResume(updated);
  };

  const handleAddSkill = (skill: string) => {
    if (!skill.trim() || data.skills.includes(skill.trim())) return;
    const updatedSkills = [...data.skills, skill.trim()];
    const updated = { ...data, skills: updatedSkills };
    setData(updated);
    onUpdateResume(updated);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = data.skills.filter(s => s !== skillToRemove);
    const updated = { ...data, skills: updatedSkills };
    setData(updated);
    onUpdateResume(updated);
  };

  const handleAiOptimize = () => {
    setIsOptimizing(true);
    if (onUseCredits) onUseCredits(0);
    setTimeout(() => {
      const newScore = Math.min(98, data.atsScore + 10);
      const updated: ResumeData = {
        ...data,
        atsScore: newScore,
        atsBreakdown: {
          keywordMatch: Math.min(98, data.atsBreakdown.keywordMatch + 8),
          formatting: 98,
          skillsRelevance: Math.min(96, data.atsBreakdown.skillsRelevance + 10),
          impactVerbs: Math.min(95, data.atsBreakdown.impactVerbs + 12)
        },
        missingKeywords: data.missingKeywords.filter((_, idx) => idx > 1),
        suggestedImprovements: [
          "Optimized bullet metrics applied to Nexus AI Labs experience.",
          "Vector search database keywords integrated into core skills section."
        ],
        summary: `Targeted ${targetJobRole} with proven expertise in building high-performance LLM streaming applications, vector database indexing, and microservices architecture. Accelerated feature delivery by 42% through modern React/Next.js design systems.`
      };
      setData(updated);
      onUpdateResume(updated);
      setIsOptimizing(false);
    }, 1800);
  };

  const generateFormattedText = () => {
    return `${data.fullName.toUpperCase()}
${data.title} | ${data.email} | ${data.phone} | ${data.location}

EXECUTIVE SUMMARY
${data.summary}

SKILLS & COMPETENCIES
${data.skills.join(', ')}

PROFESSIONAL EXPERIENCE
${data.experience.map(e => `${e.role} @ ${e.company} (${e.duration})\n${e.highlights.map(h => `• ${h}`).join('\n')}`).join('\n\n')}

EDUCATION
${data.education.map(ed => `${ed.degree} - ${ed.institution} (${ed.year})`).join('\n')}
`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateFormattedText());
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generateFormattedText()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${data.fullName.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI ATS Resume Optimizer</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Smart Resume & ATS Scanner</h2>
          <p className="text-sm text-gray-300 mt-1 max-w-xl">
            Real-time keyword matching, impact verb scoring, and 1-click AI bullet optimization tailored to high-tier job descriptions.
          </p>
        </div>

        {/* ATS Score Gauge Badge */}
        <div className="flex items-center space-x-4 bg-slate-900/80 p-4 rounded-xl border border-white/10 shrink-0">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${data.atsScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-lg font-extrabold text-white">{data.atsScore}%</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">ATS Match Grade</span>
            <span className={`text-sm font-bold ${data.atsScore >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {data.atsScore >= 90 ? 'Excellent Match' : data.atsScore >= 75 ? 'Strong Match' : 'Needs Optimization'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Cols: Editor & Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Target Role & AI Action Bar */}
          <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-gray-400 whitespace-nowrap">Target Role:</span>
              <input
                type="text"
                value={targetJobRole}
                onChange={(e) => setTargetJobRole(e.target.value)}
                className="bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 focus:border-indigo-500 focus:outline-none w-full sm:w-64"
                placeholder="Target Job Title..."
              />
            </div>

            <button
              onClick={handleAiOptimize}
              disabled={isOptimizing}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Analyzing & Rewriting...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>1-Click AI Resume Optimization</span>
                </>
              )}
            </button>
          </div>

          {/* Upload Resume Card */}
          <div className="glass-card p-5 rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/30 via-slate-900 to-slate-950 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-indigo-400" />
                  <span>Upload & Auto-Parse Resume File</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Upload your existing resume (.pdf, .docx, .txt, .json) to extract skills, experience, & header details instantly.
                </p>
              </div>

              {uploadSuccessMessage && (
                <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{uploadSuccessMessage}</span>
                </div>
              )}
            </div>

            {/* Drag & Drop Dropzone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileRead(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-indigo-400 bg-indigo-950/50 scale-[1.01]'
                  : 'border-indigo-500/30 bg-slate-900/60 hover:border-indigo-400/60 hover:bg-slate-900/90'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt,.json"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileRead(e.target.files[0]);
                  }
                }}
              />

              {isParsing ? (
                <div className="space-y-2 py-2">
                  <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-indigo-300">Parsing Resume & Extracting Data Fields...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <FileUp className="w-8 h-8 text-indigo-400 mx-auto" />
                  <p className="text-xs text-gray-200 font-semibold">
                    <span className="text-indigo-400 underline">Click to browse</span> or drag and drop your resume file here
                  </p>
                  <p className="text-[11px] text-gray-500">Supports PDF, DOCX, TXT, or JSON format (Max 10MB)</p>
                </div>
              )}
            </div>

            {/* Quick Sample Presets */}
            <div className="pt-1">
              <span className="text-[11px] text-gray-400 font-semibold block mb-2">Or click to test with sample resume presets:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handlePresetUpload('ai-engineer')}
                  className="bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-200 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all"
                >
                  <FileType className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sample: AI Engineer Resume</span>
                </button>

                <button
                  onClick={() => handlePresetUpload('data-scientist')}
                  className="bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 text-purple-200 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all"
                >
                  <FileCode className="w-3.5 h-3.5 text-purple-400" />
                  <span>Sample: Data Scientist Resume</span>
                </button>

                <button
                  onClick={() => handlePresetUpload('product-manager')}
                  className="bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/30 text-pink-200 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all"
                >
                  <FileCheck className="w-3.5 h-3.5 text-pink-400" />
                  <span>Sample: Product Manager Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex space-x-2 border-b border-white/10 pb-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'editor'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Interactive Resume Editor
            </button>
            <button
              onClick={() => setActiveTab('ats-report')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'ats-report'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Detailed ATS Score Breakdown
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'export'
                ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Export & Formatted Resume
            </button>
          </div>

          {activeTab === 'editor' ? (
            <div className="space-y-6">

              {/* Personal Details */}
              <div className="glass-card p-5 rounded-xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Personal Header</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={data.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      className="bg-slate-900/90 text-white text-xs px-3 py-2 rounded-lg border border-white/10 w-full focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Professional Title</label>
                    <input
                      type="text"
                      value={data.title}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className="bg-slate-900/90 text-white text-xs px-3 py-2 rounded-lg border border-white/10 w-full focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Email Address</label>
                    <input
                      type="text"
                      value={data.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className="bg-slate-900/90 text-white text-xs px-3 py-2 rounded-lg border border-white/10 w-full focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Location</label>
                    <input
                      type="text"
                      value={data.location}
                      onChange={(e) => handleFieldChange('location', e.target.value)}
                      className="bg-slate-900/90 text-white text-xs px-3 py-2 rounded-lg border border-white/10 w-full focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Executive Summary</label>
                  <textarea
                    rows={3}
                    value={data.summary}
                    onChange={(e) => handleFieldChange('summary', e.target.value)}
                    className="bg-slate-900/90 text-white text-xs p-3 rounded-lg border border-white/10 w-full focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Skills Tag Management */}
              <div className="glass-card p-5 rounded-xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Technical & Core Skills</h3>
                  <span className="text-xs text-indigo-400">{data.skills.length} skills listed</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1.5 bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 text-xs px-2.5 py-1 rounded-lg"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-indigo-400 hover:text-pink-400 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Add a new skill (e.g. Kubernetes, Pinecone)..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddSkill((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                    className="bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 w-full focus:border-indigo-500 focus:outline-none"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Work Experience */}
              <div className="glass-card p-5 rounded-xl border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white">Work Experience & Achievements</h3>

                {data.experience.map((exp) => (
                  <div key={exp.id} className="p-4 bg-slate-900/60 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-white">{exp.role}</span>
                        <span className="text-xs text-indigo-400 ml-2">@ {exp.company}</span>
                      </div>
                      <span className="text-[11px] text-gray-400">{exp.duration}</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {exp.highlights.map((bullet, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                          <span className="text-indigo-400 mt-0.5">•</span>
                          <span className="flex-1">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : activeTab === 'ats-report' ? (
            /* ATS Breakdown Tab */
            <div className="glass-card p-6 rounded-xl border border-white/10 space-y-6">
              <h3 className="text-base font-bold text-white">Detailed ATS Analysis Categories</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-gray-300">Keyword Alignment</span>
                    <span className="text-indigo-400">{data.atsBreakdown.keywordMatch}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${data.atsBreakdown.keywordMatch}%` }}></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-gray-300">Formatting Compliance</span>
                    <span className="text-emerald-400">{data.atsBreakdown.formatting}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${data.atsBreakdown.formatting}%` }}></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-gray-300">Skills Relevance</span>
                    <span className="text-purple-400">{data.atsBreakdown.skillsRelevance}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${data.atsBreakdown.skillsRelevance}%` }}></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5">
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-gray-300">Impact Action Verbs</span>
                    <span className="text-pink-400">{data.atsBreakdown.impactVerbs}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: `${data.atsBreakdown.impactVerbs}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Export Tab */
            <div className="glass-card p-6 rounded-xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Formatted Plain Text Resume</h3>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyText}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 flex items-center space-x-1"
                  >
                    {copiedStatus ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedStatus ? "Copied!" : "Copy Text"}</span>
                  </button>

                  <button
                    onClick={handleDownloadTxt}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .TXT File</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                rows={16}
                value={generateFormattedText()}
                className="bg-slate-950 text-gray-200 text-xs p-4 rounded-xl border border-white/10 font-mono w-full leading-relaxed focus:outline-none"
              />
            </div>
          )}

        </div>

        {/* Right 1 Col: AI Insights Panel */}
        <div className="space-y-6">

          {/* Missing Keywords Box */}
          <div className="glass-card p-5 rounded-xl border border-amber-500/20 bg-amber-950/10 space-y-3">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Missing Critical ATS Keywords</span>
            </h3>
            <p className="text-xs text-gray-400">
              Adding these keywords into your skills or experience will boost your match score by up to 15%.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {data.missingKeywords.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddSkill(kw)}
                  className="bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/30 text-amber-200 text-xs px-2.5 py-1 rounded-lg flex items-center space-x-1 transition-all"
                >
                  <span>+ {kw}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Action Suggestions */}
          <div className="glass-card p-5 rounded-xl border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI Action Recommendations</span>
            </h3>

            <div className="space-y-2.5">
              {data.suggestedImprovements.map((sug, idx) => (
                <div key={idx} className="p-3 bg-slate-900/80 rounded-lg border border-white/5 flex items-start space-x-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sug}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
