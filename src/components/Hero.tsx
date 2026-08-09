import { motion } from 'motion/react';
import Spline from '@splinetool/react-spline';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showSpline, setShowSpline] = useState(true);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowSpline(entry.isIntersecting),
      {
        // stays mounted a bit before/after the viewport so it doesn't
        // pop in/out on small scroll wiggles right at the edge
        rootMargin: '50% 0px 50% 0px',
        threshold: 0,
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(el);
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#050505] overflow-hidden pt-24"
    >
      {/* Full-screen Spline Canvas */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
        {showSpline && (
          <Spline
            scene="https://prod.spline.design/97sO5r6uWz6sOIzY/scene.splinecode"
            className="w-full h-full block"
          />


        )}
      </div>

      {/* Main hero central text overlay pushed to the bottom */}
      <div className="relative z-20 flex-1 flex flex-col justify-end items-center px-4 text-center max-w-4xl mx-auto pb-4 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-sans mt-8 leading-relaxed font-light"
        >
          Engineering robust, high-performance distributed solutions. Specializing in legacy system modernization, database optimization, and high-fidelity technical development.
        </motion.p>
      </div>

      {/* Subtle bottom scroll explorer */}
      <div className="w-full py-8 flex flex-col items-center justify-center relative z-20 pointer-events-auto">
        <button
          onClick={() => handleScrollTo('about')}
          className="group flex flex-col items-center gap-1.5 text-neutral-500 hover:text-orange-300 transition-colors duration-300 font-mono text-[10px] tracking-widest cursor-pointer"
        >
          {/* <span>SCROLL TO EXPLORE</span> */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-orange-300/80 group-hover:text-orange-300" />
          </motion.div>
        </button>
      </div>
      {/* Performance-friendly gradient fade to blend the section border */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />

      {/* Zero-lag solid block to hide the Spline watermark */}
      <div className="absolute bottom-0 right-0 w-44 h-14 bg-[#050505] z-20 pointer-events-none" />
    </section>
  );
}