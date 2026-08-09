import React, { useRef, useLayoutEffect, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MANIFESTO } from '../data'; // Update path if needed
import Portrait from './Portrait';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0); // Stores the scroll progress (0 to 1)

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%', // Pins the screen for 1.5x the viewport height
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          // Send the live scroll progress (0.0 to 1.0) directly to the ref
          progressRef.current = self.progress;
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative h-screen w-full flex items-center bg-[#050505] overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-orange-950/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* NEW: FULL SCREEN CANVAS LAYER */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* OPTIMIZED: Capped DPR to 1 to drastically reduce pixel calculations on large screens */}
        <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }} dpr={[1, 1.5]} className="w-full h-full">
          <ambientLight intensity={1.0} />
          <Suspense fallback={null}>
            <Portrait progressRef={progressRef} />
          </Suspense>

          {/* OPTIMIZED: Disabled multisampling and removed mipmapBlur for a cheaper render pass */}
          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={1.0} intensity={0.4} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* NEW: FOREGROUND TEXT LAYER */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center h-full pointer-events-none px-6 md:px-12 xl:px-24">

        {/* Empty space holding the left side open for the 3D portrait */}
        <div className="hidden lg:block lg:col-span-6 h-full"></div>

        {/* Right Column: Punchy Manifesto */}
        <div className="lg:col-span-6 flex flex-col justify-center pointer-events-auto py-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[1px] w-8 bg-orange-500" />
            <span className="font-mono text-xs tracking-widest text-orange-400">
              01 // THE MANIFESTO
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight uppercase leading-none mb-8">
            {MANIFESTO.title}
          </h2>

          <div className="space-y-6 font-sans text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
            <p className="text-neutral-200">
              {MANIFESTO.body1}
            </p>

            <blockquote className="border-l-2 border-orange-400 pl-6 my-8 py-2 bg-gradient-to-r from-orange-950/20 to-transparent">
              <span className="font-sans text-lg sm:text-2xl text-neutral-400 italic block leading-relaxed">
                "Our philosophy is simple. We build resilient layers with absolute precision,{' '}
                <span className="font-display font-bold not-italic text-orange-400 tracking-wide block sm:inline">
                  {MANIFESTO.highlightPhrase}
                </span>{' '}
                This is the standard of systems integrity."
              </span>
            </blockquote>

            {/* <p className="text-neutral-400">
              {MANIFESTO.body2}
            </p> */}
          </div>

          {/* Core pillar indicators updated to the new color scheme */}
          {/* <div className="grid grid-cols-3 gap-4 mt-10 border-t border-neutral-900/60 pt-8 font-mono text-[10px] text-neutral-500">
            <div className="space-y-1">
              <span className="text-orange-400 block font-semibold">[01] SPEED</span>
              <span>Ultra-low sub-millisecond execution patterns.</span>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-300 block font-semibold">[02] TRUST</span>
              <span>Highly redundant systems with failover state.</span>
            </div>
            <div className="space-y-1">
              <span className="text-white block font-semibold">[03] LEGACY</span>
              <span>Modern microservices decoupling workflows.</span>
            </div>
          </div> */}
        </div>

      </div>
    </section>
  );
}