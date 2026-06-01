"use client"

import { useState, useEffect } from "react"
import CustomCursor from "./CustomCursor"
import LoadingScreen from "./LoadingScreen"
import NightSkyBackground from "./NightSkyBackground"
import BackgroundGlows from "./BackgroundGlows"
import MitoCompanion from "./MitoCompanion"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Force scroll to top on load
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <NightSkyBackground />
            <BackgroundGlows />
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            {!isLoading && <CustomCursor />}
            
            {/* 
                We keep the children in the DOM so SEO and pre-rendering works, 
                but we hide scroll and opacity until loading is complete to prevent layout shifts.
            */}
            <div 
                className={`transition-opacity duration-300 w-full ${
                    isLoading ? "h-screen overflow-hidden opacity-0" : "h-auto opacity-100"
                }`}
            >
                {/* Only render children when loading is done to ensure animations sync correctly, or just let CSS handle visibility */}
                {/* Actually rendering children allows next/image to preload, so we just use opacity. 
                    However, if we want GSAP/framer-motion mount animations to wait, we render conditionally. */}
                {!isLoading && children}
            </div>
            {!isLoading && <MitoCompanion />}
        </>
    )
}

