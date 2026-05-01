"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface PartProps {
  z: MotionValue<number>;
  fillOpacity: MotionValue<number>;
  strokeOpacity: MotionValue<number>;
  waveOpacity?: MotionValue<number>;
  type?: "top" | "bottom";
}

const colors = {
  solid: "#0f172a", // slate-900
  wireframe: "#06b6d4", // cyan-500
  accent: "#22d3ee", // cyan-400
  copper: "#0ea5e9", // sky-500
};

// --- 1. THE HEAVY OUTER ARMOR ---
export const Casing = ({ z, fillOpacity, strokeOpacity, type }: PartProps) => {
  const isTop = type === "top";
  return (
    <motion.svg
      viewBox="0 0 800 800"
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{ z }}
    >
      <motion.g
        style={{
          fill: colors.solid,
          fillOpacity,
          stroke: colors.wireframe,
          strokeOpacity,
        }}
      >
        <circle cx="400" cy="400" r="320" strokeWidth={4} />
        <circle
          cx="400"
          cy="400"
          r="290"
          fill="none"
          strokeWidth={2}
          strokeDasharray="10 15"
        />
        <circle
          cx="400"
          cy="400"
          r="280"
          fill="none"
          strokeWidth={1}
          strokeDasharray="2 6"
        />
        {[...Array(4)].map((_, i) => (
          <motion.g
            key={i}
            transform={`rotate(${i * 90 + (isTop ? 0 : 45)} 400 400)`}
          >
            <path d="M 360 80 L 440 80 L 420 120 L 380 120 Z" strokeWidth={3} />
            <circle cx="400" cy="100" r="6" fill="none" strokeWidth={2} />
          </motion.g>
        ))}
        {isTop ? (
          <path
            d="M 400 60 L 400 130 M 130 400 L 60 400 M 740 400 L 670 400 M 400 740 L 400 670"
            strokeWidth={8}
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M 160 160 L 210 210 M 640 160 L 590 210 M 160 640 L 210 590 M 640 640 L 590 590"
            strokeWidth={8}
            strokeLinecap="round"
          />
        )}
      </motion.g>
    </motion.svg>
  );
};

// --- 2. THE LOGIC / DATA RINGS ---
export const Coils = ({ z, fillOpacity, strokeOpacity }: PartProps) => {
  return (
    <motion.svg
      viewBox="0 0 800 800"
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{ z }}
    >
      <motion.g
        style={{
          fill: colors.solid,
          fillOpacity,
          stroke: colors.copper,
          strokeOpacity,
        }}
      >
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <circle cx="400" cy="400" r="240" fill="none" strokeWidth={2} />
          {[...Array(36)].map((_, i) => (
            <rect
              key={`wire-${i}`}
              x="398"
              y="140"
              width="4"
              height="40"
              rx="2"
              transform={`rotate(${i * 10} 400 400)`}
            />
          ))}
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <circle
            cx="400"
            cy="400"
            r="190"
            fill="none"
            strokeWidth={1}
            strokeDasharray="5 5"
          />
          {[...Array(12)].map((_, i) => (
            <motion.g key={`gate-${i}`} transform={`rotate(${i * 30} 400 400)`}>
              <rect
                x="380"
                y="200"
                width="40"
                height="25"
                rx="4"
                strokeWidth={2}
              />
              <circle cx="400" cy="212.5" r="4" fill="none" />
            </motion.g>
          ))}
        </motion.g>
      </motion.g>
    </motion.svg>
  );
};

// --- 3. THE HEART (Updated with Anime.js Wave) ---
export const Core = ({
  z,
  fillOpacity,
  strokeOpacity,
  waveOpacity,
}: PartProps) => {
  return (
    <motion.svg
      viewBox="0 0 800 800"
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{ z }}
    >
      {/* The Colored Anime.js LED Ring */}
      <motion.g
        style={{ opacity: waveOpacity, originX: "50%", originY: "50%" }}
      >
        <circle
          cx="400"
          cy="400"
          r="380"
          fill="none"
          stroke="#22c55e"
          strokeWidth="4"
          strokeDasharray="500 2000"
          strokeLinecap="round"
          transform="rotate(-90 400 400)"
        />
        <circle
          cx="400"
          cy="400"
          r="380"
          fill="none"
          stroke="#ef4444"
          strokeWidth="4"
          strokeDasharray="600 2000"
          strokeLinecap="round"
          transform="rotate(0 400 400)"
        />
        <circle
          cx="400"
          cy="400"
          r="380"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeDasharray="700 2000"
          strokeLinecap="round"
          transform="rotate(90 400 400)"
        />
        <circle
          cx="400"
          cy="400"
          r="380"
          fill="none"
          stroke="#eab308"
          strokeWidth="4"
          strokeDasharray="300 2000"
          strokeLinecap="round"
          transform="rotate(180 400 400)"
        />
      </motion.g>

      {/* The physical hardware of the core */}
      <motion.g
        style={{
          fill: colors.solid,
          fillOpacity,
          stroke: colors.wireframe,
          strokeOpacity,
        }}
      >
        <circle cx="400" cy="400" r="200" strokeWidth={4} />
        {/* Spin-stabilizer ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          <circle
            cx="400"
            cy="400"
            r="160"
            fill="none"
            strokeWidth={2}
            strokeDasharray="40 20"
          />
        </motion.g>
        <circle cx="400" cy="400" r="80" strokeWidth={2} />
      </motion.g>

      {/* THE ANIME.JS CENTER DATA WAVE */}
      <motion.g
        style={{ opacity: waveOpacity, originX: "50%", originY: "50%" }}
      >
        {[...Array(24)].map((_, i) => {
          const distanceFromCenter = Math.abs(11.5 - i);
          const baseWidth = 300 - distanceFromCenter * 20;
          const yPos = 220 + i * 15;
          return (
            <motion.line
              key={i}
              x1={400 - baseWidth / 2}
              y1={yPos}
              x2={400 + baseWidth / 2}
              y2={yPos}
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ scaleX: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
              style={{ originX: "50%", originY: "50%" }}
            />
          );
        })}
      </motion.g>

      {/* Persistent Center Pinpoint light */}
      <motion.circle
        cx="400"
        cy="400"
        r="8"
        fill="#ffffff"
        className="blur-[2px]"
      />
    </motion.svg>
  );
};

// --- 4. THE HOLOGRAPHIC LABELS ---
export const Labels = ({ scrollProgress, topZ, coilsZ, bottomZ }: any) => {
  const opacity = useTransform(scrollProgress, [0.55, 0.7], [0, 1]);

  const LabelLine = ({ text, x, y, zTarget }: any) => (
    <motion.div
      className="absolute flex items-center gap-4 text-cyan-400 font-mono text-xs md:text-sm whitespace-nowrap"
      style={{ left: x, top: y, z: zTarget, opacity }}
      animate={{ rotateX: -60, rotateZ: 45 }}
      transition={{ duration: 0 }}
    >
      <div className="w-12 md:w-24 h-[1px] bg-cyan-500/50" />
      <span>{text}</span>
    </motion.div>
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <LabelLine text="OUTER_ARMOR" x="70%" y="20%" zTarget={topZ} />
      <LabelLine text="LOGIC_COILS" x="75%" y="45%" zTarget={coilsZ} />
      <LabelLine text="SYNAPSE_RING" x="80%" y="50%" zTarget={coilsZ} />
      <LabelLine text="BASE_EXHAUST" x="65%" y="75%" zTarget={bottomZ} />
    </div>
  );
};
