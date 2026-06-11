import { motion } from 'framer-motion';
import { Monitor, Sparkles } from 'lucide-react';
import { DemoBadge } from '../../components/demo/DemoBadge';
import DemoOverviewCards from '../../components/demo/DemoOverviewCards';

const DemoHome = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <DemoBadge size="lg" />
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: '#E6FCF9', color: '#0F766E' }}
            >
              <Sparkles className="w-3 h-3" />
              Presentation Mode
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3" style={{ color: '#0F172A' }}>
            DWAFIJBK Platform Demonstration
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
            Healthcare Reservation & Distribution Platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Patients Served', value: '10,000+' },
            { label: 'Partner Pharmacies', value: '500+' },
            { label: 'Active Distributors', value: '50+' },
            { label: 'Medications Listed', value: '5,000+' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="rounded-2xl border border-slate-200 p-5 text-center"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <p className="text-2xl font-bold" style={{ color: '#14B8A6' }}>{stat.value}</p>
              <p className="text-xs font-medium mt-1" style={{ color: '#64748B' }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: '#14B8A6' }} />
            <h2 className="text-lg font-bold" style={{ color: '#0F172A' }}>Quick Access</h2>
          </motion.div>
          <DemoOverviewCards />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E2E8F0'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
              <Monitor className="w-4 h-4" style={{ color: '#92400E' }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#0F172A' }}>Presentation Tips</p>
              <p className="text-xs" style={{ color: '#64748B' }}>Use the floating navigation panel (right side) to switch between demo flows</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              'Navigate through each user journey step by step',
              'All screens are pre-loaded with demonstration data',
              'Use the Demo Script for a guided presentation sequence'
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: '#14B8A6', color: '#FFFFFF' }}>
                  {i + 1}
                </span>
                <p className="text-xs" style={{ color: '#475569' }}>{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoHome;
