import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Download, Package, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import { useMedications, useDeleteMedication } from '../../hooks';
import toast from 'react-hot-toast';
import formatMAD from '../../utils/currency';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    variants={fadeUp}
    className="bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all duration-200"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.bg}`}>
        <Icon className={`w-5 h-5 ${color.text}`} />
      </div>
    </div>
    <p className="text-2xl font-bold text-contrast-primary">{value}</p>
    <p className="text-xs text-contrast-muted mt-0.5">{label}</p>
  </motion.div>
);

const InventoryManagement = () => {
  const [search, setSearch] = useState('');

  const { data: medicationsData, loading, refetch } = useMedications({ page: 1, per_page: 100, search });
  const { mutate: deleteMedication } = useDeleteMedication({
    successMessage: 'Medication deleted',
    onSuccess: () => refetch(),
  });

  const medications = (medicationsData?.data || medicationsData || []).map((m) => ({
    id: m.id,
    name: m.name,
    category: m.category || 'General',
    stock: m.stock || 0,
    price: m.price || 0,
    expiryDate: m.expiry_date,
    dosage: m.dosage,
    batchNumber: m.batch_number,
    lowStockThreshold: m.low_stock_threshold || 10,
    status: m.stock === 0 ? 'OUT_OF_STOCK' : m.stock <= (m.low_stock_threshold || 10) ? 'LOW_STOCK' : 'IN_STOCK',
    raw: m,
  }));

  const inventoryStats = {
    total: medications.length,
    lowStock: medications.filter((m) => m.status === 'LOW_STOCK').length,
    outOfStock: medications.filter((m) => m.status === 'OUT_OF_STOCK').length,
    expiring: medications.filter((m) => {
      if (!m.expiryDate) return false;
      const expiry = new Date(m.expiryDate);
      const threeMonths = new Date();
      threeMonths.setMonth(threeMonths.getMonth() + 3);
      return expiry < threeMonths;
    }).length,
  };

  const statusStyles = {
    IN_STOCK: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    LOW_STOCK: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    OUT_OF_STOCK: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
  };

  const handleExport = async () => {
    try {
      const { exportService } = await import('../../api/files');
      const response = await exportService.exportMedications();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'medications_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Export downloaded');
    } catch {
      toast.error('Export failed');
    }
  };

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Inventory Management</h1>
            <p className="text-sm text-contrast-muted mt-1">Track and manage all medications</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-elevated text-sm text-contrast-secondary font-medium hover:border-muted hover:text-contrast-primary transition-all"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-sm font-medium text-white hover:bg-brand-600 transition-all">
              <Plus className="w-4 h-4" />
              Add Medication
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Package} label="Total Items" value={inventoryStats.total} color={{ bg: 'bg-brand-50', text: 'text-brand-500' }} />
          <StatCard icon={AlertTriangle} label="Low Stock" value={inventoryStats.lowStock} color={{ bg: 'bg-amber-50', text: 'text-amber-500' }} />
          <StatCard icon={AlertCircle} label="Out of Stock" value={inventoryStats.outOfStock} color={{ bg: 'bg-red-50', text: 'text-red-500' }} />
          <StatCard icon={Clock} label="Expiring Soon" value={inventoryStats.expiring} color={{ bg: 'bg-purple-50', text: 'text-purple-500' }} />
        </motion.div>

        {/* Search + Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search medications..."
                className="w-full h-11 pl-11 pr-4 rounded-2xl border border-elevated bg-card text-sm text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all"
              />
            </div>
            <span className="text-xs text-contrast-muted">{medications.length} total items</span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-elevated animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-elevated" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-elevated rounded w-48" />
                    <div className="h-3 bg-elevated rounded w-32" />
                  </div>
                  <div className="h-6 bg-elevated rounded w-16" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {medications.map((med, i) => {
                const s = statusStyles[med.status] || statusStyles.IN_STOCK;
                return (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-elevated border border-elevated hover:border-elevated transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                      <Package className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-contrast-primary">{med.name}</h4>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.color} ${s.border} border`}>
                          {med.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-contrast-muted">
                        <span>{med.category}</span>
                        <span>{med.dosage}</span>
                        {med.batchNumber && <span>Batch: {med.batchNumber}</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-contrast-primary">{formatMAD(med.price)}</p>
                      <p className={`text-xs font-medium ${med.stock === 0 ? 'text-red-500' : med.stock <= med.lowStockThreshold ? 'text-amber-500' : 'text-contrast-muted'}`}>
                        {med.stock} units
                      </p>
                      {med.expiryDate && (
                        <p className="text-[10px] text-contrast-muted">Exp: {med.expiryDate}</p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteMedication(med.id)}
                      className="p-2 rounded-lg text-contrast-muted hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </motion.div>
                );
              })}
              {medications.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-10 h-10 text-contrast-muted mx-auto mb-3" />
                  <p className="text-sm text-contrast-secondary">No medications found</p>
                  <p className="text-xs text-contrast-muted mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InventoryManagement;
