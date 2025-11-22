"use client"

import React from 'react'
import { SpeakerImg } from './SpeakerImg'
import { motion } from 'framer-motion'

interface SpeakerCardProps {
    speaker: any
    reverse?: boolean
}

const SpeakerCard = ({ speaker }: SpeakerCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-neutral-900 border border-neutral-800 hover:border-[#E62B1E] transition-all duration-300 overflow-hidden"
        >
            <div className="relative aspect-square w-full overflow-hidden">
                <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <SpeakerImg src={speaker?.image} />
                </div>
            </div>

            <div className="p-6 relative z-10 bg-neutral-900">
                <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tighter">
                    {speaker?.name}
                </h3>
                <p className="text-xs text-[#E62B1E] font-bold uppercase tracking-widest mb-3">
                    {speaker?.bioOne}
                </p>
                <p className="text-sm text-neutral-400 line-clamp-3 group-hover:text-neutral-300 transition-colors">
                    {speaker?.bioTwo}
                </p>
            </div>

            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-[#E62B1E]" />
            </div>
        </motion.div>
    )
}

export default SpeakerCard