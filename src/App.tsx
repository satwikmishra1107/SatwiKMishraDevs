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
  // 1. Swapped to useLayoutEffect for accurate DOM measurements before paint
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
      
      // 2. Updated animation logic to trigger each element individually for pinpoint accuracy
      const animateSection = (selector: string, elements: string) => {
        const targets = gsap.utils.toArray(`${selector} ${elements}`);
        
        targets.forEach((target: any) => {
          gsap.fromTo(
            target,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: target, // The element triggers itself
                start: 'top 85%', 
                toggleActions: 'play none none none',
              },
            }
          );
        });
      };

      animateSection('#about', 'h2, p, blockquote, div.grid-cols-3, img');
      animateSection('#experience', 'h2, h3, ul, .sticky, .border-l > div');
      animateSection('#projects', 'h2, p, .grid > div');
      animateSection('#footer', 'h2, p, button, .border');
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
    // 3. Changed overflow-hidden to overflow-x-hidden to unblock vertical height calculations
    <div className="relative min-h-screen bg-[#050505] text-neutral-200 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
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