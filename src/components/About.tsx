"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"

export default function About() {
    const containerRef = useRef<HTMLElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        gsap.from(rightRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
    }, { scope: containerRef })

    return (
        <section id="about" ref={containerRef} className="py-24 border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="mb-32 text-center"
                >
                    <h2 className="text-5xl md:text-7xl text-white font-serif mb-8 uppercase tracking-widest relative z-10">
                        About Me
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="flex flex-col space-y-12">
                            <p className="text-2xl md:text-4xl text-white font-serif leading-tight">
                                Delivering high-performance, modular digital solutions with a focus on system intelligence.
                            </p>
                            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5">
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
                                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-3">9.0+</h3>
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
                            className="w-full max-w-lg bg-[#0a0a0a] border border-[#333333] rounded-none overflow-hidden hover:border-[#555555] transition-colors duration-500"
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