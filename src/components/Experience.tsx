"use client"

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
    role: "Full-Stack Developer",
    project: "FlowDesk — AI Workflow System",
    duration: "Solo Project",
    type: "solo",
    description:
      "Designed an AI-powered productivity system to automate workflows and manage tasks efficiently.",
    points: [
      "Automation-driven task management",
      "Clean modular system design",
      "Scalable AI integration structure",
    ],
  },
  {
    role: "Frontend & System Designer",
    project: "Portfolio — Personal Website",
    duration: "Solo Project",
    type: "solo",
    description:
      "Crafted a modern developer portfolio showcasing projects, UI/UX design, and technical skills.",
    points: [
      "Next.js + Tailwind modern UI",
      "Responsive & animated design",
      "Component-based architecture",
    ],
  },

  {
    role: "Backend & AI Developer",
    project: "RankForge — SEO & Ranking System",
    duration: "Group Project",
    type: "group",
    description:
      "Developed an intelligent system for ranking optimization and data-driven SEO insights.",
    points: [
      "Ranking algorithm implementation",
      "Data analysis & optimization",
      "Scalable backend architecture",
    ],
  },
]


export default function Experience() {
  const soloProjects = experiences.filter((exp) => exp.type === "solo")
  const groupProjects = experiences.filter((exp) => exp.type === "group")

  const Section = ({ title, data }: any) => (
    <div className="mb-24">
      <div className="mb-10">
        <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
          {title}
        </h3>
        <p className="text-[#777] text-sm mt-2 max-w-md">
          {title === "Independent Work"
            ? "Projects built individually focusing on innovation and system design"
            : "Collaborative projects demonstrating teamwork and scalable development"}
        </p>
      </div>

      <div className="space-y-10">
        {data.map((exp: any, i: number) => (
          <motion.div
            key={exp.project}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative p-8 border border-[#2a2a2a] rounded-2xl bg-transparent hover:border-[#666] transition-all duration-500"
          >

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold text-white">
                  {exp.role}
                </h4>
                <span className="text-xs px-3 py-1 border border-[#333] text-[#888] uppercase tracking-widest">
                  {exp.duration}
                </span>
              </div>

              <p className="text-[#999] text-xs uppercase tracking-widest mb-4">
                {exp.project}
              </p>

              <p className="text-[#ccc] mb-5 leading-relaxed">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.points.map((point: string, j: number) => (
                  <span
                    key={j}
                    className="text-xs px-3 py-1 border border-[#333] text-[#aaa] rounded-full"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="experience" className="section-padding border-t border-[#222] bg-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl text-white font-serif mb-6">
            Experience
          </h2>
          <p className="text-[#777] max-w-lg">
            Hands-on experience building intelligent systems, scalable applications, and AI-driven solutions through both independent and collaborative work.
          </p>
        </motion.div>

        <Section title="Independent Work" data={soloProjects} />
        <Section title="Collaborative Work" data={groupProjects} />
      </div>
    </section>
  )
}
