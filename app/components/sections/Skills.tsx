"use client";
import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    { category: "Frontend", stack: "React, Next.js, Framer Motion, Tailwind" },
    {
      category: "Backend",
      stack: "Node.js, Python, MongoDB Atlas, PostgreSQL",
    },
    { category: "Systems", stack: "Local LLM Inference, Vector DBs, Swarm AI" },
    { category: "Hardware", stack: "3D Printing, RTX 3060Ti Compute Nodes" },
  ];

  return (
    <section className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto pointer-events-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Side: Empty space to let the exploding Arc Reactor show through */}
        <div className="hidden lg:block w-full"></div>

        {/* Right Side: Floating Data Cards */}
        <div className="flex flex-col gap-6 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-mono text-cyan-400 mb-2">
              System.Capabilities
            </h2>
            <div className="w-24 h-1 bg-cyan-500/50 mb-8" />
          </motion.div>

          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
              className="p-6 rounded-lg border border-slate-800 bg-[#0a0f16]/80 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:border-cyan-500/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {skill.category}
              </h3>
              <p className="text-slate-400 font-mono text-sm">{skill.stack}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
