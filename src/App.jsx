import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { GuestProvider } from './context/GuestContext';
import { ThemeProvider } from './context/ThemeContext';
import { DemoProvider } from './context/DemoContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import SplashPreloader from './components/common/SplashPreloader';
import AppContent from './AppContent';

function App() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashPreloader onFinish={() => setSplashDone(true)} />;
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <DemoProvider>
          <AuthProvider>
            <GuestProvider>
              <AppContent />
            </GuestProvider>
          </AuthProvider>
        </DemoProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
