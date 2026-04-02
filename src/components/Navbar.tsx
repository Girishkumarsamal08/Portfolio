"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import { gsap } from "@/lib/gsap"

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
        
        tl.from(".nav-item", {
            y: -20,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.2
        })
    }, { scope: navRef })

    return (
        <nav ref={navRef} className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                <Link href="#hero" className="nav-item text-xl font-serif font-bold tracking-widest uppercase text-white">
                    Portfolio
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="nav-item text-gray-400 hover:text-white text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex md:hidden items-center gap-4">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="nav-item flex flex-col gap-[6px] p-2"
                    >
                        <span className={`w-7 h-[2px] bg-white ${mobileOpen ? "rotate(45deg) translate(6px, 6px)" : ""}`} />
                        <span className={`w-7 h-[2px] bg-white ${mobileOpen ? "opacity-0" : ""}`} />
                        <span className={`w-7 h-[2px] bg-white ${mobileOpen ? "rotate(-45deg) translate(8px, -8px)" : ""}`} />
                    </button>
                </div>
            </div>
        </nav>
    )
}