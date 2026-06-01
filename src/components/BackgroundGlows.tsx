"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap"

export default function BackgroundGlows() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const glows = containerRef.current.querySelectorAll(".glow-orb")
        
        glows.forEach((glow, i) => {
            // Ambient floating animation
            gsap.to(glow, {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                duration: "random(10, 20)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 2
            })

            // Scroll-based parallax
            gsap.to(glow, {
                yPercent: (i + 1) * 20,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            })
        })
    }, [])

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden">
            {/* Top Right Glow */}
            <div className="glow-orb absolute top-[-10%] right-[-10% w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[120px]"></div>
            
            {/* Middle Left Glow */}
            <div className="glow-orb absolute top-[40%] left-[-15%] w-[800px] h-[800px] rounded-full bg-purple-900/10 blur-[150px]"></div>
            
            {/* Bottom Right Glow */}
            <div className="glow-orb absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[#001E3C]/20 blur-[130px]"></div>

            {/* Subtle Center Glow */}
            <div className="glow-orb absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-900/5 blur-[100px]"></div>
        </div>
    )
}
