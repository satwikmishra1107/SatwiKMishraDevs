import { useState, useEffect } from 'react';
import { Terminal, Cpu, Layers, Disc, Hammer } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [systemTime, setSystemTime] = useState('');

  useEffect(() => {
    // Dynamic system clock
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Track active scroll sections
    const sections = ['hero', 'about', 'experience', 'projects', 'footer'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'SYS_INIT', icon: Cpu },
    { id: 'about', label: 'MANIFESTO', icon: Layers },
    { id: 'experience', label: 'TELEMETRY', icon: Disc },
    { id: 'projects', label: 'BUILDS', icon: Hammer },
    { id: 'footer', label: 'CONNECT', icon: Terminal },
  ];

  return (
    <header
      id="hud-navbar"
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 pointer-events-none"
    >
      {/* Brand logo & active signal */}
      <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-neutral-800/80 px-4 py-2 rounded-full pointer-events-auto shadow-cyan-glow/5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="font-mono text-xs tracking-wider font-semibold text-neutral-300">
          SYS_OPERATOR // <span className="text-cyan-400">DEV.TCS</span>
        </span>
      </div>

      {/* Center Nav menu */}
      <nav className="hidden md:flex items-center gap-1 bg-black/60 backdrop-blur-md border border-neutral-800/80 p-1.5 rounded-full pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-[11px] tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-cyan-500/50 text-cyan-400 shadow-cyan-glow/10'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-neutral-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right system info clock */}
      <div className="hidden lg:flex flex-col items-end bg-black/60 backdrop-blur-md border border-neutral-800/80 px-4 py-2 rounded-xl pointer-events-auto font-mono text-[10px] text-neutral-400 leading-tight">
        <div>
          SYS_STATUS: <span className="text-emerald-400 font-bold">ONLINE</span>
        </div>
        <div className="text-[9px] text-neutral-500 font-medium tracking-wide mt-0.5">
          {systemTime || 'UPDATING CLOCK_'}
        </div>
      </div>
    </header>
  );
}
