import HeroSection from "@/components/HeroSection";
import Speakers from "@/components/speaker";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Timer from "@/components/Timer";
import Link from "next/link";

export default function Page() {

  return (
    <main className="bg-black min-h-screen">
      <HeroSection tagline="Creativity Unveils Mind" />
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <h1 style={oswald.style} className="text-7xl mt-6 font-bold text-center uppercase bg-clip-text bg-gradient-to-r dark:from-red-300 dark:to-slate-600 from-slate-900 to-slate-400 text-transparent">Join <br /> <span className="text-tedx text-8xl">Ted<span className="text-4xl content-start">X</span></span>Glau 20<span className="text-tedx text-8xl">24</span></h1>
      <p className="mx-auto uppercase text-gray-400 w-fit border-t border-gray-800">Organised by E-CELL GLAU</p>
      <p className="text-lg md:text-2xl text-center uppercase py-4 md:w-1/2 mx-auto text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-900 dark:from-gray-900 dark:to-gray-300">for an unforgettable experience with groundbreaking ideas and influential </p>
=======

      <AboutSection />

>>>>>>> Stashed changes
=======

      <AboutSection />

>>>>>>> Stashed changes
      <Speakers />

      <div className="py-20 px-4 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 uppercase tracking-tighter">
            Become a part of the <br />
            <span className="text-[#E62B1E]">Experience</span>
          </h2>

          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeiGDC_Wi-HuaCm530y7lVCZxM4Kx0u-b73hav8YtpRLQaALw/viewform" target="_blank">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[#E62B1E] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#E62B1E]/50">
              Join the Community 🚀
            </button>
          </Link>
        </div>
      </div>

      <div className="py-20 flex flex-col items-center justify-center bg-black border-t border-neutral-900">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 uppercase tracking-widest">
          Save the Date
        </h2>
        <Timer />
      </div>

      <Footer />
    </main>
  )
}
