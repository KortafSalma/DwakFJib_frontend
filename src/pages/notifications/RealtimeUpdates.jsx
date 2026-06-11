import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Bell, AlertTriangle, X, Wifi, BarChart3, Users } from 'lucide-react';
import { mockActivityFeed, mockAlerts } from '../../mock/notificationData';

const RealtimeUpdates = () => {
  const [toasts, setToasts] = useState([]);
  const [emergencyAlert, setEmergencyAlert] = useState(null);
  const [systemAlert, setSystemAlert] = useState(mockAlerts.find((a) => a.priority === 'CRITICAL'));
  const [showEmergency, setShowEmergency] = useState(false);

  useEffect(() => {
    const mockToasts = [
      { type: 'success', title: 'Reservation Confirmed', message: 'Amoxicillin 500mg ready for pickup' },
      { type: 'warning', title: 'Low Stock Alert', message: 'Insulin levels at MediCare Center' },
      { type: 'info', title: 'Delivery Update', message: 'SHP-001 is 5 minutes away' },
      { type: 'error', title: 'Delivery Delayed', message: 'Traffic delay on route' },
    ];

    const interval = setInterval(() => {
      const randomToast = mockToasts[Math.floor(Math.random() * mockToasts.length)];
      const newToast = { ...randomToast, id: Date.now() };
      setToasts((prev) => [newToast, ...prev].slice(0, 3));

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 5000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const toastStyles = {
    success: { icon: Zap, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', ring: 'ring-emerald-500/20' },
    warning: { icon: AlertTriangle, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', ring: 'ring-amber-500/20' },
    info: { icon: Bell, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500', ring: 'ring-blue-500/20' },
    error: { icon: AlertTriangle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', ring: 'ring-red-500/20' },
  };

  const statsCards = [
    { label: 'Active Connections', value: 142, icon: Users, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
    { label: 'Events/sec', value: 28, icon: Zap, color: 'text-[#0F766E]', bg: 'bg-[#0F766E]/10' },
    { label: 'Pending Alerts', value: 3, icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Critical', value: 1, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
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
                <h1 className="text-2xl font-bold text-slate-800">Realtime Updates</h1>
                <p className="text-sm text-slate-500 mt-0.5">Live system monitoring and alerts</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm">
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-600">Connected</span>
          </div>
        </div>

        {systemAlert && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-red-50 to-red-50/50 border border-red-200 rounded-3xl p-5 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0 ring-1 ring-red-500/20">
                <AlertTriangle className="w-5.5 h-5.5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-red-800">{systemAlert.title}</p>
                <p className="text-xs text-red-600 mt-0.5">{systemAlert.message}</p>
              </div>
            </div>
            <button onClick={() => setSystemAlert(null)}
              className="p-2 rounded-xl hover:bg-red-100 text-red-400 hover:text-red-600 transition-all flex-shrink-0">
              <X className="w-4.5 h-4.5" />
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {statsCards.map((stat, i) => (
            <motion.div
              key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
          <div>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex w-2 h-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <h3 className="text-sm font-bold text-slate-700">Live Activity Stream</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{mockActivityFeed.length} events</span>
                </div>
              </div>
              <div className="p-6">
                <div className="relative">
                  <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-slate-200 via-slate-200 to-transparent" />
                  <div className="space-y-0">
                    {mockActivityFeed.map((activity, idx) => {
                      const typeDot = {
                        reservation: 'bg-emerald-500', delivery: 'bg-blue-500',
                        stock: 'bg-amber-500', system: 'bg-slate-500',
                      }[activity.type] || 'bg-slate-500';
                      const typeBg = {
                        reservation: 'bg-emerald-50', delivery: 'bg-blue-50',
                        stock: 'bg-amber-50', system: 'bg-slate-50',
                      }[activity.type] || 'bg-slate-50';
                      return (
                        <motion.div
                          key={activity.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="flex items-start gap-4 pb-7 last:pb-0 group"
                        >
                          <div className="relative z-10 flex-shrink-0 mt-0.5">
                            <div className={`w-[46px] h-[46px] rounded-2xl flex items-center justify-center shadow-sm border-2 border-white ${typeBg}`}>
                              <div className={`w-3 h-3 rounded-full ${typeDot}`} />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 pt-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-sm font-bold text-slate-800">{activity.action}</h4>
                              <span className="text-[10px] text-slate-400 flex-shrink-0 font-medium">{activity.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{activity.detail}</p>
                            <span className="text-[10px] text-slate-400 font-medium mt-1.5 block">{activity.user}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
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
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: 'Active Alerts', value: 3, color: 'text-amber-600' },
                  { label: 'Pending', value: 2, color: 'text-[#14B8A6]' },
                  { label: 'Deliveries', value: 1, color: 'text-[#0F766E]' },
                  { label: 'Critical', value: 1, color: 'text-red-600' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all">
                    <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium">System Health</span>
                <div className="flex items-center gap-2.5">
                  <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] to-[#0F766E]" style={{ width: '98.5%' }} />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600">98.5%</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-4 font-medium">Last update: Just now</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        <AnimatePresence>
          {toasts.map((toast) => {
            const style = toastStyles[toast.type] || toastStyles.info;
            const Icon = style.icon;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 120, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 120, scale: 0.9 }}
                transition={{ type: 'spring', damping: 20, stiffness: 260 }}
                className={`w-80 rounded-2xl border-2 shadow-xl backdrop-blur-sm ${style.bg} ${style.border} overflow-hidden`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${style.bg} border ${style.border} ring-1 ${style.ring}`}>
                      <Icon className={`w-4.5 h-4.5 ${style.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-sm font-bold ${style.text}`}>{toast.title}</h4>
                        <button onClick={() => dismissToast(toast.id)} className={`p-0.5 rounded-lg hover:bg-white/50 ${style.text} opacity-60 hover:opacity-100 transition-all flex-shrink-0`}>
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{toast.message}</p>
                    </div>
                  </div>
                </div>
                <div className="h-1" style={{ background: `linear-gradient(90deg, ${style.dot.replace('bg-', '#')} 0%, transparent 100%)`, animation: 'shrink 5s linear forwards' }} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {showEmergency && emergencyAlert && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          >
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">{emergencyAlert.title}</h2>
              <p className="text-sm text-red-100 mt-1">{emergencyAlert.message}</p>
            </div>
            <div className="p-6 space-y-3">
              <button onClick={() => console.log('Navigate to location')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-sm font-bold text-white hover:shadow-lg hover:shadow-[#14B8A6]/30 transition-all">
                View Location
              </button>
              <button onClick={() => { setShowEmergency(false); setEmergencyAlert(null); }}
                className="w-full py-3.5 rounded-2xl border-2 border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                Dismiss
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RealtimeUpdates;
