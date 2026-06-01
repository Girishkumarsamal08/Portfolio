export interface Project {
    title: string
    description: string
    tech: string[]
    gradient: string
    link?: string
}

export const projects: Project[] = [
    {
        title: "MITO AI Voice Assistant",
        description:
            "A desktop AI assistant with real-time speech recognition, wake word detection, and intelligent automation capabilities.",
        tech: ["Python", "Speech Recognition", "TTS", "Automation"],
        gradient: "linear-gradient(135deg, #3b82f6, #7c3aed)",
        link: "#",
    },
    {
        title: "Aesthetic Developer Portfolio",
        description:
            "A premium, high-performance portfolio website built with Next.js, featuring glassmorphism and advanced animations.",
        tech: ["Next.js", "GSAP", "Framer Motion", "Tailwind"],
        gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
        link: "#",
    },
]