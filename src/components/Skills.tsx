"use client"

import { motion } from "framer-motion"

const skills = [
    { name: "Docker Containerization", icon: "/skills/docker.png" },
    { name: "MySql Framework", icon: "/skills/mysql.png" },
    { name: "Bootstrap Framework", icon: "/skills/bootstrap.png" },
    { name: "Python Language", icon: "/skills/python.jpeg" },
    { name: "REST API Integration", icon: "api", isLetter: true },
    { name: "Java Language", icon: "JA", isLetter: true },
    { name: "C++ Language", icon: "C+", isLetter: true },
    { name: "TypeScript Language", icon: "TS", isLetter: true },
    { name: "Tailwind CSS Framework", icon: "tailwind", isLetter: true },
    { name: "Next JS Framework", icon: "/skills/nextjs.png" },
    { name: "Vite Framework", icon: "vite", isLetter: true },
    { name: "HTML Language", icon: "/skills/html.png" },
    { name: "CSS Language", icon: "/skills/css.png" },
    { name: "Javascript Language", icon: "/skills/js.png" },
    { name: "React JS Framework", icon: "/skills/reactjs.png" },
    { name: "Next JS Framework", icon: "/skills/nextjs.png" },
    { name: "Node JS Runtime", icon: "/skills/nodejs.png" },
    { name: "FastAPI Framework", icon: "FA", isLetter: true },
    { name: "Tailwind CSS Framework", icon: "TW", isLetter: true },
    { name: "Bootstrap Framework", icon: "/skills/bootstrap.png" },
    { name: "REST API Integration", icon: "AP", isLetter: true },
    { name: "MySql Database", icon: "/skills/mysql.png" },
    { name: "MongoDB Database", icon: "MG", isLetter: true },
    { name: "AWS Cloud", icon: "AWS", isLetter: true },
    { name: "Docker Containerization", icon: "/skills/docker.png" },
    { name: "Github Repository", icon: "/skills/github.png" },
    { name: "HTML Language", icon: "/skills/html.png" },
    { name: "CSS Language", icon: "/skills/css.png" },
    { name: "Vite Framework", icon: "VI", isLetter: true },
]

// Diamond rows: 2-3-4-5-5-4-3-2-1 = 29
const rows = [
    { start: 0, count: 2 },
    { start: 2, count: 3 },
    { start: 5, count: 4 },
    { start: 9, count: 5 },
    { start: 14, count: 5 },
    { start: 19, count: 4 },
    { start: 23, count: 3 },
    { start: 26, count: 2 },
    { start: 28, count: 1 },
]

export default function Skills() {
    return (
        <section id="tools" className="py-12 bg-transparent relative">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center">

                {/* Section Title */}
                <div className="w-full mb-10 px-0 text-left">
                    <h2 className="editorial-title text-4xl md:text-6xl text-white mb-4">Tools &<br /> Technologies</h2>
                    <div className="w-24 h-[1px] bg-[#333333]"></div>
                </div>

                {/* Diamond Pyramid Layout */}
                <div className="flex flex-col items-start md:items-center gap-4 w-full">
                    {rows.map((row, rowIdx) => (
                        <div key={rowIdx} className="flex flex-wrap md:flex-nowrap justify-start md:justify-center gap-4 w-full">
                            {skills.slice(row.start, row.start + row.count).map((skill, idx) => (
                                <SkillCard key={row.start + idx} skill={skill} idx={row.start + idx} />
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

function SkillCard({ skill, idx }: { skill: any, idx: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 shadow-none border border-[#333333] hover:border-[#666666] min-w-[200px] flex-1 lg:flex-none lg:w-[280px]"
        >
            <div className="w-14 h-14 flex justify-center items-center flex-shrink-0 bg-black/40 border border-[#222222] p-2 overflow-hidden">
                {skill.isLetter ? (
                    <span className="font-serif text-xl text-[#999999] uppercase">{skill.icon.slice(0, 2)}</span>
                ) : (
                    <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-full h-full object-contain filter grayscale brightness-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    />
                )}
            </div>
            <div className="flex flex-col">
                <span className="text-white font-medium text-sm lg:text-base leading-tight tracking-wide">
                    {skill.name.split(' ')[0]}
                </span>
                <span className="text-[#666666] font-light text-xs lg:text-sm uppercase tracking-widest mt-1">
                    {skill.name.split(' ').slice(1).join(' ')}
                </span>
            </div>
        </motion.div>
    )
}