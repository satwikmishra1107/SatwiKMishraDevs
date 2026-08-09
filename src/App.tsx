import { useLayoutEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    (window as any).lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {

      // Optimized: Scopes the elements strictly to their parent section
      const animateSection = (selector: string, elements: string) => {
        const q = gsap.utils.selector(selector); // This restricts the search to just this section

        gsap.fromTo(
          q(elements), // Now it only animates the elements inside the scoped section
          {
            opacity: 0,
            y: 40,
          },
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

      // 1. Animate JUST the Projects header & subtitle
      animateSection('#projects', 'h2, p.max-w-sm');

      // 2. Animate each project row INDIVIDUALLY only when it enters the viewport
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
              start: 'top 85%', // Triggers right as the specific card enters the screen
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', handleLoad);
    }

    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      ctx.revert();
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-200 overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200">
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