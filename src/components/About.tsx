"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

export default function About() {
    const containerRef = useRef<HTMLElement>(null)
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!containerRef.current) return

        gsap.from(leftRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })

        gsap.from(rightRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out"
        })
    }, { scope: containerRef })

    return (
        <section id="about" ref={containerRef} className="py-12 bg-transparent relative">
            <div className="container mx-auto px-6 max-w-7xl">

                <div className="flex flex-col lg:flex-row items-center gap-16 relative">

                    {/* Left Side: About Text & Stats */}
                    <div ref={leftRef} className="w-full lg:w-1/2 relative z-10">
                        <div>
                            {/* Section Title */}
                            <div className="w-full mb-10 px-0">
                                <h2 className="editorial-title text-4xl md:text-6xl text-white mb-4">About Me</h2>
                                <div className="w-24 h-[1px] bg-[#333333]"></div>
                            </div>
                            <div className="border-l border-[#333333] pl-6 mb-12">
                                <p className="text-[#cccccc] text-lg leading-relaxed mb-6 font-light">
                                    I&apos;m Girish Kumar Samal, a passionate application and web developer dedicated to building modern, high-performance digital solutions.
                                    I enjoy working with emerging technologies such as Artificial Intelligence, automation, and modern web frameworks.
                                </p>
                                <p className="text-[#cccccc] text-lg leading-relaxed font-light">
                                    I focus on writing clean, reliable code while designing systems that are both functional and user-friendly.
                                    My goal is to create impactful products that solve real-world problems.
                                </p>
                            </div>

                            {/* Crisp Monochrome Stats Row */}
                            <div className="grid grid-cols-3 gap-6 border-t border-[#333333] pt-10">
                                <div>
                                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-3">4+</h3>
                                    <p className="text-[#666666] text-xs uppercase tracking-widest font-medium flex flex-col">
                                        <span>Projects</span>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-3">3+</h3>
                                    <p className="text-[#666666] text-xs uppercase tracking-widest font-medium flex flex-col">
                                        <span>Years Experience</span>
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-3">8.5+</h3>
                                    <p className="text-[#666666] text-xs uppercase tracking-widest font-medium flex flex-col">
                                        <span>CGPA</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Flat minimalist Code Snippet box */}
                    <div ref={rightRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end relative z-10">
                        <div
                            className="w-full max-w-lg bg-[#0a0a0a] border border-[#333333] rounded-none overflow-hidden"
                        >
                            <div className="flex items-center gap-4 bg-[#111111] px-6 py-4 border-b border-[#333333]">
                                <span className="text-xs text-[#999999] font-mono uppercase tracking-widest">developer.ts</span>
                            </div>

                            <div className="p-8 font-mono text-sm leading-loose text-[#cccccc] overflow-x-auto">
                                <span className="text-white font-semibold">const</span> developer = {'{'} <br />
                                <span className="pl-6"><span className="text-[#999999]">name</span>: <span className="text-white">'Girish Kumar Samal'</span>,</span> <br />
                                <span className="pl-6"><span className="text-[#999999]">role</span>: <span className="text-white">'Full Stack & AI Developer'</span>,</span> <br />
                                <span className="pl-6"><span className="text-[#999999]">skills</span>: [</span><br />
                                <span className="pl-12 text-white">'Python'</span>, <span className="text-white">'React'</span>, <span className="text-white">'Next.js'</span>,<br />
                                <span className="pl-12 text-white">'TypeScript'</span>, <span className="text-white">'Node.js'</span>, <span className="text-white">'SQL'</span><br />
                                <span className="pl-6">],</span><br />
                                <span className="pl-6"><span className="text-[#999999]">passion</span>: <span className="text-white">'Building intelligent systems'</span></span><br />
                                {'}'};
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}