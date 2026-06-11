import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Users, ShoppingCart, DollarSign, Store, Truck,
  Activity, BarChart3, Download, FileText, Calendar,
  MapPin, Package, UserPlus, Star,
} from 'lucide-react';
import { StatCard } from '../../components/ui';
import {
  useAdminDashboard, useRevenueChart, useReservationChart,
  useTopPharmacies, useTopMedications, useActivityTimeline,
} from '../../hooks';
import formatMAD from '../../utils/currency';

const dateRangeOptions = [
  { value: '7', label: '7 Days' },
  { value: '30', label: '30 Days' },
  { value: '90', label: '90 Days' },
  { value: '365', label: 'Year' },
];

const revenueData = [
  { month: 'Jan', revenue: 24800, orders: 320, users: 120 },
  { month: 'Feb', revenue: 31200, orders: 410, users: 156 },
  { month: 'Mar', revenue: 28900, orders: 380, users: 142 },
  { month: 'Apr', revenue: 35600, orders: 445, users: 178 },
  { month: 'May', revenue: 42300, orders: 520, users: 201 },
  { month: 'Jun', revenue: 39100, orders: 490, users: 189 },
  { month: 'Jul', revenue: 45800, orders: 560, users: 224 },
  { month: 'Aug', revenue: 52400, orders: 610, users: 256 },
  { month: 'Sep', revenue: 48700, orders: 590, users: 243 },
  { month: 'Oct', revenue: 56200, orders: 645, users: 278 },
  { month: 'Nov', revenue: 61800, orders: 710, users: 301 },
  { month: 'Dec', revenue: 78500, orders: 890, users: 356 },
];

const categoryData = [
  { label: 'Chronic Medication', value: 35, color: '#14B8A6', orders: 12450, growth: 12 },
  { label: 'OTC Products', value: 25, color: '#0F766E', orders: 8900, growth: 8 },
  { label: 'Vitamins & Supplements', value: 18, color: '#6366F1', orders: 6420, growth: 15 },
  { label: 'Personal Care', value: 12, color: '#F59E0B', orders: 4280, growth: 5 },
  { label: 'Medical Equipment', value: 10, color: '#EF4444', orders: 3560, growth: 20 },
];

const topCities = [
  { city: 'Casablanca', pharmacies: 48, reservations: 2840, growth: 15 },
  { city: 'Rabat', pharmacies: 32, reservations: 1950, growth: 12 },
  { city: 'Marrakech', pharmacies: 28, reservations: 1680, growth: 18 },
  { city: 'Fes', pharmacies: 22, reservations: 1240, growth: 8 },
  { city: 'Tangier', pharmacies: 18, reservations: 980, growth: 22 },
];

