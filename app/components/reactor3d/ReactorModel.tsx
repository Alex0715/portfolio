"use client";

import { MotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { Edges } from "@react-three/drei";
import { useRef } from "react";
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
      mouseX.current = THREE.MathUtils.lerp(
        mouseX.current,
        state.pointer.x * 0.25,
        delta * 2.5
      );
      mouseY.current = THREE.MathUtils.lerp(
        mouseY.current,
        state.pointer.y * 0.25,
        delta * 2.5
      );
      parallaxRef.current.rotation.y = mouseX.current;
      parallaxRef.current.rotation.x = -mouseY.current;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.z += delta * 2;
    }
    if (spokeRingRef.current) {
      spokeRingRef.current.rotation.z -= delta * 0.5;
    }
    if (expansionRingRef.current) {
      expansionRingRef.current.rotation.z += delta * 0.12;
    }
  });

  // --- SCROLL TRANSFORMATIONS ---
  const groupX = useTransform(scrollProgress, [0, 1], [4, 0]);
  const groupRotX = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0, Math.PI / 5, Math.PI]
  );
  const groupRotZ = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0, -Math.PI / 4, -Math.PI]
  );
  const expansionZ = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, 5, 5, 0]);
  const expansionScale = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [1, 1.2, 1.2, 1]);
  const topZ = useTransform(scrollProgress, [0, 1], [0, 3]);
  const midZ = useTransform(scrollProgress, [0, 1], [0, 1.5]);
  const bottomZ = useTransform(scrollProgress, [0, 1], [0, -2]);
  const coreZ = useTransform(scrollProgress, [0, 1], [0, 4]);
  const coreX = useTransform(scrollProgress, [0, 1], [0, 0]);

  const blueprintShellMat = new THREE.MeshBasicMaterial({
    color: "#0a0f16",
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const blueprintShellMatSecondary = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  // Warm dark backing so copper edges pop instead of reading against blue-black
  const copperShellMat = new THREE.MeshBasicMaterial({
    color: "#120a04",
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const edgeColor = "#06b6d4";
  const edgeThreshold = 15;
  const copperEdge = "#c87941";
  const copperRibEdge = "#e8973a";

  return (
    <motion.group
      position-x={groupX}
      rotation-x={groupRotX}
      rotation-z={groupRotZ}
    >
      {/* Mouse parallax wrapper — stacks on top of scroll transforms */}
      <group ref={parallaxRef}>
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

          <mesh position={[0, 0, 0.4]} material={blueprintShellMat}>
            <torusGeometry args={[1.8, 0.05, 12, 64]} />
            <Edges color="#ffffff" threshold={edgeThreshold} />
          </mesh>
        </motion.group>

        {/* 2. MID-CHASSIS EXPANSION RING */}
        <motion.group position-z={expansionZ} scale={expansionScale}>
          <group ref={expansionRingRef}>
            {/* Primary magnetic collar */}
            <mesh material={blueprintShellMat}>
              <torusGeometry args={[2.8, 0.15, 16, 64]} />
              <Edges color={edgeColor} threshold={edgeThreshold} />
            </mesh>

            {/* Inner geared track */}
            <mesh material={blueprintShellMat}>
              <torusGeometry args={[2.4, 0.06, 12, 64]} />
              <Edges color="#ffffff" threshold={edgeThreshold} />
            </mesh>

            {/* 8 Locking Calipers distributed around the ring */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 8;
              const cx = Math.cos(angle) * 2.8;
              const cy = Math.sin(angle) * 2.8;
              return (
                <group
                  key={`caliper-${i}`}
                  position={[cx, cy, 0]}
                  rotation={[0, 0, angle]}
                >
                  {/* Main clamp body */}
                  <mesh material={blueprintShellMat}>
                    <boxGeometry args={[0.28, 0.22, 0.32]} />
                    <Edges color={edgeColor} threshold={edgeThreshold} />
                  </mesh>
                  {/* Upper jaw */}
                  <mesh position={[0, 0.18, 0.08]} material={blueprintShellMat}>
                    <boxGeometry args={[0.32, 0.06, 0.14]} />
                    <Edges color="#ffffff" threshold={edgeThreshold} />
                  </mesh>
                  {/* Lower jaw */}
                  <mesh position={[0, -0.18, 0.08]} material={blueprintShellMat}>
                    <boxGeometry args={[0.32, 0.06, 0.14]} />
                    <Edges color="#ffffff" threshold={edgeThreshold} />
                  </mesh>
                </group>
              );
            })}
          </group>
        </motion.group>

        {/* 3. BODY RING BIG (Ribbed Coils) */}
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
                <mesh
                  key={`rib-${j}`}
                  position={[0, 3.05, -0.3 + j * 0.1]}
                  material={copperShellMat}
                >
                  <boxGeometry args={[1.1, 0.1, 0.02]} />
                  <Edges color={copperRibEdge} threshold={edgeThreshold} />
                </mesh>
              ))}
            </group>
          ))}
        </motion.group>

        {/* 3. DATA CORE (Projection Engine) */}
        <motion.group position-z={coreZ} position-x={coreX}>
          <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.5, 1.3, 1, 32, 1, true]} />
            <Edges color={edgeColor} threshold={20} />
          </mesh>

          <mesh
            position={[0, 0, -0.4]}
            rotation={[Math.PI / 2, 0, 0]}
            material={blueprintShellMat}
          >
            <cylinderGeometry args={[1.4, 1.4, 0.1, 64]} />
            <Edges color={edgeColor} threshold={15} />
          </mesh>

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

        {/* 4. BASE ASSEMBLY & STRUCTURAL CHASSIS */}
        <motion.group position-z={bottomZ}>
          <mesh material={blueprintShellMat} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[3.5, 3.2, 0.5, 64, 1, true]} />
            <Edges color={edgeColor} threshold={15} />
          </mesh>

          {[...Array(5)].map((_, i) => (
            <mesh
              key={`nest-ring-${i}`}
              position={[0, 0, -0.2 - i * 0.15]}
              material={blueprintShellMatSecondary}
            >
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
                <mesh
                  key={`cap-rib-${j}`}
                  position={[0, 3.5, -0.15 - j * 0.06]}
                  material={blueprintShellMatSecondary}
                >
                  <boxGeometry args={[0.65, 0.1, 0.02]} />
                  <Edges color="#ffffff" threshold={15} />
                </mesh>
              ))}
            </group>
          ))}

          {[...Array(8)].map((_, i) => (
            <group key={`foot-${i}`} rotation={[0, 0, (i * Math.PI) / 4]}>
              <mesh
                position={[0, 2.5, -0.8]}
                rotation={[Math.PI / 6, 0, 0]}
                material={blueprintShellMat}
              >
                <boxGeometry args={[0.4, 1.2, 0.2]} />
                <Edges color={edgeColor} threshold={15} />
              </mesh>
              <mesh
                position={[0, 2.2, -1.3]}
                material={blueprintShellMatSecondary}
              >
                <boxGeometry args={[0.5, 0.4, 0.3]} />
                <Edges color="#ffffff" threshold={15} />
              </mesh>
              <mesh
                position={[0, 1.6, -1.4]}
                rotation={[-Math.PI / 8, 0, 0]}
                material={blueprintShellMat}
              >
                <boxGeometry args={[0.2, 1.0, 0.15]} />
                <Edges color={edgeColor} threshold={15} />
              </mesh>
            </group>
          ))}

          <mesh position={[0, 0, -1.0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.3, 0.4, 32, 1, true]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.15}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
            <Edges color="#06b6d4" threshold={15} />
          </mesh>
        </motion.group>

      </group>
    </motion.group>
  );
}
