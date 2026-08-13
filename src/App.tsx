import { useEffect, useLayoutEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorReady, setCursorReady] = useState(false);

  useEffect(() => {
    Promise.all([
      new Promise((resolve) => {
        if (document.readyState === 'complete') resolve(null);
        else window.addEventListener('load', resolve);
      }),
      document.fonts ? document.fonts.ready : Promise.resolve()
    ]).then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
        setIsLoading(false);
      }, 800);
    });

    const start = () => setCursorReady(true);
    const id = 'requestIdleCallback' in window
      ? (window as any).requestIdleCallback(start, { timeout: 800 })
      : setTimeout(start, 500);

    return () => {
      'cancelIdleCallback' in window
        ? (window as any).cancelIdleCallback(id)
        : clearTimeout(id);
    };
  }, []);

  useLayoutEffect(() => {
    if (isLoading) return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    // Block scrolling entirely while Hero/Cursor/FooterOrb Splines and the
    // About R3F canvas are still loading. Nothing can scroll the page —
    // no focus-steal, no ScrollTrigger refresh, nothing — while this is on.
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.scrollTo(0, { immediate: true });
    (window as any).lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const animateSection = (selector: string, elements: string) => {
        const q = gsap.utils.selector(selector);

        gsap.fromTo(
          q(elements),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: selector,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      };

      animateSection('#about', 'h2, p, blockquote, div.grid-cols-3, img');
      animateSection('#experience', 'h2, h3, ul, .sticky, .border-l > div');
      animateSection('#footer', 'h2, p, button, .border');
      animateSection('#projects', 'h2, p.max-w-sm');

      const projectRows = gsap.utils.toArray('#projects .space-y-24 > div');

      projectRows.forEach((row: any) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    // Release the lock once all canvases have had time to finish loading
    const settle = setTimeout(() => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    }, 1200);

    return () => {
      clearTimeout(settle);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenis.destroy();
      gsap.ticker.remove(raf);
      ctx.revert();
    };
  }, [isLoading]);


  // 3. Render Loading Screen
  // 3. Render Loading Screen
  if (isLoading) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'GOOD_MORNING' : hour < 18 ? 'GOOD_AFTERNOON' : 'GOOD_EVENING';

    return (
      <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-6">
          {/* Terminal Spinner/Text */}
          <div className="font-mono text-xs tracking-widest text-orange-500 font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            {greeting}_VISITOR...
          </div>
          {/* Loading Bar */}
          <div className="w-48 h-[1px] bg-neutral-900 overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  // 4. Render Main App
  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-200 overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200">
      {cursorReady && <Cursor />}
      <Navbar />
      <main className="w-full">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Footer />
      </main>
    </div>
  );
}