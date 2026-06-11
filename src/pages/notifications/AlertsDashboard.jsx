import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, Bell, X, ChevronRight, Activity, BarChart3, ArrowUpRight, TrendingUp, Wifi } from 'lucide-react';
import { mockAlerts } from '../../mock/notificationData';

const priorityConfig = {
  CRITICAL: {
    icon: Shield, label: 'Critical', dot: 'bg-red-500', line: 'bg-red-100',
    bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700',
    badge: 'bg-red-500', accent: 'bg-red-500', ring: 'ring-red-500/20',
  },
  HIGH: {
    icon: AlertTriangle, label: 'High', dot: 'bg-orange-500', line: 'bg-orange-100',
    bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700',
    badge: 'bg-orange-500', accent: 'bg-orange-500', ring: 'ring-orange-500/20',
  },
  MEDIUM: {
    icon: Bell, label: 'Medium', dot: 'bg-amber-400', line: 'bg-amber-100',
    bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700',
    badge: 'bg-amber-500', accent: 'bg-amber-400', ring: 'ring-amber-500/20',
  },
  LOW: {
    icon: Bell, label: 'Low', dot: 'bg-slate-400', line: 'bg-slate-100',
    bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600',
    badge: 'bg-slate-400', accent: 'bg-slate-400', ring: 'ring-slate-500/20',
  },
};

const AlertsDashboard = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? alerts
    : filter === 'active'
    ? alerts.filter((a) => a.active)
    : alerts.filter((a) => a.priority === filter);

  const dismissAlert = (id) => setAlerts((prev) => prev.filter((a) => a.id !== id));

  const activeCount = alerts.filter((a) => a.active).length;

  const priorityCounts = {
    all: alerts.length,
    active: activeCount,
    CRITICAL: alerts.filter((a) => a.priority === 'CRITICAL').length,
    HIGH: alerts.filter((a) => a.priority === 'HIGH').length,
    MEDIUM: alerts.filter((a) => a.priority === 'MEDIUM').length,
  };

  const statsCards = [
    { label: 'Total', value: alerts.length, icon: Activity, color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: 'Active', value: activeCount, icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Critical', value: priorityCounts.CRITICAL, icon: Shield, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Health', value: '98.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Alerts Dashboard</h1>
                <p className="text-sm text-slate-500 mt-0.5">Monitor and manage system alerts</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-50 border border-red-200 shadow-sm">
            <span className="relative flex w-2.5 h-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
              <Wifi className="w-3 h-3" /> Monitoring
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {statsCards.map((stat, i) => (
            <motion.div
              key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
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

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {[
            { key: 'all', label: 'All Alerts' },
            { key: 'active', label: 'Active' },
            { key: 'CRITICAL', label: 'Critical' },
            { key: 'HIGH', label: 'High' },
            { key: 'MEDIUM', label: 'Medium' },
          ].map((tab) => (
            <button
              key={tab.key} onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                filter === tab.key
                  ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white border border-slate-200 bg-white shadow-sm'
              }`}
            >
              {tab.label}
              {priorityCounts[tab.key] > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  filter === tab.key ? 'bg-[#14B8A6]/20 text-[#14B8A6]' : 'bg-slate-100 text-slate-500'
                }`}>
                  {priorityCounts[tab.key]}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm py-20 text-center"
                >
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <Activity className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700">No alerts</h3>
                  <p className="text-sm text-slate-400 mt-1.5">No alerts match your current filter.</p>
                </motion.div>
              ) : (
                filtered.map((alert, idx) => {
                  const config = priorityConfig[alert.priority] || priorityConfig.LOW;
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={alert.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }} transition={{ delay: idx * 0.04 }}
                      className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all hover:shadow-md group ${
                        alert.active ? config.border : 'border-slate-200'
                      }`}
                    >
                      <div className="flex">
                        {alert.active && <div className={`w-1.5 flex-shrink-0 ${config.accent} rounded-r-full`} />}
                        <div className="flex-1 p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.bg} ring-1 ${config.ring}`}>
                              <Icon className={`w-5.5 h-5.5 ${config.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h3 className="text-sm font-bold text-slate-800">{alert.title}</h3>
                                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{alert.message}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-white ${config.badge}`}>
                                    {config.label}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 mt-3">
                                <span className="text-[10px] text-slate-400 font-medium">{alert.time}</span>
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{alert.type}</span>
                                {alert.active && (
                                  <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Active
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start p-5">
                          <button onClick={() => dismissAlert(alert.id)}
                            className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100">
                        <button className="text-xs font-bold text-[#14B8A6] hover:text-[#0F766E] transition-colors inline-flex items-center gap-1">
                          View Details <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 lg:mt-0 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">Alert Summary</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Critical', count: priorityCounts.CRITICAL, color: 'text-red-600', bg: 'bg-red-50', dot: 'bg-red-500' },
                  { label: 'High', count: priorityCounts.HIGH, color: 'text-orange-600', bg: 'bg-orange-50', dot: 'bg-orange-500' },
                  { label: 'Medium', count: priorityCounts.MEDIUM, color: 'text-amber-600', bg: 'bg-amber-50', dot: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center justify-between p-4 rounded-2xl ${item.bg} hover:shadow-sm transition-all`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.dot}`} />
                      <span className={`text-sm font-bold ${item.color}`}>{item.label}</span>
                    </div>
                    <span className={`text-lg font-bold ${item.color}`}>{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-[#14B8A6]" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">System Health</h3>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">Overall</span>
                <span className="text-xs font-bold text-emerald-600">98.5%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                <div className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] to-[#0F766E] transition-all" style={{ width: '98.5%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-3">Last checked: Just now</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertsDashboard;
