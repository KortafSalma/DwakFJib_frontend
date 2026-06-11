import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, ArrowUpRight, Wifi, BarChart3, Zap, Users, TrendingUp } from 'lucide-react';
import { mockActivityFeed } from '../../mock/notificationData';

const typeFilters = [
  { key: 'all', label: 'All Activity' },
  { key: 'reservation', label: 'Reservations' },
  { key: 'delivery', label: 'Deliveries' },
  { key: 'stock', label: 'Stock' },
  { key: 'system', label: 'System' },
];

const typeStyles = {
  reservation: { dot: 'bg-emerald-500', line: 'bg-emerald-200', bg: 'bg-emerald-50', ring: 'ring-emerald-500/20', label: 'Reservation' },
  delivery: { dot: 'bg-blue-500', line: 'bg-blue-200', bg: 'bg-blue-50', ring: 'ring-blue-500/20', label: 'Delivery' },
  stock: { dot: 'bg-amber-500', line: 'bg-amber-200', bg: 'bg-amber-50', ring: 'ring-amber-500/20', label: 'Stock' },
  system: { dot: 'bg-slate-500', line: 'bg-slate-200', bg: 'bg-slate-50', ring: 'ring-slate-500/20', label: 'System' },
};

const ActivityFeed = () => {
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = typeFilter === 'all'
    ? mockActivityFeed
    : mockActivityFeed.filter((a) => a.type === typeFilter);

  const statsCards = [
    { label: 'Total Events', value: mockActivityFeed.length, icon: Activity, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
    { label: 'Active Sessions', value: 142, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Events/min', value: 28, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Health', value: '98.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0F766E] flex items-center justify-center shadow-lg shadow-[#14B8A6]/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Activity Feed</h1>
                <p className="text-sm text-slate-500 mt-0.5">Real-time system activity</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm">
            <span className="relative flex w-2.5 h-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <Wifi className="w-3 h-3" /> Live
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
          {typeFilters.map((tf) => (
            <button
              key={tf.key} onClick={() => setTypeFilter(tf.key)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                typeFilter === tf.key
                  ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white border border-slate-200 bg-white shadow-sm'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
          <div>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <h3 className="text-sm font-bold text-slate-700">Live Feed</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{filtered.length} activities</span>
                </div>
              </div>
              <div className="p-6">
                {filtered.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <Activity className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-sm font-semibold text-slate-600">No activities</p>
                    <p className="text-xs text-slate-400 mt-1">No activities match your filter.</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-slate-200 via-slate-200 to-transparent" />
                    <div className="space-y-0">
                      {filtered.map((activity, idx) => {
                        const style = typeStyles[activity.type] || typeStyles.system;
                        return (
                          <motion.div
                            key={activity.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }}
                            className="flex items-start gap-4 pb-7 last:pb-0 group relative"
                          >
                            <div className="relative z-10 flex-shrink-0 mt-0.5">
                              <div className={`w-[46px] h-[46px] rounded-2xl flex items-center justify-center shadow-sm border-2 border-white ${style.bg}`}>
                                <div className={`w-3 h-3 rounded-full ${style.dot}`} />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 pt-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="text-sm font-bold text-slate-800">{activity.action}</h4>
                                <span className="text-[10px] text-slate-400 flex-shrink-0 font-medium">{activity.time}</span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{activity.detail}</p>
                              <div className="flex items-center gap-2.5 mt-2">
                                <span className="text-[10px] text-slate-400 font-medium">{activity.user}</span>
                                <span className={`text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-lg ${style.bg} ${style.dot.replace('bg-', 'text-').replace('500', '600')}`}>
                                  {style.label}
                                </span>
                              </div>
                            </div>
                            <button className="p-1.5 rounded-xl text-slate-300 hover:text-slate-500 hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 self-start">
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-[#14B8A6]" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">Realtime Status</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Active Sessions', value: 142, change: '+12%' },
                  { label: 'Events/min', value: 28, change: '+5%' },
                  { label: 'Alerts', value: 3, change: '-2' },
                  { label: 'Health', value: '98.5%', change: '+0.2%' },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-2xl bg-slate-50 text-center hover:bg-slate-100 transition-all">
                    <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{stat.label}</p>
                    <p className={`text-[10px] font-bold mt-1 ${
                      stat.change.startsWith('+') ? 'text-emerald-600' : stat.change.startsWith('-') ? 'text-red-500' : 'text-slate-400'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-700">Recent History</h3>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  {mockActivityFeed.slice(0, 4).map((activity) => {
                    const style = typeStyles[activity.type] || typeStyles.system;
                    return (
                      <div key={activity.id} className="flex items-start gap-3 group hover:bg-slate-50 p-2 rounded-xl transition-all">
                        <div className={`w-2.5 h-2.5 rounded-full ${style.dot} mt-1.5 flex-shrink-0`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-700 truncate group-hover:text-slate-800 transition-colors">{activity.action}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
