import React from 'react';
import { SECTIONS } from '../types';

// Design system: Brutalist typography, high contrast, red accents
const Section = (props: any) => {
  const isRight = props.index % 2 !== 0;
  
  return (
    <section 
      className={`h-screen w-full flex items-center p-8 md:p-20 ${
        isRight ? 'justify-end' : 'justify-start'
      }`}
      style={{ pointerEvents: 'none' }} // Let clicks pass to 3D if needed
    >
      <div className={`
        relative z-10 p-8 md:p-12 
        border-l-4 border-[${props.data.color}] 
        bg-black/40 backdrop-blur-md 
        max-w-xl
        transform transition-all duration-500
      `}>
         {/* Background decoration */}
         <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-white/20"></div>
         <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-white/20"></div>

         <div className="flex items-center gap-4 mb-4">
             <span className="font-soviet text-6xl text-white/10 select-none absolute -top-10 left-0">
                 0{props.index + 1}
             </span>
             <div className="h-[1px] w-12 bg-white/50"></div>
             <span className="font-tech text-sm tracking-[0.3em] uppercase text-white/80">
                 {props.data.year}
             </span>
         </div>

        <h2 className="text-4xl md:text-6xl font-soviet text-white mb-2 uppercase leading-none">
          {props.data.title}
        </h2>
        
        <h3 className="text-xl md:text-2xl font-luxury italic text-[#D90429] mb-6">
          {props.data.subtitle}
        </h3>
        
        <p className="font-sans text-gray-300 leading-relaxed text-sm md:text-base border-t border-white/10 pt-4">
          {props.data.description}
        </p>

        <div className="mt-8 flex gap-4">
            <button className="pointer-events-auto px-6 py-2 border border-white/30 text-xs font-tech hover:bg-white hover:text-black transition-colors uppercase">
                View Blueprint
            </button>
            <button className="pointer-events-auto px-6 py-2 bg-[#D90429] text-white text-xs font-tech hover:bg-red-700 transition-colors uppercase">
                History
            </button>
        </div>
      </div>
    </section>
  );
};

export const Overlay: React.FC = () => {
  return (
    <div className="w-full">
      {SECTIONS.map((section, index) => (
        <Section key={section.id} data={section} index={index} />
      ))}
      
      {/* Footer Section */}
      <footer className="h-[50vh] flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="text-center">
              <h1 className="text-4xl md:text-8xl font-soviet text-[#D90429] mb-4">CCCP</h1>
              <p className="font-tech text-xs tracking-widest opacity-50">AUTOMOTIVE HISTORY MUSEUM</p>
              <div className="mt-8">
                  <span className="block text-[10px] text-gray-500">DESIGNED BY HEAD OF DESIGN</span>
                  <span className="block text-[10px] text-gray-500">SAN FRANCISCO x MOSCOW</span>
              </div>
          </div>
      </footer>
    </div>
  );
};