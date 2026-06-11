import { motion } from 'framer-motion';
import { LogIn, Sparkles } from 'lucide-react';

const SmartLoginPrompt = ({ onAction, compact = false, message }) => {
  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAction}
        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
      >
        <LogIn className="w-4 h-4" />
        Sign in to continue
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 via-dark to-secondary/5 border border-primary/10 p-4 sm:p-5"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">Account Required</span>
          </div>
          <p className="text-sm text-contrast-secondary">
            {message || 'Create a free account to unlock all features including reservations, favorites, and tracking.'}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-dark text-sm font-medium shadow-glow whitespace-nowrap"
        >
          <LogIn className="w-4 h-4" />
          Sign In
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SmartLoginPrompt;
