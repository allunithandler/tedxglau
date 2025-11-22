"use client"

import React from 'react'
import SpeakerCard from './SpeakerCard'
import { speakers } from '@/lib/constant'

const Speakers = () => {
  return (
    <div className="w-full bg-black py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center relative">
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E62B1E] to-red-900">Speakers</span>
          </h2>
          <p className="text-neutral-500 mt-4 max-w-2xl mx-auto">
            Visionaries, innovators, and change-makers sharing their ideas worth spreading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            speakersList.map((speaker, index) => (
              <SpeakerCard key={index} speaker={speaker} />
            ))
          }
        </div>
      </div>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <div className='flex flex-col gap-2'>
        {
          speakers.map((speaker, index) => (
            <SpeakerCard key="index" reverse={index % 2 === 0} speaker={speaker} />
          ))
        }
      </div>

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </div>
  )
}

export default Speakers