import { EXPERIENCES } from '../data';
import { Disc, Layers, ArrowUpRight, Cpu } from 'lucide-react';

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-6 md:px-12 xl:px-24 border-b border-neutral-900/60 overflow-hidden"
    >
      {/* Background neon graphic flares - OPTIMIZED: Changed to Orange/Amber */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-[1px] w-8 bg-gradient-to-r from-orange-400 to-amber-500" />
          <span className="font-mono text-xs tracking-widest bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent font-bold">
            02 // THE EXPERIENCE SECTION
          </span>
        </div>

        <h2 className="text-3xl sm:text-3xl font-display font-bold text-white tracking-tight uppercase leading-none mb-20">
          EXPERIENCE & BACKGROUND
        </h2>

        {/* Centralized Timeline Axis Structure */}
        <div className="relative w-full">

          {/* Laser Core Spine Line - OPTIMIZED: Thematic Gradient */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500 via-amber-500 to-orange-500 -translate-x-1/2 opacity-60" />

          <div className="space-y-10 relative">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col lg:flex-row items-center w-full pl-10 lg:pl-0 ${isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                >
                  {/* Glowing Node Core */}
                  <span className={`absolute left-4 lg:left-1/2 top-4 flex h-5 w-5 -translate-x-1/2 items-center justify-center bg-black rounded-full border-2 ${isEven ? 'border-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                    } z-10`}>
                    <span className={`h-2 w-2 rounded-full ${isEven ? 'bg-orange-400' : 'bg-amber-400'} animate-pulse`} />
                  </span>

                  {/* Compact Summary Cards */}
                  <div className="w-full lg:w-1/2 lg:px-8 group">
                    {/* OPTIMIZED: Removed backdrop-blur-md, made background solid with via-neutral-950/95, added transform-gpu */}
                    <div className={`p-5 rounded-xl border transition-all duration-300 transform-gpu group-hover:-translate-y-1 bg-gradient-to-br ${isEven
                        ? 'from-orange-950/30 via-neutral-950/95 to-neutral-950/95 border-orange-500/30 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] lg:text-right'
                        : 'from-amber-950/30 via-neutral-950/95 to-neutral-950/95 border-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] lg:text-left'
                      }`}>

                      {/* Condensed Header */}
                      <div className="mb-3">
                        <span className={`font-mono text-[9px] font-bold uppercase tracking-wider ${isEven ? 'text-orange-400' : 'text-amber-400'
                          }`}>
                          {exp.period}
                        </span>
                        <h3 className="font-display text-lg font-bold text-white group-hover:text-white mt-0.5 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="font-mono text-xs text-neutral-300 font-medium tracking-wide">
                          {exp.company}
                        </div>
                      </div>

                      {/* Experience Summary Paragraph */}
                      <p className={`font-sans text-xs text-neutral-300 font-light leading-relaxed line-clamp-3 ${isEven ? 'lg:text-right lg:ml-auto' : ''
                        }`}>
                        {exp.highlights}
                      </p>

                      {/* Tech Stack Summary Badges */}
                      <div className={`flex flex-wrap gap-1.5 mt-4 ${isEven ? 'lg:justify-end' : ''}`}>
                        {exp.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className={`font-mono text-[8px] px-2 py-0.5 rounded border font-medium ${isEven
                                ? 'bg-orange-950/30 text-orange-300 border-orange-500/20'
                                : 'bg-amber-950/30 text-amber-300 border-amber-500/20'
                              }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Spacer grid element for layout alignment mapping */}
                  <div className="hidden lg:block w-1/2" />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}