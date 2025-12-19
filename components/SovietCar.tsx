import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A stylized, brutalist representation of a Soviet Sedan (Volga/Lada hybrid)
// We use primitives to avoid needing external assets, ensuring code runs immediately.

const CarBodyMaterial = new THREE.MeshStandardMaterial({
  color: '#0a0a0a',
  roughness: 0.2,
  metalness: 0.8,
  envMapIntensity: 2,
});

const CarGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#000000',
  roughness: 0,
  metalness: 0.9,
  transmission: 0.2, // slight transparency
  clearcoat: 1,
  clearcoatRoughness: 0,
});

const CarChromeMaterial = new THREE.MeshStandardMaterial({
  color: '#cccccc',
  roughness: 0.1,
  metalness: 1,
});

const CarRedMaterial = new THREE.MeshStandardMaterial({
  color: '#D90429',
  roughness: 0.5,
  metalness: 0.2,
  emissive: '#500000',
  emissiveIntensity: 0.5
});

export const SovietCar: React.FC = () => {
  const wheelRefs = useRef<THREE.Group[]>([]);
  
  useFrame((state, delta) => {
    // Spin wheels slowly as if flying
    wheelRefs.current.forEach((ref) => {
      if (ref) ref.rotation.x -= delta * 2;
    });
  });

  return (
    <group scale={[0.8, 0.8, 0.8]} position={[0, -0.5, 0]}>
      {/* Chassis Main Block */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow material={CarBodyMaterial}>
        <boxGeometry args={[2.2, 0.7, 4.8]} />
      </mesh>

      {/* Upper Cabin */}
      <mesh position={[0, 1.3, -0.2]} castShadow material={CarGlassMaterial}>
        <boxGeometry args={[1.9, 0.8, 2.5]} />
      </mesh>

      {/* Hood Ornament (Red Star) */}
      <mesh position={[0, 1.0, 2.3]} rotation={[0, 0, 0]} material={CarRedMaterial}>
        <dodecahedronGeometry args={[0.15, 0]} />
      </mesh>
      
      {/* Front Grille Chrome */}
      <mesh position={[0, 0.6, 2.41]} material={CarChromeMaterial}>
        <boxGeometry args={[1.8, 0.5, 0.05]} />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[-0.7, 0.7, 2.42]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} toneMapped={false} />
      </mesh>
      <mesh position={[0.7, 0.7, 2.42]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} toneMapped={false} />
      </mesh>

      {/* Rear Lights (Red Strip) */}
      <mesh position={[0, 0.7, -2.41]}>
        <boxGeometry args={[2.0, 0.15, 0.05]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Bumpers */}
      <mesh position={[0, 0.3, 2.5]} material={CarChromeMaterial}>
        <boxGeometry args={[2.3, 0.15, 0.1]} />
      </mesh>
      <mesh position={[0, 0.3, -2.5]} material={CarChromeMaterial}>
        <boxGeometry args={[2.3, 0.15, 0.1]} />
      </mesh>

      {/* Wheels */}
      <Wheel position={[-1.1, 0.3, 1.5]} ref={(el) => { if (el) wheelRefs.current[0] = el; }} />
      <Wheel position={[1.1, 0.3, 1.5]} ref={(el) => { if (el) wheelRefs.current[1] = el; }} />
      <Wheel position={[-1.1, 0.3, -1.5]} ref={(el) => { if (el) wheelRefs.current[2] = el; }} />
      <Wheel position={[1.1, 0.3, -1.5]} ref={(el) => { if (el) wheelRefs.current[3] = el; }} />
      
      {/* Jet Thrusters (It's a flying car museum after all) */}
      <group position={[0, 0, -2.5]}>
         <mesh rotation={[Math.PI/2, 0, 0]}>
             <cylinderGeometry args={[0.3, 0.5, 0.5, 16]} />
             <meshStandardMaterial color="#333" />
         </mesh>
         <mesh position={[0, 0, -0.3]} rotation={[Math.PI/2, 0, 0]}>
            <coneGeometry args={[0.25, 0.8, 16]} />
            <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={2} transparent opacity={0.6} />
         </mesh>
      </group>
    </group>
  );
};

// Helper for wheels
const Wheel = React.forwardRef<THREE.Group, { position: [number, number, number] }>(({ position }, ref) => {
  return (
    <group position={position} ref={ref}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      {/* Hubcap */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.13, 0, 0]}>
         <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
         <meshStandardMaterial color="#cccccc" metalness={1} roughness={0.2} />
      </mesh>
      {/* Hover Glow Ring */}
      <mesh rotation={[Math.PI/2, 0, 0]} position={[0, -0.4, 0]}>
          <torusGeometry args={[0.35, 0.02, 16, 32]} />
          <meshBasicMaterial color="cyan" toneMapped={false} />
      </mesh>
    </group>
  );
});