import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Truck, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { mockShipments, mockDrivers } from '../../mock/distributorData';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const progressSteps = [
  { key: 'PENDING', label: 'Order Placed' },
  { key: 'PROCESSING', label: 'Processing' },
  { key: 'SHIPPED', label: 'Shipped' },
  { key: 'IN_TRANSIT', label: 'In Transit' },
  { key: 'DELIVERED', label: 'Delivered' },
];

const DeliveryTracking = () => {
  const [search, setSearch] = useState('');
  const [selectedShipment, setSelectedShipment] = useState(
    mockShipments.find((s) => s.status === 'IN_TRANSIT') || mockShipments[0]
  );

  const activeShipments = mockShipments.filter((s) => s.status === 'IN_TRANSIT' || s.status === 'SHIPPED');
  const filtered = activeShipments.filter((s) =>
    s.id.toLowerCase().includes(search.toLowerCase()) || s.pharmacy.toLowerCase().includes(search.toLowerCase())
  );

  const currentStepIndex = progressSteps.findIndex((s) => s.key === selectedShipment?.status);

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Delivery Tracking</h1>
          <p className="text-sm text-contrast-secondary mt-1">Real-time shipment monitoring</p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, label: 'In Transit', value: mockShipments.filter((s) => s.status === 'IN_TRANSIT').length, color: 'text-brand-600', bg: 'bg-brand-50' },
            { icon: Clock, label: 'Shipped', value: mockShipments.filter((s) => s.status === 'SHIPPED').length, color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: CheckCircle, label: 'Delivered Today', value: 5, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: MapPin, label: 'Active Drivers', value: mockDrivers.filter((d) => d.status === 'active').length, color: 'text-amber-600', bg: 'bg-amber-50' },
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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            {/* Progress Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-contrast-primary">Shipment Progress</h2>
                  <p className="text-xs text-contrast-secondary mt-0.5">{selectedShipment?.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-brand-600">{selectedShipment?.progress}%</p>
                  <p className="text-[10px] text-contrast-muted">Complete</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {progressSteps.map((step, i) => {
                  const isComplete = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={step.key} className="flex flex-col items-center gap-2 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isComplete
                          ? 'bg-brand-500 text-white shadow-sm'
                          : 'bg-elevated text-contrast-muted'
                      }`}>
                        {isComplete ? '✓' : i + 1}
                      </div>
                      <span className={`text-[10px] text-center font-medium ${isCurrent ? 'text-brand-600' : isComplete ? 'text-contrast-secondary' : 'text-contrast-muted'}`}>
                        {step.label}
                      </span>
                      {i < progressSteps.length - 1 && (
                        <div className={`hidden sm:block absolute w-full h-0.5 top-4 -z-10 ${isComplete ? 'bg-brand-500' : 'bg-elevated'}`}
                          style={{ left: '50%', width: '100%' }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-elevated border border-elevated">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-[10px] text-contrast-secondary">Pharmacy</p>
                    <p className="text-xs font-medium text-contrast-primary mt-0.5">{selectedShipment?.pharmacy}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-contrast-secondary">Driver</p>
                    <p className="text-xs font-medium text-contrast-primary mt-0.5">{selectedShipment?.driver}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-contrast-secondary">Items</p>
                    <p className="text-xs font-medium text-contrast-primary mt-0.5">{selectedShipment?.items}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-contrast-secondary">Est. Delivery</p>
                    <p className="text-xs font-medium text-contrast-primary mt-0.5">{selectedShipment?.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Active Shipments */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-semibold text-contrast-primary">Active Shipments</h2>
                  <p className="text-xs text-contrast-secondary mt-0.5">{filtered.length} tracking</p>
                </div>
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-contrast-muted" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search active shipments..."
                    className="w-full pl-9 pr-3 h-9 rounded-xl border border-elevated bg-card text-xs text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                {filtered.map((shipment) => (
                  <motion.button
                    key={shipment.id}
                    onClick={() => setSelectedShipment(shipment)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                      selectedShipment?.id === shipment.id
                        ? 'bg-brand-50 border-brand-200'
                        : 'bg-elevated border-elevated hover:border-elevated'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-brand-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-contrast-primary">{shipment.id}</p>
                        <p className="text-[10px] text-contrast-secondary">{shipment.pharmacy}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="text-xs font-semibold text-brand-600">{shipment.progress}%</p>
                        <p className="text-[10px] text-contrast-muted">{shipment.driver}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-contrast-muted" />
                    </div>
                  </motion.button>
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-8">
                    <Truck className="w-8 h-8 text-contrast-muted mx-auto mb-2" />
                    <p className="text-sm text-contrast-secondary">No active shipments found</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all"
            >
              <h2 className="text-base font-semibold text-contrast-primary mb-1">Driver Fleet</h2>
              <p className="text-xs text-contrast-secondary mb-5">Current status</p>
              <div className="space-y-3">
                {mockDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center gap-3 p-3 rounded-xl bg-elevated border border-elevated">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      driver.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : driver.status === 'idle' ? 'bg-amber-50 text-amber-600 border border-amber-200'
                        : 'bg-elevated text-contrast-muted border border-elevated'
                    }`}>
                      {driver.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-contrast-primary">{driver.name}</p>
                      <p className="text-[10px] text-contrast-secondary">{driver.deliveries} deliveries · ★ {driver.rating}</p>
                    </div>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      driver.status === 'active' ? 'bg-emerald-400'
                        : driver.status === 'idle' ? 'bg-amber-400'
                        : 'bg-contrast-muted'
                    }`} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;
