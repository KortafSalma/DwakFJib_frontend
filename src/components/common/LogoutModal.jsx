import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const LogoutModal = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const [confirming, setConfirming] = useState(false);

  const handleLogout = async () => {
    setConfirming(true);
    await logout();
    window.location.href = '/login';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="w-14 h-14 mx-auto rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-4"
                >
                  <AlertTriangle className="w-7 h-7 text-yellow-400" />
                </motion.div>

                <h3 className="text-lg font-semibold text-contrast-primary mb-1">Sign Out</h3>
                <p className="text-sm text-contrast-secondary mb-6">
                  Are you sure you want to sign out? You'll need to sign in again to access your account.
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onClose}
                    disabled={confirming}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-1"
                    onClick={handleLogout}
                    loading={confirming}
                    icon={LogOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
