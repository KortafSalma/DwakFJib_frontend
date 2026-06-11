import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ShoppingCart, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const AuthContinuationModal = ({ isOpen, onContinue, onDismiss, pendingAction }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md"
            >
              <div className="bg-card/80 backdrop-blur-xl border border-primary/10 rounded-3xl p-8 text-center shadow-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, delay: 0.1 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10 text-primary" />
                </motion.div>

                <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
                <p className="text-contrast-secondary text-sm mb-6">
                  Your account is ready. Continue where you left off.
                </p>

                {pendingAction?.type === 'reservation' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      <div className="text-left">
                        <p className="text-sm font-medium">
                          {pendingAction.data?.medicationName || 'Medication'} reservation
                        </p>
                        <p className="text-xs text-contrast-secondary">
                          {pendingAction.data?.pharmacyName || 'Pharmacy'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={onContinue}
                    className="w-full"
                    icon={ArrowRight}
                  >
                    Continue Reservation
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onDismiss}
                    className="w-full"
                  >
                    Go to Dashboard
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-[11px] text-contrast-muted">
                    You can access everything from your dashboard
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthContinuationModal;
