"use client";

import { MotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import { Core, Coils, Casing, Labels } from "./ReactorParts";

interface ArcReactorProps {
  scrollProgress: MotionValue<number>;
}

export default function ArcReactor({ scrollProgress }: ArcReactorProps) {
  // --- PHASE 1: The 2D to 3D Shift (Hero -> About) ---
  // Starts on the right side of the screen, moves to center
  const stageX = useTransform(scrollProgress, [0, 0.2], ["25vw", "0vw"]);
  const stageScale = useTransform(scrollProgress, [0, 0.2], [0.8, 1]);
  // Tilts back from flat 2D into isometric 3D
  const rotateX = useTransform(scrollProgress, [0, 0.2], [0, 60]);
  // Rotates to the side
  const rotateZ = useTransform(scrollProgress, [0, 0.2], [0, -45]);

  // --- PHASE 2: Z-Axis Explosion (About -> Skills) ---
  const topCasingZ = useTransform(scrollProgress, [0.3, 0.6], [0, 400]);
  const coilsZ = useTransform(scrollProgress, [0.3, 0.6], [0, 200]);
  const coreZ = useTransform(scrollProgress, [0.3, 0.6], [0, 0]);
  const bottomCasingZ = useTransform(scrollProgress, [0.3, 0.6], [0, -200]);

  // --- PHASE 3: Solid to Wireframe Reveal ---
  const fillOpacity = useTransform(scrollProgress, [0.3, 0.5], [1, 0.05]);
  const strokeOpacity = useTransform(scrollProgress, [0.3, 0.5], [0.2, 1]);
  const waveOpacity = useTransform(scrollProgress, [0.1, 0.3], [1, 0]); // Fades out the Anime.js data wave

  return (
    <div className="relative w-[800px] h-[800px] flex items-center justify-center perspective-[1500px]">
      {/* The Master Control Stage */}
      <motion.div
        className="w-full h-full absolute inset-0"
        style={{
          x: stageX,
          scale: stageScale,
          rotateX: rotateX,
          rotateZ: rotateZ,
          transformStyle: "preserve-3d",
        }}
      >
        <Casing
          z={bottomCasingZ}
          fillOpacity={fillOpacity}
          strokeOpacity={strokeOpacity}
          type="bottom"
        />

        {/* We pass waveOpacity to the Core so the red data-wave fades out as it explodes */}
        <Core
          z={coreZ}
          fillOpacity={fillOpacity}
          strokeOpacity={strokeOpacity}
          waveOpacity={waveOpacity}
        />

        <Coils
          z={coilsZ}
          fillOpacity={fillOpacity}
          strokeOpacity={strokeOpacity}
        />
        <Casing
          z={topCasingZ}
          fillOpacity={fillOpacity}
          strokeOpacity={strokeOpacity}
          type="top"
        />
        <Labels
          scrollProgress={scrollProgress}
          topZ={topCasingZ}
          coilsZ={coilsZ}
          bottomZ={bottomCasingZ}
        />
      </motion.div>
    </div>
  );
}
