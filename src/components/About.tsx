import { MANIFESTO } from '../data';
import { Layers, ShieldCheck, Zap } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center bg-[#050505] py-24 px-6 md:px-12 xl:px-24 border-b border-neutral-900/60 overflow-hidden"
    >
      {/* Decorative gradients shifted to the right to frame the text */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-purple-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Holographic Photo Display */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="relative w-full max-w-[340px] aspect-[3/4] group select-none">
            
            {/* Ambient cyan backdrop glow */}
            <div className="absolute inset-0 bg-cyan-500/10 rounded-lg blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />

            {/* Cyan border-glow container */}
            <div className="relative h-full w-full rounded-lg border-2 border-cyan-400/80 bg-neutral-950 overflow-hidden shadow-cyan-glow group-hover:border-cyan-300 transition-all duration-300">
              
              {/* Image with 80% opacity and no-referrer */}
              <img
                src="/src/assets/images/holographic_portrait_1784107477355.jpg"
                alt="Developer Hologram"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 mix-blend-screen scale-[1.02] group-hover:scale-[1.05] transition-transform duration-700"
              />

              {/* Scanline overlay */}
              <div className="absolute inset-0 scanlines pointer-events-none opacity-40 mix-blend-overlay" />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

              {/* Cyan gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/40 via-transparent to-transparent mix-blend-color-burn pointer-events-none" />

              {/* Technical holographic brackets and framing HUD */}
              <div className="absolute inset-3 border border-cyan-500/20 pointer-events-none" />
              
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* Holographic Signal Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 border border-cyan-400/30 px-3 py-1.5 rounded flex items-center justify-between font-mono text-[9px] text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  PROJ_HOLOGRAM_V1.9
                </span>
                <span>AMPLITUDE: 94.2%</span>
              </div>
            </div>

            {/* Floating sub-telemetry stats absolute panel */}
            <div className="absolute -bottom-6 -right-6 bg-black/90 border border-neutral-800 p-3 rounded-lg font-mono text-[9px] text-neutral-400 hidden sm:block max-w-[180px] shadow-lg">
              <div className="text-purple-400 border-b border-neutral-900 pb-1 mb-1 font-bold">
                CORE_PARAMETERS
              </div>
              <div className="flex justify-between mt-1">
                <span>IP_LOC:</span>
                <span className="text-neutral-300 font-medium">10.92.112.5</span>
              </div>
              <div className="flex justify-between">
                <span>CPU_GRID:</span>
                <span className="text-neutral-300 font-medium">CLUSTER_B</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-cyan-400 font-medium">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Punchy Manifesto */}
        <div className="lg:col-span-7 flex flex-col justify-center section-reveal order-1 lg:order-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-[1px] w-8 bg-purple-500" />
            <span className="font-mono text-xs tracking-widest text-purple-400">
              01 // THE MANIFESTO
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase leading-none mb-8">
            {MANIFESTO.title}
          </h2>

          <div className="space-y-6 font-sans text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
            <p className="text-neutral-200">
              {MANIFESTO.body1}
            </p>

            {/* High-quality Serif/Sans-Serif mixture highlighting the target phrase */}
            <blockquote className="border-l-2 border-cyan-400 pl-6 my-8 py-2 bg-gradient-to-r from-cyan-950/20 to-transparent">
              <span className="font-sans text-lg sm:text-2xl text-neutral-400 italic block leading-relaxed">
                "Our philosophy is simple. We build resilient layers with absolute precision,{' '}
                <span className="font-display font-bold not-italic text-cyan-400 tracking-wide block sm:inline">
                  {MANIFESTO.highlightPhrase}
                </span>{' '}
                This is the standard of systems integrity."
              </span>
            </blockquote>

            <p className="text-neutral-400">
              {MANIFESTO.body2}
            </p>
          </div>

          {/* Core pillar indicators */}
          <div className="grid grid-cols-3 gap-4 mt-10 border-t border-neutral-900/60 pt-8 font-mono text-[10px] text-neutral-500">
            <div className="space-y-1">
              <span className="text-cyan-400 block font-semibold">[01] SPEED</span>
              <span>Ultra-low sub-millisecond execution patterns.</span>
            </div>
            <div className="space-y-1">
              <span className="text-purple-400 block font-semibold">[02] TRUST</span>
              <span>Highly redundant systems with failover state.</span>
            </div>
            <div className="space-y-1">
              <span className="text-white block font-semibold">[03] LEGACY</span>
              <span>Modern microservices decoupling workflows.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}