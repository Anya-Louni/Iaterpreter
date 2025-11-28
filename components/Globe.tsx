'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, MeshDistortMaterial, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const count = 2000;
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2.5 + Math.random() * 2;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        color="#C9A55A"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Earth() {
  const globeRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const languageRingsRef = useRef<THREE.Group[]>([]);

  const languages = ['EN', 'FR', 'ES', 'DE', 'IT', 'PT', 'JA', 'ZH'];

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      globeRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
    }
    
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = clock.getElapsedTime() * (0.3 + i * 0.1);
      }
    });

    if (languageRingsRef.current[0]) {
      languageRingsRef.current[0].rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <group>
        {/* Main Earth sphere with distortion */}
        <Sphere ref={globeRef} args={[2.4, 128, 128]}>
          <MeshDistortMaterial
            color="#0a1929"
            attach="material"
            distort={0.15}
            speed={1.5}
            roughness={0.4}
            metalness={0.8}
          />
        </Sphere>

        {/* Wireframe overlay */}
        <Sphere args={[2.42, 40, 40]}>
          <meshBasicMaterial
            color="#C9A55A"
            wireframe
            transparent
            opacity={0.12}
          />
        </Sphere>

        {/* Glowing rings */}
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) ringsRef.current[i] = el;
            }}
            rotation={[Math.PI / 2 + i * 0.3, 0, i * Math.PI / 3]}
          >
            <torusGeometry args={[3.2 + i * 0.3, 0.01, 16, 100]} />
            <meshBasicMaterial
              color="#C9A55A"
              transparent
              opacity={0.2 - i * 0.05}
            />
          </mesh>
        ))}

        {/* Atmosphere glow */}
        <Sphere args={[2.7, 64, 64]}>
          <meshBasicMaterial
            color="#C9A55A"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Language ring with text labels - Single ring only */}
        <group
          ref={(el) => {
            if (el) languageRingsRef.current[0] = el;
          }}
          rotation={[Math.PI / 2, 0, 0]}
        >
          {languages.map((lang, i) => {
            const angle = (i / languages.length) * Math.PI * 2;
            const radius = 3.8;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            return (
              <Text
                key={lang}
                position={[x, 0, z]}
                rotation={[0, -angle, 0]}
                fontSize={0.28}
                color="#C9A55A"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#000000"
              >
                {lang}
              </Text>
            );
          })}
        </group>

        <Particles />
      </group>
    </Float>
  );
}

export default function Globe() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 35 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ 
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true
        }}
        dpr={[1, 2]}
      >
        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#C9A55A" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#C9A55A"
        />
        <Earth />
      </Canvas>
    </div>
  );
}
