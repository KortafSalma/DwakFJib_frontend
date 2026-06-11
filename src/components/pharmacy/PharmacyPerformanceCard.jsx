import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';

const PharmacyPerformanceCard = ({ data }) => {
  const metrics = [
    { label: 'Revenue', value: data?.revenue || '12,450 DH', change: data?.revenueChange || 12.5, icon: DollarSign },
    { label: 'Orders', value: data?.orders || 89, change: data?.ordersChange || 8.3, icon: BarChart3 },
    { label: 'Avg Order', value: data?.avgOrder || '140 DH', change: data?.avgChange || -2.1, icon: TrendingUp },
    { label: 'Conversion', value: data?.conversion || '68%', change: data?.convChange || 5.7, icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-primary/10"
        >
          <div className="flex items-center justify-between mb-2">
            <m.icon className="w-4 h-4 text-contrast-muted" />
            <span className={`text-[10px] font-semibold flex items-center gap-1 ${m.change >= 0 ? 'text-primary' : 'text-red-400'}`}>
              {m.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(m.change)}%
            </span>
          </div>
          <p className="text-lg font-bold">{m.value}</p>
          <p className="text-[10px] text-contrast-muted">{m.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default PharmacyPerformanceCard;
