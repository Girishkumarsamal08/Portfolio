"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"

interface LoadingScreenProps {
    onComplete: () => void;
}

// Fixed number of stars for performance and consistency
const STAR_COUNT = 120

function generateStars() {
    return Array.from({ length: STAR_COUNT }).map(() => ({
        x: (Math.random() - 0.5) * 250,
        y: (Math.random() - 0.5) * 250,
        size: Math.random() * 1.5 + 0.5,
        isMeteor: Math.random() > 0.85
    }))
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [mounted, setMounted] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const starsRef = useRef<(SVGSVGElement | null)[]>([])

    // Generate star positions only on the client to avoid hydration mismatch
    const starInitialPositions = useRef<ReturnType<typeof generateStars>>([])

    useEffect(() => {
        starInitialPositions.current = generateStars()
        setMounted(true)
    }, [])

    useGSAP(() => {
        if (!containerRef.current || !mounted) return

        const TOTAL_DURATION = 15

        const tl = gsap.timeline({
            onComplete: () => {
                setIsComplete(true)
                setTimeout(onComplete, 500)
            }
        })

        // Animate progress value
        tl.to({ val: 0 }, {
            val: 100,
            duration: TOTAL_DURATION,
            ease: "none",
            onUpdate: function () {
                setProgress(Math.round(this.targets()[0].val))
            }
        }, 0)

        // Animate stars converging to center
        starsRef.current.forEach((star, i) => {
            if (!star) return
            const config = starInitialPositions.current[i]
            
            // Ensure stars finish exactly within the 15s TOTAL_DURATION
            const duration = 1.5 + Math.random() * 3.5
            const delay = Math.random() * (TOTAL_DURATION - duration)

            tl.fromTo(star, 
                {
                    x: `${config.x}vw`,
                    y: `${config.y}vh`,
                    opacity: 0,
                    scale: 0.2
                },
                {
                    x: "0vw",
                    y: "0vh",
                    opacity: 1,
                    scale: 0.8,
                    duration: duration,
                    delay: delay,
                    ease: "power2.in"
                }, 
                0
            )

            // Special meteor trail if applicable
            if (config.isMeteor) {
                gsap.to(star, {
                    filter: "blur(1px) drop-shadow(0 0 8px white)",
                    repeat: -1,
                    yoyo: true,
                    duration: 0.1
                })
            }
        })

        // Central glow pulse
        tl.to(".central-glow", {
            scale: 3,
            opacity: 0.8,
            duration: TOTAL_DURATION,
            ease: "power2.inOut"
        }, 0)

    }, { scope: containerRef, dependencies: [mounted] })

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    ref={containerRef}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center overflow-hidden"
                    style={{
                        background: "radial-gradient(circle at center, #020b1a 0%, #050505 100%)"
                    }}
                >
                    {/* Background "Stellar Core" Glow */}
                    <div className="central-glow absolute w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] opacity-0 pointer-events-none" />

                    {/* Converging Star Particles */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        {mounted && starInitialPositions.current.map((star, i) => (
                            <svg
                                key={i}
                                ref={el => { starsRef.current[i] = el }}
                                width={star.isMeteor ? "30" : "4"}
                                height="4"
                                viewBox="0 0 30 4"
                                className="absolute fill-white"
                            >
                                <circle cx={star.isMeteor ? "28" : "2"} cy="2" r={star.size} />
                                {star.isMeteor && (
                                    <path d="M0 2 L28 2" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
                                )}
                            </svg>
                        ))}
                    </div>

                    {/* Central Loading Bar UI */}
                    <div className="relative w-full max-w-sm px-10 flex flex-col items-center gap-6 z-10">
                        {/* Status Label (Optional but helps context) */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-[#666] tracking-[0.4em] uppercase font-light"
                        >
                            Syncing with Stars
                        </motion.p>

                        <div className="w-full flex-col gap-2">
                            {/* Progress Line */}
                            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_white]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="flex justify-between mt-3 text-[10px] text-white/40 tracking-widest font-light">
                                <span>ACCUMULATING</span>
                                <span>{progress}%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
