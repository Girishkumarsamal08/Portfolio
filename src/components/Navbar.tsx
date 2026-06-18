"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("hero")
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50)

            // Scroll spy logic
            const sections = ["hero", "about", "education", "tools", "projects", "experience", "certifications", "contact"]
            const current = sections.find(section => {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    // Adjusting threshold for better detection
                    return rect.top <= 150 && rect.bottom >= 150
                }
                return false
            })
            if (current) setActiveSection(current)
        }
        window.addEventListener("scroll", onScroll)
        onScroll() // Initial check
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

        tl.from(".nav-item", {
            y: -20,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.2,
            clearProps: "transform,opacity"
        })
    }, { scope: navRef })

    return (
        <nav ref={navRef} className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-gradient-to-r from-[#001E3C] via-[#020202] to-[#001E3C] border-b border-white/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : "bg-transparent text-white"}`}>
            <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center h-[80px]">
                <Link href="#hero" className="nav-item text-xl font-serif font-bold tracking-widest uppercase text-white hover:text-blue-400 transition-colors flex items-center leading-none">
                    Portfolio
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-12 items-center h-full">
                    {navLinks.map((link) => {
                        const sectionId = link.href.replace("#", "")
                        // Improved active check
                        const isActive = activeSection === sectionId || (activeSection === "hero" && link.label === "Home")

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-item text-lg font-serif font-bold tracking-widest uppercase transition-all duration-500 relative group px-2 ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
                                style={isActive ? {
                                    textShadow: "0 0 10px #fff, 0 0 20px #fff, 0 0 40px #0070f3",
                                    opacity: 1
                                } : {}}
                            >
                                {link.label}
                                <span className={`absolute -bottom-2 left-0 h-[2px] bg-white transition-all duration-500 shadow-[0_0_10px_#fff] ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                            </Link>
                        )
                    })}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="nav-item md:hidden flex flex-col gap-[6px] p-2 items-center justify-center"
                    aria-label="Toggle menu"
                >
                    <span className="w-6 h-[2px] bg-white transition-all" style={mobileOpen ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}} />
                    <span className="w-6 h-[2px] bg-white transition-all" style={mobileOpen ? { opacity: 0 } : {}} />
                    <span className="w-6 h-[2px] bg-white transition-all" style={mobileOpen ? { transform: "rotate(-45deg) translate(7px, -6px)" } : {}} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-[500px] opacity-100 border-b border-white/10" : "max-h-0 opacity-0"}`}>
                <div className="px-6 pb-10 pt-4 flex flex-col gap-8 bg-gradient-to-b from-[#001E3C] to-[#020202] backdrop-blur-xl">
                    {navLinks.map((link) => {
                        const sectionId = link.href.replace("#", "")
                        const isActive = activeSection === sectionId || (activeSection === "hero" && link.label === "Home")
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`text-xl font-serif font-bold uppercase tracking-widest transition-all ${isActive ? "text-white" : "text-white/60"}`}
                                style={isActive ? { textShadow: "0 0 8px #fff, 0 0 20px #0070f3" } : {}}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent w-full transition-all duration-300"
                style={{
                    transform: `scaleX(${scrolled ? 1 : 0})`,
                    transformOrigin: "left"
                }}
            />
        </nav>
    )
}