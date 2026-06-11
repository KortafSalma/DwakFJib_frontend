import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthRequiredModal from '../components/guest/AuthRequiredModal';
import Loader from '../components/ui/Loader';

const ProtectedRoute = ({ children, actionType = 'dashboard', requireAuth = true }) => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const authSuccessRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!loading && !user && requireAuth && !authSuccessRef.current && !showAuthModal) {
      timerRef.current = setTimeout(() => setShowAuthModal(true), 100);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [loading, user, requireAuth, showAuthModal]);

  const handleAuthClose = (success) => {
    setShowAuthModal(false);
    if (success) {
      authSuccessRef.current = true;
    }
  };

  if (loading) {
    return <Loader fullScreen text="Verifying session..." />;
  }

  if (!user && requireAuth && !authSuccessRef.current) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader text="Authentication required..." />
          </div>
        </div>
        <AuthRequiredModal
          isOpen={showAuthModal}
          onClose={handleAuthClose}
          action={actionType}
        />
      </>
    );
  }

  if (!user && !requireAuth) {
    return children;
  }

  return children;
};

export default ProtectedRoute;
