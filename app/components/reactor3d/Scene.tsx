"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { MotionValue } from "framer-motion";
import ReactorModel from "./ReactorModel";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export default function Scene({ scrollProgress }: SceneProps) {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 45 }}
        gl={{ antialias: false }}
      >
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          color="#06b6d4"
        />
        <spotLight
          position={[-10, -10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          color="#3b82f6"
        />

        <Environment preset="city" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <ReactorModel scrollProgress={scrollProgress} />
        </Float>

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.05}
            luminanceSmoothing={0.9}
            intensity={1.8}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