const reportTypes = [
  { label: 'User Report', icon: Users, desc: 'Platform user analytics and growth metrics', color: 'text-brand-600', bg: 'bg-brand-50' },
  { label: 'Pharmacy Report', icon: Store, desc: 'Pharmacy performance and verification data', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Distributor Report', icon: Truck, desc: 'Distributor activity and order analytics', color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Reservation Report', icon: ShoppingCart, desc: 'Reservation trends and completion rates', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Activity Report', icon: Activity, desc: 'Platform activity and event timeline', color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const BarChart = ({ data, dataKey, color = 'brand', height = 200, format }) => {
  const maxVal = Math.max(...data.map((d) => d[dataKey] ?? 0));
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((item, i) => {
        const val = item[dataKey] ?? 0;
        const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-slate-900 text-white text-[10px] px-2 py-1 rounded-lg whitespace-nowrap z-10 pointer-events-none shadow-lg">
              {format ? format(val) : val}
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(pct, 2)}%` }}
              transition={{ delay: i * 0.03, duration: 0.5, ease: 'easeOut' }}
              className={`w-full rounded-lg transition-colors cursor-pointer ${
                color === 'brand' ? 'bg-brand-400 hover:bg-brand-500' :
                color === 'emerald' ? 'bg-emerald-400 hover:bg-emerald-500' :
                color === 'amber' ? 'bg-amber-400 hover:bg-amber-500' :
                color === 'violet' ? 'bg-violet-400 hover:bg-violet-500' :
                'bg-contrast-muted hover:bg-elevated'
              }`}
              style={color === 'gradient' ? { background: `linear-gradient(to top, #14B8A6, #0F766E)` } : {}}
            />
            <span className="text-[9px] text-contrast-muted mt-0.5 truncate max-w-full">
              {item.month?.slice(0, 3) || item.label?.slice(0, 3) || ''}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const DonutChart = ({ segments, size = 120 }) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const circumference = 2 * Math.PI * r;
  const segmentsWithOffsets = segments.reduce((acc, seg) => {
    const prevOffset = acc.length > 0 ? acc[acc.length - 1].nextOffset : 0;
    const dashLen = (seg.value / total) * circumference;
    acc.push({ ...seg, dashLen, offset: prevOffset, nextOffset: prevOffset + dashLen });
    return acc;
  }, []);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F1F5F9" strokeWidth={size * 0.1} />
      {segmentsWithOffsets.map((seg, i) => (
        <motion.circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth={size * 0.1}
          strokeDasharray={`${seg.dashLen} ${circumference - seg.dashLen}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: -seg.offset - circumference }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
};

const InsightsCard = ({ icon: Icon, title, value, description, color }) => (
  <div className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-elevated hover:border-elevated transition-all">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color.bg}`}>
      <Icon className={`w-5 h-5 ${color.text}`} />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-contrast-primary">{title}</p>
      <p className="text-xs text-contrast-secondary mt-0.5">{description}</p>
      {value !== undefined && (
        <span className={`inline-block mt-1 text-xs font-semibold ${value >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
          {value >= 0 ? '+' : ''}{value}%
        </span>
      )}
    </div>
  </div>
);

const PlatformAnalytics = () => {
  const [dateRange, setDateRange] = useState('30');
  const [chartView, setChartView] = useState('revenue');
  const [reportView, setReportView] = useState('all');

  const { data: dashboardData, loading: dashboardLoading } = useAdminDashboard();
  const { data: revenueChartData } = useRevenueChart(parseInt(dateRange));
  const { data: reservationChartRes } = useReservationChart(parseInt(dateRange));
  const { data: topPharmaciesData } = useTopPharmacies(5);
  const { data: topMedicationsData } = useTopMedications(5);
  const { data: activityData } = useActivityTimeline(5);

  const stats = dashboardData?.data || dashboardData || {};
  const apiRevenue = revenueChartData?.data || revenueChartData || [];
  const apiReservations = reservationChartRes?.data || reservationChartRes || [];
  const topPharmacies = topPharmaciesData?.data || topPharmaciesData || [];
  const topMeds = topMedicationsData?.data || topMedicationsData || [];

  const chartData = useMemo(() => {
    if (apiRevenue.length > 0) return apiRevenue;
    return revenueData;
  }, [apiRevenue]);

  const reservationData = useMemo(() => {
    if (apiReservations.length > 0) return apiReservations;
    return [
      { label: 'Completed', value: stats.completed_reservations || 2840, color: '#14B8A6' },
      { label: 'Pending', value: stats.pending_reservations || 480, color: '#F59E0B' },
      { label: 'Confirmed', value: stats.confirmed_reservations || 620, color: '#6366F1' },
      { label: 'Cancelled', value: stats.cancelled_reservations || 180, color: '#EF4444' },
    ];
  }, [apiReservations, stats]);

  const totalUsers = stats.total_users?.toLocaleString() || stats.users?.total?.toLocaleString() || '—';
  const totalPharmaciesVal = stats.total_pharmacies || stats.pharmacies?.total || '—';
  const totalDistributorsVal = stats.total_distributors || stats.distributors?.total || '—';
  const totalReservationsVal = stats.total_reservations?.toLocaleString() || stats.reservations?.total?.toLocaleString() || '—';
  const activeUsers = stats.active_users || stats.users?.active || '—';
  const growthRate = stats.user_growth || stats.users?.growth || null;

  const pharmacyList = useMemo(() => {
    if (topPharmacies.length > 0) return topPharmacies;
    return [
      { name: 'Pharmacie Centrale', reservations: 1240, city: 'Casablanca', rating: 4.8 },
      { name: 'Pharmacie Moderna', reservations: 980, city: 'Rabat', rating: 4.6 },
      { name: 'Pharmacie Atlas', reservations: 870, city: 'Marrakech', rating: 4.7 },
      { name: 'Pharmacie Al Amal', reservations: 720, city: 'Fes', rating: 4.5 },
      { name: 'Pharmacie Tanjia', reservations: 640, city: 'Tangier', rating: 4.9 },
    ];
  }, [topPharmacies]);

  const maxPharmacyRes = Math.max(...pharmacyList.map((p) => p.reservations), 1);

  const insights = useMemo(() => {
    const list = [];
    if (stats.user_growth || stats.users?.growth) {
      list.push({ icon: UserPlus, title: 'User Growth', description: 'New user registrations this period', value: stats.user_growth || stats.users?.growth, color: { bg: 'bg-brand-50', text: 'text-brand-600' } });
    }
    if (stats.reservation_growth || stats.reservations?.growth) {
      list.push({ icon: ShoppingCart, title: 'Reservation Volume', description: 'Reservation activity trend', value: stats.reservation_growth || stats.reservations?.growth, color: { bg: 'bg-amber-50', text: 'text-amber-600' } });
    }
    if (stats.pharmacy_growth || stats.pharmacies?.growth) {
      list.push({ icon: Store, title: 'Pharmacy Growth', description: 'New pharmacy registrations', value: stats.pharmacy_growth || stats.pharmacies?.growth, color: { bg: 'bg-blue-50', text: 'text-blue-600' } });
    }
    if (stats.revenue_growth || stats.revenue?.growth) {
      list.push({ icon: DollarSign, title: 'Revenue Growth', description: 'Monthly revenue increase', value: stats.revenue_growth || stats.revenue?.growth, color: { bg: 'bg-emerald-50', text: 'text-emerald-600' } });
    }
    if (list.length === 0) {
      list.push(
        { icon: TrendingUp, title: 'Platform Trending', description: 'Overall platform metrics are healthy', value: 12, color: { bg: 'bg-brand-50', text: 'text-brand-600' } },
        { icon: ShoppingCart, title: 'Reservation Volume', description: 'Reservation activity trend', value: 8, color: { bg: 'bg-amber-50', text: 'text-amber-600' } },
        { icon: Store, title: 'Pharmacy Growth', description: 'New pharmacy registrations', value: 15, color: { bg: 'bg-blue-50', text: 'text-blue-600' } },
      );
    }
    return list;
  }, [stats]);

  const handleExportCSV = useCallback(() => {
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Total Users', totalUsers],
      ['Active Users', activeUsers],
      ['Total Pharmacies', totalPharmaciesVal],
      ['Total Distributors', totalDistributorsVal],
      ['Total Reservations', totalReservationsVal],
    ];
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [totalUsers, activeUsers, totalPharmaciesVal, totalDistributorsVal, totalReservationsVal]);

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-7">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Analytics & Reports</h1>
            <p className="text-sm text-contrast-secondary mt-1.5">Monitor platform performance and business insights.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[20px] text-sm font-medium text-brand-600 bg-card border border-brand-200 hover:bg-brand-50 hover:border-brand-300 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              disabled
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[20px] text-sm font-medium text-contrast-muted bg-card border border-elevated cursor-not-allowed opacity-60"
            >
              <FileText className="w-4 h-4" />
              <span>PDF Report</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-card rounded-[20px] border border-elevated p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Calendar className="w-4 h-4 text-contrast-muted" />
            <span className="text-sm font-medium text-contrast-secondary">Date Range:</span>
            {dateRangeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDateRange(opt.value)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  dateRange === opt.value
                    ? 'bg-brand-50 text-brand-600 border border-brand-200 shadow-sm'
                    : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>

        {dashboardLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-[20px] border border-elevated p-5 space-y-3 animate-pulse">
                <div className="w-11 h-11 rounded-2xl bg-elevated" />
                <div className="h-8 bg-elevated rounded w-20" />
                <div className="h-3 bg-elevated rounded w-24" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard icon={Users} label="Total Users" value={totalUsers} color="primary" />
            <StatCard icon={Activity} label="Active Users" value={activeUsers} color="emerald" />
            <StatCard icon={Store} label="Pharmacies" value={totalPharmaciesVal} color="blue" />
            <StatCard icon={Truck} label="Distributors" value={totalDistributorsVal} color="violet" />
            <StatCard icon={ShoppingCart} label="Reservations" value={totalReservationsVal} color="yellow" />
            <StatCard icon={TrendingUp} label="Growth Rate" value={growthRate ? `${growthRate}%` : '—'} color="red" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card rounded-[20px] border border-elevated p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-brand-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-contrast-primary">Growth Metrics</h3>
                  <p className="text-[10px] text-contrast-secondary">Monthly trend overview</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {['revenue', 'orders', 'users'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setChartView(v)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all capitalize ${
                      chartView === v
                        ? 'bg-brand-50 text-brand-600 border border-brand-200'
                        : 'text-contrast-secondary hover:text-contrast-primary border border-transparent'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <BarChart data={chartData} dataKey={chartView} height={200} format={(v) => chartView === 'revenue' ? formatMAD(v) : v.toLocaleString()} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-card rounded-[20px] border border-elevated p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-contrast-primary">Reservation Analytics</h3>
                <p className="text-[10px] text-contrast-secondary">Status distribution</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <DonutChart segments={reservationData} size={140} />
              </div>
              <div className="flex-1 w-full space-y-2.5">
                {reservationData.map((seg) => (
                  <div key={seg.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                      <span className="text-xs text-contrast-secondary">{seg.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-contrast-primary">{seg.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card rounded-[20px] border border-elevated p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <Store className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-contrast-primary">Top Pharmacies</h3>
                <p className="text-[10px] text-contrast-secondary">By reservation volume</p>
              </div>
            </div>
            <div className="space-y-3">
              {pharmacyList.map((pharmacy, i) => (
                <div key={pharmacy.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-semibold text-contrast-muted w-4">{i + 1}</span>
                      <span className="text-xs font-medium text-contrast-primary truncate">{pharmacy.name}</span>
                      <span className="text-[10px] text-contrast-muted hidden sm:inline">{pharmacy.city}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-semibold text-contrast-primary">{pharmacy.reservations.toLocaleString()}</span>
                      <div className="flex items-center gap-0.5 text-[10px] text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {pharmacy.rating}
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-elevated rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(pharmacy.reservations / maxPharmacyRes) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-card rounded-[20px] border border-elevated p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                <Package className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-contrast-primary">Revenue by Category</h3>
                <p className="text-[10px] text-contrast-secondary">Product category breakdown</p>
              </div>
            </div>
            <div className="space-y-4">
              {categoryData.map((cat) => (
                <div key={cat.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-contrast-primary">{cat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-contrast-secondary">{cat.value}%</span>
                      <span className="text-[10px] font-medium text-emerald-600">+{cat.growth}%</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-elevated rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.value}%` }}
                      transition={{ duration: 0.6, delay: categoryData.indexOf(cat) * 0.05 }}
                      className="h-full rounded-full transition-all"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                  <p className="text-[10px] text-contrast-muted mt-1">{cat.orders.toLocaleString()} orders</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-card rounded-[20px] border border-elevated p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl bg-elevated flex items-center justify-center">
              <MapPin className="w-4 h-4 text-contrast-secondary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-contrast-primary">Geographic Distribution</h3>
              <p className="text-[10px] text-contrast-secondary">Activity by city</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {topCities.map((city) => {
              const maxGrowth = Math.max(...topCities.map((c) => c.growth));
              return (
                <div key={city.city} className="p-4 rounded-2xl bg-elevated border border-elevated hover:border-elevated transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-contrast-primary">{city.city}</span>
                    <span className={`text-[10px] font-semibold ${city.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      +{city.growth}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-contrast-secondary">Pharmacies</span>
                      <span className="font-medium text-contrast-primary">{city.pharmacies}</span>
                    </div>
                    <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(city.pharmacies / Math.max(...topCities.map((c) => c.pharmacies))) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full bg-brand-400"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-contrast-secondary">Reservations</span>
                      <span className="font-medium text-contrast-primary">{city.reservations.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-elevated rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(city.reservations / Math.max(...topCities.map((c) => c.reservations))) * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-full rounded-full bg-amber-400"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-card rounded-[20px] border border-elevated p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
        >
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center">
              <Activity className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-contrast-primary">Insights</h3>
              <p className="text-[10px] text-contrast-secondary">Automated performance summaries</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {insights.map((item, i) => (
              <InsightsCard key={i} {...item} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-card rounded-[20px] border border-elevated p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
        >
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl bg-card border border-elevated flex items-center justify-center">
              <FileText className="w-4 h-4 text-contrast-secondary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-contrast-primary">Report Generation</h3>
              <p className="text-[10px] text-contrast-secondary">Download platform reports</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {reportTypes.map((report) => (
              <button
                key={report.label}
                onClick={() => setReportView(report.label === reportView ? 'all' : report.label)}
                className={`p-4 rounded-2xl border text-left transition-all hover:shadow-md ${
                  reportView === report.label
                    ? 'bg-brand-50 border-brand-200 shadow-sm'
                    : 'bg-card border-elevated hover:border-elevated'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${report.bg} mb-2.5`}>
                  <report.icon className={`w-4 h-4 ${report.color}`} />
                </div>
                <p className="text-xs font-semibold text-contrast-primary">{report.label}</p>
                <p className="text-[10px] text-contrast-secondary mt-0.5 leading-tight">{report.desc}</p>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="bg-card rounded-[20px] border border-elevated p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-elevated flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-contrast-secondary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-contrast-primary">Monthly Performance</h3>
              <p className="text-[10px] text-contrast-secondary">Revenue, orders, and user growth by month</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-contrast-muted border-b border-elevated">
                  <th className="text-left pb-3 pr-4 font-semibold uppercase tracking-wider">Month</th>
                  <th className="text-right pb-3 px-4 font-semibold uppercase tracking-wider">Revenue</th>
                  <th className="text-right pb-3 px-4 font-semibold uppercase tracking-wider">Orders</th>
                  <th className="text-right pb-3 px-4 font-semibold uppercase tracking-wider">Users</th>
                  <th className="text-right pb-3 pl-4 font-semibold uppercase tracking-wider">AOV</th>
                </tr>
              </thead>
              <tbody>
                {chartData.slice().reverse().map((m) => (
                  <tr key={m.month} className="border-b border-elevated last:border-0 hover:bg-elevated/50 transition-colors">
                    <td className="py-3 pr-4 font-medium text-contrast-primary">{m.month}</td>
                    <td className="py-3 px-4 text-right text-contrast-primary font-mono text-[11px]">
                      {formatMAD(m.revenue ?? 0)}
                    </td>
                    <td className="py-3 px-4 text-right text-contrast-primary font-mono text-[11px]">
                      {(m.orders ?? 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-contrast-primary font-mono text-[11px]">
                      {(m.users ?? 0).toLocaleString()}
                    </td>
                    <td className="py-3 pl-4 text-right text-contrast-primary font-mono text-[11px]">
                      {formatMAD(((m.revenue ?? 0) / (m.orders ?? 1)))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
