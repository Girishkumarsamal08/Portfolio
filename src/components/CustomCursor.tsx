"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "@/lib/gsap"

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isPointer, setIsPointer] = useState(false)
    const [coords, setCoords] = useState({ x: 0, y: 0 })
    
    const cursorRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === "undefined" || window.innerWidth < 768) return

        // GSAP QuickTo for ultra-responsive movement
        const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" })
        const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" })
        
        const txTo = gsap.quickTo(tooltipRef.current, "x", { duration: 0.6, ease: "power2" })
        const tyTo = gsap.quickTo(tooltipRef.current, "y", { duration: 0.6, ease: "power2" })

        const updateMousePosition = (e: MouseEvent) => {
            const { clientX, clientY } = e
            xTo(clientX)
            yTo(clientY)
            txTo(clientX + 16)
            tyTo(clientY + 16)
            
            setCoords({ x: clientX, y: clientY })
            
            if (!isVisible) setIsVisible(true)

            // Check if hovered element is clickable
            const target = e.target as HTMLElement
            const isClickable = 
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button"
            
            setIsPointer(isClickable)
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener("mousemove", updateMousePosition)
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)

        return () => {
            window.removeEventListener("mousemove", updateMousePosition)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseenter", handleMouseEnter)
        }
    }, [isVisible])

    // Scale animation when hovering pointers
    useEffect(() => {
        if (!cursorRef.current) return
        gsap.to(cursorRef.current, {
            scale: isPointer ? 2.5 : 1,
            duration: 0.3,
            ease: "power2.out"
        })
    }, [isPointer])

    // Visibility toggle
    useEffect(() => {
        if (!cursorRef.current || !tooltipRef.current) return
        gsap.to([cursorRef.current, tooltipRef.current], {
            opacity: isVisible ? 1 : 0,
            duration: 0.2
        })
    }, [isVisible])

    if (typeof window !== "undefined" && window.innerWidth < 768) return null

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference opacity-0"
                style={{
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.5)",
                }}
            />
            {/* Coordinate Tooltip */}
            <div
                ref={tooltipRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] font-mono text-white/50 text-[10px] tracking-wider whitespace-nowrap mix-blend-difference opacity-0"
            >
                X:{coords.x} Y:{coords.y}
            </div>
        </>
    )
}
