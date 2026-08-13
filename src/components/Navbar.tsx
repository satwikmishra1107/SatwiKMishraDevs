import { useState, useEffect } from 'react';
import { Terminal, Cpu, Layers, Disc, Hammer } from 'lucide-react';

const SystemClock = () => {
  const [systemTime, setSystemTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{systemTime || 'UPDATING CLOCK_'}</>;
};

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'footer'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'HERO', icon: Cpu },
    { id: 'about', label: 'ABOUT', icon: Layers },
    { id: 'experience', label: 'EXPERIENCE', icon: Disc },
    { id: 'projects', label: 'PROJECTS', icon: Hammer },
    { id: 'footer', label: 'CONTACT', icon: Terminal },
  ];

  return (
    <header
      id="hud-navbar"
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 pointer-events-none"
    >
      <div className="flex items-center gap-3 bg-black/95 border border-neutral-800/80 px-4 py-2 rounded-full pointer-events-auto shadow-[0_0_10px_rgba(249,115,22,0.1)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
        </span>
        <span className="font-mono text-xs tracking-wider font-semibold text-neutral-300">
          Hey friend // <span className="text-orange-400">Welcome</span>
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-1 bg-black/95 border border-neutral-800/80 p-1.5 rounded-full pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-[11px] tracking-wider transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-orange-950/40 to-amber-950/40 border border-orange-500/50 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-400' : 'text-neutral-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="hidden lg:flex flex-col items-end bg-black/95 border border-neutral-800/80 px-4 py-2 rounded-xl pointer-events-auto font-mono text-[10px] text-neutral-400 leading-tight">
        <div>
          Portfolio Status: <span className="text-emerald-400 font-bold">Working</span>
        </div>
        <div className="text-[9px] text-neutral-500 font-medium tracking-wide mt-0.5">
          <SystemClock />
        </div>
      </div>
    </header>
  );
}