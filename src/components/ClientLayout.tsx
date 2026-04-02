"use client"

import { useState, useEffect } from "react"
import NightSkyBackground from "./NightSkyBackground"
import CustomCursor from "./CustomCursor"
import LoadingScreen from "./LoadingScreen"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <NightSkyBackground />
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            {!isLoading && <CustomCursor />}
            
            <div 
                className={`transition-opacity duration-1000 w-full ${
                    isLoading ? "h-screen overflow-hidden opacity-0" : "h-auto opacity-100"
                }`}
            >
                {!isLoading && children}
            </div>
        </>
    )
}
