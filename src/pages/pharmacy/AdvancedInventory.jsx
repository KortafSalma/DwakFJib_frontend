import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, TrendingDown, RefreshCw, BarChart3, Activity,
  AlertTriangle, AlertCircle, CheckCircle, Clock, Package,
  ArrowUp, ArrowDown, DollarSign, Search, Filter,
  ChevronDown, ChevronUp, Loader2, EyeOff, X
} from 'lucide-react';
import { useExpiryMonitoring, useLowStockForecast, useMovementHistory, useReorderRecommendations, useTrends } from '../../hooks';
import formatMAD from '../../utils/currency';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const StatCard = ({ icon: Icon, label, value, color, subtitle }) => (
  <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-subtle p-5 transition-all duration-200">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.bg}`}>
        <Icon className={`w-5 h-5 ${color.text}`} />
      </div>
      {subtitle && <span className="text-[10px] text-contrast-muted">{subtitle}</span>}
    </div>
    <p className="text-2xl font-bold text-contrast-primary">{value}</p>
    <p className="text-xs text-contrast-muted mt-0.5">{label}</p>
  </motion.div>
);

const TabButton = ({ active, label, icon: Icon, count, color }) => (
  <button
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
      active ? 'bg-card border border-subtle shadow-sm text-contrast-primary' : 'text-contrast-muted hover:text-contrast-secondary hover:bg-elevated'
    }`}
  >
    <Icon className={`w-4 h-4 ${active ? color || 'text-primary' : ''}`} />
    {label}
    {count !== undefined && (
      <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${active ? 'bg-primary/10 text-primary' : 'bg-elevated text-contrast-muted'}`}>
        {count}
      </span>
    )}
  </button>
);

