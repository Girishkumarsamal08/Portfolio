"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* ─────────────────────────────────────────────
   De-duplicated skills (20 unique)
   ───────────────────────────────────────────── */
const skills = [
    { name: "Python", category: "Language", icon: "/skills/python.jpeg" },
    { name: "Java", category: "Language", icon: "JA", isLetter: true },
    { name: "C++", category: "Language", icon: "C+", isLetter: true },
    { name: "TypeScript", category: "Language", icon: "TS", isLetter: true },
    { name: "HTML", category: "Language", icon: "/skills/html.png" },
    { name: "CSS", category: "Language", icon: "/skills/css.png" },
    { name: "Javascript", category: "Language", icon: "/skills/js.png" },
    { name: "React JS", category: "Framework", icon: "/skills/reactjs.png" },
    { name: "Next JS", category: "Framework", icon: "/skills/nextjs.png" },
    { name: "Node JS", category: "Runtime", icon: "/skills/nodejs.png" },
    { name: "FastAPI", category: "Framework", icon: "FA", isLetter: true },
    { name: "Vite", category: "Build Tool", icon: "VI", isLetter: true },
    { name: "Bootstrap", category: "Framework", icon: "/skills/bootstrap.png" },
    { name: "Tailwind CSS", category: "Framework", icon: "TW", isLetter: true },
    { name: "REST API", category: "Integration", icon: "AP", isLetter: true },
    { name: "MySQL", category: "Database", icon: "/skills/mysql.png" },
    { name: "MongoDB", category: "Database", icon: "MG", isLetter: true },
    { name: "AWS", category: "Cloud", icon: "AW", isLetter: true },
    { name: "Docker", category: "DevOps", icon: "/skills/docker.png" },
    { name: "Github", category: "Version Control", icon: "/skills/github.png" },
]

/* ─────────────────────────────────────────────
   Orbit configuration
   4 orbits with increasing radii
   ───────────────────────────────────────────── */
const orbits = [
    { radius: 160, speed: 30, tilt: 75, skills: skills.slice(0, 4),   color: "#a855f7" },   // Inner: core languages
    { radius: 260, speed: 45, tilt: 72, skills: skills.slice(4, 9),   color: "#3b82f6" },   // Web fundamentals
    { radius: 360, speed: 60, tilt: 68, skills: skills.slice(9, 14),  color: "#06b6d4" },   // Frameworks & tools
    { radius: 460, speed: 80, tilt: 65, skills: skills.slice(14, 20), color: "#10b981" },   // Infrastructure
]

/* ─────────────────────────────────────────────
   Planet colors (each skill gets a unique hue)
   ───────────────────────────────────────────── */
const planetColors = [
    "#fbbf24", "#ef4444", "#8b5cf6", "#06b6d4",
    "#f97316", "#3b82f6", "#eab308", "#61dafb",
    "#ffffff", "#68a063", "#009688", "#646cff",
    "#7952b3", "#38bdf8", "#ff6b35", "#00758f",
    "#47a248", "#ff9900", "#2496ed", "#ffffff",
]

