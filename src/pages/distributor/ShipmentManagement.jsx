import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Download, Package, Truck, Clock, CheckCircle, XCircle, AlertTriangle, Store, User } from 'lucide-react';
import { mockShipments, mockDeliveryStats } from '../../mock/distributorData';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const statusStyles = {
  IN_TRANSIT: { color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200', icon: Truck },
  SHIPPED: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: Clock },
  DELIVERED: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle },
  PROCESSING: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: Package },
  PENDING: { color: 'text-contrast-secondary', bg: 'bg-elevated', border: 'border-elevated', icon: Clock },
  CANCELLED: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
};

const ShipmentManagement = () => {
  const [selectedShipment, setSelectedShipment] = useState(null);

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Shipment Management</h1>
            <p className="text-sm text-contrast-secondary mt-1">Track and manage all shipments</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-elevated text-sm text-contrast-secondary font-medium hover:border-muted hover:text-contrast-primary transition-all">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-sm font-medium text-white hover:bg-brand-600 transition-all">
              <Plus className="w-4 h-4" />
              New Shipment
            </button>
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Package, label: 'Total Shipments', value: mockDeliveryStats.total, color: 'text-brand-600', bg: 'bg-brand-50' },
            { icon: Truck, label: 'In Transit', value: mockDeliveryStats.inTransit, color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: CheckCircle, label: 'Delivered', value: mockDeliveryStats.delivered, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: AlertTriangle, label: 'Delayed', value: mockDeliveryStats.delayed, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-contrast-primary">{stat.value}</p>
              <p className="text-xs text-contrast-secondary mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-contrast-primary">Shipment List</h2>
              <p className="text-xs text-contrast-secondary mt-0.5">{mockShipments.length} total shipments</p>
            </div>
          </div>
          <div className="space-y-2">
            {mockShipments.map((shipment, i) => {
              const s = statusStyles[shipment.status] || statusStyles.PENDING;
              const StatusIcon = s.icon;
              return (
                <motion.div
                  key={shipment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedShipment?.id === shipment.id
                      ? 'bg-brand-50 border-brand-200'
                      : 'bg-elevated border-elevated hover:border-elevated'
                  }`}
                  onClick={() => setSelectedShipment(shipment)}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                    <StatusIcon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-contrast-primary">{shipment.id}</h4>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${s.bg} ${s.color} ${s.border}`}>
                        {shipment.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-contrast-muted flex-wrap">
                      <span className="flex items-center gap-1"><Store className="w-3 h-3" /> {shipment.pharmacy}</span>
                      <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {shipment.items} items</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {shipment.driver}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-contrast-primary">{shipment.progress}%</p>
                    <p className="text-[10px] text-contrast-muted">{shipment.estimatedDelivery}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShipmentManagement;
