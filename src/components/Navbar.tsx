"use client"
import React, { useState } from 'react'
import localFont from 'next/font/local'

const navItem = localFont({ src: '../fonts/font-nav.otf' })
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const routes = [
        { title: 'Home', link: '/' },
        { title: 'Events', link: '/events' },
        { title: 'About', link: '/about' },
        { title: 'Team', link: '/team' }
    ]

    const menuVariants = {
        initial: { scaleY: 0 },
        animate: {
            scaleY: 1,
            transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] }
        },
        exit: {
            scaleY: 0,
            transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    }

    const containerVariants = {
        initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
        open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
    }

    const linkVariants = {
        initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
        open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
    }

    return (
        <div className='fixed top-0 left-0 w-full z-50 px-4 py-4 flex justify-between items-center pointer-events-none'>
            {/* Logo or Brand Name could go here */}
            <div className="pointer-events-auto">
                {/* Optional: Add Logo Here */}
            </div>

            <div className="pointer-events-auto">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='relative z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group'
                >
                    <div className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="w-full h-0.5 bg-white block transition-transform"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-full h-0.5 bg-white block transition-opacity"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="w-full h-0.5 bg-white block transition-transform"
                        />
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl origin-top h-screen w-screen flex flex-col justify-center items-center pointer-events-auto"
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="initial"
                            animate="open"
                            exit="initial"
                            className="flex flex-col items-center gap-4"
                        >
                            {routes.map((item, index) => (
                                <div key={index} className="overflow-hidden">
                                    <motion.div variants={linkVariants} className={cn("relative", navItem.className)}>
                                        <Link
                                            href={item.link}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500 hover:to-white transition-all duration-300 tracking-tighter",
                                                pathname === item.link ? "text-white from-white to-white" : ""
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-10 flex gap-8 text-sm text-neutral-400 uppercase tracking-widest"
                        >
                            <a href="https://instagram.com/tedxglau" target="_blank" rel="noreferrer" className="hover:text-[#E62B1E] transition-colors">Instagram</a>
                            <a href="https://twitter.com/tedxglau" target="_blank" rel="noreferrer" className="hover:text-[#E62B1E] transition-colors">Twitter</a>
                            <a href="https://linkedin.com/company/tedxglau" target="_blank" rel="noreferrer" className="hover:text-[#E62B1E] transition-colors">LinkedIn</a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Navbar