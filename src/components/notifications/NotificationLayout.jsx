import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Settings, X, Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const defaultTypeConfig = {
  info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50', ring: 'ring-blue-500/20', label: 'Info' },
  warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', ring: 'ring-amber-500/20', label: 'Warning' },
  error: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', ring: 'ring-red-500/20', label: 'Error' },
  success: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'ring-emerald-500/20', label: 'Success' },
};

const defaultSettingsItems = [
  { label: 'Info', desc: 'General platform updates and milestones', key: 'info', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Warnings', desc: 'Issues requiring attention', key: 'warning', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Errors', desc: 'Critical system failures and alerts', key: 'error', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Success', desc: 'Completed operations and achievements', key: 'success', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const NotificationLayout = ({
  title = 'Notifications',
  subtitle = 'Stay updated',
  statsCards = [],
  filterTabs = [],
  activeFilter = 'all',
  onFilterChange,
  searchQuery = '',
  onSearchChange,
  unreadCount = 0,
  onMarkAllRead,
  children,
  typeConfig: customTypeConfig,
  settingsItems: customSettingsItems,
  notifications,
  onDismiss,
  getNotifConfig,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0F766E] flex items-center justify-center shadow-lg shadow-[#14B8A6]/20">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
                <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={onMarkAllRead} className="h-10 px-5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-[11px] font-semibold text-white hover:shadow-lg hover:shadow-[#14B8A6]/30 transition-all flex items-center gap-1.5">
                <CheckCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
            <button onClick={() => setShowSettings(true)} className="h-10 w-10 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-sm transition-all">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {statsCards.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className="w-4.5 h-4.5" />
                </div>
              </div>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative mb-5">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search notifications..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6] transition-all shadow-sm" />
        </div>

        {filterTabs.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {filterTabs.map((tab) => (
              <button key={tab.key} onClick={() => onFilterChange(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all capitalize ${
                  activeFilter === tab.key
                    ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white border border-slate-200 bg-white shadow-sm'
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {notifications ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {notifications.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <Bell className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-700">No notifications</h3>
                <p className="text-sm text-slate-400 mt-1.5">No notifications match your filter.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {notifications.map((n, i) => {
                  const config = (getNotifConfig ? getNotifConfig(n) : (customTypeConfig?.[n.type] || defaultTypeConfig.info));
                  const Icon = config.icon;
                  const isUnread = n.isUnread;
                  return (
                    <motion.div key={n.id} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                      className={`flex items-start gap-4 px-6 py-5 transition-all group relative ${
                        isUnread ? 'bg-[#14B8A6]/[0.02] hover:bg-[#14B8A6]/[0.05]' : 'hover:bg-slate-50/80'
                      }`}>
                      {isUnread && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#14B8A6] to-[#0F766E] rounded-r-full" />}
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.bg} ring-1 ${config.ring}`}>
                        <Icon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <h4 className={`text-sm truncate ${isUnread ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>{n.title}</h4>
                            {isUnread && <span className="w-2 h-2 rounded-full bg-[#14B8A6] flex-shrink-0 shadow-sm shadow-[#14B8A6]/30" />}
                          </div>
                          <span className="text-[10px] text-slate-400 flex-shrink-0 whitespace-nowrap font-medium">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{n.description}</p>
                        <span className={`text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-lg mt-2.5 inline-block ${config.bg} ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      {onDismiss && (
                        <button onClick={() => onDismiss(n.id)}
                          className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 self-start">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        ) : children}
      </div>

      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={() => setShowSettings(false)} />
            <motion.div initial={{ opacity: 0, x: 360 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 360 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
              <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-10">
                <div className="flex items-center justify-between p-6 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center">
                      <Settings className="w-4.5 h-4.5 text-[#14B8A6]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Notification Settings</h2>
                      <p className="text-xs text-slate-400">Manage your preferences</p>
                    </div>
                  </div>
                  <button onClick={() => setShowSettings(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Notification Types</h3>
                  <div className="space-y-2">
                    {(customSettingsItems || defaultSettingsItems).map((item) => (
                      <label key={item.key} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group">
                        <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                          <item.icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-700">{item.label}</p>
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NotificationLayout;
