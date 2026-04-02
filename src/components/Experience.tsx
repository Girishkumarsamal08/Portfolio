"use client"

import { motion } from "framer-motion"

const experiences = [
  {
    role: "Full-Stack Web Developer",
    project: "Phase 3: Building Scale",
    duration: "2025 — PRESENT",
    type: "solo",
    details: [
      "Architecting high-performance web systems using Next.js, React, and TypeScript.",
      "Optimizing database interactions and API response times for seamless user experiences.",
      "Implementing advanced animations and interactive components to elevate digital presence."
    ],
    link: "#"
  },
  {
    role: "AI Web Developer",
    project: "Phase 2: Intelligent Systems",
    duration: "2024 — 2025",
    type: "solo",
    details: [
      "Developed custom AI agents and automation workflows to streamline business processes.",
      "Integrated machine learning models into web interfaces for real-time data processing.",
      "Built responsive, data-driven dashboards using modern frontend and backend tech stacks."
    ],
    link: "#"
  },
  {
    role: "Aspiring Web Developer",
    project: "Phase 1: Engineering Foundations",
    duration: "2023 — 2024",
    type: "solo",
    details: [
      "Mastered core web technologies: HTML5, CSS3, JavaScript, and Python.",
      "Collaborated on small-scale projects to understand the software development lifecycle.",
      "Focused on clean code principles and responsive design fundamentals."
    ],
    link: "#"
  }
]

export default function Experience() {
  const Section = ({ title, data }: any) => (
    <div className="mb-24">
      <h3 className="text-2xl font-serif text-white/40 uppercase tracking-[0.4em] mb-12 border-b border-white/5 pb-4"> {title} </h3>
      <div className="space-y-16">
        {data.map((exp: any, i: number) => (
          <motion.div
            key={exp.project}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="group relative p-10 md:p-14 border border-white/5 bg-white/5 backdrop-blur-2xl hover:border-white/20 transition-all duration-700 rounded-2xl hover:shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                  <h3 className="text-3xl md:text-4xl text-white font-serif mb-2 tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-blue-500 font-sans tracking-[0.3em] text-xs uppercase font-bold">
                    {exp.project}
                  </p>
                </div>
                <div className="text-white/30 font-sans text-sm tracking-widest uppercase font-medium">
                  {exp.duration}
                </div>
              </div>

              <div className="space-y-6 mb-12">
                {exp.details.map((detail: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-4 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2.5 transition-all duration-500 group-hover/item:bg-blue-400" />
                    <p className="text-[#999999] text-lg font-light leading-relaxed group-hover/item:text-white transition-colors">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t border-white/5 pt-10">
                <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">
                  {exp.type}
                </span>
                <a 
                  href={exp.link}
                  className="group/btn flex items-center gap-4 text-white text-xs uppercase tracking-[0.3em] font-bold hover:text-blue-400 transition-all duration-300"
                >
                  View Project
                  <span className="w-8 h-[1px] bg-white/20 transition-all duration-300 group-hover:bg-blue-400 group-hover:w-12" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="experience" className="section-padding border-t border-white/5 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
          className="mb-32 text-center"
        >
          <h2 className="text-5xl md:text-7xl text-white font-serif mb-8 uppercase tracking-widest relative z-10">
            Professional Path
          </h2>
          <p className="text-[#555] max-w-2xl mx-auto font-sans text-lg font-light leading-relaxed uppercase tracking-[0.2em]">
            A chronological mapping of my technical evolution, from engineering foundations to advanced system architecture.
          </p>
        </motion.div>

        <Section title="Technical Evolution" data={experiences} />
      </div>
    </section>
  )
}
