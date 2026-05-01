"use client";
import { motion } from "framer-motion-3d";

export default function About() {
  const codeSnippet = `const developer = {
  role: "Lead Software Developer",
  experience: "4+ Years",
  focus: [
    "Scalable Architecture",
    "Next.js Ecosystem",
    "AI/LLM Integration"
  ],
  passion: "Building performant, distributed systems.",
  status: "Optimizing..."
};`;

  return (
    <section className="h-screen flex flex-col justify-center px-12 md:px-32 max-w-7xl mx-auto relative z-10 pointer-events-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Side: The Code Window */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
          className="rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117] shadow-2xl shadow-cyan-900/20 backdrop-blur-xl"
        >
          {/* Window Header */}
          <div className="flex items-center px-4 py-3 bg-[#161b22] border-b border-slate-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="mx-auto text-xs font-mono text-slate-500">
              config.ts
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6 text-sm md:text-base font-mono overflow-x-auto">
            <pre className="text-slate-300">
              <code
                dangerouslySetInnerHTML={{
                  __html: codeSnippet
                    .replace(
                      /const/g,
                      '<span class="text-pink-500">const</span>',
                    )
                    .replace(
                      /developer/g,
                      '<span class="text-blue-400">developer</span>',
                    )
                    .replace(
                      /[{}[\]]/g,
                      '<span class="text-yellow-300">$&</span>',
                    )
                    .replace(
                      /".*?"/g,
                      '<span class="text-emerald-400">$&</span>',
                    ),
                }}
              />
            </pre>
          </div>
        </motion.div>

        {/* Right Side: Empty div to allow the Arc Reactor Core to show through */}
        <div className="hidden lg:block"></div>
      </div>
    </section>
  );
}
