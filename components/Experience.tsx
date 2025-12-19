import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, PerspectiveCamera, Environment, Float, Stars as DreiStars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { SovietCar } from './SovietCar';
import { RedStars } from './RedStars';

export const Experience: React.FC = () => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame((state, delta) => {
    // Scroll based animations
    const r1 = scroll.range(0 / 4, 1 / 4);
    const r2 = scroll.range(1 / 4, 1 / 4);
    const r3 = scroll.range(2 / 4, 1 / 4);
    const r4 = scroll.range(3 / 4, 1 / 4);

    if (groupRef.current) {
      // Rotation logic: Spin the car group based on scroll
      // We perform a full 360 spin + extra movements per section
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        -scroll.offset * Math.PI * 2, 
        4, 
        delta
      );

      // Tilt logic
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        (scroll.offset - 0.5) * 0.5,
        2,
        delta
      );
    }

    // Camera movement logic for cinematic feel
    if(cameraRef.current) {
        const zoom = 1 + scroll.offset * 0.5;
        // cameraRef.current.zoom = zoom; // Avoid actual zoom, move z instead for perspective shift
        // cameraRef.current.updateProjectionMatrix();
    }
  });

  return (
    <>
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.2} color="#444" />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        color="#fff" 
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#D90429" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffd700" /> {/* Gold accent light */}

      {/* Environment */}
      <DreiStars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <RedStars count={40} />
      
      {/* Floating Group containing the main subject */}
      <Float 
        speed={2} // Animation speed
        rotationIntensity={0.5} // XYZ rotation intensity
        floatIntensity={0.5} // Up/down float intensity
      >
        <group ref={groupRef}>
          <SovietCar />
        </group>
      </Float>

      {/* Post Processing for Premium Feel */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
        <Noise opacity={0.15} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};