"use client"

import { Canvas } from "@react-three/fiber"
import { Float } from "@react-three/drei"

export default function Hero3D() {
    return (
        <Canvas className="absolute inset-0 -z-20">
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 2, 2]} />

            <Float speed={2} rotationIntensity={2} floatIntensity={3}>
                <mesh>
                    <torusKnotGeometry args={[2, 0.5, 120, 16]} />
                    <meshStandardMaterial color="#3b82f6" wireframe />
                </mesh>
            </Float>
        </Canvas>
    )
}