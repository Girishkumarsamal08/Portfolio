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
        title: "SmartBuy Price Comparator",
        description:
            "Full-stack web application that compares product prices across multiple e-commerce platforms in real-time.",
        tech: ["React", "Flask", "MongoDB", "AWS", "Web Scraping"],
        gradient: "linear-gradient(135deg, #06b6d4, #10b981)",
        link: "#",
    },
]