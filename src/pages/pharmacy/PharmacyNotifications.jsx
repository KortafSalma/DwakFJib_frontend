import { useState } from 'react';
import { ShoppingCart, Truck, Package, Info as InfoIcon, Eye, Inbox, BarChart3 } from 'lucide-react';
import NotificationLayout from '../../components/notifications/NotificationLayout';

const initialData = [
  { id: 1, type: 'reservation', title: 'New Reservation', message: 'Amoxicillin 500mg reserved by John Doe', time: '2 min ago', read: false },
  { id: 2, type: 'stock', title: 'Low Stock Alert', message: 'Metformin 850mg below reorder threshold', time: '15 min ago', read: false },
  { id: 3, type: 'delivery', title: 'Shipment Arriving', message: 'SHP-004 expected within 30 minutes', time: '1 hour ago', read: false },
  { id: 4, type: 'system', title: 'System Update', message: 'Pharmacy portal v2.4.1 deployed successfully', time: '2 hours ago', read: true },
  { id: 5, type: 'reservation', title: 'Pickup Completed', message: 'Ibuprofen 400mg picked up by Sarah Smith', time: '4 hours ago', read: true },
  { id: 6, type: 'delivery', title: 'Delivery Confirmed', message: 'SHP-002 delivered to HealthPlus Pharmacy', time: '6 hours ago', read: true },
  { id: 7, type: 'stock', title: 'Order Received', message: 'New shipment received: +200 units Lisinopril', time: '8 hours ago', read: true },
  { id: 8, type: 'reservation', title: 'Cancellation', message: 'Omeprazole 20mg reservation cancelled by user', time: '1 day ago', read: true },
];

const typeConfig = {
  reservation: { icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-500/20', label: 'Reservation' },
  delivery: { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-500/20', label: 'Delivery' },
  stock: { icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-500/20', label: 'Stock' },
  system: { icon: InfoIcon, color: 'text-slate-600', bg: 'bg-slate-50', ring: 'ring-slate-500/20', label: 'System' },
};

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'reservation', label: 'Reservations' },
  { key: 'delivery', label: 'Deliveries' },
  { key: 'stock', label: 'Stock' },
  { key: 'system', label: 'System' },
];

const pharmacySettingsItems = [
  { label: 'Reservations', desc: 'New reservations and pickups', key: 'reservation', icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Deliveries', desc: 'Incoming shipments and deliveries', key: 'delivery', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Stock', desc: 'Inventory levels and reorder alerts', key: 'stock', icon: Package, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'System', desc: 'System updates and maintenance', key: 'system', icon: InfoIcon, color: 'text-slate-500', bg: 'bg-slate-50' },
];

const PharmacyNotifications = () => {
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
    { label: 'Reservations', value: notifications.filter((n) => n.type === 'reservation').length, icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Stock', value: notifications.filter((n) => n.type === 'stock').length, icon: BarChart3, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <NotificationLayout
      title="Notifications"
      subtitle="Pharmacy updates and alerts"
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
      settingsItems={pharmacySettingsItems}
    />
  );
};

export default PharmacyNotifications;
