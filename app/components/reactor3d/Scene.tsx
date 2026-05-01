"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import ReactorModel from "./ReactorModel";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      {/* The Canvas creates a true WebGL 3D context */}
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.2} />
        {/* Primary cyan light */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          color="#06b6d4"
        />
        {/* Secondary blue fill light */}
        <spotLight
          position={[-10, -10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          color="#3b82f6"
        />

        {/* Adds realistic reflections to the dark metal materials */}
        <Environment preset="city" />

        {/* Float gives the entire machine a subtle, continuous anti-gravity hover */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <ReactorModel scrollProgress={scrollProgress} />
        </Float>
      </Canvas>
    </div>
  );
}
