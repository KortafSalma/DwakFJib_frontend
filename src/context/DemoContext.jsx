import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DemoContext = createContext(null);

export function DemoProvider({ children }) {
  const [demoMode, setDemoMode] = useState(() => {
    const envDemo = import.meta.env.VITE_DEMO_MODE === 'true';
    const stored = localStorage.getItem('dwakfjib_demo_mode');
    return stored !== null ? stored === 'true' : envDemo;
  });

  const [demoDataLoaded, setDemoDataLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem('dwakfjib_demo_mode', demoMode);
    if (!demoMode) {
      setDemoDataLoaded(false);
    }
  }, [demoMode]);

  const toggleDemoMode = useCallback(() => {
    setDemoMode(prev => !prev);
  }, []);

  const enableDemoData = useCallback(() => {
    setDemoDataLoaded(true);
  }, []);

  const disableDemoData = useCallback(() => {
    setDemoDataLoaded(false);
  }, []);

  return (
    <DemoContext.Provider value={{
      demoMode,
      toggleDemoMode,
      demoDataLoaded,
      enableDemoData,
      disableDemoData
    }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error('useDemo must be used within DemoProvider');
  return ctx;
}
