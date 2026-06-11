import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { mockMedications } from '../../mock/pharmacyData';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const severityConfig = {
  warning: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle },
  critical: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
};

const StockAlerts = () => {
  const [alertType, setAlertType] = useState('all');

  const alerts = [
    ...mockMedications.filter((m) => m.status === 'LOW_STOCK').map((m) => ({
      id: `low-${m.id}`,
      type: 'low_stock',
      severity: 'warning',
      message: `${m.name} is low on stock (${m.stock} remaining)`,
      medication: m.name,
      date: 'Today',
    })),
    ...mockMedications.filter((m) => m.status === 'OUT_OF_STOCK').map((m) => ({
      id: `out-${m.id}`,
      type: 'out_of_stock',
      severity: 'critical',
      message: `${m.name} is out of stock`,
      medication: m.name,
      date: 'Today',
    })),
    ...mockMedications.filter((m) => m.expiryDate && new Date(m.expiryDate) < new Date('2026-08-01')).map((m) => ({
      id: `exp-${m.id}`,
      type: 'expiry',
      severity: new Date(m.expiryDate) < new Date() ? 'critical' : 'warning',
      message: `${m.name} expires on ${m.expiryDate}`,
      medication: m.name,
      date: m.expiryDate,
    })),
  ];

  const filtered = alertType === 'all' ? alerts : alerts.filter((a) => a.type === alertType);

  const lowStockCount = alerts.filter((a) => a.type === 'low_stock').length;
  const outOfStockCount = alerts.filter((a) => a.type === 'out_of_stock').length;
  const expiryCount = alerts.filter((a) => a.type === 'expiry').length;

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Stock Alerts</h1>
          <p className="text-sm text-contrast-muted mt-1">{alerts.length} active alerts</p>
        </motion.div>

        {/* Alert Stats */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: AlertTriangle, label: 'Total Alerts', value: alerts.length, color: 'text-contrast-primary', bg: 'bg-elevated' },
            { icon: AlertTriangle, label: 'Low Stock', value: lowStockCount, color: 'text-amber-600', bg: 'bg-amber-50' },
            { icon: XCircle, label: 'Out of Stock', value: outOfStockCount, color: 'text-red-600', bg: 'bg-red-50' },
            { icon: Clock, label: 'Expiring', value: expiryCount, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-contrast-primary">{stat.value}</p>
              <p className="text-xs text-contrast-muted mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex gap-2 flex-wrap"
        >
          {[
            { key: 'all', label: 'All Alerts' },
            { key: 'low_stock', label: 'Low Stock' },
            { key: 'out_of_stock', label: 'Out of Stock' },
            { key: 'expiry', label: 'Expiry' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setAlertType(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                alertType === tab.key
                  ? 'bg-brand-50 text-brand-600 border border-brand-200'
                  : 'bg-card text-contrast-muted border border-elevated hover:border-muted hover:text-contrast-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Alert Queue */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
          >
            <h2 className="text-base font-semibold text-contrast-primary mb-1">Alert Queue</h2>
            <p className="text-xs text-contrast-muted mb-5">{filtered.length} items</p>
            <div className="space-y-2">
              {filtered.map((alert) => {
                const config = severityConfig[alert.severity] || severityConfig.warning;
                const Icon = config.icon;
                return (
                  <motion.div
                    key={alert.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${config.bg} ${config.border}`}
                  >
                    <Icon className={`w-5 h-5 ${config.color} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-contrast-primary">{alert.message}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[10px] text-contrast-muted">
                          <Clock className="w-3 h-3" />
                          {alert.date}
                        </span>
                        <span className={`text-[10px] font-semibold ${config.color}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {filtered.length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="w-8 h-8 text-contrast-muted mx-auto mb-2" />
                  <p className="text-sm text-contrast-secondary">No alerts in this category</p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
            >
              <h2 className="text-base font-semibold text-contrast-primary mb-1">Low Stock Items</h2>
              <p className="text-xs text-contrast-muted mb-5">Needs restocking</p>
              <div className="space-y-2">
                {mockMedications.filter((m) => m.status === 'LOW_STOCK').map((med, i) => (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200"
                  >
                    <div>
                      <p className="text-xs font-medium text-contrast-primary">{med.name}</p>
                      <p className="text-[10px] text-contrast-secondary">{med.category} · {med.dosage}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-600">{med.stock} units</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
            >
              <h2 className="text-base font-semibold text-contrast-primary mb-1">Expiring Soon</h2>
              <p className="text-xs text-contrast-muted mb-5">Within 90 days</p>
              <div className="space-y-2">
                {mockMedications.filter((m) => m.expiryDate && new Date(m.expiryDate) < new Date('2026-08-01')).map((med, i) => (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-purple-50 border border-purple-200"
                  >
                    <div>
                      <p className="text-xs font-medium text-contrast-primary">{med.name}</p>
                      <p className="text-[10px] text-contrast-secondary">{med.category}</p>
                    </div>
                    <span className="text-xs font-medium text-purple-600">Exp: {med.expiryDate}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAlerts;
