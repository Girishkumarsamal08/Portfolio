"use client"

import { motion } from "framer-motion"

const experiences = [
  {
    role: "Independent AI Researcher & Architect",
    project: "Phase 3: Advanced Intelligence Systems",
    duration: "2025 — Present",
    type: "solo",
    description: "A deep immersion into real-world AI applications, focusing on the intersection of voice intelligence, RAG-based support engines, and modular software architecture.",
    points: [
      "Mastered Speech Recognition & TTS optimization",
      "Designed agentic RAG workflows for customer support",
      "Focused on high-performance Python/Node architectures"
    ]
  },
  {
    role: "Full-Stack System Designer",
    project: "Phase 2: Scalable Engineering & Group Collab",
    duration: "2024 — 2025",
    type: "solo",
    description: "Transitioned from basic applications to complex, multi-platform systems. Led the architecture design for data-heavy platforms and integrated real-time services.",
    points: [
      "Implemented advanced web scraping & data analysis",
      "Designed mock test engines for 1,000+ simulated users",
      "Built resilient backends with FastAPI & MongoDB/AWS"
    ]
  },
  {
    role: "Aspiring Web Developer",
    project: "Phase 1: Engineering Foundations",
    duration: "2023 — 2024",
    type: "solo",
    description: "The foundational stage of my technical journey, focusing on core programming language mastery, algorithm design, and building the logic for early-stage digital products.",
    points: [
      "Mastered Python, Java, and early Web Dev",
      "Focused on problem-solving & clean code builds",
      "Initial exploration into automation & scripting"
    ]
  }
]

export default function Experience() {
  const Section = ({ title, data }: any) => (
    <div className="space-y-16 mt-20">
      <h3 className="text-2xl font-serif text-white/40 uppercase tracking-[0.4em] mb-12 border-b border-white/5 pb-4">{title}</h3>
      <div className="space-y-16">
        {data.map((exp: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group relative p-8 md:p-12 border border-white/5 bg-white/5 backdrop-blur-xl transition-all duration-700"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h4 className="text-3xl font-serif text-white mb-3 transition-colors duration-500 font-bold">
                  {exp.role}
                </h4>
                <p className="text-[#666] text-xs font-semibold uppercase tracking-[0.3em]">
                  {exp.project}
                </p>
              </div>
              <span className="text-[10px] px-4 py-2 border border-white/10 text-[#888] uppercase tracking-[0.2em] font-bold bg-white/[0.02]">
                {exp.duration}
              </span>
            </div>

            <p className="text-[#aaa] mb-10 leading-[1.8] font-light text-lg max-w-4xl italic border-l border-white/10 pl-8">
              &ldquo;{exp.description}&rdquo;
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-10 border-t border-white/5">
              {exp.points.map((point: any, j: number) => (
                <div key={j} className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-blue-400 transition-all duration-500"></span>
                  <span className="text-[11px] text-[#555] uppercase tracking-[0.2em] group-hover:text-[#999] transition-colors duration-500">
                    {point}
                  </span>
                </div>
              ))}
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
