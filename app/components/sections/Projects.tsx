"use client";
import { motion } from "framer-motion-3d";

export default function Projects() {
  const projects = [
    {
      title: "Videoselz",
      desc: "Shoppable video widgets for Shopify merchants with Gadget.dev integration.",
      status: "Production",
    },
    {
      title: "Jarvis AI",
      desc: "Distributed Swarm AI assistant running on local RTX 3060Ti compute nodes.",
      status: "Active Development",
    },
    {
      title: "BloxShinobi",
      desc: "Large-scale Roblox game environment using Rojo, Argon, and Git.",
      status: "Deployed",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto pointer-events-auto relative z-20 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-mono text-cyan-400 mb-2">
          Output.Logs
        </h2>
        <div className="w-24 h-1 bg-cyan-500/50" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: false, amount: 0.1 }}
            className="group relative p-8 rounded-xl border border-slate-800 bg-[#0a0f16]/90 backdrop-blur-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white z-10">
                {project.title}
              </h3>
              <span className="px-3 py-1 text-[10px] uppercase tracking-wider font-mono text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                {project.status}
              </span>
            </div>
            <p className="text-slate-400 font-mono text-sm leading-relaxed z-10 relative">
              {project.desc}
            </p>

            <div className="mt-8">
              <button className="text-cyan-400 text-sm font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center gap-2">
                Initialize <span className="text-lg">→</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
