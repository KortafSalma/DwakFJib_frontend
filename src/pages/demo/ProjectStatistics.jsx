import { motion } from 'framer-motion';
import {
  Box, Users, Building2, Truck, Shield,
  FileText,
  Layers, GitBranch, Code2
} from 'lucide-react';
import { DemoBadge } from '../../components/demo/DemoBadge';

const stats = {
  modules: [
    { label: 'Frontend Modules', value: 12, icon: Code2, color: '#14B8A6' },
    { label: 'API Controllers', value: 19, icon: Layers, color: '#0F766E' },
    { label: 'Database Tables', value: 24, icon: Database, color: '#2563EB' },
    { label: 'UI Components', value: 48, icon: Box, color: '#7C3AED' },
  ],
  interfaces: [
    { label: 'Pages', value: 48, icon: FileText },
    { label: 'API Routes', value: 80, icon: GitBranch },
    { label: 'Components', value: 85, icon: Box },
    { label: 'Hooks', value: 12, icon: Code2 },
  ],
  roles: [
    { label: 'Patients (Users)', value: '10,000+', icon: Users, color: '#14B8A6' },
    { label: 'Pharmacies', value: '500+', icon: Building2, color: '#0F766E' },
    { label: 'Distributors', value: '50+', icon: Truck, color: '#2563EB' },
    { label: 'Administrators', value: '10+', icon: Shield, color: '#7C3AED' },
  ],
  features: [
    'Medication Search & Filtering',
    'Nearby Pharmacy Locator',
    'Reservation Management',
    'Inventory Tracking',
    'Order Processing',
    'Delivery Tracking & Route Optimization',
    'Real-time Notifications',
    'Interactive Maps',
    'Sales & Revenue Analytics',
    'User & Role Management',
    'Pharmacy & Distributor Approvals',
    'Medical Certificate Upload',
    'Favorites & Saved Pharmacies',
    'Activity Logs & Audit Trail',
    'Emergency Availability Alerts',
  ]
};

function Database(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

const ProjectStatistics = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <DemoBadge />
          </div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-7 rounded-full" style={{ backgroundColor: '#14B8A6' }} />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
              Project Statistics
            </h1>
          </div>
          <p className="text-sm ml-4" style={{ color: '#64748B' }}>
            Platform metrics and development overview
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.modules.map((mod, i) => {
            const Icon = mod.icon || Database;
            return (
              <motion.div
                key={mod.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="rounded-2xl border border-slate-200 p-5"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${mod.color}12`, color: mod.color }}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold" style={{ color: '#0F172A' }}>{mod.value}</p>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{mod.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-slate-200 p-6"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6FCF9' }}>
                  <Layers className="w-4 h-4" style={{ color: '#14B8A6' }} />
                </div>
                <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>Main Features</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {stats.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs"
                    style={{ backgroundColor: '#F8FAFC' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#14B8A6' }} />
                    <span style={{ color: '#475569' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-slate-200 p-6"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6FCF9' }}>
                  <GitBranch className="w-4 h-4" style={{ color: '#14B8A6' }} />
                </div>
                <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>Total Interfaces</h3>
              </div>
              <div className="space-y-2">
                {stats.interfaces.map((iface) => {
                  const Icon = iface.icon;
                  return (
                    <div key={iface.label} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
                        <span className="text-xs" style={{ color: '#475569' }}>{iface.label}</span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: '#14B8A6' }}>{iface.value}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-slate-200 p-6"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6FCF9' }}>
                  <Users className="w-4 h-4" style={{ color: '#14B8A6' }} />
                </div>
                <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>User Roles</h3>
              </div>
              <div className="space-y-2">
                {stats.roles.map((role) => (
                  <div key={role.label} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
                    <div className="flex items-center gap-2">
                      <role.icon className="w-3.5 h-3.5" style={{ color: role.color }} />
                      <span className="text-xs" style={{ color: '#475569' }}>{role.label}</span>
                    </div>
                    <span className="text-xs font-bold" style={{ color: role.color }}>{role.value}</span>
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

export default ProjectStatistics;
