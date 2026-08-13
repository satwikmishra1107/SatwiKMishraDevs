import { PROJECTS } from '../data';
import { ExternalLink, Github, Layers, Server } from 'lucide-react';

export default function Projects() {

  const getStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'text-emerald-400';
      case 'UNDER MAINTENANCE':
        return 'text-yellow-400';
      case 'DOWN':
        return 'text-red-500';
      default:
        return 'text-neutral-500';
    }
  };

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
            03 // THE PROJECTS SECTION
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <h4 className="text-3xl sm:text-3xl font-display font-bold text-white tracking-tight leading-none">
            A Few Systems Built To Solve Real Problems.
          </h4>
        </div>

        {/* Dynamic Alternating Row Structure */}
        <div className="space-y-24 md:space-y-32">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;

            const analysisStats = isEven ? [
              { metric: "Maximum Chunk Size", value: "25 MB", variance: "" },
              { metric: "Metadata footprint / file", value: "~2–3 KB", variance: "±2%" },
              { metric: "Host-side storage", value: "0 Payload", variance: "" },
              { metric: "File integrity", value: "SHA-256 VERIFIED", variance: "" }
            ] : [
              { metric: "Active Users", value: "500+ DAILY", variance: "±18.5%" },
              { metric: "Uptime", value: "99.8%", variance: "±0.1%" },
              { metric: "Architecture", value: "Role Based", variance: "" },
              { metric: "Data Transfer Latency", value: "120ms", variance: "±42.1%" }
            ];

            return (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Statistical Data, Explanatory Text, and Main Actions */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed mb-6 whitespace-pre-line">
                    {project.description}
                  </p>

                  {/* Comprehensive Statistics Text Area - OPTIMIZED: removed backdrop-blur, solid bg */}
                  <div className="grid grid-cols-2 gap-4 bg-neutral-950/90 p-5 rounded-xl border border-neutral-900/80">
                    {analysisStats.map((stat, sIdx) => (
                      <div key={sIdx} className="border-b border-neutral-900/60 pb-2 last:border-0 font-mono">
                        <span className="text-[9px] text-neutral-500 block tracking-wider">{stat.metric}</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-bold text-neutral-200">{stat.value}</span>
                          <span className={`text-[8px] font-medium ${stat.variance.includes('±') ? 'text-emerald-400' :
                            stat.variance.includes('-') ? (isEven ? 'text-emerald-400' : 'text-emerald-400') : 'text-neutral-500'
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
                      className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg border font-semibold tracking-wider transition-all duration-300 shadow-md ${isEven
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
                </div>

                {/* The Project Cards - OPTIMIZED: removed backdrop-blur, solid bg, added transform-gpu */}
                <div className={`lg:col-span-6 flex justify-center ${isEven ? 'order-1 lg:order-2 lg:justify-end' : 'order-1 lg:order-1 lg:justify-start'}`}>
                  <div
                    className={`group relative w-full max-w-[540px] rounded-xl bg-neutral-950/90 border border-neutral-900 overflow-hidden transition-all duration-500 flex flex-col justify-between transform-gpu ${isEven
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
                    {/* Inside your project mapping loop */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-neutral-900">
                      {/* Removed `will-change-transform` from the class list */}
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
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
                      </div>

                      {/* Project specific specifications grid */}
                      <div>
                        {/* Embedded Micro Status Indicator */}
                        <div className="border-t border-neutral-900/50 font-mono text-[10px] text-neutral-500">
                          STATUS: <span className={`font-semibold ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
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