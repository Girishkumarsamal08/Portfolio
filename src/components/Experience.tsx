"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const experiences = [
  {
    role: "Independent AI Developer",
    project: "Phase 3: Advanced Systems & Ongoing Work",
    duration: "2025 — Present",
    type: "solo",
    description:
      "Currently building and evolving real-world AI and scalable systems through continuous development of Portfolio and a Unified API architecture. This phase reflects deep learning through solving complex problems, refining system design, and improving real-time performance across projects.",
    points: [
      "Working on Portfolio & Unified API",
      "Improving system design & scalability",
      "Learning through real-world debugging & optimization",
    ],
  },
  {
    role: "Full-Stack Developer & Team Collaborator",
    project: "Phase 2: Group Projects & System Building",
    duration: "2024 — 2025",
    type: "group",
    description:
      "Worked on collaborative projects like RankForge, focusing on building scalable full-stack systems. Gained hands-on experience through debugging, team collaboration, and solving real-world engineering challenges.",
    points: [
      "Built RankForge in team environment",
      "Handled real-time errors & production-level issues",
      "Strengthened backend, APIs & data handling",
    ],
  },
  {
    role: "AI Assistant Developer",
    project: "Phase 1: Foundations with MITO",
    duration: "2023 — 2024",
    type: "solo",
    description:
      "Started my journey by building MITO, an AI emotional voice assistant. This phase was all about learning through experimentation, fixing errors, and understanding how real systems behave—from speech processing to automation and AI interaction.",
    points: [
      "Developed MITO AI Emotional Assistant",
      "Learned through debugging & trial-error",
      "Built strong foundation in AI & automation",
    ],
  },
  {
    role: "Backend & AI Developer",
    project: "RankForge — SEO & Ranking System",
    duration: "2025 — Present",
    type: "group",
    description:
      "Joined a collaborative team to architect RankForge, an intelligent SEO and ranking optimization platform. Built high-performance backend pipelines, led algorithm development, and integrated AI-driven analytics—transforming raw data into actionable, production-grade SEO insights across the system.",
    points: [
      "Ranking algorithm implementation & tuning",
      "Real-time data analytics & SEO insight extraction",
      "Scalable backend architecture with collaborative debugging",
    ],
  },
]

// Section is defined OUTSIDE Experience so state changes don't remount it
function Section({
  title,
  data,
  onCardHover,
}: {
  title: string
  data: typeof experiences
  onCardHover: (index: number | null) => void
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-10">
        <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
          {title}
        </h3>
        <p className="text-[#777] text-sm mt-2">
          {title === "Independent Work"
            ? "Projects built individually focusing on innovation and system design"
            : "Collaborative projects demonstrating teamwork and scalable development"}
        </p>
      </div>

      <div className="space-y-10 flex flex-col">
        {data.map((exp, i) => (
          <motion.div
            key={exp.project}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            onHoverStart={() => onCardHover(i)}
            onHoverEnd={() => onCardHover(null)}
            className="group relative p-8 border border-[#2a2a2a] rounded-2xl bg-black hover:border-[#555] transition-all duration-500 cursor-default flex flex-col min-h-[340px]"
          >
            {/* Subtle inner glow on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top left, rgba(255,255,255,0.03), transparent 60%)",
              }}
            />

            <div className="relative z-10 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-4 gap-4">
                <h4 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors">
                  {exp.role}
                </h4>
                <span className="text-xs px-3 py-1 border border-[#333] group-hover:border-[#555] text-[#888] uppercase tracking-widest whitespace-nowrap transition-colors duration-300">
                  {exp.duration}
                </span>
              </div>

              <p className="text-[#999] text-xs uppercase tracking-widest mb-4">
                {exp.project}
              </p>

              <p className="text-[#ccc] mb-5 leading-relaxed flex-grow">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {exp.points.map((point, j) => (
                  <span
                    key={j}
                    className="text-xs px-3 py-1 border border-[#333] group-hover:border-[#444] text-[#aaa] rounded-full transition-colors duration-300"
                  >
                    · {point}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 2 nodes: one aligns with top row of cards, one with bottom row
const nodePositions = [
  { top: "30%", size: 12 },
  { top: "72%", size: 12 },
]

export default function Experience() {
  const soloProjects = experiences.filter((exp) => exp.type === "solo")
  const groupProjects = experiences.filter((exp) => exp.type === "group")

  // activeNode: 0 = top node glows, 1 = bottom node glows, null = none
  const [activeNode, setActiveNode] = useState<number | null>(null)

  return (
    <section id="experience" className="section-padding bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full mb-16 text-left"
        >
          <h2 className="editorial-title text-4xl md:text-6xl text-white mb-4 uppercase">
            Experience
          </h2>
          <div className="w-24 h-[1px] bg-[#333333]" />
          <p className="text-[#777] max-w-2xl md:max-w-3xl mt-6 leading-relaxed font-light">
            Hands-on experience building intelligent systems, scalable applications, and AI-driven solutions through both independent and collaborative work.
          </p>
        </motion.div>

        {/* Two-column grid with vertical divider */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_2px_1fr] gap-0 items-start">

          {/* Left column */}
          <div className="pr-0 lg:pr-12">
            <Section
              title="Independent Work"
              data={soloProjects}
              onCardHover={setActiveNode}
            />
          </div>

          {/* Vertical divider — gradient line with 2 glowing circle nodes */}
          <div className="hidden lg:flex flex-col items-center self-stretch py-4 pointer-events-none">
            <div className="relative w-[2px] flex-1">
              {/* Base gradient line */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, #333 15%, #555 50%, #333 85%, transparent)",
                }}
              />

              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-x-0 w-full"
                style={{
                  height: "80px",
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)",
                  filter: "blur(1px)",
                }}
                animate={{ top: ["-80px", "calc(100% + 80px)"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />

              {/* 2 Circle nodes */}
              {nodePositions.map((node, idx) => {
                const isGlowing = activeNode === idx
                return (
                  <div
                    key={idx}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: node.top }}
                  >
                    <div
                      style={{
                        width: node.size,
                        height: node.size,
                        borderRadius: "50%",
                        border: `1px solid ${isGlowing ? "white" : "#555"}`,
                        background: isGlowing ? "white" : "#2a2a2a",
                        boxShadow: isGlowing
                          ? "0 0 8px 3px rgba(255,255,255,0.65), 0 0 20px 6px rgba(255,255,255,0.2)"
                          : "none",
                        transform: isGlowing ? "scale(1.5)" : "scale(1)",
                        transition:
                          "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="pl-0 lg:pl-12 mt-16 lg:mt-0">
            <Section
              title="Collaborative Work"
              data={groupProjects}
              onCardHover={setActiveNode}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
