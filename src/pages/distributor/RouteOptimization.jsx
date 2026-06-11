import { useState } from 'react';
import { motion } from 'framer-motion';
import { Route, MapPin, Clock, Truck, Plus, Edit, CheckCircle } from 'lucide-react';
import { mockRoutes } from '../../mock/distributorData';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const statusStyles = {
  active: { color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200' },
  planned: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  completed: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
};

const RouteOptimization = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Route Optimization</h1>
            <p className="text-sm text-contrast-secondary mt-1">Plan and optimize delivery routes</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-sm font-medium text-white hover:bg-brand-600 transition-all">
            <Plus className="w-4 h-4" />
            New Route
          </button>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Route, label: 'Active Routes', value: mockRoutes.filter((r) => r.status === 'active').length, color: 'text-brand-600', bg: 'bg-brand-50' },
            { icon: Clock, label: 'Planned', value: mockRoutes.filter((r) => r.status === 'planned').length, color: 'text-amber-600', bg: 'bg-amber-50' },
            { icon: CheckCircle, label: 'Completed', value: mockRoutes.filter((r) => r.status === 'completed').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: MapPin, label: 'Total Distance', value: `${mockRoutes.reduce((sum, r) => sum + parseFloat(r.distance), 0).toFixed(1)}km`, color: 'text-blue-600', bg: 'bg-blue-50' },
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
              <h2 className="text-base font-semibold text-contrast-primary">Route List</h2>
              <p className="text-xs text-contrast-secondary mt-0.5">{mockRoutes.length} routes</p>
            </div>
          </div>
          <div className="space-y-3">
            {mockRoutes.map((route, i) => {
              const s = statusStyles[route.status] || statusStyles.planned;
              return (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedRoute?.id === route.id
                      ? 'bg-brand-50 border-brand-200'
                      : 'bg-elevated border-elevated hover:border-elevated'
                  }`}
                  onClick={() => setSelectedRoute(route)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Route className="w-5 h-5 text-brand-500" />
                      <div>
                        <h4 className="text-sm font-semibold text-contrast-primary">{route.name}</h4>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${s.bg} ${s.color} ${s.border}`}>
                          {route.status}
                        </span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-card transition-all">
                      <Edit className="w-3.5 h-3.5 text-contrast-muted" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-contrast-muted">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {route.stops} stops</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {route.estimatedTime}</span>
                    <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> {route.driver}</span>
                    <span className="ml-auto text-xs font-medium text-contrast-secondary">{route.distance}</span>
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

export default RouteOptimization;
