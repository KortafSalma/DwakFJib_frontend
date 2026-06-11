import { motion } from 'framer-motion';
import {
  Monitor, Server, Database, Globe,
  ArrowRight, Code2,
  Shield, Zap, Layers
} from 'lucide-react';
import { DemoBadge } from '../../components/demo/DemoBadge';

const layers = [
  {
    title: 'Frontend',
    icon: Monitor,
    tech: 'React',
    desc: 'Single Page Application with Vite, Tailwind CSS, and Framer Motion for smooth UI interactions.',
    color: '#14B8A6',
    items: ['React 19', 'React Router v7', 'Tailwind CSS 3', 'Framer Motion', 'Axios', 'Lucide Icons']
  },
  {
    title: 'Backend',
    icon: Server,
    tech: 'Laravel',
    desc: 'RESTful API with Laravel Sanctum authentication, Eloquent ORM, and comprehensive business logic.',
    color: '#0F766E',
    items: ['Laravel', 'Sanctum Auth', 'Eloquent ORM', 'REST API', 'Middleware', 'Validation']
  },
  {
    title: 'Database',
    icon: Database,
    tech: 'MySQL',
    desc: 'Relational database with optimized queries, migrations, and seeders for data management.',
    color: '#2563EB',
    items: ['MySQL 8.0', 'Migrations', 'Seeders', 'Indexes', 'Foreign Keys', 'Transactions']
  },
];

const apiFlow = [
  { label: 'HTTP Requests', icon: Globe, desc: 'Axios client sends requests to API' },
  { label: 'Sanctum Auth', icon: Shield, desc: 'Token-based authentication' },
  { label: 'Controllers', icon: Code2, desc: 'Request handling & validation' },
  { label: 'Services', icon: Layers, desc: 'Business logic layer' },
  { label: 'Database', icon: Database, desc: 'MySQL persistence' },
];

const SystemArchitecture = () => {
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
              System Architecture
            </h1>
          </div>
          <p className="text-sm ml-4" style={{ color: '#64748B' }}>
            Three-tier architecture powering the DWAFIJBK platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className="rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <div className="p-5" style={{ backgroundColor: `${layer.color}08` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: layer.color, color: '#FFFFFF' }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>{layer.title}</h3>
                      <p className="text-xs font-medium" style={{ color: layer.color }}>{layer.tech}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>{layer.desc}</p>
                </div>
                <div className="p-4 space-y-2">
                  {layer.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: '#F8FAFC', color: '#475569' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-slate-200 p-6 lg:p-8"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
              <ArrowRight className="w-4 h-4" style={{ color: '#92400E' }} />
            </div>
            <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>API Communication Flow</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0">
            {apiFlow.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center gap-2 flex-1">
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl flex-1" style={{ backgroundColor: '#F8FAFC' }}>
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#14B8A6' }} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: '#0F172A' }}>{step.label}</p>
                      <p className="text-[10px] truncate" style={{ color: '#94A3B8' }}>{step.desc}</p>
                    </div>
                  </div>
                  {i < apiFlow.length - 1 && (
                    <ArrowRight className="w-4 h-4 flex-shrink-0 hidden sm:block" style={{ color: '#CBD5E1' }} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-200 p-6"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-4 h-4" style={{ color: '#14B8A6' }} />
            <h3 className="text-sm font-bold" style={{ color: '#0F172A' }}>Architecture Highlights</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Single Page App', desc: 'Fast client-side routing with React Router' },
              { label: 'RESTful API', desc: 'Stateless API communication via JSON' },
              { label: 'Token Auth', desc: 'Secure Sanctum token-based authentication' },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl" style={{ backgroundColor: '#F8FAFC' }}>
                <p className="text-xs font-bold" style={{ color: '#0F172A' }}>{item.label}</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#64748B' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
