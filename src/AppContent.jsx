import OfflineBanner from './components/common/OfflineBanner';
import InstallPWA from './components/common/InstallPWA';
import SessionExpiredModal from './components/common/SessionExpiredModal';
import ToastProvider from './components/common/ToastProvider';
import AppRouter from './routes/AppRouter';
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

export default AppContent;
