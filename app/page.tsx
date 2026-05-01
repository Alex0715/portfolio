"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ArcReactor from "./components/reactor/ArcReactor";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    // FIX: Removed overflow-hidden, added overflow-x-clip.
    // This allows vertical scrolling for sticky, but stops horizontal scrolling!
    <main
      ref={containerRef}
      className="relative h-[400vh] bg-[#0a0f16] text-white selection:bg-cyan-500/30 overflow-x-clip"
    >
      {/* THE GLOBAL STICKY STAGE */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-0">
        <ArcReactor scrollProgress={scrollYProgress} />
      </div>

      {/* FOREGROUND CONTENT */}
      {/* We pull this up by exactly 1 screen height so it overlaps the sticky background */}
      <div className="relative z-10 -mt-[100vh]">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
      </div>
    </main>
  );
}
