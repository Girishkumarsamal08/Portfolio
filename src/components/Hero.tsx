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
                setTypingSpeed(2000)
            } else if (isDeleting && text === "") {
                setIsDeleting(false)
                setLoopNum(loopNum + 1)
                setTypingSpeed(500)
            } else {
                setTypingSpeed(isDeleting ? 50 : 100)
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
    }, { scope: containerRef })

    return (
        <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-20 w-full mb-12">

            {/* Massive Editorial Background Title */}
            <div ref={bgTitleRef} className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none text-center">
                <h1 className="editorial-title text-transparent text-[150px] md:text-[250px] lg:text-[350px] opacity-10" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
                    PORTFOLIO
                </h1>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between w-full h-full gap-12 mt-12 md:mt-24">

                {/* Left Content - Typography */}
                <div className="w-full md:w-1/2 flex flex-col justify-center max-w-2xl px-4 pl-10">
                    <div ref={subtitleRef}>
                        <h2 className="text-white text-5xl md:text-7xl font-serif mb-8 leading-tight">
                            Hello! I&apos;m Girish
                        </h2>
                    </div>
                    <p ref={descriptionRef} className="text-[#999999] text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                        Building modern digital experiences through code, creating intelligent systems. I specialize in developing scalable web applications, AI-powered tools, and innovative solutions that bridge technology and real-world impact.
                    </p>
                    <div ref={buttonRef}>
                        <a href="#contact" className="text-white text-sm font-sans border-b border-white pb-1 hover:text-gray-400 hover:border-gray-400 transition-colors inline-block tracking-widest uppercase">
                            Get in touch
                        </a>
                    </div>
                </div>

                {/* Right Content */}
                <div ref={imageRef} className="w-full md:w-1/2 relative flex justify-center items-center mt-16 md:mt-0">
                    <div className="absolute -top-10 md:top-0 right-10 text-white tracking-[0.3em] text-xs md:text-sm uppercase font-light z-30 font-sans border border-white/20 px-4 py-2 bg-black/50 backdrop-blur-sm min-w-[180px] h-[36px] flex items-center justify-center">
                        {text}<span className="inline-block w-[2px] h-3 bg-white ml-1 animate-pulse"></span>
                    </div>

                    <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border border-white/5 overflow-hidden">
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
        </section>
    )
}