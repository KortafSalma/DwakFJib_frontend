import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Package, ShoppingCart, Truck, MessageSquare, Info, CheckCircle } from 'lucide-react';

const priorityConfig = {
  LOW: { color: 'text-contrast-secondary', bg: 'bg-gray-400/10', border: 'border-gray-400/20', dot: 'bg-gray-400' },
  MEDIUM: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', dot: 'bg-yellow-400' },
  HIGH: { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', dot: 'bg-orange-400' },
  CRITICAL: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', dot: 'bg-red-400' },
};

const typeIcons = {
  RESERVATION: ShoppingCart,
  DELIVERY: Truck,
  STOCK: Package,
  SYSTEM: Info,
  EMERGENCY: AlertTriangle,
  MESSAGE: MessageSquare,
};

const NotificationCard = ({ notification, onMarkRead }) => {
  const priority = priorityConfig[notification.priority] || priorityConfig.LOW;
  const TypeIcon = typeIcons[notification.type] || Bell;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 2 }}
      onClick={() => onMarkRead?.(notification.id)}
      className={`p-3 rounded-lg cursor-pointer transition-all ${
        notification.read
          ? 'bg-dark/20 hover:bg-dark/30'
          : `bg-card/60 backdrop-blur-md ${priority.border}`
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${priority.bg}`}>
          <TypeIcon className={`w-4 h-4 ${priority.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`text-sm truncate ${notification.read ? 'text-contrast-secondary' : 'font-medium'}`}>
              {notification.title}
            </h4>
            <span className="text-[10px] text-contrast-muted flex-shrink-0">{notification.time}</span>
          </div>
          <p className="text-xs text-contrast-muted mt-0.5 line-clamp-2">{notification.message}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`text-[10px] font-semibold ${priority.color}`}>{notification.priority}</span>
            {!notification.read && (
              <span className="flex items-center gap-1 text-[10px] text-primary">
                <CheckCircle className="w-3 h-3" /> Mark read
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationCard;
