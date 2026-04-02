"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
    onComplete: () => void;
}

const BOOT_LOGS = [
    "[ OK ] Mounting network assets to /dev/sda1",
    "[ OK ] Established secure SSH tunnel (port 22)",
    "[ OK ] Loading encrypted docker context...",
    "[ OK ] System kernel initialized (v6.0.8)",
    "[ OK ] User authentication verified",
    "[ OK ] Boot sequence complete."
]

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0)
    const [logs, setLogs] = useState<string[]>([])
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        // Increment progress simulation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    return 100
                }
                const increment = Math.floor(Math.random() * 15) + 5
                return Math.min(prev + increment, 100)
            })
        }, 150)

        // Add logs simulation
        const addLogs = async () => {
            for (let i = 0; i < BOOT_LOGS.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400))
                setLogs(prev => [...prev, BOOT_LOGS[i]])
            }
        }

        addLogs()

        return () => clearInterval(progressInterval)
    }, [])

    useEffect(() => {
        if (progress === 100 && logs.length === BOOT_LOGS.length) {
            setTimeout(() => {
                setIsComplete(true)
                setTimeout(() => {
                    onComplete()
                }, 800) // matches fade out duration
            }, 600)
        }
    }, [progress, logs, onComplete])

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] bg-[#050505] flex items-center justify-center font-mono text-blue-500 overflow-hidden"
                >
                    <div className="w-full max-w-2xl px-8 py-10 flex flex-col gap-8">
                        {/* Command Line */}
                        <div className="flex items-center gap-3 text-sm md:text-base opacity-90">
                            <div className="w-3 h-3 rounded-full bg-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse" />
                            <p className="tracking-wider">GIRISH@OPS-KERNEL:~$ BOOT --VERBOSE --SILENT</p>
                        </div>

                        {/* Progress Section */}
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex justify-between items-end text-sm md:text-base font-medium tracking-[0.2em] uppercase">
                                <p>Initializing Core</p>
                                <p>{progress}%</p>
                            </div>
                            {/* Progress bar background */}
                            <div className="w-full h-[2px] bg-blue-900/40 rounded-full overflow-hidden relative">
                                {/* Progress bar fill */}
                                <motion.div 
                                    className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </div>

                        {/* System Logs */}
                        <div className="flex flex-col gap-2 text-xs md:text-sm tracking-wide opacity-80 min-h-[160px]">
                            {logs.map((log, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-start"
                                >
                                    <span className="text-blue-500 mr-2 opacity-90">{log.substring(0, 6)}</span>
                                    <span className="text-blue-400/80">{log.substring(6)}</span>
                                </motion.div>
                            ))}
                            {/* Blinking cursor effect below logs */}
                            {progress < 100 && (
                                <motion.div 
                                    animate={{ opacity: [1, 0, 1] }} 
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-2 h-4 bg-blue-500/80 mt-1"
                                />
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
