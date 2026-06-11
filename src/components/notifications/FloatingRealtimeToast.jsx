import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const typeIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const typeColors = {
  success: 'from-primary/20 to-primary/5 border-primary/30 text-primary',
  warning: 'from-yellow-400/20 to-yellow-400/5 border-yellow-400/30 text-yellow-400',
  error: 'from-red-400/20 to-red-400/5 border-red-400/30 text-red-400',
  info: 'from-secondary/20 to-secondary/5 border-secondary/30 text-secondary',
};

const FloatingRealtimeToast = ({ toasts = [], onDismiss }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = typeIcons[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className={`p-4 rounded-xl bg-gradient-to-r ${typeColors[toast.type]} border backdrop-blur-md shadow-lg`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{toast.title}</p>
                  <p className="text-xs opacity-80 mt-0.5">{toast.message}</p>
                </div>
                <button onClick={() => onDismiss?.(toast.id)} className="p-0.5 rounded hover:bg-white/10">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default FloatingRealtimeToast;
