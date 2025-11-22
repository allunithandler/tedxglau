"use client"

import React from 'react'
import { motion } from 'framer-motion'

const AboutSection = () => {
    return (
        <section className="py-20 px-4 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#E62B1E]" />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-white" />

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
                        WHAT IS <br />
                        <span className="text-[#E62B1E]">TEDx</span>GLAU?
                    </h2>

                    <p className="text-neutral-400 text-lg leading-relaxed mb-6 text-justify">
                        TEDxGLAU is an independently organized TED event dedicated to the dissemination of ideas worth spreading.
                        Organized by the Entrepreneurship Cell (E-CELL) at GLA University, we bring together the world&apos;s leading
                        thinkers and doers to share ideas that matter in any discipline — technology, entertainment, design,
                        science, humanities, business, development.
                    </p>

                    <div className="flex gap-4">
                        <div className="h-2 w-12 bg-[#E62B1E]" />
                        <div className="h-2 w-12 bg-white" />
                        <div className="h-2 w-12 bg-neutral-800" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[400px] bg-neutral-900 border border-neutral-800 p-8 flex flex-col justify-between group hover:border-[#E62B1E] transition-colors duration-500"
                >
                    <div className="absolute top-0 right-0 bg-[#E62B1E] text-white font-bold px-4 py-2 text-sm">
                        EST. 2016
                    </div>

                    <div className="grid grid-cols-2 gap-4 h-full">
                        <div className="bg-neutral-800/50 p-4 flex flex-col justify-center items-center text-center hover:bg-neutral-800 transition-colors">
                            <span className="text-4xl font-bold text-white mb-2">8+</span>
                            <span className="text-xs text-neutral-400 uppercase tracking-widest">Years</span>
                        </div>
                        <div className="bg-neutral-800/50 p-4 flex flex-col justify-center items-center text-center hover:bg-neutral-800 transition-colors">
                            <span className="text-4xl font-bold text-white mb-2">50+</span>
                            <span className="text-xs text-neutral-400 uppercase tracking-widest">Speakers</span>
                        </div>
                        <div className="bg-neutral-800/50 p-4 flex flex-col justify-center items-center text-center hover:bg-neutral-800 transition-colors">
                            <span className="text-4xl font-bold text-white mb-2">5k+</span>
                            <span className="text-xs text-neutral-400 uppercase tracking-widest">Attendees</span>
                        </div>
                        <div className="bg-neutral-800/50 p-4 flex flex-col justify-center items-center text-center hover:bg-neutral-800 transition-colors">
                            <span className="text-4xl font-bold text-[#E62B1E] mb-2">∞</span>
                            <span className="text-xs text-neutral-400 uppercase tracking-widest">Ideas</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}

export default AboutSection
