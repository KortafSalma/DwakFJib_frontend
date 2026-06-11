import { motion } from 'framer-motion';
import { AlertTriangle, Bell, Package, ShoppingCart, Truck, MessageSquare, Info } from 'lucide-react';

const priorityConfig = {
  LOW: { color: 'text-contrast-secondary', bg: 'bg-gray-400/10', border: 'border-gray-400/20', glow: '' },
  MEDIUM: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', glow: 'shadow-yellow-400/10' },
  HIGH: { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', glow: 'shadow-orange-400/10' },
  CRITICAL: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', glow: 'shadow-red-400/20' },
};

const typeIcons = {
  RESERVATION: ShoppingCart,
  DELIVERY: Truck,
  STOCK: Package,
  SYSTEM: Info,
  EMERGENCY: AlertTriangle,
  MESSAGE: MessageSquare,
};

const SmartAlertCard = ({ alert, onDismiss, onAction }) => {
  const priority = priorityConfig[alert.priority] || priorityConfig.LOW;
  const TypeIcon = typeIcons[alert.type] || Bell;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border ${priority.bg} ${priority.border} ${priority.glow} shadow-lg`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${priority.bg}`}>
          <TypeIcon className={`w-5 h-5 ${priority.color}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className={`text-sm font-bold ${priority.color}`}>{alert.title}</h4>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priority.bg} ${priority.color}`}>
              {alert.priority}
            </span>
          </div>
          <p className="text-xs text-contrast-secondary mt-1">{alert.message}</p>
          <div className="flex items-center gap-3 mt-3">
            {onAction && alert.action && (
              <button
                onClick={() => onAction?.(alert)}
                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all"
              >
                {alert.action}
              </button>
            )}
            {onDismiss && (
              <button
                onClick={() => onDismiss?.(alert.id)}
                className="text-[10px] text-contrast-muted hover:text-contrast-primary transition-colors"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SmartAlertCard;
