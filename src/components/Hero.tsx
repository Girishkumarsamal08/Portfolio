"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const ROLES = ["WEB DEVELOPER", "AI ENGINEER", "SOFTWARE DEV"]

export default function Hero() {
    const [text, setText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [loopNum, setLoopNum] = useState(0)
    const [typingSpeed, setTypingSpeed] = useState(150)

    const containerRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLHeadingElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const bgTitleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let timer = setTimeout(() => {
            const i = loopNum % ROLES.length
            const fullText = ROLES[i]

            setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))

            if (!isDeleting && text === fullText) {
                setIsDeleting(true)
                setTypingSpeed(2000) // pause before deleting
            } else if (isDeleting && text === "") {
                setIsDeleting(false)
                setLoopNum(loopNum + 1)
                setTypingSpeed(500) // pause before typing next
            } else {
                setTypingSpeed(isDeleting ? 50 : 100) // typing and deleting speeds
            }
        }, typingSpeed)

        return () => clearTimeout(timer)
    }, [text, isDeleting, loopNum, typingSpeed])

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

        tl.from(bgTitleRef.current, {
            opacity: 0,
            y: 100,
            duration: 1.5,
            delay: 0.5
        })
        .from([subtitleRef.current, descriptionRef.current, buttonRef.current], {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1
        }, "-=1")
        .from(imageRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 1.5,
            ease: "expo.out"
        }, "-=1")

        // Parallax effect for the background title
        gsap.to(bgTitleRef.current, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        })
    }, { scope: containerRef })

    return (
        <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 w-full">

            {/* Massive Editorial Background Title */}
            <div ref={bgTitleRef} className="absolute top-20 left-4 md:top-32 md:left-12 z-0 pointer-events-none select-none">
                <h1 className="editorial-title text-transparent text-[120px] md:text-[220px] lg:text-[280px]" style={{ WebkitTextStroke: '2px #222222' }}>
                    Portfol<br />io
                </h1>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between w-full h-full gap-12 mt-12 md:mt-24">

                {/* Left Content - Typography */}
                <div className="w-full md:w-1/2 flex flex-col justify-center max-w-2xl px-4 md:pl-10">
                    <div ref={subtitleRef}>
                        <h2 className="text-white text-5xl md:text-7xl font-serif font-normal mb-8 leading-tight">
                            Hello! I&apos;m Girish
                        </h2>
                    </div>
                    <p ref={descriptionRef} className="text-[#999999] text-lg md:text-xl leading-relaxed font-sans font-light mb-10 max-w-lg">
                        Building modern digital experiences through code, creating intelligent systems. I specialize in developing scalable web applications, AI-powered tools, and innovative solutions that bridge technology and real-world impact.
                    </p>
                    <div ref={buttonRef}>
                        <a href="/resume.pdf" className="text-white text-sm md:text-base font-sans font-medium border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors inline-block tracking-[0.2em] uppercase">
                            Download CV
                        </a>
                    </div>
                </div>

                {/* Right Content - Monochrome Portrait */}
                <div ref={imageRef} className="w-full md:w-1/2 relative flex justify-center items-center mt-16 md:mt-0">
                    {/* Floating role label */}
                    <div className="absolute -top-10 md:top-0 right-10 text-white tracking-[0.3em] text-xs md:text-sm uppercase font-light z-30 font-sans border border-white/20 px-4 py-2 bg-black/50 backdrop-blur-sm min-w-[180px] h-[36px] flex items-center justify-center">
                        {text}<span className="inline-block w-[2px] h-3 bg-white ml-1 animate-pulse"></span>
                    </div>

                    {/* Circular flat wrapper, no neon */}
                    <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full p-1 border border-[#333333] ">
                        <div className="w-full h-full rounded-full flex justify-center items-center overflow-hidden">
                            <Image
                                src="/profile.jpg"
                                alt="Girish Kumar Samal"
                                width={500}
                                height={500}
                                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}