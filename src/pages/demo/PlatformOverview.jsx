import { motion } from 'framer-motion';
import {
  Globe, Users, Building2, Truck, Shield,
  UserRound, ArrowRight, Link2, Activity
} from 'lucide-react';
import { DemoBadge } from '../../components/demo/DemoBadge';

const sections = [
  {
    title: 'Patients',
    icon: UserRound,
    desc: 'Search medications, find nearby pharmacies, make reservations, track orders and manage their healthcare needs through a unified interface.',
    color: '#14B8A6',
    stats: '10,000+ Active Users'
  },
  {
    title: 'Pharmacies',
    icon: Building2,
    desc: 'Manage inventory, process reservations, generate sales analytics, order from distributors and provide quality healthcare services to patients.',
    color: '#0F766E',
    stats: '500+ Partner Pharmacies'
  },
  {
    title: 'Distributors',
    icon: Truck,
    desc: 'Manage product catalog, process pharmacy orders, optimize delivery routes, track shipments and grow their distribution network.',
    color: '#2563EB',
    stats: '50+ Distributors'
  },
  {
    title: 'Administrators',
    icon: Shield,
    desc: 'Oversee platform operations, manage users, verify pharmacies and distributors, monitor analytics and generate reports.',
    color: '#7C3AED',
    stats: 'Full Platform Control'
  },
];

const PlatformOverview = () => {
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
              Platform Overview
            </h1>
          </div>
          <p className="text-sm ml-4" style={{ color: '#64748B' }}>
            DWAFIJBK — Digital Healthcare Ecosystem
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-slate-200 p-8 lg:p-10 text-center"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0F766E] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: '#0F172A' }}>
            DWAFIJBK
          </h2>
          <p className="text-base font-medium mb-4" style={{ color: '#14B8A6' }}>
            Digital Healthcare Ecosystem
          </p>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: '#64748B' }}>
            A comprehensive multi-tenant SaaS platform connecting patients, pharmacies, distributors,
            and administrators in a seamless healthcare reservation and distribution network.
            Built with modern technology to ensure reliability, scalability, and an exceptional user experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${section.color}15`, color: section.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold" style={{ color: '#0F172A' }}>{section.title}</h3>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: '#64748B' }}>
                      {section.desc}
                    </p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <Activity className="w-3.5 h-3.5" style={{ color: section.color }} />
                      <span className="text-xs font-semibold" style={{ color: section.color }}>{section.stats}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-200 p-6"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#E6FCF9' }}>
              <Link2 className="w-4 h-4" style={{ color: '#14B8A6' }} />
            </div>
            <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>Connected Through One Platform</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[Users, Building2, Truck, Shield].map((Icon, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F8FAFC' }}>
                  <Icon className="w-5 h-5" style={{ color: '#14B8A6' }} />
                </div>
                {i < 3 && <ArrowRight className="w-4 h-4" style={{ color: '#94A3B8' }} />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformOverview;
