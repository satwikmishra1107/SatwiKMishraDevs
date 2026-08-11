import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

export default function Cursor() {
  const splineRef = useRef<Application | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const fireflyRef = useRef<any>(null);

  const onLoad = (splineApp: Application) => {
    splineRef.current = splineApp;
    fireflyRef.current = splineApp.findObjectByName('Cursor'); // cache once, not every frame
  };

  useEffect(() => {
    let rafId: number;
    const dirty = { current: false };

    const handleMouseMove = (e: MouseEvent) => {
      const SCALE = 2.45;
      mouse.current = {
        x: (e.clientX - window.innerWidth / 2) / SCALE,
        y: -(e.clientY - window.innerHeight / 2) / SCALE
      };
      dirty.current = true;
    };

    const tick = () => {

      const OFFSET_X = 0;
      const OFFSET_Y = 110;

      if (dirty.current && fireflyRef.current) {
        fireflyRef.current.position.x = OFFSET_X + mouse.current.x;
        fireflyRef.current.position.y = OFFSET_Y + mouse.current.y;
        dirty.current = false;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        mixBlendMode: 'screen',
        clipPath:
          'polygon(0 0, 100% 0, 100% calc(100% - 60px), calc(100% - 220px) calc(100% - 60px), calc(100% - 220px) 100%, 0 100%)'
      }}
    >
      <Spline
        scene="https://prod.spline.design/yNvvI10jxRKKBF7x/scene.splinecode?v=6"
        onLoad={onLoad}
      />
    </div>
  );
}