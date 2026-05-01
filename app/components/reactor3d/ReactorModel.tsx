"use client";

import { MotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { Edges } from "@react-three/drei";

export default function ReactorModel({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  // --- SCROLL TRANSFORMATIONS ---
  const groupX = useTransform(scrollProgress, [0, 0.2], [4, 0]);
  const groupRotX = useTransform(scrollProgress, [0, 0.2], [0, Math.PI / 3]);
  const groupRotZ = useTransform(scrollProgress, [0, 0.2], [0, -Math.PI / 4]);

  const topZ = useTransform(scrollProgress, [0.3, 0.6], [0, 5]);
  const midZ = useTransform(scrollProgress, [0.3, 0.6], [0, 2]);
  const bottomZ = useTransform(scrollProgress, [0.3, 0.6], [0, -3]);

  const coreZ = useTransform(scrollProgress, [0.7, 0.85], [0, 7]);
  const coreX = useTransform(scrollProgress, [0.7, 0.85], [0, -5]);

  // Technical Blueprint Materials
  // We use a very dark, flat material so the edges pop and the model feels solid
  const blueprintShellMat = new THREE.MeshBasicMaterial({
    color: "#0a0f16",
    transparent: true,
    opacity: 0.5, // Slightly lowered from 0.9 to let more light through
    depthWrite: false, // <-- THE MAGIC FIX: Stops transparent shapes from hiding lines behind them
    side: THREE.DoubleSide, // Ensures the inside of the hollow tubes look correct
  });

  const edgeColor = "#06b6d4"; // Cyan for that "Stark Tech" vibe
  const edgeThreshold = 15;

  return (
    <motion.group
      position-x={groupX}
      rotation-x={groupRotX}
      rotation-z={groupRotZ}
    >
      {/* 1. TOP ASSEMBLY (Ring top with holes) */}
      <motion.group position-z={topZ}>
        <mesh material={blueprintShellMat}>
          <torusGeometry args={[3.2, 0.2, 16, 100]} />
          <Edges color={edgeColor} threshold={edgeThreshold} />
        </mesh>

        {[...Array(24)].map((_, i) => (
          <group
            key={`hole-${i}`}
            rotation={[0, 0, (i * Math.PI) / 12]}
            position={[
              Math.cos((i * Math.PI) / 12) * 3.2,
              Math.sin((i * Math.PI) / 12) * 3.2,
              0.1,
            ]}
          >
            <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
              <Edges color={edgeColor} threshold={30} />
            </mesh>
          </group>
        ))}

        {/* Mini Ring Silver */}
        <mesh position={[0, 0, 0.4]} material={blueprintShellMat}>
          <torusGeometry args={[1.8, 0.05, 12, 64]} />
          <Edges color="#ffffff" threshold={edgeThreshold} />
        </mesh>
      </motion.group>

      {/* 2. BODY RING BIG (Ribbed Coils) */}
      <motion.group position-z={midZ}>
        <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3, 3, 1.2, 64, 1, false]} />
          <Edges color={edgeColor} threshold={20} />
        </mesh>

        {[...Array(10)].map((_, i) => (
          <group key={`coil-${i}`} rotation={[0, 0, (i * Math.PI) / 5]}>
            {/* The Copper Wire Blocks */}
            <mesh position={[0, 3, 0]} material={blueprintShellMat}>
              <boxGeometry args={[1, 0.6, 0.8]} />
              <Edges color={edgeColor} threshold={edgeThreshold} />
            </mesh>

            {/* The Ribbed Detail Lines from Blueprint */}
            {[...Array(8)].map((_, j) => (
              <mesh
                key={`rib-${j}`}
                position={[0, 3.05, -0.3 + j * 0.1]}
                material={blueprintShellMat}
              >
                <boxGeometry args={[1.1, 0.1, 0.02]} />
                <Edges color="#ffffff" threshold={edgeThreshold} />
              </mesh>
            ))}
          </group>
        ))}
      </motion.group>

      {/* 3. DATA CORE (Projection Engine) */}
      <motion.group position-z={coreZ} position-x={coreX}>
        {/* Outer Core Housing */}
        <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.3, 1, 32, 1, true]} />
          <Edges color={edgeColor} threshold={20} />
        </mesh>

        {/* --- NEW: HIGH-DENSITY INTERNALS --- */}

        {/* 1. Base Backplate (Closes the empty black void in the back) */}
        <mesh
          position={[0, 0, -0.4]}
          rotation={[Math.PI / 2, 0, 0]}
          material={blueprintShellMat}
        >
          <cylinderGeometry args={[1.4, 1.4, 0.1, 64]} />
          <Edges color={edgeColor} threshold={15} />
        </mesh>

        {/* Concentric etched rings on the backplate */}
        {[...Array(4)].map((_, i) => (
          <mesh
            key={`back-ring-${i}`}
            position={[0, 0, -0.35]}
            material={blueprintShellMat}
          >
            <torusGeometry args={[0.3 + i * 0.3, 0.02, 8, 64]} />
            <Edges color="#ffffff" threshold={15} />
          </mesh>
        ))}

        {/* 2. Heavy Inner Ring */}
        <mesh position={[0, 0, 0.1]} material={blueprintShellMat}>
          <torusGeometry args={[0.9, 0.15, 16, 64]} />
          <Edges color={edgeColor} threshold={15} />
        </mesh>

        {/* 3. Radial Heat-Sink Spokes (Fills the gap between outer housing and inner ring) */}
        {[...Array(12)].map((_, i) => (
          <group key={`spoke-${i}`} rotation={[0, 0, (i * Math.PI) / 6]}>
            <mesh position={[0, 1.2, 0.1]} material={blueprintShellMat}>
              <boxGeometry args={[0.08, 0.4, 0.2]} />
              <Edges color="#ffffff" threshold={15} />
            </mesh>
            {/* Connecting pins */}
            <mesh position={[0, 0.85, 0.1]} material={blueprintShellMat}>
              <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
              <Edges color={edgeColor} threshold={15} />
            </mesh>
          </group>
        ))}

        {/* 4. The Iconic Y-Housing (Thicker, more aggressive) */}
        {[...Array(3)].map((_, i) => (
          <group key={`strut-${i}`} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
            <mesh position={[0, 0.55, 0.3]} material={blueprintShellMat}>
              <boxGeometry args={[0.25, 0.7, 0.15]} />
              <Edges color="#ffffff" threshold={15} />
            </mesh>
          </group>
        ))}

        {/* 5. Complex Layered Center Core */}
        <group position={[0, 0, 0.4]}>
          {/* Core Base Cylinder */}
          <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.3, 32, 1, true]} />
            <Edges color={edgeColor} threshold={15} />
          </mesh>

          {/* Core Inner Glow Ring */}
          <mesh position={[0, 0, 0.15]} material={blueprintShellMat}>
            <torusGeometry args={[0.18, 0.06, 16, 32]} />
            <Edges color="#ffffff" threshold={15} />
          </mesh>

          {/* Central Palladium Node (Using Octahedron for a machined/cut-crystal look instead of a globe) */}
          <mesh position={[0, 0, 0.2]} material={blueprintShellMat}>
            <octahedronGeometry args={[0.15, 0]} />
            <Edges color="#06b6d4" threshold={0} />
          </mesh>
        </group>
      </motion.group>
    </motion.group>
  );
}
