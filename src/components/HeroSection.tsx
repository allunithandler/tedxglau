"use client"

import React, { useState } from 'react'
import { TextGenerateEffect } from './ui/text-generate-effect'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Hero3DScene } from './ui/3d-hero-elements'
import { motion, AnimatePresence } from 'framer-motion'
import IdeaSpark from './Game/IdeaSpark'

interface HeroSectionProps {
  tagline: string
  heading?: string
  className?: string
}

const HeroSection = ({ tagline, heading, className }: HeroSectionProps) => {
  const pathname = usePathname();
  const [isGameOpen, setIsGameOpen] = useState(false);

  if (pathname === '/') {
    return (
      <div className={cn("min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden", className)}>
        <Hero3DScene />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center h-full pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <p className="text-neutral-400 text-sm md:text-base font-medium tracking-widest uppercase mb-4">
              Independently organized TED event
            </p>
            <h1 className="text-6xl md:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 tracking-tighter">
              TEDx<span className="text-[#E62B1E]">GLAU</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 pointer-events-auto flex gap-4"
          >
            <Link href="/events" className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              Explore Events
            </Link>
            <Link href="/about" className="px-8 py-3 rounded-full bg-[#E62B1E] text-white hover:bg-[#c41e12] transition-all duration-300 shadow-[0_0_20px_rgba(230,43,30,0.5)]">
              About Us
            </Link>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            onClick={() => setIsGameOpen(true)}
            className="mt-8 pointer-events-auto px-6 py-3 bg-gradient-to-r from-[#E62B1E] to-[#c41e12] text-white rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3 shadow-lg shadow-[#E62B1E]/50"
          >
            <span className="text-2xl">🎮</span>
            <span>Play Idea Spark</span>
          </motion.button>

          <AnimatePresence>
            {isGameOpen && <IdeaSpark onClose={() => setIsGameOpen(false)} />}
          </AnimatePresence>

          <div className="mt-16 max-w-2xl mx-auto bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
            <TextGenerateEffect words={tagline} className='text-center text-sm md:text-xl text-neutral-300' />
          </div>
        </div>
      </div>
    )
  }

  // Simplified view for other pages
  return (
    <div className={cn("h-[50vh] w-full flex flex-col items-center justify-center bg-black relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 flex flex-col items-center">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
          TEDx<span className="text-[#E62B1E]">GLAU</span>
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          {heading || "Ideas Worth Spreading"}
        </p>
      </div>
    </div>
  )
}

export default HeroSection