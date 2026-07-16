import { motion } from 'motion/react';
import ParticleBackground from './ParticleBackground';
import { ArrowDown, Cpu, ChevronDown } from 'lucide-react';

export default function Hero() {
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
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#050505] grid-bg overflow-hidden pt-24"
    >
      {/* Decorative cyber grid gridlines/accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/0 via-transparent to-[#050505] pointer-events-none z-10" />
      <div className="absolute top-1/4 left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid container for Particle Canvas to stay centered and constrained */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[75vh] max-w-7xl mx-auto border-y border-neutral-900/40 bg-neutral-950/20 backdrop-blur-[1px] relative flex items-center justify-center pointer-events-none">
        <ParticleBackground />

        {/* HUD corners layout */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-600 select-none">
          SECURE_NODE_CONN // OK
        </div>
        <div className="absolute top-4 right-4 font-mono text-[9px] text-neutral-600 select-none">
          LATENCY // 1.2MS
        </div>
        <div className="absolute bottom-4 left-4 font-mono text-[9px] text-neutral-600 select-none">
          GRID_SEC_7X // DEPLOYED
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-[9px] text-neutral-600 select-none">
          PORT // 3000
        </div>
      </div>

      {/* Main hero central text overlay */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-4 text-center max-w-4xl mx-auto mt-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-500/30 rounded-full mb-6"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-cyan-300 font-medium">
            CREATIVE TECHNOLOGY PROTOCOL
          </span>
        </motion.div>

        {/* Display Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter text-white leading-[0.9] uppercase"
        >
          Systems <br />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
            Architect
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl font-sans mt-8 leading-relaxed font-light"
        >
          Engineering robust, high-performance distributed solutions. Specializing in legacy system modernization, database optimization, and high-fidelity technical development.
        </motion.p>

        {/* Buttons / CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap gap-4 mt-10 justify-center z-30"
        >
          <button
            onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-950/40 to-purple-950/40 hover:from-cyan-900/50 hover:to-purple-900/50 text-cyan-300 font-mono text-xs tracking-wider rounded border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 hover:shadow-cyan-glow cursor-pointer"
          >
            INITIALIZE_BUILDS
          </button>
          <button
            onClick={() => handleScrollTo('projects')} className="px-6 py-2.5 bg-neutral-950/60 hover:bg-neutral-900/60 text-neutral-400 hover:text-white font-mono text-xs tracking-wider rounded border border-neutral-800 transition-all duration-300 cursor-pointer"
          >
            READ_MANIFESTO
          </button>
        </motion.div>
      </div>

      {/* Subtle bottom scroll explorer */}
      <div className="w-full py-8 flex flex-col items-center justify-center relative z-20 pointer-events-auto">
        <button
          onClick={() => handleScrollTo('about')}
          className="group flex flex-col items-center gap-1.5 text-neutral-500 hover:text-cyan-400 transition-colors duration-300 font-mono text-[10px] tracking-widest cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-cyan-400/80 group-hover:text-cyan-400" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
