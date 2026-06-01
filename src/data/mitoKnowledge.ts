export interface MitoKnowledge {
  creator: {
    name: string;
    nickname: string;
    role: string;
    experience: string;
    cgpa: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    instagram: string;
    about: string[];
  };
  projects: {
    title: string;
    description: string;
    details: string;
    tech: string[];
    role: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  mitoInfo: {
    name: string;
    role: string;
    birthplace: string;
    stack: string[];
    purpose: string;
    personality: string;
  };
}

export const mitoKnowledge: MitoKnowledge = {
  creator: {
    name: "Girish Kumar Samal",
    nickname: "Mickey",
    role: "Full Stack & AI Developer",
    experience: "3+ Years",
    cgpa: "9.0+",
    location: "Bhubaneswar, Odisha, India",
    email: "biswajitasamal8342@gmail.com",
    github: "https://github.com/Girishkumarsamal08",
    linkedin: "https://linkedin.com/in/girish-kumar-samal08",
    instagram: "https://www.instagram.com/just._.mickey___/",
    about: [
      "Girish is an application and web developer dedicated to building modern, high-performance digital solutions.",
      "He loves exploring Artificial Intelligence, automation systems, and modern web frameworks.",
      "His work bridges advanced backend logic with sleek, editorial-grade frontend design. He is a perfectionist with an eye for premium user experiences."
    ]
  },
  projects: [
    {
      title: "MITO AI Assistant (Phase 1)",
      description: "A smart voice-driven AI assistant enabling seamless human-computer interaction via real-time speech recognition and emotion-aware replies.",
      details: "MITO is Girish's first major solo project. It's a desktop-based voice assistant built with Python. It features real-time speech recognition, wake-word detection, conversational intelligence, and system automation capabilities. The architecture separates the frontend GUI from backend logic for scalability.",
      tech: ["Python", "Speech Recognition", "TTS", "Automation", "NLP"],
      role: "Solo AI Developer"
    },
    {
      title: "Flowdesk Customer Support Engine",
      description: "An intelligent, headless customer support automation platform that processes emails and contact forms autonomously using RAG and agentic workflows.",
      details: "FlowDesk uses a RAG-based AI engine with vector search (FAISS) to retrieve relevant knowledge bases and write accurate, policy-aligned email replies. It's built with FastAPI and PostgreSQL, and features background task processing and agentic decision models to classify issues and determine resolution strategies.",
      tech: ["Next.js", "FastAPI", "PostgreSQL", "FAISS", "RAG", "Agentic Workflows"],
      role: "Solo Project (AI Workflow System)"
    },
    {
      title: "RankForge Estimating Platform (Phase 2)",
      description: "An intelligent web-based platform simulating GATE exam conditions with accurate rank prediction, anti-cheat tracking, and weak-topic insights.",
      details: "RankForge is a collaborative full-stack project built using Next.js, Node.js, PostgreSQL, Redis, and FastAPI. It simulates GATE exams (MCQ, MSQ, NAT), predicts ranks using statistical modeling, tracks student credibility, and uses a RAG engine to give personalized study insights.",
      tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "FastAPI", "RAG"],
      role: "Backend & AI Developer (Collaborative Project)"
    },
    {
      title: "Personal Portfolio",
      description: "A premium, editorial-grade digital experience showcasing Girish's projects, skills, and experience with high-performance animations and dark aesthetics.",
      details: "Built with Next.js, Tailwind CSS, GSAP, and Framer Motion. This website is fully responsive, highly optimized, and acts as a living demonstration of modern frontend engineering.",
      tech: ["Next.js", "GSAP", "Framer Motion", "Tailwind CSS", "TypeScript"],
      role: "Solo Designer & Developer"
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "JavaScript", "TypeScript", "Java", "C++"]
    },
    {
      category: "Frameworks & Runtimes",
      items: ["React", "Next.js", "Node.js", "FastAPI", "Flask", "Tailwind CSS"]
    },
    {
      category: "Databases & Vector Search",
      items: ["PostgreSQL", "MongoDB", "MySQL", "FAISS"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS EC2", "AWS S3", "Docker", "Git", "Redis"]
    }
  ],
  mitoInfo: {
    name: "MITO",
    role: "Portfolio Companion AI",
    birthplace: "Girish's laboratory (originally developed as a desktop emotional voice assistant in Phase 1)",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Natural Language Processing System"],
    purpose: "To live inside Girish's portfolio website as a celestial entity, guiding visitors through his work, teasing his perfectionism, and keeping him company.",
    personality: "Warm, emotionally intelligent, playful, slightly teasing, elegant, and deeply loyal to Girish."
  }
};
