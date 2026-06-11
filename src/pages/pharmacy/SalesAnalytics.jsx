import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, ShoppingCart, Activity } from 'lucide-react';
import { StatCard, Card, DashboardSection } from '../../components/ui';
import formatMAD from '../../utils/currency';

const BarChart = ({ data, color, height = 48 }) => {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1 group">
          <span className="text-[10px] text-contrast-muted opacity-0 group-hover:opacity-100 transition-opacity">
            {typeof d.value === 'number' ? formatMAD(d.value) : d.value}
          </span>
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

const SalesAnalytics = () => {
  const [period, setPeriod] = useState('weekly');

  const weeklyData = [
    { label: 'Mon', value: 1250 },
    { label: 'Tue', value: 1890 },
    { label: 'Wed', value: 1450 },
    { label: 'Thu', value: 2100 },
    { label: 'Fri', value: 1780 },
    { label: 'Sat', value: 980 },
    { label: 'Sun', value: 650 },
  ];

  const monthlyData = [
    { label: 'Jan', value: 12500 },
    { label: 'Feb', value: 14200 },
    { label: 'Mar', value: 13800 },
    { label: 'Apr', value: 15600 },
    { label: 'May', value: 18200 },
    { label: 'Jun', value: 16800 },
  ];

  const categoryData = [
    { label: 'Antibiotics', value: 8500 },
    { label: 'Cardiology', value: 7200 },
    { label: 'Diabetes', value: 6100 },
    { label: 'Pain Relief', value: 5400 },
    { label: 'Neurology', value: 4200 },
    { label: 'Vitamins', value: 3800 },
  ];

  const chartData = period === 'weekly' ? weeklyData : monthlyData;

  const totalRevenue = monthlyData.reduce((s, d) => s + d.value, 0);
  const avgOrder = 45.50;
  const totalOrders = 1247;
  const growth = 12.5;

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Sales Analytics</h1>
            <p className="text-sm text-contrast-muted mt-1">Revenue and performance insights</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-elevated">
            <Calendar className="w-4 h-4 text-contrast-muted" />
            <span className="text-xs text-contrast-muted font-medium">Last 30 days</span>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={DollarSign} label="Total Revenue" value={formatMAD(totalRevenue)} color="primary" />
          <StatCard icon={ShoppingCart} label="Total Orders" value={totalOrders.toLocaleString()} color="blue" />
          <StatCard icon={TrendingUp} label="Avg. Order" value={formatMAD(avgOrder)} color="yellow" />
          <StatCard icon={Activity} label="Growth Rate" value={`${growth}%`} color="emerald" />
        </div>

        {/* Period Toggle + Chart */}
        <Card>
          <DashboardSection
            title="Revenue Overview"
            description={`${period === 'weekly' ? 'Weekly' : 'Monthly'} sales breakdown`}
            action={
              <div className="flex gap-1 p-1 rounded-xl bg-elevated border border-elevated">
                {['weekly', 'monthly'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      period === p
                        ? 'bg-card text-contrast-primary shadow-sm border border-elevated'
                        : 'text-contrast-muted hover:text-contrast-primary'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            }
          />
          <BarChart data={chartData} height={56} />
        </Card>

        {/* Revenue by Category */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <DashboardSection title="Revenue by Category" description="Product category performance" />
            <BarChart data={categoryData} color="#8B5CF6" height={48} />
          </Card>

          <Card>
            <DashboardSection title="Category Breakdown" description="Revenue share by category" />
            <div className="space-y-4">
              {categoryData.map((cat, i) => {
                const pct = ((cat.value / categoryData.reduce((s, d) => s + d.value, 0)) * 100).toFixed(0);
                return (
                  <div key={cat.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-contrast-primary">{cat.label}</span>
                      <span className="text-xs font-semibold text-contrast-primary">${cat.value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-elevated overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: i * 0.05, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                      />
                    </div>
                    <p className="text-[10px] text-contrast-muted mt-0.5">{pct}% of total</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
