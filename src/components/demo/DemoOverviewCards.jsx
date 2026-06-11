import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserRound, Building2, Truck, Shield,
  BarChart3, FileText, ArrowRight
} from 'lucide-react';

const cards = [
  {
    title: 'Patient Journey',
    desc: 'Registration, medication search, reservation & tracking',
    path: '/demo/patient-flow',
    icon: UserRound,
    color: '#14B8A6',
    bg: 'rgba(20,184,166,0.08)'
  },
  {
    title: 'Pharmacy Journey',
    desc: 'Dashboard, inventory, reservations & analytics',
    path: '/demo/pharmacy-flow',
    icon: Building2,
    color: '#0F766E',
    bg: 'rgba(15,118,110,0.08)'
  },
  {
    title: 'Distributor Journey',
    desc: 'Orders, deliveries, catalog & analytics',
    path: '/demo/distributor-flow',
    icon: Truck,
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.08)'
  },
  {
    title: 'Administrator Journey',
    desc: 'User management, approvals, reports & analytics',
    path: '/demo/admin-flow',
    icon: Shield,
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)'
  },
  {
    title: 'Analytics',
    desc: 'Platform metrics, charts & performance data',
    path: '/demo/statistics',
    icon: BarChart3,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)'
  },
  {
    title: 'Reports',
    desc: 'System reports, exports & documentation',
    path: '/demo/platform-overview',
    icon: FileText,
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const DemoOverviewCards = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.button
            key={card.path}
            variants={itemVariants}
            onClick={() => navigate(card.path)}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 p-5 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-8 translate-x-8 transition-transform duration-500 group-hover:scale-150"
              style={{ backgroundColor: card.bg }}
            />
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 relative"
              style={{ backgroundColor: card.bg }}
            >
              <Icon className="w-5 h-5" style={{ color: card.color }} />
            </div>
            <h3 className="text-sm font-bold relative" style={{ color: '#0F172A' }}>
              {card.title}
            </h3>
            <p className="text-xs mt-1 relative" style={{ color: '#64748B' }}>
              {card.desc}
            </p>
            <div
              className="flex items-center gap-1 mt-3 text-xs font-semibold relative opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: card.color }}
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default DemoOverviewCards;
