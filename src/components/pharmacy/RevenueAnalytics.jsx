import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react';
import formatMAD from '../../utils/currency';

const RevenueAnalytics = ({ data }) => {
  const metrics = [
    { label: 'Total Revenue', value: data?.totalRevenue || '48,250 DH', change: data?.revenueChange || 15.2, icon: DollarSign },
    { label: 'Gross Margin', value: data?.margin || '34.5%', change: data?.marginChange || 2.1, icon: PieChart },
    { label: 'Avg Daily Sales', value: data?.dailySales || '1,608 DH', change: data?.salesChange || -3.4, icon: Activity },
    { label: 'Revenue Growth', value: data?.growth || '22%', change: data?.growthChange || 8.7, icon: TrendingUp },
  ];

  const topProducts = data?.topProducts || [
    { name: 'Amoxicillin 500mg', revenue: 4250, growth: 12 },
    { name: 'Metformin 850mg', revenue: 3890, growth: 8 },
    { name: 'Lisinopril 10mg', revenue: 3420, growth: -2 },
    { name: 'Omeprazole 20mg', revenue: 2980, growth: 15 },
    { name: 'Atorvastatin 20mg', revenue: 2750, growth: 5 },
  ];

  const maxRevenue = Math.max(...topProducts.map((p) => p.revenue));

  return (
    <div className="space-y-6">
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

      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          Top Products by Revenue
        </h3>
        <div className="space-y-2">
          {topProducts.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs text-contrast-muted w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{product.name}</span>
                  <span className="text-xs font-mono">{formatMAD(product.revenue)}</span>
                </div>
                <div className="h-2 rounded-full bg-dark/30 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(product.revenue / maxRevenue) * 100}%` }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              </div>
              <span className={`text-[10px] font-semibold ${product.growth >= 0 ? 'text-primary' : 'text-red-400'}`}>
                {product.growth >= 0 ? '+' : ''}{product.growth}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
