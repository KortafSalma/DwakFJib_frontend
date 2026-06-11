import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const update = () => {
      lenis.options.lerp = mq.matches ? 1 : 0.08;
    };
    mq.addEventListener('change', update);
    update();

    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        gestureOrientation: 'vertical',
        syncTouch: true,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
