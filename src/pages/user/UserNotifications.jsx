import { useState } from 'react';
import { Clock, Package, Info as InfoIcon, AlertCircle, Eye, Inbox, BarChart3 } from 'lucide-react';
import { mockNotifications } from '../../mock/userData';
import NotificationLayout from '../../components/notifications/NotificationLayout';

const typeConfig = {
  reservation: { icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-500/20', label: 'Reservation' },
  reminder: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-500/20', label: 'Reminder' },
  alert: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', ring: 'ring-red-500/20', label: 'Alert' },
  system: { icon: InfoIcon, color: 'text-slate-600', bg: 'bg-slate-50', ring: 'ring-slate-500/20', label: 'System' },
};

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'read', label: 'Read' },
];

const userSettingsItems = [
  { label: 'Reservations', desc: 'Your medication reservation updates', key: 'reservation', icon: Package, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Reminders', desc: 'Medication and pickup reminders', key: 'reminder', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Alerts', desc: 'Important notifications', key: 'alert', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'System', desc: 'Platform updates and announcements', key: 'system', icon: InfoIcon, color: 'text-slate-500', bg: 'bg-slate-50' },
];

const UserNotifications = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filtered = notifications.filter((n) => {
    if (filter === 'unread' && n.read) return false;
    if (filter === 'read' && !n.read) return false;
    if (searchQuery && !n.title?.toLowerCase().includes(searchQuery.toLowerCase()) && !n.message?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismissNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const mapped = filtered.map((n) => ({
    id: n.id, type: n.type, title: n.title, description: n.message, time: n.time, isUnread: !n.read,
  }));

  const statsCards = [
    { label: 'Total', value: notifications.length, icon: Inbox, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
    { label: 'Unread', value: unreadCount, icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Today', value: notifications.filter((n) => n.time?.includes('hour') || n.time?.includes('min')).length, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Types', value: 4, icon: BarChart3, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <NotificationLayout
      title="Notifications"
      subtitle="Your activity and updates"
      statsCards={statsCards}
      filterTabs={filterTabs}
      activeFilter={filter}
      onFilterChange={setFilter}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      unreadCount={unreadCount}
      onMarkAllRead={markAllRead}
      typeConfig={typeConfig}
      notifications={mapped}
      onDismiss={dismissNotification}
      settingsItems={userSettingsItems}
    />
  );
};

export default UserNotifications;
