import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-neutral-900 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-4">TEDx<span className="text-[#E62B1E]">GLAU</span></h2>
          <p className="text-neutral-500 text-sm max-w-sm">
            This independent TEDx event is operated under license from TED.
            Organized by E-CELL GLA University to spark conversation and connection.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Links</h3>
          <ul className="space-y-2 text-neutral-500 text-sm">
            <li><Link href="/about" className="hover:text-[#E62B1E] transition-colors">About</Link></li>
            <li><Link href="/events" className="hover:text-[#E62B1E] transition-colors">Events</Link></li>
            <li><Link href="/team" className="hover:text-[#E62B1E] transition-colors">Team</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Socials</h3>
          <ul className="space-y-2 text-neutral-500 text-sm">
            <li><a href="https://instagram.com/tedxglau" target="_blank" rel="noreferrer" className="hover:text-[#E62B1E] transition-colors">Instagram</a></li>
            <li><a href="https://twitter.com/tedxglau" target="_blank" rel="noreferrer" className="hover:text-[#E62B1E] transition-colors">Twitter</a></li>
            <li><a href="https://linkedin.com/company/tedxglau" target="_blank" rel="noreferrer" className="hover:text-[#E62B1E] transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
        <p>© {new Date().getFullYear()} TEDxGLAU. All Rights Reserved.</p>
        <p>Designed & Developed by <span className="text-white">E-CELL GLAU</span> Web Team</p>
      </div>
    </footer>
  )
}

export default Footer