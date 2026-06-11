import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import NotificationCard from './NotificationCard';

const NotificationPanel = ({ notifications = [], isOpen, onClose, onMarkRead, onMarkAllRead }) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-12 w-96 max-h-[500px] rounded-xl bg-card/95 backdrop-blur-md border border-primary/10 shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button onClick={onMarkAllRead} className="text-[10px] text-primary hover:underline">
                    Mark all read
                  </button>
                )}
                <button onClick={onClose} className="p-1 rounded hover:bg-white/5">
                  <X className="w-4 h-4 text-contrast-muted" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[400px] p-2 space-y-1">
              {notifications.length === 0 ? (
                <div className="py-8 text-center">
                  <Bell className="w-8 h-8 text-contrast-muted mx-auto mb-2" />
                  <p className="text-sm text-contrast-muted">No notifications</p>
                </div>
              ) : (
                notifications.slice(0, 10).map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkRead={onMarkRead}
                    compact
                  />
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
