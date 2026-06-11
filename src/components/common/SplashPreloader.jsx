import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingRing = ({ progress }) => {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="relative w-24 h-24">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#E2E8F0"
          strokeWidth="3"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="#14B8A6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          initial={false}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-sm font-semibold tracking-tight"
          style={{ color: '#14B8A6' }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

const DwakFJibLogo = () => (
  <svg
    width="72"
    height="72"
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="36" cy="36" r="36" fill="#14B8A6" />
    <rect
      x="30"
      y="14"
      width="12"
      height="44"
      rx="4"
      fill="white"
    />
    <rect
      x="14"
      y="30"
      width="44"
      height="12"
      rx="4"
      fill="white"
    />
    <circle cx="36" cy="36" r="28" fill="#14B8A6" />
    <rect
      x="32"
      y="18"
      width="8"
      height="36"
      rx="3"
      fill="white"
    />
    <rect
      x="18"
      y="32"
      width="36"
      height="8"
      rx="3"
      fill="white"
    />
  </svg>
);

const SplashPreloader = ({ onFinish, minDuration = 3000 }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const inc = prev < 50 ? 2.5 : 1.2;
        return Math.min(prev + inc + Math.random() * 0.8, 100);
      });
    }, 100);

    const finishTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setPhase('fadeout'), 350);
      setTimeout(() => setShow(false), 1000);
      setTimeout(() => onFinish?.(), 1100);
    }, minDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimer);
    };
  }, [minDuration, onFinish]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-elevated">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 50% 45%, rgba(20,184,166,0.06) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="flex flex-col items-center gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <DwakFJibLogo />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold tracking-[0.15em] mt-2"
          style={{ color: '#14B8A6', fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          DWAKFJIB
        </motion.h1>

        <motion.p
          className="text-sm text-contrast-muted font-normal tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Connecting Pharmacies, Distributors & Patients
        </motion.p>
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <LoadingRing progress={progress} />
      </motion.div>

      <motion.p
        className="mt-6 text-xs text-contrast-muted/60 font-normal tracking-[0.1em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.6 }}
      >
        Initializing Healthcare Ecosystem
      </motion.p>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#14B8A6' }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#14B8A6', opacity: 0.5 }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#14B8A6', opacity: 0.2 }}
          />
        </div>
      </motion.div>

      {phase === 'fadeout' && (
        <motion.div
          className="absolute inset-0 bg-elevated z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
};

export default SplashPreloader;
