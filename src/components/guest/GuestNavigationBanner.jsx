import { motion } from 'framer-motion';
import { Eye, X, Sparkles } from 'lucide-react';

const GuestNavigationBanner = ({ onDismiss, onSignIn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-r from-primary/5 via-dark to-secondary/5 border-b border-primary/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Eye className="w-4 h-4 text-primary hidden sm:block" />
          <Sparkles className="w-3 h-3 text-secondary sm:hidden" />
          <span className="text-contrast-secondary">
            <span className="hidden sm:inline">Browsing as guest — </span>
            <span className="text-primary font-medium">Create an account</span> to reserve medications and save favorites
          </span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSignIn}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 transition-all"
          >
            Sign In
          </motion.button>
          <button onClick={onDismiss} className="text-contrast-muted hover:text-contrast-primary transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GuestNavigationBanner;
