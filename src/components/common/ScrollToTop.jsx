import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;

    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el && lenis) {
        lenis.scrollTo(el, { offset: 0, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        done.current = true;
        return;
      }
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    done.current = true;
  }, [pathname, hash, lenis]);

  useEffect(() => {
    done.current = false;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
