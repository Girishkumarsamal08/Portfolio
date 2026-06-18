"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const certificates = [
  {
    id: 1,
    title: "Deloitte Technology Job Simulation",
    issuer: "Deloitte",
    category: "Technology",
    file: "/deloitte 1.pdf",
    color: "#86c5da",
    accent: "rgba(134,197,218,0.15)",
    border: "rgba(134,197,218,0.3)",
    year: "2024",
    skills: ["Technology Consulting", "Problem Solving", "Business Analysis"],
  },
  {
    id: 2,
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Deloitte",
    category: "Data Analytics",
    file: "/deloitte 2.pdf",
    color: "#a78bfa",
    accent: "rgba(167,139,250,0.15)",
    border: "rgba(167,139,250,0.3)",
    year: "2024",
    skills: ["Data Analysis", "Insights & Reporting", "Excel / Tableau"],
  },
  {
    id: 3,
    title: "Deloitte Cyber Security Job Simulation",
    issuer: "Deloitte",
    category: "Cyber Security",
    file: "/deloitte 3.pdf",
    color: "#6ee7b7",
    accent: "rgba(110,231,183,0.15)",
    border: "rgba(110,231,183,0.3)",
    year: "2024",
    skills: ["Cyber Threat Analysis", "Risk Assessment", "Security Strategy"],
  },
  {
    id: 4,
    title: "Certificate of Achievement",
    issuer: "Certified",
    category: "Professional Development",
    file: "/GIRISH_KUMAR_SAMAL.png.pdf",
    color: "#fbbf24",
    accent: "rgba(251,191,36,0.15)",
    border: "rgba(251,191,36,0.3)",
    year: "2024",
    skills: ["Professional Development", "Achievement", "Recognition"],
  },
]

// Dynamic icon — Deloitte wordmark or generic award ribbon
function CertIcon({ issuer, color }: { issuer: string; color: string }) {
  if (issuer === "Deloitte") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="13"
          fontWeight="700"
          fontFamily="serif"
          fill={color}
        >
          D
        </text>
      </svg>
    )
  }
  // Generic award / ribbon icon
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </svg>
  )
}

// PDF viewer modal
function CertModal({
  cert,
  onClose,
}: {
  cert: (typeof certificates)[0]
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col w-[95vw] max-w-5xl h-[90vh] rounded-2xl overflow-hidden"
          style={{
            background: "#0a0a0a",
            border: `1px solid ${cert.border}`,
            boxShadow: `0 0 60px ${cert.accent}, 0 0 120px rgba(0,0,0,0.8)`,
          }}
        >
          {/* Modal header */}
          <div
            className="flex items-center justify-between px-6 py-4 shrink-0"
            style={{
              borderBottom: `1px solid ${cert.border}`,
              background: `linear-gradient(to right, ${cert.accent}, transparent)`,
            }}
          >
            <div className="flex items-center gap-4">
              <CertIcon issuer={cert.issuer} color={cert.color} />
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: cert.color }}>
                  {cert.issuer} · {cert.category}
                </p>
                <h3 className="text-white font-semibold text-lg leading-snug">{cert.title}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Download */}
              <a
                href={cert.file}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{
                  background: cert.accent,
                  border: `1px solid ${cert.border}`,
                  color: cert.color,
                }}
                title="Download certificate"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </a>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* PDF embed */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full"
              title={cert.title}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Certifications() {
  const [activeCert, setActiveCert] = useState<(typeof certificates)[0] | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="certifications" className="section-padding bg-transparent">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full mb-16 text-left"
        >
          <h2 className="editorial-title text-4xl md:text-6xl text-white mb-4 uppercase">
            Certifications
          </h2>
          <div className="w-24 h-[1px] bg-[#333333]" />
          <p className="text-[#777] max-w-2xl md:max-w-3xl mt-6 leading-relaxed font-light">
            Industry-recognised credentials earned through hands-on virtual job simulations and professional development programmes.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.01 }}
              onHoverStart={() => setHoveredCard(cert.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setActiveCert(cert)}
              className="group relative p-8 border border-[#2a2a2a] rounded-2xl bg-black hover:border-[#555] transition-all duration-500 cursor-pointer flex flex-col gap-5 min-h-[280px]"
            >
              {/* Subtle inner glow on hover — white only, no colour */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at top left, rgba(255,255,255,0.03), transparent 60%)",
                }}
              />

              {/* Header row */}
              <div className="relative z-10 flex items-start justify-between">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl"
                  style={{ background: "#111", border: "1px solid #2a2a2a" }}
                >
                  <CertIcon issuer={cert.issuer} color="#888" />
                </div>

                <span className="text-xs px-3 py-1 border border-[#333] group-hover:border-[#555] text-[#888] uppercase tracking-widest transition-colors duration-300">
                  {cert.year}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-2 flex-1">
                <p className="text-xs uppercase tracking-widest text-[#555]">
                  {cert.issuer} · {cert.category}
                </p>
                <h3 className="text-white font-semibold text-lg leading-snug group-hover:text-white/90 transition-colors">
                  {cert.title}
                </h3>
              </div>

              {/* Skills chips */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 border border-[#333] group-hover:border-[#444] text-[#aaa] rounded-full transition-colors duration-300"
                  >
                    · {skill}
                  </span>
                ))}
              </div>

              {/* CTA row */}
              <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-[#555] group-hover:text-[#888] transition-all duration-300 mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Certificate
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center gap-6 flex-wrap"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[#555] text-sm">{certificates.length} certificates issued</span>
          </div>
          <div className="w-px h-4 bg-[#333]" />
          <span className="text-[#555] text-sm">Deloitte Virtual Experience · Forage &amp; Professional Certifications</span>
        </motion.div>
      </div>

      {/* Modal */}
      {activeCert && (
        <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </section>
  )
}
