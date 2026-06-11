import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, CheckCheck, Search, Settings, Clock, Calendar,
  AlertTriangle, ShoppingCart, Truck, Package, Info, MessageSquare,
  ShieldAlert, Trash2, ChevronRight, Filter, X,
  Eye, Inbox, BarChart3, ArrowUpRight
} from 'lucide-react';
import { useNotifications, useUnreadNotifications, useNotificationStats, useMarkAllAsRead, useMarkAsRead, useDeleteNotification } from '../../hooks';

const categories = [
  { key: 'all', label: 'All Notifications', icon: Bell, desc: 'Everything in one place' },
  { key: 'RESERVATION', label: 'Reservations', icon: ShoppingCart, desc: 'Orders and pickups' },
  { key: 'DELIVERY', label: 'Orders & Delivery', icon: Truck, desc: 'Shipping and tracking' },
  { key: 'STOCK', label: 'Inventory', icon: Package, desc: 'Stock levels and alerts' },
  { key: 'SYSTEM', label: 'System Updates', icon: Info, desc: 'Platform announcements' },
  { key: 'EMERGENCY', label: 'Security Alerts', icon: ShieldAlert, desc: 'Security warnings' },
  { key: 'MESSAGE', label: 'Messages', icon: MessageSquare, desc: 'Direct communications' },
];

const timeFilters = [
  { key: 'all', label: 'All Time', icon: Clock },
  { key: 'today', label: 'Today', icon: Calendar },
  { key: 'week', label: 'This Week', icon: BarChart3 },
  { key: 'month', label: 'This Month', icon: Filter },
];

