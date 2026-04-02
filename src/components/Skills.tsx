"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const skills = [
  { name: "Python", icon: "/python.jpeg" },
  { name: "Next.js", icon: "/nextjs.png" },
  { name: "React", icon: "/reactjs.png" },
  { name: "TypeScript", icon: "/js.png" },
  { name: "Node.js", icon: "/nodejs.png" },
  { name: "SQL", icon: "/mysql.png" },
  { name: "Docker", icon: "/docker.png" },
  { name: "HTML", icon: "/html.png" },
  { name: "CSS", icon: "/css.png" },
  { name: "Bootstrap", icon: "/bootstrap.png" },
  { name: "Tailwind", icon: "/developer.png" },
  { name: "GitHub", icon: "/github.png" },
]

export default function Skills() {
    return (
        <section id="skills" className="py-24 border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    viewport={{ once: true }}
                    className="mb-32 text-center"
                >
                    <h2 className="text-5xl md:text-7xl text-white font-serif mb-0 uppercase tracking-widest relative z-10">
                        Tools & Technologies
                    </h2>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-12 max-w-5xl mx-auto">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-6 group"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative bg-white/5 rounded-none p-4 border border-white/10">
                                <Image
                                    src={skill.icon}
                                    alt={skill.name}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#444] group-hover:text-white transition-colors duration-500 font-bold">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}