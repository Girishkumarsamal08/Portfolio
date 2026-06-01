"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"
import { motion, AnimatePresence } from "framer-motion"

export default function Contact() {
    const containerRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

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

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formRef.current) return

        setIsSubmitting(true)
        setSubmitStatus("idle")

        const formData = new FormData(formRef.current)
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })

            const data = await response.json()
            if (data.success) {
                setSubmitStatus("success")
                formRef.current.reset()
            } else {
                console.error("Web3Forms Error:", data)
                setSubmitStatus("error")
            }
        } catch (error) {
            console.error("Submission Error:", error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" ref={containerRef} className="py-12 relative bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* Standard Editorial Header */}
                <div className="w-full mb-6 text-left">
                    <h2 className="editorial-title text-4xl md:text-6xl text-white mb-2 uppercase">Contact</h2>
                    <div className="w-24 h-[1px] bg-[#333333]"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-stretch">

                    {/* Left side: Info */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-start pt-8">
                        <p className="contact-reveal text-[#999999] text-lg font-light max-w-sm mb-12">
                            Have a project in mind? Reach out and let&apos;s build something great.
                        </p>

                        <div className="flex flex-col space-y-10">
                            <div className="contact-reveal">
                                <h3 className="text-white text-base font-serif font-bold mb-0.5 tracking-wide uppercase">Email</h3>
                                <a href="mailto:biswajitasamal8342@gmail.com" className="text-[#cccccc] hover:text-white transition-colors text-lg font-light">
                                    biswajitasamal8342@gmail.com
                                </a>
                            </div>

                            <div className="contact-reveal">
                                <h3 className="text-white text-base font-serif font-bold mb-0.5 tracking-wide uppercase">Address</h3>
                                <p className="text-[#cccccc] text-lg font-light">
                                    Bhubaneswar, Odisha, India
                                </p>
                            </div>

                            <div className="contact-reveal">
                                <h3 className="text-white text-base font-serif font-bold mb-2 tracking-wide uppercase">Social</h3>
                                <div className="flex items-center gap-6">
                                    <a href="https://linkedin.com/in/girish-kumar-samal08" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.instagram.com/just._.mickey___/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a href="https://github.com/Girishkumarsamal08" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <div className="bg-[#0a0a0a] border border-[#333333] h-full min-h-[500px] flex flex-col justify-center relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {submitStatus === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="p-10 md:p-14 flex flex-col items-center text-center"
                                    >
                                        <div className="w-24 h-24 mb-10 rounded-full border border-green-500/30 flex items-center justify-center bg-green-500/5 relative">
                                            <motion.div
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                                className="text-green-400"
                                            >
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </motion.div>
                                            {/* Pulse ring */}
                                            <motion.div
                                                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 rounded-full border border-green-500/50"
                                            />
                                        </div>
                                        <h3 className="text-3xl font-serif text-white mb-4">Message Received</h3>
                                        <p className="text-[#999999] font-light text-lg mb-10 leading-relaxed max-w-xs mx-auto">
                                            Thank you for reaching out. I&apos;ll get back to you across the cosmic void shortly.
                                        </p>
                                        <button 
                                            onClick={() => setSubmitStatus("idle")}
                                            className="text-white text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        ref={formRef}
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="p-10 md:p-14 flex flex-col justify-center h-full"
                                        onSubmit={handleFormSubmit}
                                    >
                                        {/* Hidden Access Key for Web3Forms */}
                                        <input type="hidden" name="access_key" value="5a4d23c1-4cc9-4e71-86c0-c30d999d61c7" />

                                        {submitStatus === "error" && (
                                            <div className="mb-8 bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm text-center">
                                                Something went wrong. Please check your console or try again.
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-[#999999] mb-3">First Name</label>
                                                <input name="first_name" required type="text" className="w-full bg-transparent border-b border-[#333333] px-0 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-[#444444]" placeholder="John" />
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-[#999999] mb-3">Last Name</label>
                                                <input name="last_name" required type="text" className="w-full bg-transparent border-b border-[#333333] px-0 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-[#444444]" placeholder="Doe" />
                                            </div>
                                        </div>
                                        <div className="mb-8">
                                            <label className="block text-xs uppercase tracking-widest text-[#999999] mb-3">Email Address</label>
                                            <input name="email" required type="email" className="w-full bg-transparent border-b border-[#333333] px-0 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-[#444444]" placeholder="john@example.com" />
                                        </div>
                                        <div className="mb-12">
                                            <label className="block text-xs uppercase tracking-widest text-[#999999] mb-3">Message</label>
                                            <textarea name="message" required rows={4} className="w-full bg-transparent border-b border-[#333333] px-0 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none placeholder-[#444444]" placeholder="Tell me about your project..."></textarea>
                                        </div>
                                        <button 
                                            disabled={isSubmitting}
                                            className={`w-full text-black font-semibold text-sm tracking-widest uppercase py-4 transition-all border border-white ${isSubmitting ? "bg-gray-400 border-gray-400 cursor-not-allowed" : "bg-white hover:bg-[#cccccc]"}`}
                                        >
                                            {isSubmitting ? "Sending..." : "Send Message"}
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}