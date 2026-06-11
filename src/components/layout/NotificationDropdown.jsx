import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Trash2, ExternalLink } from 'lucide-react';
import { useUnreadNotifications, useMarkAsRead, useDeleteNotification, useNotificationStats } from '../../hooks';

const typeColors = {
  ALERT: 'bg-red-400/10 text-red-400 border-red-400/20',
  RESERVATION: 'bg-primary/10 text-primary border-primary/20',
  DELIVERY: 'bg-secondary/10 text-secondary border-secondary/20',
  ORDER: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  STOCK: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
  SYSTEM: 'bg-gray-400/10 text-gray-400 border-gray-400/20',
  MESSAGE: 'bg-violet-400/10 text-violet-400 border-violet-400/20',
};

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);

  const unreadOptions = useMemo(() => ({ autoFetch: open }), [open]);
  const statsOptions = useMemo(() => ({ autoFetch: open }), [open]);

  const { data: unreadData, refetch: refetchUnread } = useUnreadNotifications(unreadOptions);
  const { data: statsData } = useNotificationStats(statsOptions);
  const onMarkSuccess = useCallback(() => refetchUnread(), [refetchUnread]);
  const onDeleteSuccess = useCallback(() => refetchUnread(), [refetchUnread]);
  const { mutate: markAsRead } = useMarkAsRead({ onSuccess: onMarkSuccess });
  const { mutate: deleteNotification } = useDeleteNotification({ onSuccess: onDeleteSuccess });

  const notifications = (unreadData?.data || unreadData || []).slice(0, 5);
  const unreadCount = statsData?.unread || notifications.length;

  const handleMarkRead = (id) => {
    markAsRead(id);
  };

  const handleDelete = (id) => {
    deleteNotification(id);
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-lg flex items-center justify-center text-contrast-secondary hover:text-contrast-primary hover:bg-elevated transition-all"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full text-[10px] font-bold text-white flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="absolute right-0 top-full mt-2 w-80 bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-3 border-b border-white/10">
                <h3 className="text-sm font-semibold text-contrast-primary">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-primary/10 text-primary rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-contrast-muted text-sm">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 border-b border-subtle hover:bg-elevated transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-primary" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-contrast-primary truncate">{notif.title}</p>
                            <span
                              className={`px-1.5 py-0.5 text-[9px] font-semibold rounded border ${typeColors[notif.type] || typeColors.SYSTEM}`}
                            >
                              {notif.type}
                            </span>
                          </div>
                          <p className="text-xs text-contrast-secondary mt-0.5 truncate">{notif.message}</p>
                          <p className="text-[10px] text-contrast-muted mt-1">{formatTime(notif.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 ml-5">
                        <button
                          onClick={() => handleMarkRead(notif.id)}
                          className="p-1 rounded text-contrast-muted hover:text-primary hover:bg-primary/10 transition-all"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(notif.id)}
                          className="p-1 rounded text-contrast-muted hover:text-red-400 hover:bg-red-400/10 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <button className="p-1 rounded text-contrast-muted hover:text-contrast-primary hover:bg-elevated transition-all ml-auto">
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-white/10">
                <a
                  href="/notifications"
                  className="w-full text-center text-xs text-primary hover:underline py-1 block"
                  onClick={() => setOpen(false)}
                >
                  View all notifications
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
