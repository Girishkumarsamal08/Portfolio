"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            }
        })

        tl.from(".contact-reveal", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        })
            .from(formRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            }, "-=0.4")
    }, { scope: containerRef })

    return (
        <section id="contact" ref={containerRef} className="py-32 relative border-t border-[#222222]">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="mb-32 text-center"
                >
                    <h2 className="text-5xl md:text-7xl text-white font-serif mb-0 uppercase tracking-widest relative z-10">
                        Contact
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-20 items-stretch">

                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <div className="mt-16 flex flex-col space-y-12">
                            <div className="contact-reveal">
                                <h3 className="text-white text-xl font-serif font-bold mb-4 tracking-wide">Email:</h3>
                                <a href="mailto:biswajitasamal8342@gmail.com" className="text-[#cccccc] hover:text-white transition-colors text-lg font-serif">
                                    biswajitasamal8342@gmail.com
                                </a>
                            </div>

                            <div className="contact-reveal">
                                <h3 className="text-white text-xl font-serif font-bold mb-4 tracking-wide">Address:</h3>
                                <p className="text-[#cccccc] text-lg font-serif">
                                    Bhubaneswar, Odisha, India
                                </p>
                            </div>

                            <div className="contact-reveal flex items-center gap-6 mt-10">
                                <a href="https://linkedin.com/in/girish-kumar-samal08" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">LinkedIn</a>
                                <a href="https://github.com/Girishkumarsamal08" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">GitHub</a>
                                <a href="https://www.instagram.com/just._.mickey___/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">Instagram</a>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <form
                            ref={formRef}
                            className="bg-[#0a0a0a] p-10 md:p-14 border border-[#333333] h-full flex flex-col justify-center"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#999999] mb-3">First Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-[#333333] px-0 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-[#444444]" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#999999] mb-3">Last Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-[#333333] px-0 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-[#444444]" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="mb-8">
                                <label className="block text-xs uppercase tracking-widest text-[#999999] mb-3">Email Address</label>
                                <input type="email" className="w-full bg-transparent border-b border-[#333333] px-0 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-[#444444]" placeholder="john@example.com" />
                            </div>
                            <div className="mb-12">
                                <label className="block text-xs uppercase tracking-widest text-[#999999] mb-3">Message</label>
                                <textarea rows={4} className="w-full bg-transparent border-b border-[#333333] px-0 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none placeholder-[#444444]" placeholder="Tell me about your project..."></textarea>
                            </div>
                            <button className="w-full bg-white text-black font-semibold text-sm tracking-widest uppercase py-4 hover:bg-[#cccccc] transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}