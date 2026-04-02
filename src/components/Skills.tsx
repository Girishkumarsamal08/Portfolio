"use client"

import { motion } from "framer-motion"
import { skills } from "@/data/skills"

export default function Skills() {
    // Group skills by category as in the original design
    const categories = Array.from(new Set(skills.map(s => s.category)))

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

                <div className="space-y-20">
                    {categories.map((category, catIdx) => (
                        <div key={category} className="space-y-8">
                            <h3 className="text-xs uppercase tracking-[0.4em] text-white/30 border-b border-white/5 pb-4 font-bold">
                                {category}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {skills
                                    .filter(skill => skill.category === category)
                                    .map((skill, i) => (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            className="group p-6 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 rounded-xl flex flex-col items-center gap-4"
                                        >
                                            <span className="text-4xl group-hover:scale-110 transition-transform duration-500">
                                                {skill.icon}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#666] group-hover:text-white transition-colors duration-500 font-bold">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}