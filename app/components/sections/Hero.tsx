"use client";
import { motion } from "framer-motion-3d";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Hero() {
  return (
    <section className="h-screen flex items-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto pointer-events-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* LEFT COLUMN: Typography — appears after reactor drifts right */}
        <div className="max-w-2xl z-20 flex flex-col gap-6">
          <motion.div
            {...fadeUp(4.0)}
            className="flex items-center gap-3 bg-transparent border border-cyan-500/30 w-max px-4 py-1.5 rounded-full"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">
              System.Online
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(4.25)}
            className="text-6xl md:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.05]"
          >
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Digital Reality.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(4.55)}
            className="text-lg md:text-xl text-slate-400 leading-relaxed font-mono border-l-2 border-cyan-500/30 pl-6"
          >
            &gt; I&apos;m Chirantan Bose, Lead Software Developer &amp; Founder.
            I specialize in high-performance Next.js architectures, distributed
            AI systems, and scalable full-stack deployments.
          </motion.p>
        </div>

        {/* RIGHT COLUMN: Empty Spacer */}
        <div className="hidden lg:block w-full aspect-square"></div>
      </div>
    </section>
  );
}
