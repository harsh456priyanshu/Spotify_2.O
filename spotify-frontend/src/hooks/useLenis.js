import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const rafRef = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Reduced for better performance
      easing: (t) => 1 - Math.pow(1 - t, 3), // Simpler easing function
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8, // Reduced for smoother feel
      smoothTouch: false, // Keep disabled for mobile performance
      touchMultiplier: 1.5, // Reduced
      infinite: false,
      // Add performance optimizations
      lerp: 0.08, // Control interpolation speed
      wheelMultiplier: 0.8,
    });

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Add resize handler for better responsive behavior
    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);
};
