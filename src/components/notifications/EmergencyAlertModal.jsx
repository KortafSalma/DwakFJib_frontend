import { motion } from 'framer-motion';
import { AlertTriangle, X, MapPin, Clock } from 'lucide-react';

const EmergencyAlertModal = ({ alert, onClose, onNavigate }) => {
  if (!alert) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md rounded-2xl bg-card/95 backdrop-blur-md border border-red-400/30 shadow-2xl overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-12 h-12 rounded-xl bg-red-400/20 border border-red-400/30 flex items-center justify-center"
              >
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </motion.div>
              <div>
                <h2 className="text-lg font-bold text-red-400">Emergency Alert</h2>
                <p className="text-xs text-contrast-muted">Critical medication notification</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5">
              <X className="w-5 h-5 text-contrast-muted" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-dark/30 border border-red-400/10 mb-4">
            <h3 className="text-sm font-bold mb-2">{alert.title}</h3>
            <p className="text-xs text-contrast-secondary">{alert.message}</p>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs text-contrast-secondary">
              <MapPin className="w-3.5 h-3.5" />
              <span>{alert.location || 'Wellness Hub - 3.5km away'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-contrast-secondary">
              <Clock className="w-3.5 h-3.5" />
              <span>{alert.time || 'Available now'}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-dark/50 border border-primary/10 text-sm font-medium hover:bg-dark/70 transition-all"
            >
              Dismiss
            </button>
            {onNavigate && (
              <button
                onClick={onNavigate}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-sm font-medium text-white hover:opacity-90 transition-all"
              >
                View Location
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmergencyAlertModal;
