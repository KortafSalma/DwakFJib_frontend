import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, UserPlus } from 'lucide-react';

const FloatingGuestCTA = ({ onSignIn, delay = 3000 }) => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          className="fixed bottom-6 left-6 z-40 max-w-xs"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 shadow-2xl">
              <button
                onClick={() => setDismissed(true)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border border-primary/20 flex items-center justify-center text-contrast-secondary hover:text-contrast-primary transition-colors"
              >
                <X className="w-3 h-3" />
              </button>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Sparkles className="w-3 h-3 text-secondary" />
                    <span className="text-xs font-medium text-gradient">Join DwakFJib</span>
                  </div>
                  <p className="text-xs text-contrast-secondary leading-relaxed">
                    Create a free account to reserve medications and track orders
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onSignIn}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Get started
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingGuestCTA;
