"use client";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useRef } from "react";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null!);
  // Track scroll specifically within this section to draw the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // The cyan line grows from 0% to 100% height as you scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const experiences = [
    {
      role: "Lead Software Developer",
      company: "Realityshop Inc",
      location: "California, US",
      time: "Recent", // You can update these exact dates!
      desc: "Architecting high-performance web applications, complex state management, and scalable system infrastructure for international clients.",
    },
    {
      role: "Full Stack Developer",
      company: "Cricclubs",
      location: "Hyderabad, India",
      time: "Previous",
      desc: "Directed full-stack development, platform scaling, and database architecture to support a massive, highly-active sports user base.",
    },
    {
      role: "Backend Developer",
      company: "AxiomIO",
      location: "Hyderabad, India",
      time: "Past",
      desc: "Built foundational backend expertise, engineered robust APIs, and optimized server-side logic.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-32 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto pointer-events-auto relative z-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.5 }}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-mono text-cyan-400 mb-2">
          git log --experience
        </h2>
        <div className="w-24 h-1 bg-cyan-500/50 mx-auto" />
      </motion.div>

      {/* The Timeline Container */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* The Glowing Vertical Branch Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            style={{ height: lineHeight }}
          />
        </div>

        {/* The Commit Nodes (Jobs) */}
        <div className="flex flex-col gap-12">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex items-center justify-start md:justify-between w-full ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* The "Commit" Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#0a0f16] border-2 border-cyan-500 -translate-x-1/2 shadow-[0_0_10px_rgba(6,182,212,0.5)] z-10" />

                {/* The Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="w-[calc(100%-3rem)] md:w-[45%] ml-12 md:ml-0 p-8 rounded-xl border border-slate-800 bg-[#0a0f16]/90 backdrop-blur-xl hover:border-cyan-500/50 transition-colors group relative overflow-hidden"
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {exp.role}
                      </h3>
                      <h4 className="text-lg text-slate-400 font-mono">
                        @ {exp.company}
                      </h4>
                    </div>
                    <span className="text-cyan-500 font-mono text-xs px-2 py-1 bg-cyan-500/10 rounded border border-cyan-500/20 whitespace-nowrap">
                      {exp.time}
                    </span>
                  </div>

                  {/* Location Badge */}
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <svg
                      className="w-4 h-4 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed relative z-10">
                    {exp.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