export default function Skills() {
    const [selectedSkill, setSelectedSkill] = useState<number | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [time, setTime] = useState(0)
    
    // Drag rotation state
    const [rotation, setRotation] = useState({ x: 12, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const handlePointerDown = (e: React.PointerEvent) => {
        // Only allow primary pointer dragging
        if (e.button !== 0) return
        setIsDragging(true)
        setDragStart({ x: e.clientX, y: e.clientY })
        e.currentTarget.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return
        const dx = e.clientX - dragStart.x
        const dy = e.clientY - dragStart.y
        
        setRotation(prev => {
            // Horizontal drag rotates around Y-axis (left/right)
            // Vertical drag rotates around X-axis (up/down tilt)
            const nextX = Math.max(-10, Math.min(60, prev.x - dy * 0.35))
            const nextY = prev.y + dx * 0.35
            return { x: nextX, y: nextY }
        })
        
        setDragStart({ x: e.clientX, y: e.clientY })
    }

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false)
        setRotation({ x: 12, y: 0 }) // Smoothly snap back to original tilted position
        e.currentTarget.releasePointerCapture(e.pointerId)
    }

    // Animation loop
    useEffect(() => {
        if (isPaused) return
        let raf: number
        let lastTime = performance.now()
        const tick = (now: number) => {
            const dt = (now - lastTime) / 1000
            lastTime = now
            setTime(prev => prev + dt)
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [isPaused])

    const handlePlanetClick = useCallback((globalIndex: number) => {
        setSelectedSkill(globalIndex)
        setIsPaused(true)
    }, [])

    const handleClose = useCallback(() => {
        setSelectedSkill(null)
        setIsPaused(false)
    }, [])

    return (
        <section id="tools" className="py-8 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center">

                {/* Section Title */}
                <div className="w-full mb-2 px-0 text-left">
                    <h2 className="editorial-title text-4xl md:text-6xl text-white mb-4">
                        Tools &<br />Technologies
                    </h2>
                    <div className="w-24 h-[1px] bg-[#333333]"></div>
                </div>

                {/* Solar System Container */}
                <div
                    className="relative w-full flex justify-center items-center"
                    style={{ height: "500px", perspective: "1200px" }}
                >
                    {/* 3D Scene - tilted to give depth */}
                    <div
                        className="relative cursor-grab active:cursor-grabbing select-none"
                        style={{
                            width: "100%",
                            height: "500px",
                            transformStyle: "preserve-3d",
                            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                            transition: isDragging ? "none" : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                    >
                        {/* ───── THE SUN ───── */}
                        <div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Sun glow layers */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20"
                                style={{ background: "radial-gradient(circle, #fbbf24, transparent 70%)", filter: "blur(30px)" }} />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full opacity-40"
                                style={{ background: "radial-gradient(circle, #fde68a, #f59e0b, transparent 70%)", filter: "blur(12px)" }} />
                            {/* Sun core */}
                            <div
                                className="relative w-14 h-14 rounded-full flex items-center justify-center"
                                style={{
                                    background: "radial-gradient(circle at 35% 35%, #fef3c7, #f59e0b, #d97706)",
                                    boxShadow: "0 0 40px 10px rgba(251, 191, 36, 0.4), 0 0 80px 20px rgba(251, 191, 36, 0.15), inset 0 0 20px rgba(255,255,255,0.3)",
                                    transform: `rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                                }}
                            >
                                <span className="text-[10px] font-bold text-amber-900 tracking-wider">SKILLS</span>
                            </div>
                        </div>

                        {/* ───── ORBIT RINGS & PLANETS ───── */}
                        {orbits.map((orbit, orbitIdx) => {
                            const globalStartIdx = orbits.slice(0, orbitIdx).reduce((sum, o) => sum + o.skills.length, 0)
                            return (
                                <OrbitRing
                                    key={orbitIdx}
                                    orbit={orbit}
                                    orbitIdx={orbitIdx}
                                    globalStartIdx={globalStartIdx}
                                    time={time}
                                    selectedSkill={selectedSkill}
                                    onPlanetClick={handlePlanetClick}
                                    rotation={rotation}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* ───── SKILL DETAIL OVERLAY ───── */}
                <AnimatePresence>
                    {selectedSkill !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 flex items-center justify-center"
                            onClick={handleClose}
                            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}
                        >
                            <motion.div
                                initial={{ scale: 0.2, opacity: 0, rotateY: -30 }}
                                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                                exit={{ scale: 0.2, opacity: 0, rotateY: 30 }}
                                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                                className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 max-w-lg"
                                onClick={(e) => e.stopPropagation()}
                                style={{ perspective: "600px" }}
                            >
                                {/* Galaxy / Planet visualization */}
                                <div className="relative flex-shrink-0">
                                    {/* Outer glow */}
                                    <div
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            width: 160, height: 160,
                                            background: `radial-gradient(circle, ${planetColors[selectedSkill]}33, transparent 70%)`,
                                            filter: "blur(25px)",
                                            transform: "translate(-20px, -20px)",
                                        }}
                                    />
                                    {/* Spiral arms / rings */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute rounded-full border opacity-20"
                                        style={{
                                            width: 150, height: 150,
                                            top: -15, left: -15,
                                            borderColor: planetColors[selectedSkill],
                                            transform: "rotateX(60deg)",
                                        }}
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute rounded-full border opacity-15"
                                        style={{
                                            width: 170, height: 170,
                                            top: -25, left: -25,
                                            borderColor: planetColors[selectedSkill],
                                            transform: "rotateX(45deg) rotateZ(30deg)",
                                        }}
                                    />
                                    {/* Planet core */}
                                    <div
                                        className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center overflow-hidden"
                                        style={{
                                            background: `radial-gradient(circle at 35% 35%, ${planetColors[selectedSkill]}ee, ${planetColors[selectedSkill]}66, #0a0a0a)`,
                                            boxShadow: `0 0 50px 10px ${planetColors[selectedSkill]}33, inset -10px -10px 30px rgba(0,0,0,0.6), inset 5px 5px 15px rgba(255,255,255,0.15)`,
                                        }}
                                    >
                                        {skills[selectedSkill].isLetter ? (
                                            <span className="text-3xl font-bold text-white/90 drop-shadow-lg">
                                                {skills[selectedSkill].icon}
                                            </span>
                                        ) : (
                                            <img
                                                src={skills[selectedSkill].icon as string}
                                                alt={skills[selectedSkill].name}
                                                className="w-16 h-16 object-contain drop-shadow-lg"
                                                style={{ filter: "brightness(1.2)" }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Skill info */}
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <motion.h3
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                        className="text-3xl md:text-4xl font-bold text-white mb-2"
                                    >
                                        {skills[selectedSkill].name}
                                    </motion.h3>
                                    <motion.span
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.25 }}
                                        className="text-sm uppercase tracking-[0.3em] mb-6"
                                        style={{ color: planetColors[selectedSkill] }}
                                    >
                                        {skills[selectedSkill].category}
                                    </motion.span>
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.35 }}
                                        onClick={handleClose}
                                        className="px-6 py-2 border text-white/70 hover:text-white hover:border-white/50 transition-all text-sm tracking-wider uppercase"
                                        style={{ borderColor: `${planetColors[selectedSkill]}44` }}
                                    >
                                        ← Back to orbit
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>


            </div>
        </section>
    )
}

/* ─────────────────────────────────────────────
   Orbit Ring Component
   ───────────────────────────────────────────── */
function OrbitRing({
    orbit,
    orbitIdx,
    globalStartIdx,
    time,
    selectedSkill,
    onPlanetClick,
    rotation,
}: {
    orbit: typeof orbits[0]
    orbitIdx: number
    globalStartIdx: number
    time: number
    selectedSkill: number | null
    onPlanetClick: (idx: number) => void
    rotation: { x: number; y: number }
}) {
    const [scaleFactor, setScaleFactor] = useState(1)

    useEffect(() => {
        const update = () => setScaleFactor(Math.min(1, window.innerWidth / 900))
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    const radius = orbit.radius * scaleFactor

    return (
        <div
            className="absolute left-1/2 top-1/2"
            style={{
                transformStyle: "preserve-3d",
                transform: `translate(-50%, -50%) rotateX(${orbit.tilt}deg)`,
            }}
        >
            {/* Orbit ring (the elliptical track) */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    width: radius * 2,
                    height: radius * 2,
                    border: `1px solid ${orbit.color}15`,
                    boxShadow: `0 0 15px 1px ${orbit.color}08`,
                }}
            />

            {/* Dashed inner guide */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    width: radius * 2 - 4,
                    height: radius * 2 - 4,
                    border: `1px dashed ${orbit.color}0a`,
                }}
            />

            {/* Planets on this orbit */}
            {orbit.skills.map((skill, idx) => {
                const globalIdx = globalStartIdx + idx
                const angleOffset = (idx / orbit.skills.length) * Math.PI * 2
                const angle = angleOffset + (time * Math.PI * 2) / orbit.speed
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                // Z-depth for 3D effect: planets in "front" appear larger/brighter
                const zDepth = Math.sin(angle) // -1 (back) to 1 (front)
                const scale = 0.7 + (zDepth + 1) * 0.25  // 0.7 to 1.2
                const opacity = 0.5 + (zDepth + 1) * 0.25 // 0.5 to 1.0
                const zIndex = Math.round((zDepth + 1) * 50)

                return (
                    <Planet
                        key={globalIdx}
                        skill={skill}
                        globalIdx={globalIdx}
                        x={x}
                        y={y}
                        scale={scale}
                        opacity={opacity}
                        zIndex={zIndex}
                        tilt={orbit.tilt}
                        orbitColor={orbit.color}
                        isSelected={selectedSkill === globalIdx}
                        onClick={() => onPlanetClick(globalIdx)}
                        time={time}
                        isFront={zDepth > 0}
                        rotation={rotation}
                    />
                )
            })}
        </div>
    )
}

/* ─────────────────────────────────────────────
   Planet Component
   ───────────────────────────────────────────── */
function Planet({
    skill,
    globalIdx,
    x,
    y,
    scale,
    opacity,
    zIndex,
    tilt,
    orbitColor,
    isSelected,
    onClick,
    time,
    isFront,
    rotation,
}: {
    skill: typeof skills[0]
    globalIdx: number
    x: number
    y: number
    scale: number
    opacity: number
    zIndex: number
    tilt: number
    orbitColor: string
    isSelected: boolean
    onClick: () => void
    time: number
    isFront: boolean
    rotation: { x: number; y: number }
}) {
    const color = planetColors[globalIdx]

    // Self-rotation angle for the planet (each planet spins at its own rate)
    const selfRotation = time * (30 + globalIdx * 7)

    return (
        <div
            className="absolute left-1/2 top-1/2 cursor-pointer group"
            style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotateX(${-tilt}deg) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg) scale(${scale})`,
                zIndex,
                opacity,
                transition: "opacity 0.3s ease",
                transformStyle: "preserve-3d",
            }}
            onClick={onClick}
        >
            {/* Planet glow */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 group-hover:scale-150"
                style={{
                    width: 72,
                    height: 72,
                    background: `radial-gradient(circle, ${color}30, transparent 70%)`,
                    filter: "blur(10px)",
                }}
            />
            {/* Planet body */}
            <div
                className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg"
                style={{
                    background: `radial-gradient(circle at 30% 30%, ${color}dd, ${color}66, #111)`,
                    boxShadow: `0 0 20px 4px ${color}28, inset -4px -4px 10px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.15)`,
                    transform: `rotateZ(${selfRotation * 0.1}deg)`,
                }}
            >
                {skill.isLetter ? (
                    <span className="text-xs font-bold text-white/90 select-none">{(skill.icon as string).slice(0, 2)}</span>
                ) : (
                    <img
                        src={skill.icon as string}
                        alt={skill.name}
                        className="w-7 h-7 object-contain"
                        style={{ filter: "brightness(1.3) drop-shadow(0 0 3px rgba(255,255,255,0.3))" }}
                        draggable={false}
                    />
                )}
            </div>

            {/* Skill name label */}
            <div
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={isFront ? { bottom: "calc(100% + 8px)" } : { top: "calc(100% + 8px)" }}
            >
                <div
                    className="px-3 py-1.5 text-[10px] font-medium tracking-wider uppercase text-center"
                    style={{
                        background: `linear-gradient(135deg, ${color}22, rgba(0,0,0,0.8))`,
                        border: `1px solid ${color}33`,
                        color: color,
                        backdropFilter: "blur(10px)",
                        borderRadius: "4px",
                    }}
                >
                    {skill.name}
                </div>
            </div>
        </div>
    )
}