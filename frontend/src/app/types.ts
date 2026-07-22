export type UserRole = 'candidate' | 'recruiter';

export interface ResumeData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: {
    id: string;
    role: string;
    company: string;
    duration: string;
    highlights: string[];
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    year: string;
  }[];
  atsScore: number;
  atsBreakdown: {
    keywordMatch: number;
    formatting: number;
    skillsRelevance: number;
    impactVerbs: number;
  };
  missingKeywords: string[];
  suggestedImprovements: string[];
}

export interface MockInterviewScenario {
  id: string;
  roleTitle: string;
  category: 'Software Engineering' | 'Product Management' | 'Data & AI' | 'Executive Leader';
  difficulty: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead / Director';
  totalQuestions: number;
  estimatedTimeMinutes: number;
  description: string;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  idealAnswerKeypoints: string[];
  hint: string;
}

export interface InterviewFeedback {
  technicalScore: number;
  communicationScore: number;
  structureScore: number;
  overallScore: number;
  strengths: string[];
  areasToImprove: string[];
  improvedSampleAnswer: string;
}

export interface SkillItem {
  name: string;
  currentLevel: number; // 0 - 100
  targetLevel: number;
  category: string;
  demandTrend: 'High' | 'Very High' | 'Critical';
  recommendedCourses: string[];
}

export interface CandidateProfile {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  matchScore: number; // 0-100%
  experienceYears: number;
  location: string;
  salaryExpectation: string;
  skills: string[];
  highlights: string[];
  status: 'New' | 'Screened' | 'Interviewed' | 'Offered' | 'Archived';
  resumeSummary: string;
  matchBreakdown: {
    skillMatch: number;
    experienceMatch: number;
    cultureMatch: number;
  };
}

export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-Time' | 'Remote' | 'Hybrid';
  salaryRange: string;
  applicantsCount: number;
  status: 'Active' | 'Draft' | 'Closed';
  createdDate: string;
  description: string;
  requiredSkills: string[];
  biasAuditScore: number; // 0-100%
}
