import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, BarChart3, Calendar, Store, Truck } from 'lucide-react';
import { mockRevenueData } from '../../mock/distributorData';
import formatMAD from '../../utils/currency';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const BarChart = ({ data, color, height = 56 }) => {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1 group">
          <span className="text-[10px] text-contrast-muted opacity-0 group-hover:opacity-100 transition-opacity">{formatMAD(d.value)}</span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.value / maxVal) * 100}%` }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full rounded-lg transition-all cursor-pointer"
            style={{ background: `linear-gradient(to top, ${color || '#14B8A6'}CC, ${color || '#14B8A6'}80)` }}
          />
          <span className="text-[10px] text-contrast-muted font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const RevenueOverview = () => {
  const topPharmacies = [
    { name: 'HealthPlus Pharmacy', revenue: 28500, orders: 45, growth: 12 },
    { name: 'MediCare Center', revenue: 22100, orders: 38, growth: 8 },
    { name: 'GreenCross Pharmacy', revenue: 18900, orders: 32, growth: -2 },
    { name: 'Wellness Hub', revenue: 15400, orders: 28, growth: 15 },
    { name: 'City Pharmacy', revenue: 12800, orders: 22, growth: 5 },
  ];
  const maxRevenue = Math.max(...topPharmacies.map((p) => p.revenue));

  const totalRevenue = mockRevenueData.reduce((s, d) => s + d.value, 0);

  const metrics = [
    { label: 'Total Revenue', value: formatMAD(totalRevenue), change: 15.2, icon: DollarSign },
    { label: 'Avg per Delivery', value: '886 DH', change: 3.4, icon: Truck },
    { label: 'Monthly Growth', value: '22%', change: 8.7, icon: BarChart3 },
    { label: 'Revenue per km', value: '4,82 DH', change: -1.2, icon: TrendingDown },
  ];

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Revenue Overview</h1>
            <p className="text-sm text-contrast-secondary mt-1">Financial performance and insights</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-elevated">
            <Calendar className="w-4 h-4 text-contrast-muted" />
            <span className="text-xs text-contrast-secondary font-medium">Last 6 months</span>
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp} className="bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all">
              <div className="flex items-center justify-between mb-3">
                <m.icon className="w-5 h-5 text-contrast-muted" />
                <span className={`text-[10px] font-semibold flex items-center gap-1 ${m.change >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {m.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(m.change)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-contrast-primary">{m.value}</p>
              <p className="text-xs text-contrast-secondary mt-0.5">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-contrast-primary">Revenue Trend</h2>
              <p className="text-xs text-contrast-secondary mt-0.5">Monthly breakdown</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200">
              <DollarSign className="w-3.5 h-3.5 text-brand-500" />
              <span className="text-xs font-semibold text-brand-600">{formatMAD(totalRevenue)}</span>
            </div>
          </div>
          <BarChart data={mockRevenueData} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all">
          <h2 className="text-base font-semibold text-contrast-primary mb-1">Top Pharmacy Customers</h2>
          <p className="text-xs text-contrast-secondary mb-5">By revenue generated</p>
          <div className="space-y-4">
            {topPharmacies.map((p, i) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-contrast-muted w-4">{i + 1}</span>
                    <Store className="w-3.5 h-3.5 text-contrast-muted" />
                    <span className="text-sm font-medium text-contrast-primary">{p.name}</span>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="text-xs text-contrast-secondary">{p.orders} orders</span>
                    <span className="text-xs font-semibold text-contrast-primary">{formatMAD(p.revenue)}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-elevated overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(p.revenue / maxRevenue) * 100}%` }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                  />
                </div>
                <p className={`text-[10px] mt-0.5 ${p.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {p.growth >= 0 ? '↑' : '↓'} {Math.abs(p.growth)}% growth
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RevenueOverview;
