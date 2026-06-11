import { motion } from 'framer-motion';
import { Bell, AlertCircle, CheckCircle, Package, Info } from 'lucide-react';

const typeConfig = {
  reservation: { icon: Package, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  reminder: { icon: Bell, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  alert: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
  system: { icon: Info, color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
};

const NotificationCard = ({ notification, onMarkRead }) => {
  const config = typeConfig[notification.type] || typeConfig.system;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 2 }}
      onClick={() => onMarkRead?.(notification.id)}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        notification.read
          ? 'bg-dark/20 border-primary/5'
          : `bg-card/60 backdrop-blur-md ${config.border}`
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg}`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-medium">{notification.title}</h4>
            <span className="text-[10px] text-contrast-muted flex-shrink-0">{notification.time}</span>
          </div>
          <p className="text-xs text-contrast-secondary mt-1">{notification.message}</p>
          {!notification.read && (
            <div className="mt-2 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-primary" />
              <span className="text-[10px] text-primary">Mark as read</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationCard;
