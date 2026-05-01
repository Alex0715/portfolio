"use client";

import { MotionValue, useTransform, animate } from "framer-motion";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { Edges } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export default function ReactorModel({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const innerCoreRef = useRef<THREE.Group>(null);
  const spokeRingRef = useRef<THREE.Group>(null);
  const parallaxRef = useRef<THREE.Group>(null);
  const expansionRingRef = useRef<THREE.Group>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useFrame((state, delta) => {
    if (parallaxRef.current) {
      mouseX.current = THREE.MathUtils.lerp(mouseX.current, state.pointer.x * 0.25, delta * 2.5);
      mouseY.current = THREE.MathUtils.lerp(mouseY.current, state.pointer.y * 0.25, delta * 2.5);
      parallaxRef.current.rotation.y = mouseX.current;
      parallaxRef.current.rotation.x = -mouseY.current;
    }
    if (innerCoreRef.current) innerCoreRef.current.rotation.z += delta * 2;
    if (spokeRingRef.current) spokeRingRef.current.rotation.z -= delta * 0.5;
    if (expansionRingRef.current) expansionRingRef.current.rotation.z += delta * 0.12;
  });

  // --- SCROLL TRANSFORMATIONS ---

  const groupX = useTransform(scrollProgress, [0, 0.38, 0.52, 0.75, 0.88, 1], [4, 2, -3.5, -3.5, 0, 0]);
  const groupRotX = useTransform(scrollProgress, [0, 0.5, 0.68, 1], [0, Math.PI / 5, Math.PI / 5, Math.PI / 8]);
  const groupRotZ = useTransform(scrollProgress, [0, 0.5, 0.68, 1], [0, -Math.PI / 4, -Math.PI / 4, -Math.PI / 12]);
  const groupRotY = useTransform(scrollProgress, [0.68, 1], [0, Math.PI * 1.5]);
  const expansionZ = useTransform(scrollProgress, [0, 0.3, 0.6, 1], [0, 5, 5, 0]);
  const expansionScale = useTransform(scrollProgress, [0, 0.3, 0.6, 1], [1, 1.2, 1.2, 1]);
  const topZ = useTransform(scrollProgress, [0, 0.55, 0.8, 1], [0, 3, 0.8, 0]);
  const midZ = useTransform(scrollProgress, [0, 0.55, 0.8, 1], [0, 1.5, 0.4, 0]);
  const bottomZ = useTransform(scrollProgress, [0, 0.55, 0.8, 1], [0, -2, -0.5, 0]);
  const coreZ = useTransform(scrollProgress, [0, 0.55, 0.8, 1], [0, 4, 1, 0]);
  const coreX = useTransform(scrollProgress, [0, 1], [0, 0]);

  // --- MATERIALS ---
  // All start at PEAK opacity — reactor appears fully bright at t=0.
  // The boot sequence glitch-calibrates them DOWN to their stable values.

  // Dark void fill — general structure  (peak → stable)
  const blueprintShellMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#0a0f16", transparent: true, opacity: 0.82, depthWrite: false, side: THREE.DoubleSide }),
    [],
  );
  // White structural fill — nested rings, foot pads
  const blueprintShellMatSecondary = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.88, depthWrite: false, side: THREE.DoubleSide }),
    [],
  );
  // Copper coil fill
  const copperShellMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#120a04", transparent: true, opacity: 0.78, depthWrite: false, side: THREE.DoubleSide }),
    [],
  );
  // Accent glow fill — ONLY outer signature ring + inner magnetic collar.
  // Settles to a HIGHER stable opacity than the rest so these two rings
  // remain the only visibly "glowing" objects after calibration.
  const accentGlowMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#061a28", transparent: true, opacity: 0.92, depthWrite: false, side: THREE.DoubleSide }),
    [],
  );

  // Calibration glitch: starts at `from` (bright), voltage-spikes, locks to `to` (stable).
  // Narrative — Flash on → system overload → calibrate → stable.
  const runCalibration = async (mat: THREE.MeshBasicMaterial, from: number, to: number) => {
    const s = (v: number) => { mat.opacity = v; };
    mat.opacity = from;
    // dropout 1 — sudden dark
    await animate(from,       to * 0.06,   { duration: 0.07, ease: "linear", onUpdate: s });
    // surge back — above stable
    await animate(to * 0.06,  from * 0.70, { duration: 0.09, ease: "linear", onUpdate: s });
    // dropout 2
    await animate(from * 0.70, to * 0.04,  { duration: 0.07, ease: "linear", onUpdate: s });
    // surge to just above target
    await animate(to * 0.04,  to * 1.18,   { duration: 0.10, ease: "linear", onUpdate: s });
    // brief dip below target
    await animate(to * 1.18,  to * 0.10,   { duration: 0.06, ease: "linear", onUpdate: s });
    // final lock — slow decisive settle
    await animate(to * 0.10,  to,           { duration: 0.88, ease: "easeOut", onUpdate: s });
  };

  useEffect(() => {
    // 0.8 s at full brightness so the user has a moment to register the peak look,
    // then calibration fires across all four materials simultaneously.
    const t = setTimeout(() => {
      runCalibration(blueprintShellMat,          0.82, 0.35);
      runCalibration(blueprintShellMatSecondary,  0.88, 0.42);
      runCalibration(accentGlowMat,              0.92, 0.55); // stays brighter — selective glow
      setTimeout(() => runCalibration(copperShellMat, 0.78, 0.28), 90);
    }, 800);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const edgeColor = "#06b6d4";
  const edgeThreshold = 15;
  const copperEdge = "#c87941";
  const copperRibEdge = "#e8973a";

  return (
    // Boot offset: x = -4 so net position is screen center (groupX=4 + -4 = 0).
    // Drifts to x = 0 at t = 3 s, handing full control to the scroll transform.
    <motion.group
      initial={{ x: -4 }}
      animate={{ x: 0 }}
      transition={{ duration: 1.0, delay: 3.0, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.group
        position-x={groupX}
        rotation-x={groupRotX}
        rotation-y={groupRotY}
        rotation-z={groupRotZ}
      >
        <group ref={parallaxRef}>

          {/* 1. TOP ASSEMBLY */}
          <motion.group position-z={topZ}>
            {/* ★ ACCENT GLOW — outer signature ring stays brightest */}
            <mesh material={accentGlowMat}>
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

            <mesh position={[0, 0, 0.4]} material={blueprintShellMat}>
              <torusGeometry args={[1.8, 0.05, 12, 64]} />
              <Edges color="#ffffff" threshold={edgeThreshold} />
            </mesh>
          </motion.group>

          {/* 2. MID-CHASSIS EXPANSION RING */}
          <motion.group position-z={expansionZ} scale={expansionScale}>
            <group ref={expansionRingRef}>
              {/* ★ ACCENT GLOW — inner magnetic collar stays brightest */}
              <mesh material={accentGlowMat}>
                <torusGeometry args={[2.8, 0.15, 16, 64]} />
                <Edges color={edgeColor} threshold={edgeThreshold} />
              </mesh>

              <mesh material={blueprintShellMat}>
                <torusGeometry args={[2.4, 0.06, 12, 64]} />
                <Edges color="#ffffff" threshold={edgeThreshold} />
              </mesh>

              {[...Array(8)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 8;
                const cx = Math.cos(angle) * 2.8;
                const cy = Math.sin(angle) * 2.8;
                return (
                  <group key={`caliper-${i}`} position={[cx, cy, 0]} rotation={[0, 0, angle]}>
                    <mesh material={blueprintShellMat}>
                      <boxGeometry args={[0.28, 0.22, 0.32]} />
                      <Edges color={edgeColor} threshold={edgeThreshold} />
                    </mesh>
                    <mesh position={[0, 0.18, 0.08]} material={blueprintShellMat}>
                      <boxGeometry args={[0.32, 0.06, 0.14]} />
                      <Edges color="#ffffff" threshold={edgeThreshold} />
                    </mesh>
                    <mesh position={[0, -0.18, 0.08]} material={blueprintShellMat}>
                      <boxGeometry args={[0.32, 0.06, 0.14]} />
                      <Edges color="#ffffff" threshold={edgeThreshold} />
                    </mesh>
                  </group>
                );
              })}
            </group>
          </motion.group>

          {/* 3. BODY RING (Ribbed Coils) */}
          <motion.group position-z={midZ}>
            <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[3, 3, 1.2, 64, 1, false]} />
              <Edges color={edgeColor} threshold={20} />
            </mesh>

            {[...Array(10)].map((_, i) => (
              <group key={`coil-${i}`} rotation={[0, 0, (i * Math.PI) / 5]}>
                <mesh position={[0, 3, 0]} material={copperShellMat}>
                  <boxGeometry args={[1, 0.6, 0.8]} />
                  <Edges color={copperEdge} threshold={edgeThreshold} />
                </mesh>
                {[...Array(8)].map((_, j) => (
                  <mesh key={`rib-${j}`} position={[0, 3.05, -0.3 + j * 0.1]} material={copperShellMat}>
                    <boxGeometry args={[1.1, 0.1, 0.02]} />
                    <Edges color={copperRibEdge} threshold={edgeThreshold} />
                  </mesh>
                ))}
              </group>
            ))}
          </motion.group>

          {/* 4. DATA CORE (Projection Engine) */}
          <motion.group position-z={coreZ} position-x={coreX}>
            <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1.5, 1.3, 1, 32, 1, true]} />
              <Edges color={edgeColor} threshold={20} />
            </mesh>

            <mesh position={[0, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]} material={blueprintShellMat}>
              <cylinderGeometry args={[1.4, 1.4, 0.1, 64]} />
              <Edges color={edgeColor} threshold={15} />
            </mesh>

            {[...Array(4)].map((_, i) => (
              <mesh key={`back-ring-${i}`} position={[0, 0, -0.35]} material={blueprintShellMat}>
                <torusGeometry args={[0.3 + i * 0.3, 0.02, 8, 64]} />
                <Edges color="#ffffff" threshold={15} />
              </mesh>
            ))}

            <mesh position={[0, 0, 0.1]} material={blueprintShellMat}>
              <torusGeometry args={[0.9, 0.15, 16, 64]} />
              <Edges color={edgeColor} threshold={15} />
            </mesh>

            <group ref={spokeRingRef}>
              {[...Array(12)].map((_, i) => (
                <group key={`spoke-${i}`} rotation={[0, 0, (i * Math.PI) / 6]}>
                  <mesh position={[0, 1.2, 0.1]} material={blueprintShellMat}>
                    <boxGeometry args={[0.08, 0.4, 0.2]} />
                    <Edges color="#ffffff" threshold={15} />
                  </mesh>
                  <mesh position={[0, 0.85, 0.1]} material={blueprintShellMat}>
                    <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
                    <Edges color={edgeColor} threshold={15} />
                  </mesh>
                </group>
              ))}
            </group>

            {[...Array(3)].map((_, i) => (
              <group key={`strut-${i}`} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
                <mesh position={[0, 0.55, 0.3]} material={blueprintShellMat}>
                  <boxGeometry args={[0.25, 0.7, 0.15]} />
                  <Edges color="#ffffff" threshold={15} />
                </mesh>
              </group>
            ))}

            {/* Palladium core — always visible, no boot scale animation */}
            <group position={[0, 0, 0.4]} ref={innerCoreRef}>
              <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.35, 0.35, 0.3, 32, 1, true]} />
                <Edges color={edgeColor} threshold={15} />
              </mesh>
              <mesh position={[0, 0, 0.15]} material={blueprintShellMat}>
                <torusGeometry args={[0.18, 0.06, 16, 32]} />
                <Edges color="#ffffff" threshold={15} />
              </mesh>
              <mesh position={[0, 0, 0.2]} material={blueprintShellMat}>
                <octahedronGeometry args={[0.15, 0]} />
                <Edges color="#06b6d4" threshold={0} />
              </mesh>
            </group>
          </motion.group>

          {/* 5. BASE ASSEMBLY */}
          <motion.group position-z={bottomZ}>
            <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[3.5, 3.2, 0.5, 64, 1, true]} />
              <Edges color={edgeColor} threshold={15} />
            </mesh>

            {[...Array(5)].map((_, i) => (
              <mesh key={`nest-ring-${i}`} position={[0, 0, -0.2 - i * 0.15]} material={blueprintShellMatSecondary}>
                <torusGeometry args={[2.0 - i * 0.3, 0.05, 16, 64]} />
                <Edges color="#ffffff" threshold={15} />
              </mesh>
            ))}

            {[...Array(16)].map((_, i) => (
              <group key={`capacitor-${i}`} rotation={[0, 0, (i * Math.PI) / 8]}>
                <mesh position={[0, 3.2, -0.25]} material={blueprintShellMat}>
                  <boxGeometry args={[0.6, 0.8, 0.4]} />
                  <Edges color={edgeColor} threshold={15} />
                </mesh>
                {[...Array(4)].map((_, j) => (
                  <mesh key={`cap-rib-${j}`} position={[0, 3.5, -0.15 - j * 0.06]} material={blueprintShellMatSecondary}>
                    <boxGeometry args={[0.65, 0.1, 0.02]} />
                    <Edges color="#ffffff" threshold={15} />
                  </mesh>
                ))}
              </group>
            ))}

            {[...Array(8)].map((_, i) => (
              <group key={`foot-${i}`} rotation={[0, 0, (i * Math.PI) / 4]}>
                <mesh position={[0, 2.5, -0.8]} rotation={[Math.PI / 6, 0, 0]} material={blueprintShellMat}>
                  <boxGeometry args={[0.4, 1.2, 0.2]} />
                  <Edges color={edgeColor} threshold={15} />
                </mesh>
                <mesh position={[0, 2.2, -1.3]} material={blueprintShellMatSecondary}>
                  <boxGeometry args={[0.5, 0.4, 0.3]} />
                  <Edges color="#ffffff" threshold={15} />
                </mesh>
                <mesh position={[0, 1.6, -1.4]} rotation={[-Math.PI / 8, 0, 0]} material={blueprintShellMat}>
                  <boxGeometry args={[0.2, 1.0, 0.15]} />
                  <Edges color={edgeColor} threshold={15} />
                </mesh>
              </group>
            ))}

            <mesh position={[0, 0, -1.0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.5, 0.3, 0.4, 32, 1, true]} />
              <meshBasicMaterial color="#00ffff" transparent opacity={0.15} depthWrite={false} side={THREE.DoubleSide} />
              <Edges color="#06b6d4" threshold={15} />
            </mesh>
          </motion.group>

        </group>
      </motion.group>
    </motion.group>
  );
}