const AdvancedInventory = () => {
  const [activeTab, setActiveTab] = useState('expiry');

  const tabs = [
    { key: 'expiry', label: 'Expiry Monitor', icon: Calendar },
    { key: 'forecast', label: 'Stock Forecast', icon: TrendingDown },
    { key: 'movements', label: 'Movement History', icon: Activity },
    { key: 'reorder', label: 'Reorder Recs', icon: RefreshCw },
    { key: 'trends', label: 'Trends', icon: BarChart3 },
  ];

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Advanced Inventory</h1>
          <p className="text-sm text-contrast-muted mt-1">Expiry monitoring, forecasting, and analytics</p>
        </motion.div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              active={activeTab === tab.key}
              label={tab.label}
              icon={tab.icon}
              onClick={() => setActiveTab(tab.key)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {activeTab === 'expiry' && <ExpiryTab />}
            {activeTab === 'forecast' && <ForecastTab />}
            {activeTab === 'movements' && <MovementsTab />}
            {activeTab === 'reorder' && <ReorderTab />}
            {activeTab === 'trends' && <TrendsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ExpiryTab = () => {
  const { data, loading } = useExpiryMonitoring();
  const [showAll, setShowAll] = useState({});

  const grouped = data?.grouped || {};
  const summary = data?.summary || {};

  const sections = [
    { key: 'expired', label: 'Expired', items: grouped.expired || [], color: 'text-red-500', bg: 'bg-red-50', icon: X },
    { key: 'expiring_within_30_days', label: 'Expiring within 30 days', items: grouped.expiring_within_30_days || [], color: 'text-orange-500', bg: 'bg-orange-50', icon: AlertTriangle },
    { key: 'expiring_within_90_days', label: 'Expiring within 90 days', items: grouped.expiring_within_90_days || [], color: 'text-amber-500', bg: 'bg-amber-50', icon: Clock },
    { key: 'expiring_later', label: 'Valid (90+ days)', items: grouped.expiring_later || [], color: 'text-emerald-500', bg: 'bg-emerald-50', icon: CheckCircle },
    { key: 'no_expiry', label: 'No expiry date', items: grouped.no_expiry || [], color: 'text-gray-500', bg: 'bg-gray-50', icon: EyeOff },
  ];

  const statsCards = [
    { icon: X, label: 'Expired', value: summary.total_expired || 0, color: { bg: 'bg-red-50', text: 'text-red-500' } },
    { icon: AlertTriangle, label: 'Expiring in 30d', value: summary.total_expiring_30d || 0, color: { bg: 'bg-orange-50', text: 'text-orange-500' } },
    { icon: Clock, label: 'Expiring in 90d', value: summary.total_expiring_90d || 0, color: { bg: 'bg-amber-50', text: 'text-amber-500' } },
    { icon: DollarSign, label: 'Potential Loss', value: formatMAD(summary.potential_loss_amount || 0), color: { bg: 'bg-red-50', text: 'text-red-500' } },
  ];

  return (
    <div className="space-y-6">
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, i) => <StatCard key={i} {...card} />)}
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => {
            if (section.items.length === 0) return null;
            const expanded = showAll[section.key] || false;
            const display = expanded ? section.items : section.items.slice(0, 5);
            return (
              <div key={section.key} className="bg-card rounded-2xl border border-subtle p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <section.icon className={`w-5 h-5 ${section.color}`} />
                    <h3 className="font-semibold text-contrast-primary">{section.label}</h3>
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${section.bg} ${section.color}`}>
                      {section.items.length}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {display.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-elevated border border-subtle">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-contrast-primary truncate">{item.name}</p>
                        <div className="flex items-center gap-3 mt-0.5 text-[11px] text-contrast-muted">
                          <span>Stock: {item.stock}</span>
                          {item.batch_number && <span>Batch: {item.batch_number}</span>}
                          {item.category && <span>{item.category}</span>}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        {item.days_until_expiry !== null && (
                          <p className={`text-xs font-semibold ${item.days_until_expiry <= 0 ? 'text-red-500' : item.days_until_expiry <= 30 ? 'text-orange-500' : 'text-contrast-muted'}`}>
                            {item.days_until_expiry <= 0 ? 'EXPIRED' : `${item.days_until_expiry}d left`}
                          </p>
                        )}
                        <p className="text-[10px] text-contrast-muted">{item.expiry_date || 'N/A'}</p>
                        {item.potential_loss > 0 && (
                          <p className="text-[10px] text-red-400">Loss: ${item.potential_loss}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {section.items.length > 5 && (
                  <button onClick={() => setShowAll((prev) => ({ ...prev, [section.key]: !expanded }))} className="flex items-center gap-1 mt-3 text-xs text-primary hover:underline mx-auto">
                    {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {expanded ? 'Show less' : `Show all ${section.items.length}`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ForecastTab = () => {
  const { data, loading } = useLowStockForecast();
  const [search, setSearch] = useState('');

  const forecasts = useMemo(() => {
    const items = data?.forecasts || [];
    if (!search) return items;
    return items.filter((f) => f.name?.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  const summary = data?.summary || {};

  const riskStyles = {
    critical: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Critical', icon: AlertCircle },
    high: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', label: 'High', icon: AlertTriangle },
    medium: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Medium', icon: Clock },
    low: { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Low', icon: TrendingDown },
    none: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Stable', icon: CheckCircle },
  };

  return (
    <div className="space-y-6">
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={AlertCircle} label="Critical" value={summary.critical || 0} color={{ bg: 'bg-red-50', text: 'text-red-500' }} subtitle={`of ${summary.total_analyzed || 0} items`} />
        <StatCard icon={AlertTriangle} label="High Risk" value={summary.high_risk || 0} color={{ bg: 'bg-orange-50', text: 'text-orange-500' }} />
        <StatCard icon={Clock} label="Medium Risk" value={summary.medium_risk || 0} color={{ bg: 'bg-amber-50', text: 'text-amber-500' }} />
        <StatCard icon={Package} label="Low Stock" value={summary.low_stock_count || 0} color={{ bg: 'bg-purple-50', text: 'text-purple-500' }} subtitle={`${summary.analysis_period_days || 90}d analysis`} />
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : forecasts.length === 0 ? (
        <div className="text-center py-16 text-contrast-muted">
          <TrendingDown className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No forecast data available. Stock movements are needed to generate predictions.</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-subtle p-5">
          <div className="relative max-w-sm mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter by name..." className="w-full pl-9 pr-3 py-2 text-sm bg-elevated border border-subtle rounded-lg text-contrast-primary placeholder:text-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="space-y-2">
            {forecasts.map((item) => {
              const risk = riskStyles[item.risk] || riskStyles.none;
              return (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-elevated border border-subtle">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${risk.bg}`}>
                    <risk.icon className={`w-5 h-5 ${risk.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-contrast-primary truncate">{item.name}</p>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${risk.bg} ${risk.color} ${risk.border}`}>
                        {risk.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-[11px] text-contrast-muted">
                      <span>Stock: <strong className={item.is_low_stock ? 'text-amber-500' : 'text-contrast-primary'}>{item.current_stock}</strong></span>
                      <span>Consumption: <strong>{item.daily_consumption}/day</strong></span>
                      {item.days_until_stockout !== null && (
                        <span className={item.days_until_stockout <= 7 ? 'text-red-500' : item.days_until_stockout <= 30 ? 'text-orange-500' : ''}>
                          Stockout: <strong>{item.days_until_stockout}d</strong>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-contrast-muted">Predicted</p>
                    <p className="text-sm font-semibold text-contrast-primary">{item.predicted_stock_30d} in 30d</p>
                    <p className="text-xs text-contrast-muted">{item.predicted_stock_90d} in 90d</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const MovementsTab = () => {
  const [filters, setFilters] = useState({ type: '', search: '' });
  const { data, loading } = useMovementHistory(filters);

  const movements = data?.movements || [];
  const meta = data?.meta || {};
  const aggregates = data?.aggregates || {};

  const typeStyles = {
    IN: { color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Stock In' },
    OUT: { color: 'text-red-600', bg: 'bg-red-50', label: 'Stock Out' },
    ADJUSTMENT: { color: 'text-amber-600', bg: 'bg-amber-50', label: 'Adjustment' },
    EXPIRED: { color: 'text-gray-600', bg: 'bg-gray-50', label: 'Expired' },
  };

  const statsCards = [
    { icon: ArrowUp, label: 'Total In', value: aggregates.in_quantity || 0, color: { bg: 'bg-emerald-50', text: 'text-emerald-500' }, subtitle: `${aggregates.in_count || 0} transactions` },
    { icon: ArrowDown, label: 'Total Out', value: aggregates.out_quantity || 0, color: { bg: 'bg-red-50', text: 'text-red-500' }, subtitle: `${aggregates.out_count || 0} transactions` },
    { icon: Filter, label: 'Adjustments', value: aggregates.adjustment_count || 0, color: { bg: 'bg-amber-50', text: 'text-amber-500' } },
    { icon: X, label: 'Expired Items', value: aggregates.expired_count || 0, color: { bg: 'bg-gray-50', text: 'text-gray-500' } },
  ];

  return (
    <div className="space-y-6">
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, i) => <StatCard key={i} {...card} />)}
      </motion.div>

      <div className="bg-card rounded-2xl border border-subtle p-5">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
            <input type="text" placeholder="Search medication..." value={filters.search} onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))} className="w-full pl-9 pr-3 py-2 text-sm bg-elevated border border-subtle rounded-lg text-contrast-primary placeholder:text-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <select value={filters.type} onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))} className="px-3 py-2 text-sm bg-elevated border border-subtle rounded-lg text-contrast-primary focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">All Types</option>
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
            <option value="ADJUSTMENT">Adjustment</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : movements.length === 0 ? (
          <div className="text-center py-16 text-contrast-muted">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No stock movements found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {movements.map((m) => {
              const style = typeStyles[m.type] || typeStyles.ADJUSTMENT;
              return (
                <div key={m.id} className="flex items-center gap-4 p-3 rounded-xl bg-elevated border border-subtle">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${style.bg}`}>
                    {m.type === 'IN' ? <ArrowUp className={`w-4 h-4 ${style.color}`} /> : m.type === 'OUT' ? <ArrowDown className={`w-4 h-4 ${style.color}`} /> : <Filter className={`w-4 h-4 ${style.color}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-contrast-primary truncate">{m.medication?.name || 'Unknown'}</p>
                    <div className="flex items-center gap-3 text-[11px] text-contrast-muted mt-0.5">
                      <span className={`font-medium ${style.color}`}>{style.label}</span>
                      <span>Qty: {m.quantity}</span>
                      <span>Stock: {m.stock_before} → {m.stock_after}</span>
                      {m.reason && <span className="truncate">· {m.reason}</span>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[11px] text-contrast-muted">{m.created_at ? new Date(m.created_at).toLocaleDateString() : ''}</p>
                    {m.user?.name && <p className="text-[10px] text-contrast-muted">{m.user.name}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {meta.total > meta.per_page && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-subtle">
            <p className="text-xs text-contrast-muted">Page {meta.current_page} of {meta.last_page} ({meta.total} total)</p>
            <div className="flex gap-2">
              <button disabled={meta.current_page <= 1} onClick={() => setFilters((p) => ({ ...p, page: (meta.current_page || 1) - 1 }))} className="px-3 py-1.5 text-xs bg-elevated border border-subtle rounded-lg text-contrast-secondary disabled:opacity-50">Prev</button>
              <button disabled={meta.current_page >= meta.last_page} onClick={() => setFilters((p) => ({ ...p, page: (meta.current_page || 1) + 1 }))} className="px-3 py-1.5 text-xs bg-elevated border border-subtle rounded-lg text-contrast-secondary disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ReorderTab = () => {
  const { data, loading } = useReorderRecommendations();
  const [search, setSearch] = useState('');

  const recommendations = useMemo(() => {
    const items = data?.recommendations || [];
    if (!search) return items;
    return items.filter((r) => r.name?.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  const summary = data?.summary || {};

  const urgencyStyles = {
    critical: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', label: 'Critical' },
    high: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', label: 'High' },
    medium: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Medium' },
    low: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Low' },
  };

  return (
    <div className="space-y-6">
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={RefreshCw} label="Items to Reorder" value={summary.total_to_reorder || 0} color={{ bg: 'bg-primary/10', text: 'text-primary' }} subtitle={`${summary.total_suggested_units || 0} units`} />
        <StatCard icon={AlertCircle} label="Critical" value={summary.critical || 0} color={{ bg: 'bg-red-50', text: 'text-red-500' }} />
        <StatCard icon={AlertTriangle} label="High Priority" value={summary.high || 0} color={{ bg: 'bg-orange-50', text: 'text-orange-500' }} />
        <StatCard icon={DollarSign} label="Est. Total Cost" value={formatMAD(summary.total_estimated_cost || 0)} color={{ bg: 'bg-purple-50', text: 'text-purple-500' }} />
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-16 text-contrast-muted">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium text-contrast-secondary">All items are well-stocked</p>
          <p className="text-xs mt-1">No reorder recommendations at this time</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-subtle p-5">
          <div className="relative max-w-sm mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter..." className="w-full pl-9 pr-3 py-2 text-sm bg-elevated border border-subtle rounded-lg text-contrast-primary placeholder:text-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="space-y-2">
            {recommendations.map((rec) => {
              const urg = urgencyStyles[rec.urgency] || urgencyStyles.low;
              return (
                <div key={rec.id} className="flex items-center gap-4 p-4 rounded-xl bg-elevated border border-subtle">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${urg.bg}`}>
                    <RefreshCw className={`w-5 h-5 ${urg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-contrast-primary truncate">{rec.name}</p>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${urg.bg} ${urg.color} ${urg.border}`}>
                        {urg.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-[11px] text-contrast-muted">
                      <span>Stock: <strong className={rec.current_stock <= 0 ? 'text-red-500' : 'text-contrast-primary'}>{rec.current_stock}</strong></span>
                      <span>Threshold: {rec.low_stock_threshold}</span>
                      <span>Consumption: {rec.daily_consumption}/day</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-primary">+{rec.suggested_quantity}</p>
                    <p className="text-[10px] text-contrast-muted">{formatMAD(rec.estimated_cost)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const TrendsTab = () => {
  const { data, loading } = useTrends();
  const dailyChart = data?.daily_chart || [];
  const categorySummary = data?.category_summary || [];
  const globalTrend = data?.global_trend || {};
  const topMoving = data?.top_moving || [];

  const totalIn = dailyChart.reduce((s, d) => s + d.in, 0);
  const totalOut = dailyChart.reduce((s, d) => s + d.out, 0);

  return (
    <div className="space-y-6">
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Stock In" value={totalIn} color={{ bg: 'bg-emerald-50', text: 'text-emerald-500' }} subtitle="entire period" />
        <StatCard icon={Package} label="Total Stock Out" value={totalOut} color={{ bg: 'bg-red-50', text: 'text-red-500' }} subtitle="entire period" />
        <StatCard icon={ArrowUp} label="Net Flow" value={globalTrend.net_flow !== undefined ? (globalTrend.net_flow >= 0 ? `+${globalTrend.net_flow}` : globalTrend.net_flow) : 0} color={{ bg: globalTrend.net_flow >= 0 ? 'bg-emerald-50' : 'bg-red-50', text: globalTrend.net_flow >= 0 ? 'text-emerald-500' : 'text-red-500' }} />
        <StatCard icon={BarChart3} label="Top Product Moves" value={topMoving.length} color={{ bg: 'bg-blue-50', text: 'text-blue-500' }} subtitle="highest volume" />
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl border border-subtle p-5">
            <h3 className="font-semibold text-contrast-primary mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Daily Movement Trend
            </h3>
            <div className="space-y-1">
              {dailyChart.length === 0 ? (
                <p className="text-sm text-contrast-muted py-8 text-center">No daily data available</p>
              ) : (
                dailyChart.slice(-30).map((day) => {
                  const maxVal = Math.max(day.in, day.out, 1);
                  const inPct = (day.in / maxVal) * 100;
                  const outPct = (day.out / maxVal) * 100;
                  return (
                    <div key={day.date} className="flex items-center gap-2 text-[10px]">
                      <span className="w-20 text-right text-contrast-muted flex-shrink-0">{day.date.slice(5)}</span>
                      <div className="flex-1 flex items-center gap-0.5 h-6">
                        <div className="flex-1 flex justify-end">
                          <div style={{ width: `${inPct}%` }} className="h-3 rounded-l bg-emerald-400/70 min-w-[2px]" />
                        </div>
                        <div className="flex-1">
                          <div style={{ width: `${outPct}%` }} className="h-3 rounded-r bg-red-400/70 min-w-[2px]" />
                        </div>
                      </div>
                      <span className="w-12 text-right text-contrast-muted flex-shrink-0">{day.in + day.out}</span>
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-contrast-muted">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-400" /> In</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-400" /> Out</span>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-subtle p-5">
            <h3 className="font-semibold text-contrast-primary mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              Category Distribution
            </h3>
            <div className="space-y-3">
              {categorySummary.length === 0 ? (
                <p className="text-sm text-contrast-muted py-8 text-center">No category data</p>
              ) : (
                categorySummary.map((cat) => {
                  const maxVal = Math.max(...categorySummary.map((c) => c.total_stock || 0), 1);
                  const pct = ((cat.total_stock || 0) / maxVal) * 100;
                  return (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-contrast-primary truncate">{cat.category}</span>
                        <span className="text-contrast-muted flex-shrink-0 ml-2">{cat.total_stock || 0} units</span>
                      </div>
                      <div className="w-full h-2 bg-elevated rounded-full overflow-hidden">
                        <div style={{ width: `${pct}%` }} className="h-full bg-primary rounded-full" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {topMoving.length > 0 && (
            <div className="lg:col-span-2 bg-card rounded-2xl border border-subtle p-5">
              <h3 className="font-semibold text-contrast-primary mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Top Moving Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {topMoving.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-elevated border border-subtle text-center">
                    <p className="text-sm font-semibold text-contrast-primary truncate">{item.name}</p>
                    <p className="text-lg font-bold text-primary mt-1">{item.total_moved}</p>
                    <p className="text-[10px] text-contrast-muted">units moved</p>
                    <p className="text-[10px] text-contrast-muted">Current: {item.current_stock}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedInventory;
