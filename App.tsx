import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Loader } from '@react-three/drei';
import { Experience } from './components/Experience';
import { Overlay } from './components/Overlay';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div className="w-full h-screen bg-[#050505]">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 8], fov: isMobile ? 50 : 35 }}
          gl={{ antialias: false }} // Optimization for post-processing
        >
          <color attach="background" args={['#050505']} />
          <Suspense fallback={null}>
            <ScrollControls pages={4} damping={0.3}>
              <Scroll>
                <Experience />
              </Scroll>
              <Scroll html style={{ width: '100%' }}>
                <Overlay />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
        <Loader 
          dataInterpolation={(p) => `LOADING HISTORY ${p.toFixed(0)}%`}
          containerStyles={{ background: '#050505' }}
          innerStyles={{ border: '1px solid #D90429', width: '200px' }}
          barStyles={{ background: '#D90429', height: '100%' }}
          dataStyles={{ fontFamily: 'Russo One', color: '#D90429', fontSize: '1rem' }}
        />
      </div>
      
      {/* Static overlay elements */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none z-50 mix-blend-difference text-white">
        <h1 className="text-xl font-soviet tracking-widest uppercase">USSR MOTO</h1>
        <div className="text-xs font-tech opacity-70">EST. 1922</div>
      </div>
      
      <div className="fixed bottom-0 right-0 p-6 pointer-events-none z-50 mix-blend-difference text-white">
         <div className="flex flex-col items-end">
            <span className="text-xs font-tech opacity-50">SCROLL TO EXPLORE</span>
            <div className="w-1 h-12 bg-white/20 mt-2 rounded-full relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 animate-bounce"></div>
            </div>
         </div>
      </div>
    </>
  );
}