const typeConfig = {
  RESERVATION: { icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-500/20', label: 'Reservation' },
  DELIVERY: { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-500/20', label: 'Delivery' },
  STOCK: { icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-500/20', label: 'Stock' },
  SYSTEM: { icon: Info, color: 'text-slate-600', bg: 'bg-slate-50', ring: 'ring-slate-500/20', label: 'System' },
  EMERGENCY: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', ring: 'ring-red-500/20', label: 'Security' },
  MESSAGE: { icon: MessageSquare, color: 'text-violet-600', bg: 'bg-violet-50', ring: 'ring-violet-500/20', label: 'Message' },
};

const NotificationsCenter = () => {
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');

  const { data: notificationsData, loading, refetch } = useNotifications(
    filter === 'unread' ? { unread: true } : filter !== 'all' ? { type: filter } : {},
    { autoFetch: true }
  );
  const { data: unreadData } = useUnreadNotifications({ autoFetch: false });
  const { data: statsData } = useNotificationStats();
  const { mutate: markAllRead, loading: markingAll } = useMarkAllAsRead({
    successMessage: 'All notifications marked as read',
    onSuccess: () => refetch(),
  });
  const { mutate: markAsRead } = useMarkAsRead({ onSuccess: () => refetch() });
  const { mutate: deleteNotification } = useDeleteNotification({ onSuccess: () => refetch() });

  const notifications = notificationsData?.data || notificationsData || [];
  const unreadCount = statsData?.unread || unreadData?.length || 0;
  const stats = statsData || {};

  const typeCounts = {
    all: stats.total || notifications.length,
    unread: unreadCount,
    RESERVATION: stats.by_type?.RESERVATION || notifications.filter((n) => n.type === 'RESERVATION').length,
    DELIVERY: stats.by_type?.DELIVERY || notifications.filter((n) => n.type === 'DELIVERY').length,
    STOCK: stats.by_type?.STOCK || notifications.filter((n) => n.type === 'STOCK').length,
    EMERGENCY: stats.by_type?.EMERGENCY || stats.by_type?.ALERT || notifications.filter((n) => n.type === 'EMERGENCY').length,
  };

  const filtered = notifications.filter((n) => {
    if (category !== 'all' && n.type !== category) return false;
    if (searchQuery && !n.title?.toLowerCase().includes(searchQuery.toLowerCase()) && !n.message?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filter === 'unread' && n.read) return false;
    return true;
  });

  const groupedByTime = filtered.reduce((groups, n) => {
    let group = 'Older';
    if (n.time?.includes('min') || n.time?.includes('now')) group = 'Just Now';
    else if (n.time?.includes('hour') || n.time?.includes('hr')) group = 'Today';
    else if (n.time?.includes('day') || n.time?.includes('d ago') || n.time?.includes('yesterday')) group = 'Yesterday';
    (groups[group] = groups[group] || []).push(n);
    return groups;
  }, {});

  const timeGroupOrder = ['Just Now', 'Today', 'Yesterday', 'Older'];

  const handleMarkRead = (id) => markAsRead(id);
  const handleMarkAllRead = () => markAllRead();
  const handleDelete = (id) => deleteNotification(id);

  const CategoryIcon = categories.find((c) => c.key === category)?.icon || Bell;

  const statsCards = [
    { label: 'Total', value: stats.total || notifications.length, icon: Inbox, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
    { label: 'Unread', value: unreadCount, icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Today', value: filtered.filter((n) => n.time?.includes('min') || n.time?.includes('now') || n.time?.includes('hour')).length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Categories', value: categories.length - 1, icon: BarChart3, color: 'text-violet-600', bg: 'bg-violet-50' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0F766E] flex items-center justify-center shadow-lg shadow-[#14B8A6]/20">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
                <p className="text-sm text-slate-500 mt-0.5">Stay updated with platform activity</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                disabled={markingAll}
                className="h-10 px-5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-[11px] font-semibold text-white hover:shadow-lg hover:shadow-[#14B8A6]/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
            <button
              onClick={() => setShowSettings(true)}
              className="lg:hidden h-10 w-10 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-sm transition-all"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {statsCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
                </div>
                <ArrowUpRight className={`w-3.5 h-3.5 ${stat.color} opacity-60`} />
              </div>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <h2 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Categories</h2>
                <nav className="space-y-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const count = typeCounts[cat.key] || 0;
                    const isActive = category === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setCategory(cat.key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left group ${
                          isActive
                            ? 'bg-white text-[#14B8A6] shadow-md shadow-[#14B8A6]/5 border border-[#14B8A6]/20'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-white hover:shadow-sm border border-transparent'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                          isActive ? 'bg-[#14B8A6]/10' : 'bg-slate-50 group-hover:bg-slate-100'
                        }`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#14B8A6]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        </div>
                        <span className="flex-1">{cat.label}</span>
                        {count > 0 && (
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-[#14B8A6]/15 text-[#14B8A6]' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div>
                <h2 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">Time Period</h2>
                <div className="space-y-1">
                  {timeFilters.map((tf) => {
                    const Icon = tf.icon;
                    return (
                      <button
                        key={tf.key}
                        onClick={() => setTimeFilter(tf.key)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                          timeFilter === tf.key
                            ? 'bg-white text-[#14B8A6] shadow-sm border border-[#14B8A6]/20'
                            : 'text-slate-500 hover:text-slate-800 hover:bg-white hover:shadow-sm border border-transparent'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${timeFilter === tf.key ? 'text-[#14B8A6]' : 'text-slate-400'}`} />
                        {tf.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setShowSettings(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-all">
                  <Settings className="w-4 h-4 text-slate-400" />
                </div>
                Notification Settings
                <ChevronRight className="w-4 h-4 ml-auto text-slate-300" />
              </button>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all shadow-sm"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 lg:hidden">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setCategory(cat.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      category === cat.key
                        ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20 shadow-sm'
                        : 'text-slate-500 border border-slate-200 hover:bg-white bg-white shadow-sm'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 mb-5">
              {[
                { key: 'all', label: 'All' },
                { key: 'unread', label: 'Unread Only' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    filter === tab.key
                      ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-white border border-slate-200 bg-white shadow-sm'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <div className="ml-auto text-xs text-slate-400">
                {filtered.length} notification{filtered.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-6 space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start gap-4 animate-pulse">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-100 rounded-xl w-3/4" />
                        <div className="h-3 bg-slate-50 rounded-xl w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <CategoryIcon className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700">No notifications</h3>
                  <p className="text-sm text-slate-400 mt-1.5 max-w-xs mx-auto">
                    {searchQuery ? 'No results match your search. Try different keywords.' : 'You\'re all caught up! Check back later for new updates.'}
                  </p>
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="mt-5 px-5 py-2.5 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] text-sm font-semibold hover:bg-[#14B8A6]/20 transition-all inline-flex items-center gap-2">
                      <X className="w-3.5 h-3.5" /> Clear search
                    </button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {timeGroupOrder.map((group) => {
                    const items = groupedByTime[group];
                    if (!items?.length) return null;
                    return (
                      <div key={group}>
                        <div className="px-6 pt-5 pb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-slate-100 to-transparent" />
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2">{group}</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-slate-100 to-transparent" />
                          </div>
                        </div>
                        <AnimatePresence>
                          {items.map((notification, idx) => {
                            const config = typeConfig[notification.type] || typeConfig.SYSTEM;
                            const Icon = config.icon;
                            const isUnread = !notification.read;
                            return (
                              <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                transition={{ delay: idx * 0.02 }}
                                onClick={() => { if (isUnread) handleMarkRead(notification.id); }}
                                className={`flex items-start gap-4 px-6 py-5 transition-all cursor-pointer group relative ${
                                  isUnread
                                    ? 'bg-[#14B8A6]/[0.02] hover:bg-[#14B8A6]/[0.05]'
                                    : 'hover:bg-slate-50/80'
                                }`}
                              >
                                {isUnread && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#14B8A6] to-[#0F766E] rounded-r-full" />}
                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.bg} ring-1 ${config.ring}`}>
                                  <Icon className={`w-5 h-5 ${config.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <h4 className={`text-sm truncate ${isUnread ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>
                                        {notification.title}
                                      </h4>
                                      {isUnread && (
                                        <span className="w-2 h-2 rounded-full bg-[#14B8A6] flex-shrink-0 shadow-sm shadow-[#14B8A6]/30" />
                                      )}
                                    </div>
                                    <span className="text-[10px] text-slate-400 flex-shrink-0 whitespace-nowrap font-medium">{notification.time}</span>
                                  </div>
                                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{notification.message}</p>
                                  <div className="flex items-center gap-3 mt-2.5">
                                    {notification.type && (
                                      <span className={`text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-lg ${config.bg} ${config.color}`}>
                                        {config.label}
                                      </span>
                                    )}
                                    {notification.action && (
                                      <span className="text-[11px] font-semibold text-[#14B8A6] hover:text-[#0F766E] transition-colors inline-flex items-center gap-1">
                                        {notification.action} <ArrowUpRight className="w-3 h-3" />
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDelete(notification.id); }}
                                  className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 self-start"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 360 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 360 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-10">
                <div className="flex items-center justify-between p-6 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center">
                      <Settings className="w-4.5 h-4.5 text-[#14B8A6]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Notification Settings</h2>
                      <p className="text-xs text-slate-400">Manage your notification preferences</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">By Category</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Reservations', desc: 'Confirmations, reminders, and status changes', key: 'RESERVATION', icon: ShoppingCart, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                      { label: 'Orders & Delivery', desc: 'Order updates, shipping, delivery status', key: 'DELIVERY', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
                      { label: 'Inventory', desc: 'Stock levels, low stock warnings, restock alerts', key: 'STOCK', icon: Package, color: 'text-amber-500', bg: 'bg-amber-50' },
                      { label: 'System Updates', desc: 'Platform updates, maintenance notices, features', key: 'SYSTEM', icon: Info, color: 'text-slate-500', bg: 'bg-slate-50' },
                      { label: 'Security Alerts', desc: 'Suspicious activity, login alerts, warnings', key: 'EMERGENCY', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
                      { label: 'Messages', desc: 'Direct messages from pharmacies and staff', key: 'MESSAGE', icon: MessageSquare, color: 'text-violet-500', bg: 'bg-violet-50' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group">
                        <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-800 transition-colors">{item.label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-10 h-6 rounded-full bg-slate-200 peer-checked:bg-[#14B8A6] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-5 after:h-5 after:shadow-sm after:transition-all peer-checked:after:translate-x-4 transition-all" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Delivery Channels</h3>
                  <div className="space-y-3 bg-slate-50 rounded-2xl p-4">
                    {[
                      { label: 'Push notifications', desc: 'Real-time alerts on your device', default: true },
                      { label: 'Email digest', desc: 'Daily or weekly email summary', default: true },
                      { label: 'SMS alerts', desc: 'Critical alerts via text message', default: false },
                      { label: 'Sound alerts', desc: 'Play a sound for new notifications', default: false },
                    ].map((channel) => (
                      <label key={channel.label} className="flex items-center justify-between py-1">
                        <div>
                          <p className="text-sm font-medium text-slate-700">{channel.label}</p>
                          <p className="text-xs text-slate-400">{channel.desc}</p>
                        </div>
                        <div className="relative">
                          <input type="checkbox" defaultChecked={channel.default} className="sr-only peer" />
                          <div className="w-9 h-5 rounded-full bg-slate-200 peer-checked:bg-[#14B8A6] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:shadow-sm after:transition-all peer-checked:after:translate-x-4 transition-all" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationsCenter;
