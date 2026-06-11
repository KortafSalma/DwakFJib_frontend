import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, LogIn, Clock } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const SessionExpiredModal = () => {
  const { sessionExpired, dismissSessionExpired } = useAuth();

  return (
    <AnimatePresence>
      {sessionExpired && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-card/95 backdrop-blur-xl border border-red-400/20 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-red-400/10 border border-red-400/20 flex items-center justify-center mb-4"
                >
                  <ShieldAlert className="w-8 h-8 text-red-400" />
                </motion.div>

                <h2 className="text-xl font-bold text-contrast-primary mb-2">Session Expired</h2>
                <p className="text-sm text-contrast-secondary mb-1">
                  Your session has timed out for security reasons.
                </p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-contrast-muted mb-6">
                  <Clock className="w-3 h-3" />
                  Sessions expire after 24 hours of inactivity
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={dismissSessionExpired}
                  >
                    Stay Here
                  </Button>
                  <a href="/login" className="flex-1">
                    <Button className="w-full" icon={LogIn}>
                      Sign In Again
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SessionExpiredModal;
