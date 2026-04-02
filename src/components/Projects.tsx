"use client"

import React, { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
    title: string
    description: string
    longDescription: string
    tags: string[]
    link: string
    github: string
    image: string
}

const projects: Project[] = [
    {
        title: "MITO AI ASSISTANT",
        description: "A smart voice-driven AI assistant that enables seamless human–computer interaction through real-time speech recognition, automation, and conversational intelligence.",
        longDescription: "MITO is a desktop-based intelligent AI voice assistant built with Python, designed to deliver seamless and natural human–computer interaction. It features real-time speech recognition, wake-word detection, and intuitive natural language understanding, allowing users to communicate effortlessly through voice commands. The system is developed using a modular architecture that cleanly separates the frontend GUI from the backend logic, ensuring scalability and maintainability. It supports automation tasks, conversational responses, and text-to-speech capabilities, enhanced with emotion-aware interactions to create a more human-like experience. Designed for future expansion, MITO provides a strong foundation for advanced AI integration and system-level automation.",
        tags: ["Next.js", "OpenAI", "Tailwind", "PostgreSQL"],
        link: "#",
        github: "https://github.com/Girishkumarsamal08",
        image: "/MITO POSTER.png"
    },
    {
        title: "SMARTBUY SHOPPING ENGINE",
        description: "An AI-powered shopping engine that compares real-time prices across platforms, helping users discover the best deals instantly through text and image search.",
        longDescription: "SMARTBUY is a responsive web application designed to simplify product discovery and price comparison across multiple e-commerce platforms. It allows users to search products using text or images and instantly view real-time price variations, availability, and best deals in one place. Built with a modern full-stack architecture using Flask, Tailwind CSS, and JavaScript, the system integrates web scraping and REST APIs to fetch accurate data while leveraging MongoDB and AWS for scalable storage and performance. With features like intelligent sorting, direct redirection to official product pages, and seamless user experience, SmartBuy transforms the way users shop online by making decision-making faster, smarter, and more efficient.",
        tags: ["React", "Node.js", "Express", "MongoDB"],
        link: "#",
        github: "https://github.com/Girishkumarsamal08",
        image: "/SMARTBUY POSTER.png"
    },
    {
        title: "RANKFORGE ESTIMATING PLATFORM",
        description: "A data-driven GATE simulation platform that predicts ranks, analyzes performance, and delivers personalized insights to optimize exam preparation.",
        longDescription: "RANKFORGE is an intelligent web-based platform designed to simulate real GATE exam conditions while providing accurate rank prediction and deep performance analysis for aspirants. It enables users to take full-length mock tests based on the actual GATE pattern (MCQ, MSQ, NAT), evaluates responses in real time, and predicts expected rank using statistical modeling and historical cutoff mapping. Built using a modern full-stack architecture with Next.js, Node.js, PostgreSQL, Redis, and FastAPI, the system ensures scalability, fast performance, and reliable data handling. With features like anti-cheat tracking, credibility scoring, personalized weak-topic insights through a RAG engine, and an analytics-rich dashboard, RANKFORGE helps students identify gaps, improve strategically, and prepare smarter for competitive exams.",
        tags: ["TypeScript", "NestJS", "Redis", "Docker"],
        link: "#",
        github: "https://github.com/Girishkumarsamal08",
        image: "/RANKFORGE POSTER (1).png"
    },
    {
        title: "FLOWDESK SUPPORT ENGINE",
        description: "An intelligent customer support automation system that manages queries, generates tickets, and delivers context-aware responses using AI-powered decision engines.",
        longDescription: "FLOWDESK is an intelligent headless customer support automation platform designed to autonomously manage queries from emails and contact forms by generating tickets, handling threaded conversations, and delivering policy-aware responses. Powered by a RAG-based AI engine with vector search, it retrieves relevant knowledge to produce accurate, context-driven replies in real time. Built using FastAPI, PostgreSQL, and FAISS, the system integrates email routing, background task processing, and an agentic decision engine to classify issues, validate user context, and determine resolution strategies. With features like automated reply handling, conversation tracking, and intelligent escalation after repeated interactions, Flowdesk enables early-stage startups to streamline support operations with minimal human intervention.",
        tags: ["Next.js", "Framer Motion", "Tailwind"],
        link: "#",
        github: "https://github.com/Girishkumarsamal08",
        image: "/FLOWDESK POSTER.png"
    }
]

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
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
    }, { scope: containerRef })

    return (
        <section id="projects" ref={containerRef} className="py-24 border-t border-white/5 relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="mb-32 text-center"
                >
                    <h2 className="text-5xl md:text-7xl text-white font-serif mb-0 uppercase tracking-widest relative z-10">
                        Projects
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="project-card bg-black border border-white/10 p-10 group relative flex flex-col justify-between min-h-[350px] cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="relative z-10 flex-grow">
                                <h3 className="text-3xl font-serif text-white mb-6">
                                    {project.title}
                                </h3>
                                <p className="text-[#999999] mb-10 font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                            <div className="relative z-10">
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-medium px-3 py-1 bg-white/5 text-[#666] uppercase tracking-widest border border-white/10">
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
                                        View Case <span className="ml-3 font-serif italic group-hover:translate-x-1 transition-transform inline-block">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 pointer-events-auto">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProject(null)}
                                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="max-w-6xl w-full max-h-[90vh] overflow-y-auto grid md:grid-cols-2 gap-10 p-8 md:p-16 relative bg-black border border-white/10"
                            >
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 uppercase tracking-tighter leading-none">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="leading-relaxed text-lg mb-12 font-light text-white/60">
                                        {selectedProject.longDescription}
                                    </p>
                                    <div className="flex flex-wrap gap-6">
                                        <a href={selectedProject.link} className="px-10 py-5 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-200 transition-colors">
                                            Live Preview
                                        </a>
                                        <a href={selectedProject.github} className="px-10 py-5 border border-white/20 text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-colors">
                                            Source Code
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center overflow-hidden bg-black/40 border border-white/5">
                                    <img
                                        src={selectedProject.image}
                                        alt="project preview"
                                        className="w-full h-auto object-cover opacity-60"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}