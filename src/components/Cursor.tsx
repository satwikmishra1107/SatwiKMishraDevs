import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

export default function Cursor() {
  const splineRef = useRef<Application | null>(null);
  const fireflyRef = useRef<any>(null);

  const onLoad = (splineApp: Application) => {
    splineRef.current = splineApp;
    fireflyRef.current = splineApp.findObjectByName('Cursor'); // cache once, not every frame
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If Spline hasn't loaded the object yet, exit early
      if (!fireflyRef.current) return;

      const SCALE = 2.45;
      const OFFSET_X = 0;
      const OFFSET_Y = 110;

      // Calculate the new coordinates directly from the event
      const targetX = (e.clientX - window.innerWidth / 2) / SCALE;
      const targetY = -(e.clientY - window.innerHeight / 2) / SCALE;

      // Mutate the Spline object's position directly
      fireflyRef.current.position.x = OFFSET_X + targetX;
      fireflyRef.current.position.y = OFFSET_Y + targetY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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