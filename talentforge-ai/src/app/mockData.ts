import { ResumeData, MockInterviewScenario, InterviewQuestion, SkillItem, CandidateProfile, JobPost } from './types';

export const initialResume: ResumeData = {
  fullName: "Alex Rivera",
  title: "Senior Full Stack AI Engineer",
  email: "alex.rivera@talentforge.ai",
  phone: "+1 (555) 234-8901",
  location: "San Francisco, CA (Hybrid)",
  summary: "Results-driven Software Engineer with 6+ years of experience designing scalable web applications, integrating LLMs, and building microservices architectures. Passionate about AI-assisted developer workflows and high-performance frontend engineering.",
  skills: [
    "TypeScript", "React / Next.js", "Node.js", "Python", "PyTorch", "Tailwind CSS",
    "GraphQL", "PostgreSQL", "Docker", "AWS", "LLM Fine-tuning", "REST APIs"
  ],
  experience: [
    {
      id: "exp-1",
      role: "Lead Frontend AI Engineer",
      company: "Nexus AI Labs",
      duration: "2023 - Present",
      highlights: [
        "Engineered real-time streaming LLM response interface reducing latency perception by 42%.",
        "Architected modular micro-frontend design system used across 8 internal core product lines.",
        "Mentored junior and mid-level engineers, reducing sprint feature delivery cycle times by 30%."
      ]
    },
    {
      id: "exp-2",
      role: "Senior Software Engineer",
      company: "CloudScale Systems",
      duration: "2020 - 2023",
      highlights: [
        "Built distributed GraphQL gateway serving 15M+ daily requests with 99.99% uptime.",
        "Optimized client-side bundle size by 38% using code-splitting and dynamic imports in React."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.S. in Computer Science & Artificial Intelligence",
      institution: "Stanford University",
      year: "2016 - 2020"
    }
  ],
  atsScore: 84,
  atsBreakdown: {
    keywordMatch: 88,
    formatting: 95,
    skillsRelevance: 82,
    impactVerbs: 76
  },
  missingKeywords: [
    "Kubernetes", "Vector Databases (Pinecone/Chroma)", "CI/CD Pipelines", "Redis Caching", "System Architecture"
  ],
  suggestedImprovements: [
    "Quantify impact in lead role using concrete metrics (e.g., revenue increase or user growth).",
    "Include specific vector database frameworks used for AI integration.",
    "Add explicit CI/CD toolchain mentions like GitHub Actions or Terraform."
  ]
};

export const interviewScenarios: MockInterviewScenario[] = [
  {
    id: "tech-lead-ai",
    roleTitle: "Senior AI / Full Stack Engineer",
    category: "Software Engineering",
    difficulty: "Senior",
    totalQuestions: 4,
    estimatedTimeMinutes: 15,
    description: "Deep dive into system design, LLM orchestration, state management, and real-time frontend streaming."
  },
  {
    id: "pm-ai-prod",
    roleTitle: "Lead Product Manager - AI & Data",
    category: "Product Management",
    difficulty: "Senior",
    totalQuestions: 4,
    estimatedTimeMinutes: 18,
    description: "Evaluates product vision, metric prioritization, GTM strategies, and managing non-deterministic AI features."
  },
  {
    id: "data-sci-ml",
    roleTitle: "Machine Learning / RAG Specialist",
    category: "Data & AI",
    difficulty: "Lead / Director",
    totalQuestions: 4,
    estimatedTimeMinutes: 20,
    description: "Assesses knowledge in vector search indexing, chunking strategies, prompt engineering, and evaluation benchmarks."
  }
];

export const sampleInterviewQuestions: Record<string, InterviewQuestion[]> = {
  "tech-lead-ai": [
    {
      id: 1,
      question: "How would you architect a real-time web interface that streams token responses from an LLM server while maintaining UI stability and low latency?",
      category: "System Architecture",
      idealAnswerKeypoints: ["Server-Sent Events (SSE) or WebSockets", "Custom streaming buffer", "Throttled React state updates", "Error recovery fallback"],
      hint: "Focus on browser rendering performance, handling network dropouts, and reducing re-renders during high-frequency stream events."
    },
    {
      id: 2,
      question: "Can you describe a scenario where you had to optimize frontend dynamic state rendering for high-frequency user interactions?",
      category: "Frontend Performance",
      idealAnswerKeypoints: ["Debouncing / Throttling", "Zustand / Redux selectors", "UseMemo / UseCallback", "Virtualization"],
      hint: "Detail the bottleneck metrics (e.g., FPS drops, layout shifts) and how your solution resolved it."
    },
    {
      id: 3,
      question: "How do you evaluate and prevent prompt injection attacks when building customer-facing AI agents?",
      category: "Security & AI Safety",
      idealAnswerKeypoints: ["Input sanitization layer", "System prompt isolation", "Output verification filters", "RAG query constraints"],
      hint: "Discuss both defensive input validation and guardrails on generated outputs."
    },
    {
      id: 4,
      question: "Tell me about a time you had to handle an architectural disagreement within your engineering team regarding tech stack selection.",
      category: "Behavioral & Leadership",
      idealAnswerKeypoints: ["Data-driven benchmarks", "POC creation", "Active listening", "Consensus building"],
      hint: "Use the STAR method (Situation, Task, Action, Result) to structure your response."
    }
  ]
};

export const initialSkillsList: SkillItem[] = [
  {
    name: "LLM Orchestration (LangChain / LlamaIndex)",
    currentLevel: 85,
    targetLevel: 95,
    category: "AI & ML",
    demandTrend: "Critical",
    recommendedCourses: ["Advanced RAG Architectures", "Prompt Engineering Mastery"]
  },
  {
    name: "Next.js 14 App Router & Server Actions",
    currentLevel: 90,
    targetLevel: 98,
    category: "Frontend",
    demandTrend: "Very High",
    recommendedCourses: ["Next.js Enterprise Design Patterns"]
  },
  {
    name: "Vector Databases & Semantic Search",
    currentLevel: 65,
    targetLevel: 90,
    category: "Database & AI",
    demandTrend: "Critical",
    recommendedCourses: ["Pinecone & Qdrant Deep Dive", "Embeddings & Distance Metrics"]
  },
  {
    name: "System Design & Distributed Microservices",
    currentLevel: 78,
    targetLevel: 92,
    category: "Architecture",
    demandTrend: "High",
    recommendedCourses: ["Grokking Modern System Design"]
  },
  {
    name: "Docker & Kubernetes Deployment",
    currentLevel: 60,
    targetLevel: 85,
    category: "DevOps",
    demandTrend: "High",
    recommendedCourses: ["Kubernetes for Developers Hands-on"]
  }
];

export const sampleCandidates: CandidateProfile[] = [
  {
    id: "cand-1",
    name: "Dr. Elena Rostova",
    title: "Principal AI Research Scientist",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop",
    matchScore: 96,
    experienceYears: 8,
    location: "San Francisco, CA",
    salaryExpectation: "$210,000 - $240,000",
    skills: ["PyTorch", "Transformer Models", "NLP", "Python", "Vector Databases", "Distributed Training"],
    highlights: ["Ph.D. in Computer Science", "Published 6 IEEE papers on Attention Mechanisms", "Built enterprise RAG engine"],
    status: "Screened",
    resumeSummary: "Expert AI researcher specializing in fine-tuning open-source LLMs and scalable vector indexing systems.",
    matchBreakdown: {
      skillMatch: 98,
      experienceMatch: 94,
      cultureMatch: 96
    }
  },
  {
    id: "cand-2",
    name: "Marcus Vance",
    title: "Senior Full Stack AI Developer",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
    matchScore: 91,
    experienceYears: 6,
    location: "New York, NY (Remote)",
    salaryExpectation: "$180,000 - $200,000",
    skills: ["TypeScript", "Next.js", "Node.js", "Python", "FastAPI", "Tailwind CSS", "PostgreSQL"],
    highlights: ["Led engineering team of 5", "Created custom streaming UI component library", "Reduced AWS infra costs by 28%"],
    status: "New",
    resumeSummary: "Full-stack engineer with deep expertise in modern React/Next.js frameworks and backend API integration.",
    matchBreakdown: {
      skillMatch: 92,
      experienceMatch: 90,
      cultureMatch: 91
    }
  },
  {
    id: "cand-3",
    name: "Sophia Chen",
    title: "Staff Product Designer - AI Tools",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop",
    matchScore: 88,
    experienceYears: 7,
    location: "Austin, TX (Hybrid)",
    salaryExpectation: "$175,000 - $195,000",
    skills: ["Figma", "Design Systems", "UI/UX Research", "Prototyping", "Front-end Basics"],
    highlights: ["Redesigned B2B analytics platform used by 500k users", "Created accessible design token library"],
    status: "Interviewed",
    resumeSummary: "Product Designer passionate about human-computer interaction in AI copilot applications.",
    matchBreakdown: {
      skillMatch: 86,
      experienceMatch: 90,
      cultureMatch: 88
    }
  },
  {
    id: "cand-4",
    name: "Devon Miller",
    title: "DevOps & MLOps Specialist",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
    matchScore: 82,
    experienceYears: 5,
    location: "Seattle, WA",
    salaryExpectation: "$165,000 - $185,000",
    skills: ["Kubernetes", "Docker", "Terraform", "MLflow", "AWS", "CI/CD", "Python"],
    highlights: ["Automated model deployment pipelines", "Achieved zero-downtime blue/green rollouts for LLM endpoints"],
    status: "Offered",
    resumeSummary: "MLOps infrastructure specialist experienced in scaling AI models in production environments.",
    matchBreakdown: {
      skillMatch: 84,
      experienceMatch: 80,
      cultureMatch: 82
    }
  }
];

export const sampleJobPosts: JobPost[] = [
  {
    id: "job-101",
    title: "Senior Full Stack AI Engineer",
    department: "Engineering",
    location: "San Francisco, CA (Hybrid / Remote)",
    type: "Full-Time",
    salaryRange: "$180,000 - $220,000",
    applicantsCount: 42,
    status: "Active",
    createdDate: "2026-07-10",
    description: "We are seeking a Senior Full Stack AI Engineer to spearhead our next-generation generative AI user interfaces and backend integrations. You will work closely with research scientists and product designers to deliver streaming AI experiences.",
    requiredSkills: ["TypeScript", "Next.js", "Python", "LLM APIs", "Tailwind CSS", "PostgreSQL"],
    biasAuditScore: 98
  },
  {
    id: "job-102",
    title: "Principal RAG & Vector Search Scientist",
    department: "AI Research",
    location: "New York, NY",
    type: "Full-Time",
    salaryRange: "$220,000 - $260,000",
    applicantsCount: 19,
    status: "Active",
    createdDate: "2026-07-14",
    description: "Looking for a seasoned Research Scientist to lead our vector search retrieval strategy, multi-modal embeddings, and knowledge graph integrations.",
    requiredSkills: ["PyTorch", "Vector DBs", "RAG Architectures", "Python", "System Design"],
    biasAuditScore: 95
  },
  {
    id: "job-103",
    title: "Staff AI Product Manager",
    department: "Product",
    location: "Remote (US)",
    type: "Remote",
    salaryRange: "$190,000 - $230,000",
    applicantsCount: 68,
    status: "Active",
    createdDate: "2026-07-01",
    description: "Drive product strategy and execution for TalentForge AI copilot experiences across enterprise talent acquisition tools.",
    requiredSkills: ["Product Strategy", "AI Benchmarking", "User Research", "Agile Leadership"],
    biasAuditScore: 92
  }
];
