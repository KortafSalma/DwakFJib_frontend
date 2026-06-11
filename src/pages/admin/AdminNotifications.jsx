import { useState } from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle, Eye, Inbox, BarChart3 } from 'lucide-react';
import NotificationLayout from '../../components/notifications/NotificationLayout';

const initialNotifications = [
  { id: 1, type: 'info', title: 'New pharmacy registered', desc: 'MedPlus NYC has submitted for approval', time: '5m ago', unread: true },
  { id: 2, type: 'warning', title: 'Low stock alert', desc: '3 pharmacies have critically low inventory levels', time: '12m ago', unread: true },
  { id: 3, type: 'success', title: 'Distributor approved', desc: 'Pulse Logistics has been verified and activated', time: '1h ago', unread: true },
  { id: 4, type: 'info', title: 'System backup completed', desc: 'Daily backup saved successfully (2.4 GB)', time: '2h ago', unread: false },
  { id: 5, type: 'error', title: 'Security alert', desc: 'Unusual login attempt from IP 185.23.45.67', time: '3h ago', unread: true },
  { id: 6, type: 'success', title: 'Monthly report ready', desc: 'May 2026 analytics report is available for download', time: '5h ago', unread: false },
  { id: 7, type: 'info', title: 'New distributor application', desc: 'MedTrans Solutions has submitted documents', time: '8h ago', unread: false },
  { id: 8, type: 'warning', title: 'Payment failed', desc: 'Pharmacy NYC payment of 1,250 DH failed - retrying', time: '12h ago', unread: false },
  { id: 9, type: 'info', title: 'User milestone', desc: 'Platform surpassed 10,000 registered users', time: '1d ago', unread: false },
  { id: 10, type: 'success', title: 'Order milestone', desc: '5,000th order processed via the platform', time: '2d ago', unread: false },
];

const typeConfig = {
  info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-500/20', label: 'Info' },
  warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-500/20', label: 'Warning' },
  error: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', ring: 'ring-red-500/20', label: 'Error' },
  success: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-500/20', label: 'Success' },
};

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'info', label: 'Info' },
  { key: 'warning', label: 'Warning' },
  { key: 'error', label: 'Error' },
  { key: 'success', label: 'Success' },
];

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filtered = notifications.filter((n) => {
    if (activeFilter !== 'all' && n.type !== activeFilter) return false;
    if (searchQuery && !n.title?.toLowerCase().includes(searchQuery.toLowerCase()) && !n.desc?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  const dismissNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const mapped = filtered.map((n) => ({
    id: n.id, type: n.type, title: n.title, description: n.desc, time: n.time, isUnread: n.unread,
  }));

  const statsCards = [
    { label: 'Total', value: notifications.length, icon: Inbox, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
    { label: 'Unread', value: unreadCount, icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Alerts', value: notifications.filter((n) => n.type === 'error' || n.type === 'warning').length, icon: BarChart3, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Types', value: 4, icon: BarChart3, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <NotificationLayout
      title="Notifications"
      subtitle="Stay updated with platform activity"
      statsCards={statsCards}
      filterTabs={filterTabs}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      unreadCount={unreadCount}
      onMarkAllRead={markAllRead}
      typeConfig={typeConfig}
      notifications={mapped}
      onDismiss={dismissNotification}
    />
  );
};

export default AdminNotifications;
