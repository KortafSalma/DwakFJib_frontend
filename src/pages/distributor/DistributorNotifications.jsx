import { useState } from 'react';
import { Truck, Package, Info as InfoIcon, AlertTriangle, Eye, Inbox, BarChart3 } from 'lucide-react';
import NotificationLayout from '../../components/notifications/NotificationLayout';

const initialData = [
  { id: 1, type: 'delivery', title: 'New Delivery Assignment', message: 'SHP-005 assigned to your route - 15 items', time: '5 min ago', read: false },
  { id: 2, type: 'stock', title: 'Inventory Update', message: 'Central warehouse received 500 units Metformin', time: '20 min ago', read: false },
  { id: 3, type: 'system', title: 'Route Optimized', message: 'Delivery route optimized - ETA reduced by 12%', time: '1 hour ago', read: false },
  { id: 4, type: 'delivery', title: 'Delivery Completed', message: 'SHP-002 delivered to GreenCross Pharmacy', time: '3 hours ago', read: true },
  { id: 5, type: 'alert', title: 'Delay Warning', message: 'Traffic reported on I-95 near distribution center', time: '4 hours ago', read: true },
  { id: 6, type: 'stock', title: 'Restock Request', message: 'HealthPlus Pharmacy requesting 200 units Amoxicillin', time: '6 hours ago', read: true },
  { id: 7, type: 'system', title: 'Fleet Update', message: 'Vehicle VH-003 maintenance completed', time: '10 hours ago', read: true },
  { id: 8, type: 'delivery', title: 'Proof of Delivery', message: 'SHP-001 signed by MediCare Center staff', time: '1 day ago', read: true },
];

const typeConfig = {
  delivery: { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-500/20', label: 'Delivery' },
  stock: { icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-500/20', label: 'Inventory' },
  system: { icon: InfoIcon, color: 'text-slate-600', bg: 'bg-slate-50', ring: 'ring-slate-500/20', label: 'System' },
  alert: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', ring: 'ring-red-500/20', label: 'Alert' },
};

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'delivery', label: 'Deliveries' },
  { key: 'stock', label: 'Inventory' },
  { key: 'alert', label: 'Alerts' },
  { key: 'system', label: 'System' },
];

const distributorSettingsItems = [
  { label: 'Deliveries', desc: 'New delivery assignments and status updates', key: 'delivery', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Inventory', desc: 'Stock updates and restock requests', key: 'stock', icon: Package, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Alerts', desc: 'Important warnings and delays', key: 'alert', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'System', desc: 'System updates and fleet management', key: 'system', icon: InfoIcon, color: 'text-slate-500', bg: 'bg-slate-50' },
];

const DistributorNotifications = () => {
  const [notifications, setNotifications] = useState(initialData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (activeFilter !== 'all' && n.type !== activeFilter) return false;
    if (searchQuery && !n.title?.toLowerCase().includes(searchQuery.toLowerCase()) && !n.message?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismissNotification = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const mapped = filtered.map((n) => ({
    id: n.id, type: n.type, title: n.title, description: n.message, time: n.time, isUnread: !n.read,
  }));

  const statsCards = [
    { label: 'Total', value: notifications.length, icon: Inbox, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
    { label: 'Unread', value: unreadCount, icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Active', value: notifications.filter((n) => n.type === 'delivery' && !n.read).length, icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Alerts', value: notifications.filter((n) => n.type === 'alert').length, icon: BarChart3, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <NotificationLayout
      title="Notifications"
      subtitle="Delivery updates and alerts"
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
      settingsItems={distributorSettingsItems}
    />
  );
};

export default DistributorNotifications;
