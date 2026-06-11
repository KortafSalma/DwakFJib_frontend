import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { GuestProvider } from './context/GuestContext';
import { ThemeProvider } from './context/ThemeContext';
import { DemoProvider } from './context/DemoContext';
import AppRouter from './routes/AppRouter';
import ToastProvider from './components/common/ToastProvider';
import ErrorBoundary from './components/common/ErrorBoundary';
import SessionExpiredModal from './components/common/SessionExpiredModal';
import SplashPreloader from './components/common/SplashPreloader';
import OfflineBanner from './components/common/OfflineBanner';
import InstallPWA from './components/common/InstallPWA';
import useOffline from './hooks/useOffline';

function AppContent() {
  const { isOnline, wasOffline } = useOffline();

  return (
    <>
      <OfflineBanner isOnline={isOnline} wasOffline={wasOffline} />
      <ToastProvider />
      <SessionExpiredModal />
      <InstallPWA />
      <AppRouter />
    </>
  );
}

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
