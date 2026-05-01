"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
// import ArcReactor from "./components/reactor/ArcReactor";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Scene from "./components/reactor3d/Scene";
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null!);

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
      {/* THE GLOBAL FIXED STAGE — fixed so Canvas covers the full viewport on every section */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Scene scrollProgress={scrollYProgress} />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
      </div>
    </main>
  );
}
