"use client"

import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { motion } from "framer-motion"

const projects = [
    {
        title: "MITO AI Assistant",
        description: "A smart voice-driven AI assistant that enables seamless human–computer interaction through real-time speech recognition, automation, conversational intelligence, and emotional responses.",
        longDescription: "MITO is a desktop-based intelligent AI voice assistant built with Python, designed to deliver seamless and natural human–computer interaction. It features real-time speech recognition, wake-word detection, and intuitive natural language understanding, allowing users to communicate effortlessly through voice commands. The system is developed using a modular architecture that cleanly separates the frontend GUI from the backend logic, ensuring scalability and maintainability. It supports automation tasks, conversational responses, and text-to-speech capabilities, enhanced with emotion-aware interactions to create a more human-like experience. Designed for future expansion, MITO provides a strong foundation for advanced AI integration and system-level automation.",
        tags: ["Next.js", "OpenAI", "Tailwind", "PostgreSQL"],
        link: "#",
        github: "https://github.com/Girishkumarsamal08/MITO",
        image: "/MITO POSTER.png"
    },
    {
        title: "Flowdesk Customer Support Engine",
        description: "An intelligent customer support automation system that manages queries, generates tickets, and delivers context-aware responses using AI-powered decision engines.",
        longDescription: "FLOWDESK is an intelligent headless customer support automation platform designed to autonomously manage queries from emails and contact forms by generating tickets, handling threaded conversations, and delivering policy-aware responses. Powered by a RAG-based AI engine with vector search, it retrieves relevant knowledge to produce accurate, context-driven replies in real time. Built using FastAPI, PostgreSQL, and FAISS, the system integrates email routing, background task processing, and an agentic decision engine to classify issues, validate user context, and determine resolution strategies. With features like automated reply handling, conversation tracking, and intelligent escalation after repeated interactions, Flowdesk enables early-stage startups to streamline support operations with minimal human intervention.",
        tags: ["Next.js", "Framer Motion", "Tailwind"],
        link: "#",
        github: "https://github.com/Girishkumarsamal08/Flowdesk",
        image: "/FLOWDESK POSTER.png"
    },
    {
        title: "RankForge Estimating Platform",
        description: "A data-driven GATE simulation platform that predicts ranks, analyzes performance, and delivers personalized insights to optimize exam preparation.",
        longDescription: "RANKFORGE is an intelligent web-based platform designed to simulate real GATE exam conditions while providing accurate rank prediction and deep performance analysis for aspirants. It enables users to take full-length mock tests based on the actual GATE pattern (MCQ, MSQ, NAT), evaluates responses in real time, and predicts expected rank using statistical modeling and historical cutoff mapping. Built using a modern full-stack architecture with Next.js, Node.js, PostgreSQL, Redis, and FastAPI, the system ensures scalability, fast performance, and reliable data handling. With features like anti-cheat tracking, credibility scoring, personalized weak-topic insights through a RAG engine, and an analytics-rich dashboard, RANKFORGE helps students identify gaps, improve strategically, and prepare smarter for competitive exams.",
        tags: ["TypeScript", "NestJS", "Redis", "Docker"],
        link: "#",
        github: "https://github.com/Girishkumarsamal08/RANKFORGE",
        image: "/RANKFORGE POSTER (1).png"
    },
    {
        title: "Personal Portfolio",
        description: "A premium, high-performance portfolio website built with Next.js, featuring glassmorphism, advanced animations, and a seamless dark-themed UI.",
        longDescription: "This project is a high-end personal portfolio designed to showcase technical expertise through a premium visual experience. Built using Next.js and Tailwind CSS, it integrates advanced animation libraries like GSAP and Framer Motion to create smooth, interactive transitions. The design system follows modern aesthetics, including glassmorphism, depth-based layouts, and a curated dark color palette. The site is fully responsive, optimized for performance, and serves as a living demonstration of frontend engineering and UI/UX design capabilities.",
        tags: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
        link: "#",
        github: "https://github.com/Girishkumarsamal08/Portfolio",
        image: "/PORTFOLIO POSTER.png"
    }
]

export default function Projects() {
    const [selectedProject, setSelectedProject] = React.useState<any>(null)
    const containerRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useGSAP(() => {
        // Entrance animation
        gsap.from(".project-card", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        })

        // Title and description reveal
        gsap.from(".projects-header", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
            },
            y: -20,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
    }, { scope: containerRef })

    const handleHover = (idx: number, isEntering: boolean) => {
        const card = cardsRef.current[idx]
        if (!card) return
        gsap.to(card, {
            y: isEntering ? -10 : 0,
            borderColor: isEntering ? "#ffffff" : "#333333",
            duration: 0.4,
            ease: "power2.out"
        })
    }

    return (
        <section id="projects" ref={containerRef} className="py-12 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">

                <div className="w-full mb-10">
                    <h2 className="editorial-title text-4xl md:text-6xl text-white mb-4 uppercase">Projects</h2>
                    <div className="w-24 h-[1px] bg-[#333333]"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            ref={(el) => { cardsRef.current[idx] = el }}
                            className="project-card bg-gradient-to-br from-[#0a111a] to-[#020202] border border-[#1a1a1a] p-10 group relative flex flex-col justify-between min-h-[350px] cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                            onMouseEnter={() => handleHover(idx, true)}
                            onMouseLeave={() => handleHover(idx, false)}
                        >
                            <div className="relative z-10 flex-grow">
                                <h3 className="text-3xl font-serif text-white mb-6 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-[#cccccc] mb-10 font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                            <div className="relative z-10">
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-medium px-3 py-1 bg-[#111111] text-[#999999] uppercase tracking-widest border border-[#333333]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-8">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProject(project);
                                        }}
                                        className="inline-flex items-center text-white border-b border-white pb-1 font-medium transition-colors hover:text-[#999999] hover:border-[#999999] uppercase tracking-[0.2em] text-xs"
                                    >
                                        View Case <span className="ml-3 font-serif italic group-hover:translate-x-1 transition-transform">→</span>
                                    </button>

                                    <a 
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-[#666] hover:text-white transition-colors flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] font-medium"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        Source
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedProject && (
                    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6 md:p-10">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#0a0a0a] border border-[#333333] max-w-6xl w-full max-h-[90vh] overflow-y-auto grid md:grid-cols-2 gap-10 p-8 md:p-16 relative"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-8 right-8 text-[#666] hover:text-white transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <div className="flex flex-col justify-center">
                                <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 uppercase tracking-tighter">
                                    {selectedProject.title}
                                </h2>
                                <p className="text-[#999999] leading-relaxed text-lg mb-12 font-light">
                                    {selectedProject.longDescription || selectedProject.description}
                                </p>
                                <div className="flex flex-wrap gap-6">
                                    <a 
                                        href={selectedProject.link} 
                                        onClick={(e) => {
                                            if (selectedProject.title.toLowerCase().includes("mito")) {
                                                e.preventDefault()
                                                window.dispatchEvent(new Event("open-mito-companion"))
                                                setSelectedProject(null)
                                            }
                                        }}
                                        className="px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#ccc] transition-colors"
                                    >
                                        Live Preview
                                    </a>
                                    <a href={selectedProject.github} className="px-8 py-4 border border-[#333] text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-colors">
                                        Source Code
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center justify-center bg-[#050505] border border-[#1a1a1a]">
                                <img
                                    src={selectedProject.image}
                                    alt="project preview"
                                    className="w-full h-auto object-cover opacity-80"
                                />
                            </div>
                        </motion.div>
                    </div>
                )}

            </div>
        </section>
    )
}