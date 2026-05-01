"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex items-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto pointer-events-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* LEFT COLUMN: Typography */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl z-20"
        >
          <div className="flex items-center gap-3 mb-8 bg-transparent border border-cyan-500/30 w-max px-4 py-1.5 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">
              System.Online
            </span>
          </div>

          <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter mb-6 text-white leading-[1.05]">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Digital Reality.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-mono mb-10 border-l-2 border-cyan-500/30 pl-6">
            &gt; I'm Chirantan Bose, Lead Software Developer & Founder. I
            specialize in high-performance Next.js architectures, distributed AI
            systems, and scalable full-stack deployments.
          </p>
        </motion.div>

        {/* RIGHT COLUMN: Empty Spacer */}
        {/* The global Arc Reactor will perfectly align itself inside this space during the Hero section */}
        <div className="hidden lg:block w-full aspect-square"></div>
      </div>
    </section>
  );
}
