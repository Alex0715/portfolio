"use client";
import { motion, Variants } from "framer-motion";

export default function TopDownReactor() {
  // The master boot-up sequence for the entire machine
  const bootUpVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut", staggerChildren: 0.3 },
    },
  };

  const ringVariants: Variants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={bootUpVariants}
      className="w-full max-w-[650px] aspect-square relative flex items-center justify-center"
    >
      {/* Central glow effect */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <svg viewBox="0 0 800 800" className="w-full h-full overflow-visible">
        {/* --- LAYER 1: The Outer Segmented LED Ring (Anime.js style) --- */}
        <motion.g
          variants={bootUpVariants}
          style={{ originX: "50%", originY: "50%" }}
        >
          <motion.circle
            cx="400"
            cy="400"
            r="380"
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeDasharray="500 2000"
            strokeLinecap="round"
            transform="rotate(-90 400 400)"
          />
          <motion.circle
            cx="400"
            cy="400"
            r="380"
            fill="none"
            stroke="#ef4444"
            strokeWidth="6"
            strokeDasharray="600 2000"
            strokeLinecap="round"
            transform="rotate(0 400 400)"
          />
          <motion.circle
            cx="400"
            cy="400"
            r="380"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeDasharray="700 2000"
            strokeLinecap="round"
            transform="rotate(90 400 400)"
          />
          <motion.circle
            cx="400"
            cy="400"
            r="380"
            fill="none"
            stroke="#eab308"
            strokeWidth="6"
            strokeDasharray="300 2000"
            strokeLinecap="round"
            transform="rotate(180 400 400)"
          />
        </motion.g>

        {/* --- LAYER 2: The Data Tick Marks --- */}
        <motion.g variants={bootUpVariants}>
          <circle
            cx="400"
            cy="400"
            r="340"
            fill="none"
            stroke="#1e293b"
            strokeWidth="20"
          />
          {/* Animated counter-rotating tick ring */}
          <motion.circle
            cx="400"
            cy="400"
            r="340"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="20"
            strokeDasharray="2 12"
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
            className="opacity-50"
          />
        </motion.g>

        {/* --- LAYER 3: The Mechanical Inner Tracks --- */}
        <motion.g variants={bootUpVariants}>
          <circle
            cx="400"
            cy="400"
            r="280"
            fill="none"
            stroke="#334155"
            strokeWidth="1"
          />
          <motion.circle
            cx="400"
            cy="400"
            r="260"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            strokeDasharray="50 150 10 50"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
        </motion.g>

        {/* --- LAYER 4: The Center Data Wave (Histogram Effect) --- */}
        {/* We map 24 horizontal lines and animate their X scale infinitely */}
        <motion.g
          variants={bootUpVariants}
          style={{ originX: "50%", originY: "50%" }}
        >
          <circle
            cx="400"
            cy="400"
            r="200"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="4"
          />

          {[...Array(24)].map((_, i) => {
            // Calculate a base width that makes it look like a diamond/circle shape
            const distanceFromCenter = Math.abs(11.5 - i);
            const baseWidth = 300 - distanceFromCenter * 20;
            const yPos = 220 + i * 15; // Spread them vertically

            return (
              <motion.line
                key={i}
                x1={400 - baseWidth / 2}
                y1={yPos}
                x2={400 + baseWidth / 2}
                y2={yPos}
                stroke="#ef4444" // The red color from the Anime.js inner wave
                strokeWidth="4"
                strokeLinecap="round"
                animate={{
                  scaleX: [0.8, 1.1, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1, // Creates the "wave" cascading effect
                }}
                style={{ originX: "50%", originY: "50%" }}
              />
            );
          })}

          {/* Center glowing dot */}
          <motion.circle
            cx="400"
            cy="400"
            r="8"
            fill="#ffffff"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
