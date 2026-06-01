"use client"

import { motion } from "framer-motion"

const educationList = [
    {
        year: "2023 — 2027",
        degree: "Bachelor of Technology in Computer Science",
        institution: "Siksha 'O' Anusandhan University (ITER)",
        location: "Bhubaneswar",
        gradeType: "CGPA",
        grade: "8.62",
        highlights: [
            "Specialization in Computer Science & Engineering",
            "Strong foundation in Data Structures, Algorithms, and Object-Oriented Programming",
            "Focus on AI-driven system development, automation, and modern web application development"
        ]
    },
    {
        year: "2021",
        degree: "Class - XII (Senior Secondary)",
        institution: "Prabhujee English Medium School",
        location: "Bhubaneswar",
        gradeType: "Percentage",
        grade: "90.3%",
        highlights: [
            "CBSE Board examination",
            "Focused on Science stream (Mathematics, Physics, Chemistry, and Computer Science)"
        ]
    },
    {
        year: "2019",
        degree: "Class - X (Secondary)",
        institution: "Prabhujee English Medium School",
        location: "Bhubaneswar",
        gradeType: "Percentage",
        grade: "93.6%",
        highlights: [
            "CBSE Board examination",
            "Demonstrated excellence in Mathematics and Science subjects"
        ]
    }
]

export default function Education() {
    return (
        <section id="education" className="pt-12 pb-2 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                
                <div className="flex flex-col lg:flex-row gap-16 relative">
                    
                    {/* Left Column: Title & Intro */}
                    <div className="w-full lg:w-1/3 flex flex-col justify-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="sticky top-32"
                        >
                            <h2 className="editorial-title text-5xl md:text-6xl text-white mb-6">
                                Education
                            </h2>
                            <div className="w-24 h-[1px] bg-[#333333] mb-8"></div>
                            
                            <p className="text-[#999999] text-lg font-light leading-relaxed mb-8">
                                My academic journey has been centered around building a robust theoretical foundation in computer science and applying it to build intelligent, practical software systems.
                            </p>
                            
                            {/* Decorative design graphic */}
                            <div className="hidden lg:block border-l border-[#222] pl-6 mt-6">
                                <span className="text-[10px] uppercase tracking-widest text-[#666666] block mb-2">Academic Benchmark</span>
                                <div className="text-sm text-[#cccccc] font-mono">
                                    B.Tech | XII | X
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Right Column: Timeline Cards */}
                    <div className="w-full lg:w-2/3 relative">
                        {/* Timeline vertical bar */}
                        <div className="absolute left-0 md:left-8 top-4 bottom-4 w-[1px] bg-[#222222]" />
                        
                        <div className="space-y-12">
                            {educationList.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="relative pl-8 md:pl-20 group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-4px] md:left-[28px] top-3 w-2.5 h-2.5 rounded-full bg-[#333333] border border-black group-hover:bg-white group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0)] group-hover:shadow-[0_0_10px_#fff]" />
                                    
                                    {/* Card container */}
                                    <div className="border border-[#1a1a1a] bg-[#050505]/40 backdrop-blur-sm p-8 rounded-none hover:border-[#666666] hover:bg-[#080808]/60 transition-all duration-500 relative">
                                        
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                            <div>
                                                <span className="text-xs uppercase tracking-widest text-[#666666] font-mono block mb-2">
                                                    {edu.year}
                                                </span>
                                                <h3 className="text-2xl font-serif text-white group-hover:text-white transition-colors">
                                                    {edu.degree}
                                                </h3>
                                                <p className="text-[#cccccc] text-sm mt-1 font-light">
                                                    {edu.institution}, <span className="text-[#888]">{edu.location}</span>
                                                </p>
                                            </div>
                                            
                                            {/* Grade badge */}
                                            <div className="flex flex-col items-start md:items-end justify-center">
                                                <span className="text-[10px] uppercase tracking-widest text-[#666666] font-mono mb-1">
                                                    {edu.gradeType}
                                                </span>
                                                <span className="text-xl font-serif text-white border-b border-[#333] pb-1">
                                                    {edu.grade}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Highlights list */}
                                        <ul className="space-y-2 border-t border-[#1a1a1a] pt-4 mt-4">
                                            {edu.highlights.map((highlight, j) => (
                                                <li key={j} className="text-xs text-[#999999] flex items-start gap-2 leading-relaxed">
                                                    <span className="text-white/40 mt-1">•</span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </section>
    )
}
