import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const SystemAlertBanner = ({ alert, onDismiss }) => {
  if (!alert) return null;

  const severityColors = {
    CRITICAL: 'from-red-500/20 to-red-600/10 border-red-500/30',
    HIGH: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
    MEDIUM: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    LOW: 'from-gray-500/20 to-gray-600/10 border-gray-500/30',
  };

  const severityText = {
    CRITICAL: 'text-red-400',
    HIGH: 'text-orange-400',
    MEDIUM: 'text-yellow-400',
    LOW: 'text-contrast-secondary',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${severityColors[alert.priority]} border p-4`}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className={`w-5 h-5 ${severityText[alert.priority]}`} />
          </motion.div>
          <div className="flex-1">
            <p className={`text-sm font-bold ${severityText[alert.priority]}`}>{alert.title}</p>
            <p className="text-xs text-contrast-secondary">{alert.message}</p>
          </div>
          {onDismiss && (
            <button onClick={onDismiss} className="p-1 rounded hover:bg-white/10 transition-all">
              <X className="w-4 h-4 text-contrast-muted" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SystemAlertBanner;
