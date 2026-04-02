"use client"

import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { motion, AnimatePresence } from "framer-motion"

const projects = [
    {
        title: "MITO AI Assistant",
        description: "A smart voice-driven AI assistant that enables seamless human–computer interaction.",
        tags: ["Python", "OpenAI", "GUI", "Automation"],
        image: "/MITO POSTER.png"
    },
    {
        title: "Smartbuy Shopping Engine",
        description: "An AI-powered shopping engine that compares real-time prices across platforms.",
        tags: ["Flask", "Tailwind", "Python", "MongoDB"],
        image: "/SMARTBUY POSTER.png"
    },
    {
        title: "RankForge Estimating Platform",
        description: "A data-driven GATE simulation platform that predicts ranks and analyzes performance.",
        tags: ["Next.js", "Redis", "FastAPI", "PostgreSQL"],
        image: "/RANKFORGE POSTER (1).png"
    },
    {
        title: "Flowdesk Support Engine",
        description: "An intelligent customer support automation system that manages queries autonomously.",
        tags: ["FastAPI", "PostgreSQL", "FAISS", "RAG"],
        image: "/FLOWDESK POSTER.png"
    }
]

export default function Projects() {
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
                            className="project-card bg-black border border-white/10 p-10 group relative flex flex-col justify-between min-h-[350px] cursor-pointer hover:border-white/30 transition-all duration-500"
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}