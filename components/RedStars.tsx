import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create a custom star shape
const createStarGeometry = () => {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.4;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
    }
    shape.closePath();

    const extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 1,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
};

export const RedStars: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Create geometry once
  const geometry = useMemo(() => createStarGeometry(), []);
  // High quality red material
  const material = useMemo(() => new THREE.MeshStandardMaterial({
      color: '#D90429',
      emissive: '#500000',
      emissiveIntensity: 0.2,
      roughness: 0.4,
      metalness: 0.6
  }), []);

  // Random positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xOffset = Math.random() * 40 - 20;
      const yOffset = Math.random() * 40 - 20;
      const zOffset = Math.random() * 40 - 20;
      temp.push({ t, factor, speed, xOffset, yOffset, zOffset, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xOffset, yOffset, zOffset } = particle;
      
      // Update time
      t = particle.t += speed / 2;
      
      // Floating motion
      const x = xOffset + Math.cos(t) + Math.sin(t * 1) / 10;
      const y = yOffset + Math.sin(t) + Math.cos(t * 2) / 10;
      const z = zOffset + Math.cos(t) + Math.sin(t * 3) / 10;

      // Rotate star
      dummy.position.set(x, y, z);
      dummy.rotation.set(t, t, t);
      dummy.scale.setScalar(0.5 + Math.random() * 0.1); // flicker scale slightly
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};