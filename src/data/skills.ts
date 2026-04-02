export interface Skill {
    name: string
    icon: string
    category: string
}

export const skills: Skill[] = [
    // Languages
    { name: "Python", icon: "🐍", category: "Language" },
    { name: "Java", icon: "☕", category: "Language" },
    { name: "JavaScript", icon: "⚡", category: "Language" },
    { name: "C++", icon: "⚙️", category: "Language" },
    { name: "TypeScript", icon: "📘", category: "Language" },

    // Frameworks & Libraries
    { name: "React", icon: "⚛️", category: "Framework" },
    { name: "Next.js", icon: "▲", category: "Framework" },
    { name: "Node.js", icon: "🟢", category: "Runtime" },
    { name: "Flask", icon: "🧪", category: "Framework" },
    { name: "Tailwind CSS", icon: "🎨", category: "Framework" },

    // Databases
    { name: "MongoDB", icon: "🍃", category: "Database" },
    { name: "MySQL", icon: "🗄️", category: "Database" },

    // Cloud & DevOps
    { name: "AWS EC2", icon: "☁️", category: "Cloud" },
    { name: "AWS S3", icon: "📦", category: "Cloud" },
    { name: "Docker", icon: "🐳", category: "DevOps" },

    // Tools
    { name: "Git", icon: "🔀", category: "Tool" },
    { name: "Postman", icon: "📬", category: "Tool" },
]