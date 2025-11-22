"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Cube({ position, color, wireframe = false }: { position: [number, number, number], color: string, wireframe?: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
            if (hovered) {
                meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            } else {
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            }
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} wireframe={wireframe} roughness={0.1} metalness={0.8} />
        </mesh>
    );
}

function FloatingX() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.getElapsedTime();
            groupRef.current.position.y = Math.sin(t / 2) * 0.5;
            groupRef.current.rotation.y = Math.sin(t / 4) * 0.2;
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
            {/* The X shape made of two elongated boxes */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[4, 0.8, 0.8]} />
                <meshStandardMaterial color="#E62B1E" roughness={0.2} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[4, 0.8, 0.8]} />
                <meshStandardMaterial color="#E62B1E" roughness={0.2} metalness={0.5} />
            </mesh>
        </group>
    )
}

export const Hero3DScene = () => {
    return (
        <div className="absolute inset-0 w-full h-full -z-10">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <FloatingX />
                </Float>

                <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                    <Cube position={[-4, 2, -2]} color="white" wireframe />
                    <Cube position={[4, -2, -3]} color="white" wireframe />
                    <Cube position={[-3, -3, 0]} color="#E62B1E" />
                    <Cube position={[3, 3, -5]} color="#1a1a1a" />
                </Float>

                <Environment preset="city" />
                <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
            </Canvas>
        </div>
    );
};
