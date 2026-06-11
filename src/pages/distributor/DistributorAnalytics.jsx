import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, BarChart3, Activity, Calendar, Truck, Award, User } from 'lucide-react';
import { StatCard, Card, DashboardSection } from '../../components/ui';
import { mockRevenueData } from '../../mock/distributorData';
import { formatMAD, formatMADShort } from '../../utils/currency';

const BarChart = ({ data, color, height = 56, format }) => {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1 group">
          <span className="text-[10px] text-contrast-muted opacity-0 group-hover:opacity-100 transition-opacity">
            {format ? format(d.value) : d.value.toLocaleString()}
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

const DistributorAnalytics = () => {
  const [activeChart, setActiveChart] = useState('revenue');

  const monthlyOrders = [
    { label: 'Jan', value: 185 },
    { label: 'Feb', value: 212 },
    { label: 'Mar', value: 198 },
    { label: 'Apr', value: 245 },
    { label: 'May', value: 282 },
    { label: 'Jun', value: 268 },
  ];

  const topDrivers = [
    { name: 'Mike Chen', deliveries: 156, revenue: 42500, rating: 4.7 },
    { name: 'John Smith', deliveries: 142, revenue: 38200, rating: 4.8 },
    { name: 'Emily Davis', deliveries: 128, revenue: 34800, rating: 4.6 },
    { name: 'Sarah Lee', deliveries: 115, revenue: 31200, rating: 4.9 },
    { name: 'Robert Wilson', deliveries: 98, revenue: 26500, rating: 4.5 },
  ];

  const totalRevenue = mockRevenueData.reduce((s, d) => s + d.value, 0);
  const totalDeliveries = 1247;
  const avgOrderValue = 1420;
  const growthRate = 22;

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Distributor Analytics</h1>
            <p className="text-sm text-contrast-secondary mt-1">Comprehensive performance insights</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-elevated">
            <Calendar className="w-4 h-4 text-contrast-muted" />
            <span className="text-xs text-contrast-secondary font-medium">Last 6 months</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={DollarSign} label="Total Revenue" value={formatMADShort(totalRevenue)} color="primary" />
          <StatCard icon={Activity} label="Total Deliveries" value={totalDeliveries.toLocaleString()} color="blue" />
          <StatCard icon={BarChart3} label="Avg Order Value" value={formatMAD(avgOrderValue)} color="yellow" />
          <StatCard icon={TrendingUp} label="Growth Rate" value={`${growthRate}%`} color="emerald" />
        </div>

        {/* Dual Chart */}
        <Card>
          <DashboardSection
            title="Analytics Trend"
            description={activeChart === 'revenue' ? 'Monthly revenue' : 'Monthly orders'}
            action={
              <div className="flex gap-1 p-1 rounded-xl bg-elevated border border-elevated">
                {[
                  { key: 'revenue', label: 'Revenue' },
                  { key: 'orders', label: 'Orders' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setActiveChart(opt.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeChart === opt.key
                        ? 'bg-card text-contrast-primary shadow-sm border border-elevated'
                        : 'text-contrast-secondary hover:text-contrast-primary'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            }
          />
          <BarChart
            data={activeChart === 'revenue' ? mockRevenueData : monthlyOrders}
            color={activeChart === 'revenue' ? '#14B8A6' : '#3B82F6'}
            format={(v) => activeChart === 'revenue' ? formatMAD(v) : v}
          />
        </Card>

        {/* Top Drivers + Regional */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <DashboardSection title="Top Drivers" description="By deliveries completed" />
            <div className="space-y-4">
              {topDrivers.map((driver, i) => (
                <div key={driver.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-contrast-muted w-4">{i + 1}</span>
                      <div className="w-7 h-7 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-brand-600">{driver.name.charAt(0)}</span>
                      </div>
                      <span className="text-sm font-medium text-contrast-primary">{driver.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-contrast-primary">{driver.deliveries}</span>
                      <span className="text-[10px] text-yellow-500 ml-2">★ {driver.rating}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-elevated overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(driver.deliveries / topDrivers[0].deliveries) * 100}%` }}
                      transition={{ delay: i * 0.06, duration: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                    />
                  </div>
                  <p className="text-[10px] text-contrast-muted mt-0.5">{formatMAD(driver.revenue)} revenue</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <DashboardSection title="Performance Summary" description="Key delivery metrics" />
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, label: 'Success Rate', value: '94.5%', sub: 'On-time delivery' },
                { icon: Truck, label: 'Active Fleet', value: '12', sub: 'Delivery vehicles' },
                { icon: Activity, label: 'Avg Daily', value: '42', sub: 'Deliveries per day' },
                { icon: User, label: 'Total Drivers', value: '8', sub: 'Active drivers' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-elevated border border-elevated">
                  <div className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center mb-2">
                    <stat.icon className="w-4 h-4 text-contrast-secondary" />
                  </div>
                  <p className="text-lg font-bold text-contrast-primary">{stat.value}</p>
                  <p className="text-xs text-contrast-secondary mt-0.5">{stat.label}</p>
                  <p className="text-[10px] text-contrast-muted">{stat.sub}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DistributorAnalytics;
