import { PROJECTS } from '../data';
import { ExternalLink, Github, Layers, Server } from 'lucide-react';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-6 md:px-12 xl:px-24 border-b border-neutral-900/60 overflow-hidden"
    >
      {/* Visual background rings mapped to the new orange/amber theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-950/10 to-amber-950/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-[1px] w-8 bg-orange-500" />
          <span className="font-mono text-xs tracking-widest text-orange-400">
            03 // BUILDS & COMPILATIONS
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase leading-none">
            PRODUCTION SYSTEMS
          </h2>
          {/* <p className="font-mono text-xs text-neutral-500 max-w-sm md:text-right">
            // DETAILED SPECS FOR COMPLETED WORKSTATIONS
          </p> */}
        </div>

        {/* Dynamic Alternating Row Structure */}
        <div className="space-y-24 md:space-y-32">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            
            // Mock statistical data for deep technical context
            const analysisStats = isEven ? [
              { metric: "AVG LATENCY", value: "0.42ms", variance: "-12.4%" },
              { metric: "THROUGHPUT", value: "850k req/s", variance: "+8.2%" },
              { metric: "ERROR RATE", value: "0.0004%", variance: "NOMINAL" },
              { metric: "UPTIME", value: "99.999%", variance: "STABLE" }
            ] : [
              { metric: "CONCURRENT HITS", value: "2.4M/m", variance: "+18.5%" },
              { metric: "COMPRESSION", value: "4.2x ratio", variance: "+4.1%" },
              { metric: "CACHE HIT RATE", value: "96.8%", variance: "OPTIMAL" },
              { metric: "FAILOVER TIME", value: "120ms", variance: "-42.1%" }
            ];

            return (
              <div 
                key={project.id} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Statistical Data, Explanatory Text, and Main Actions */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                  {/* <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className={`w-1.5 h-1.5 rounded-full ${isEven ? 'bg-orange-400' : 'bg-amber-400'} animate-pulse`} />
                    <span className="text-neutral-400 tracking-wider">SYSTEM_ANALYSIS // MODULE_0{index + 1}</span>
                  </div> */}

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                    Performance Telemetry
                  </h3>
                  
                  <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed">
                    Live production evaluation showcasing core platform metrics. The architecture handles horizontal expansion triggers effortlessly while strictly tracking sub-millisecond execution loops across containerized states.
                  </p>

                  {/* Comprehensive Statistics Text Area - OPTIMIZED: removed backdrop-blur, solid bg */}
                  <div className="grid grid-cols-2 gap-4 bg-neutral-950/90 p-5 rounded-xl border border-neutral-900/80">
                    {analysisStats.map((stat, sIdx) => (
                      <div key={sIdx} className="border-b border-neutral-900/60 pb-2 last:border-0 font-mono">
                        <span className="text-[9px] text-neutral-500 block tracking-wider">{stat.metric}</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-bold text-neutral-200">{stat.value}</span>
                          <span className={`text-[8px] font-medium ${
                            stat.variance.includes('+') ? 'text-emerald-400' : 
                            stat.variance.includes('-') ? (isEven ? 'text-orange-400' : 'text-amber-400') : 'text-neutral-500'
                          }`}>
                            {stat.variance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* High Visibility Action Buttons - OPTIMIZED: removed backdrop-blur */}
                  <div className="flex flex-wrap sm:flex-nowrap gap-4 pt-2 font-mono text-xs">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg border font-semibold tracking-wider transition-all duration-300 shadow-md ${
                        isEven 
                          ? 'bg-orange-950/30 border-orange-500/40 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]' 
                          : 'bg-amber-950/30 border-amber-500/40 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>LAUNCH_HUD // LIVE</span>
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-200 shadow-md"
                    >
                      <Github className="w-4 h-4" />
                      <span>EXPLORE_SOURCE</span>
                    </a>
                  </div>

                  {/* <div className="p-4 rounded-lg bg-gradient-to-r from-neutral-950 to-transparent border-l border-neutral-800 font-mono text-[10px] text-neutral-500 leading-relaxed">
                    <span className="text-neutral-400 block mb-1">■ ARCHITECTURAL DEPLOYMENT NOTE</span>
                    Continuous integrity checks verify zero structural regression during massive traffic spikes. Failover paths remain active with localized state synchronization.
                  </div> */}
                </div>

                {/* The Project Cards - OPTIMIZED: removed backdrop-blur, solid bg, added transform-gpu */}
                <div className={`lg:col-span-6 flex justify-center ${isEven ? 'order-1 lg:order-2 lg:justify-end' : 'order-1 lg:order-1 lg:justify-start'}`}>
                  <div
                    className={`group relative w-full max-w-[540px] rounded-xl bg-neutral-950/90 border border-neutral-900 overflow-hidden transition-all duration-500 flex flex-col justify-between transform-gpu ${
                      isEven 
                        ? 'hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]' 
                        : 'hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                    }`}
                    style={{
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    {/* Visual hover border overlay glow using custom css shadows */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ 
                        mixBlendMode: 'screen',
                        boxShadow: `inset 0 0 40px rgba(${isEven ? '249,115,22' : '245,158,11'}, 0.1)` 
                      }}
                    />

                    {/* Card Top: Image Container with Hover Zoom */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-neutral-900">
                      {/* OPTIMIZED: Added loading lazy and will-change-transform */}
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
                      />

                      {/* Gradient dark overlays to blend the image seamlessly into the card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                      {/* Icon HUD banner - OPTIMIZED: Removed backdrop blur */}
                      {/* <div className="absolute top-4 left-4 bg-black/90 border border-neutral-800/80 rounded px-2.5 py-1 flex items-center gap-1.5 font-mono text-[9px] text-neutral-400">
                        {isEven ? (
                          <Server className="w-3 h-3 text-orange-400" />
                        ) : (
                          <Layers className="w-3 h-3 text-amber-400" />
                        )}
                        <span>PROJ_0{index + 1}</span>
                      </div> */}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative z-10">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[8px] tracking-widest text-neutral-400 bg-neutral-900/60 px-2 py-0.5 rounded border border-neutral-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        {/* <h3 className={`font-display text-2xl font-bold text-white mb-3 transition-colors duration-300 ${isEven ? 'group-hover:text-orange-400' : 'group-hover:text-amber-400'}`}>
                          {project.title}
                        </h3> */}

                        {/* Description */}
                        {/* <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed mb-6">
                          {project.description}
                        </p> */}
                      </div>

                      {/* Project specific specifications grid */}
                      <div>
                        {/* <div className="grid grid-cols-3 gap-2 bg-neutral-950/60 p-4 rounded-lg border border-neutral-900 font-mono text-center">
                          {project.stats.map((stat) => (
                            <div key={stat.label}>
                              <div className="text-[8px] text-neutral-500 uppercase tracking-widest">
                                {stat.label}
                              </div>
                              <div className={`text-xs font-semibold mt-1 ${isEven ? 'text-orange-400' : 'text-amber-400'}`}>
                                {stat.value}
                              </div>
                            </div>
                          ))}
                        </div> */}

                        {/* Embedded Micro Status Indicator */}
                        <div className="border-t border-neutral-900/50 font-mono text-[10px] text-neutral-500">
                          STATUS: <span className="text-emerald-400 font-semibold">ONLINE // DEPLOYED</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}