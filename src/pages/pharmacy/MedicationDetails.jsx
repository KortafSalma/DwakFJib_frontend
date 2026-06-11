import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, DollarSign, Clock, AlertTriangle, Edit, Trash2, Pill } from 'lucide-react';
import { mockMedications } from '../../mock/pharmacyData';
import formatMAD from '../../utils/currency';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const statusStyles = {
  IN_STOCK: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  LOW_STOCK: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  OUT_OF_STOCK: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  RESERVED: { color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200' },
  EXPIRED: { color: 'text-contrast-secondary', bg: 'bg-elevated', border: 'border-elevated' },
};

const MedicationDetails = () => {
  const [medication] = useState(mockMedications[0]);
  const s = statusStyles[medication.status] || statusStyles.IN_STOCK;

  const stockHistory = [
    { date: 'May 15', stock: 200 },
    { date: 'May 16', stock: 215 },
    { date: 'May 17', stock: 190 },
    { date: 'May 18', stock: 225 },
    { date: 'May 19', stock: 235 },
    { date: 'May 20', stock: 245 },
  ];

  const maxStock = Math.max(...stockHistory.map((s) => s.stock));

  const statCards = [
    { icon: Package, label: 'Current Stock', value: medication.stock, color: 'text-brand-600', bg: 'bg-brand-50' },
    { icon: DollarSign, label: 'Price', value: formatMAD(medication.price), color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Clock, label: 'Reservations', value: medication.reservations, color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: AlertTriangle, label: 'Status', value: medication.status.replace(/_/g, ' '), color: s.color, bg: s.bg },
  ];

  const details = [
    { label: 'Name', value: medication.name },
    { label: 'Category', value: medication.category },
    { label: 'Dosage', value: medication.dosage },
    { label: 'Supplier', value: medication.supplier },
    { label: 'Price', value: formatMAD(medication.price) },
    { label: 'Expiry Date', value: medication.expiryDate || 'N/A' },
    { label: 'SKU', value: `MED-${String(medication.id).padStart(4, '0')}` },
  ];

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <button className="p-2.5 rounded-xl bg-card border border-elevated hover:border-muted transition-all">
            <ArrowLeft className="w-4 h-4 text-contrast-secondary" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                <Pill className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">{medication.name}</h1>
                <p className="text-sm text-contrast-secondary">{medication.category} · {medication.supplier}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl bg-card border border-elevated text-contrast-muted hover:border-muted hover:text-contrast-primary transition-all">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} mb-3`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <p className="text-xl font-bold text-contrast-primary">{item.value}</p>
              <p className="text-xs text-contrast-muted mt-0.5">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stock History + Details */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Stock History */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
          >
            <h2 className="text-base font-semibold text-contrast-primary mb-1">Stock History</h2>
            <p className="text-xs text-contrast-muted mb-6">Last 6 days</p>
            <div className="flex items-end gap-3 h-40">
              {stockHistory.map((s, i) => (
                <motion.div
                  key={s.date}
                  initial={{ height: 0 }}
                  animate={{ height: `${(s.stock / maxStock) * 100}%` }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex-1 group relative"
                >
                  <div
                    className="w-full h-full rounded-lg transition-all cursor-pointer group-hover:opacity-80"
                    style={{
                      background: 'linear-gradient(to top, #14B8A6, #5EEAD4)',
                    }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-card border border-elevated text-[10px] font-medium text-contrast-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm">
                    {s.stock} units
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-[10px] text-contrast-muted">
              {stockHistory.map((s) => (
                <span key={s.date} className="flex-1 text-center font-medium">{s.date}</span>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
          >
            <h2 className="text-base font-semibold text-contrast-primary mb-1">Details</h2>
            <p className="text-xs text-contrast-muted mb-6">Medication information</p>
            <div className="space-y-1">
              {details.map((field) => (
                <div key={field.label} className="flex items-center justify-between py-3 border-b border-elevated last:border-0">
                  <span className="text-sm text-contrast-secondary">{field.label}</span>
                  <span className="text-sm font-medium text-contrast-primary">{field.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MedicationDetails;
