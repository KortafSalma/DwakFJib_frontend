import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Search, Shield, User, Building2, Truck, AlertTriangle,
  Server, Globe, Database, Clock, Wifi, Users, LogIn, LogOut,
  Lock, Smartphone, MapPin,
  Ban, SlidersHorizontal, Calendar, ArrowUpDown, RefreshCw,
} from 'lucide-react';
import { EmptyState } from '../../components/ui';

const allLogs = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  action: [
    'User registered',
    'Pharmacy approved',
    'Reservation completed',
    'Distributor verified',
    'User banned',
    'Order shipped',
    'Medication added',
    'System backup completed',
    'User role updated',
    'Pharmacy reported issue',
    'Distributor route updated',
    'Payment processed',
    'User account deleted',
    'Pharmacy inventory updated',
    'System maintenance scheduled',
    'Security alert: unusual login',
    'New admin added',
    'Pharmacy closed temporarily',
    'Distributor contract renewed',
    'Reservation cancelled',
  ][i % 20],
  user: ['System', 'Sarah Johnson', 'Mike Chen', 'System', 'Sarah Johnson', 'John Doe', 'Ahmed Alami', 'System', 'Mike Chen', 'Fatima Zahra', 'Karim Idrissi', 'System', 'Sarah Johnson', 'Omar Bennani', 'System', 'System', 'John Doe', 'Ahmed Alami', 'Karim Idrissi', 'System'][i % 20],
  role: ['system', 'admin', 'admin', 'system', 'admin', 'admin', 'pharmacy', 'system', 'admin', 'pharmacy', 'distributor', 'system', 'admin', 'pharmacy', 'system', 'system', 'admin', 'pharmacy', 'distributor', 'system'][i % 20],
  target: ['#U-1024', '#P-305', '#R-8912', '#D-212', '#U-1189', '#O-4523', 'Aspirin 500mg', 'DB-backup', '#U-1192', 'Pharmacy NYC', '#DR-78', '#O-4621', '#U-1201', 'Inventory #P-305', 'Scheduled', 'IP: 192.168.1.45', '#A-005', 'Pharmacy NYC', 'DAL-003', '#R-8915'][i % 20],
  category: ['user', 'pharmacy', 'reservation', 'distributor', 'user', 'order', 'pharmacy', 'system', 'user', 'pharmacy', 'distributor', 'order', 'user', 'pharmacy', 'system', 'security', 'admin', 'pharmacy', 'distributor', 'reservation'][i % 20],
  severity: ['info', 'info', 'info', 'info', 'warning', 'info', 'info', 'info', 'warning', 'warning', 'info', 'info', 'danger', 'info', 'info', 'danger', 'info', 'warning', 'info', 'info'][i % 20],
  ip: [
    '192.168.1.100', '10.0.0.45', '192.168.2.50', '10.0.1.20',
    '172.16.0.10', '192.168.1.200', '10.0.0.88', '192.168.3.15',
    '172.16.1.5', '10.0.2.30', '192.168.1.55', '10.0.0.12',
    '172.16.2.8', '192.168.2.90', '10.0.1.75', '192.168.1.45',
    '10.0.0.33', '172.16.0.22', '192.168.3.60', '10.0.2.100',
  ][i % 20],
  status: ['success', 'success', 'success', 'success', 'warning', 'success', 'success', 'success', 'warning', 'warning', 'success', 'success', 'danger', 'success', 'info', 'danger', 'success', 'warning', 'success', 'success'][i % 20],
  timestamp: new Date(Date.now() - i * 3600000 - Math.random() * 3600000).toISOString(),
})).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

const securityEvents = [
  { id: 1, type: 'failed_login', user: 'unknown', source: '185.220.101.42', time: '12 min ago', count: 8, severity: 'critical' },
  { id: 2, type: 'failed_login', user: 'john.doe@example.com', source: '192.168.1.100', time: '45 min ago', count: 3, severity: 'warning' },
  { id: 3, type: 'password_change', user: 'Sarah Johnson', source: 'Admin Dashboard', time: '2 hours ago', severity: 'info' },
  { id: 4, type: 'unauthorized', user: 'guest_user', source: '203.0.113.50', time: '3 hours ago', resource: '/admin/settings', severity: 'critical' },
  { id: 5, type: 'password_change', user: 'Mike Chen', source: 'Pharmacy Dashboard', time: '5 hours ago', severity: 'info' },
  { id: 6, type: 'failed_login', user: 'pharmacy@citypharma.ma', source: '198.51.100.23', time: '6 hours ago', count: 2, severity: 'warning' },
  { id: 7, type: 'unauthorized', user: 'unknown', source: '192.0.2.80', time: '8 hours ago', resource: '/admin/users', severity: 'critical' },
  { id: 8, type: 'api_abuse', user: 'api_client_03', source: '198.51.100.77', time: '10 hours ago', rate: '450 req/min', severity: 'warning' },
];

const activeSessions = [
  { id: 1, user: 'Sarah Johnson', role: 'Admin', device: 'Chrome 120 / Windows 11', location: 'Casablanca, MA', duration: '2h 15m', status: 'active' },
  { id: 2, user: 'Mike Chen', role: 'Admin', device: 'Firefox 121 / macOS 14', location: 'Rabat, MA', duration: '1h 30m', status: 'active' },
  { id: 3, user: 'Ahmed Alami', role: 'Pharmacy', device: 'Safari 17 / iOS 18', location: 'Marrakech, MA', duration: '45m', status: 'active' },
  { id: 4, user: 'Fatima Zahra', role: 'Pharmacy', device: 'Chrome 120 / Android 14', location: 'Fes, MA', duration: '3h 10m', status: 'active' },
  { id: 5, user: 'Karim Idrissi', role: 'Distributor', device: 'Edge 120 / Windows 11', location: 'Tangier, MA', duration: '25m', status: 'idle' },
  { id: 6, user: 'John Doe', role: 'Admin', device: 'Chrome 120 / Linux', location: 'Casablanca, MA', duration: '4h 05m', status: 'active' },
];

const systemHealth = [
  { label: 'API Status', status: 'operational', icon: Server, uptime: '99.97%', latency: '45ms', color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-400' },
  { label: 'Server Response Time', status: 'degraded', icon: Clock, uptime: '99.2%', latency: '320ms', color: 'text-amber-600', bg: 'bg-amber-50', dot: 'bg-amber-400' },
  { label: 'Database Status', status: 'operational', icon: Database, uptime: '99.99%', latency: '12ms', color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-400' },
  { label: 'Error Rate', status: 'operational', icon: AlertTriangle, uptime: '99.95%', errorRate: '0.02%', color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-400' },
  { label: 'WebSocket', status: 'operational', icon: Wifi, uptime: '99.8%', latency: '28ms', color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-400' },
];

const alerts = [
  { id: 1, type: 'critical', title: 'Multiple failed login attempts detected', desc: '8 failed attempts from IP 185.220.101.42 in the last 15 minutes', time: '12 min ago', icon: LogIn },
  { id: 2, type: 'warning', title: 'High API latency detected', desc: 'Average response time is 320ms, above the 200ms threshold', time: '5 min ago', icon: Clock },
  { id: 3, type: 'critical', title: 'Unauthorized access attempt blocked', desc: 'Guest user attempted to access /admin/settings from IP 203.0.113.50', time: '3 hours ago', icon: Shield },
  { id: 4, type: 'warning', title: 'API rate limit approaching', desc: 'Client api_client_03 at 450 req/min, limit is 500 req/min', time: '10 hours ago', icon: Activity },
  { id: 5, type: 'info', title: 'Database backup completed', desc: 'Scheduled backup completed successfully. Size: 2.4 GB', time: '1 day ago', icon: Database },
  { id: 6, type: 'info', title: 'SSL certificate renewal', desc: 'SSL certificate for *.dwakfjib.ma renewed, expires in 89 days', time: '2 days ago', icon: Lock },
];

const categoryConfig = {
  user: { icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
  pharmacy: { icon: Building2, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
  distributor: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
  admin: { icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
  system: { icon: Activity, color: 'text-slate-600', bg: 'bg-slate-100' },
  security: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  order: { icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  reservation: { icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' },
};

const roleColors = {
  admin: 'bg-purple-50 text-purple-700 border-purple-200',
  pharmacy: 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20',
  distributor: 'bg-blue-50 text-blue-700 border-blue-200',
  system: 'bg-slate-100 text-slate-600 border-slate-200',
  user: 'bg-amber-50 text-amber-700 border-amber-200',
};

const statusConfig = {
  success: { label: 'Success', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  warning: { label: 'Warning', class: 'bg-amber-50 text-amber-700 border-amber-200' },
  danger: { label: 'Failed', class: 'bg-red-50 text-red-700 border-red-200' },
  info: { label: 'Info', class: 'bg-blue-50 text-blue-700 border-blue-200' },
};

const roleFilterOptions = ['all', 'admin', 'pharmacy', 'distributor', 'system', 'user'];
const actionTypeOptions = ['all', 'user', 'pharmacy', 'distributor', 'order', 'reservation', 'system', 'security', 'admin'];
const statusFilterOptions = ['all', 'success', 'warning', 'danger', 'info'];
const dateRangeOptions = [
  { value: 'all', label: 'All Time' },
  { value: '24h', label: '24 Hours' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
];

const overviewCards = [
  { label: 'Active Sessions', value: activeSessions.filter(s => s.status === 'active').length, sub: 'Currently logged in', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', pulse: true },
  { label: 'Failed Login Attempts', value: securityEvents.filter(e => e.type === 'failed_login').reduce((s, e) => s + (e.count || 1), 0), sub: 'Last 24 hours', icon: LogIn, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', pulse: true },
  { label: 'Suspicious Activities', value: securityEvents.filter(e => e.severity === 'critical').length, sub: 'Requires investigation', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', pulse: true },
  { label: 'Blocked Requests', value: '1,247', sub: 'This month', icon: Ban, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', pulse: false },
  { label: 'System Health', value: '98.7%', sub: 'Overall uptime', icon: Activity, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10', border: 'border-[#14B8A6]/30', pulse: false },
];

function formatTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString();
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const ActivityLogs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [logsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('timestamp');
  const [sortDir, setSortDir] = useState('desc');
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [secActions, setSecActions] = useState({});

  const filteredLogs = useMemo(() => {
    let result = [...allLogs];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((log) =>
        log.action.toLowerCase().includes(q) ||
        log.user.toLowerCase().includes(q) ||
        log.target.toLowerCase().includes(q) ||
        log.ip.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') result = result.filter((l) => l.category === categoryFilter);
    if (roleFilter !== 'all') result = result.filter((l) => l.role === roleFilter);
    if (statusFilter !== 'all') result = result.filter((l) => l.status === statusFilter);
    if (dateRange !== 'all') {
      const cutoff = Date.now() - (
        dateRange === '24h' ? 86400000 :
        dateRange === '7d' ? 604800000 :
        dateRange === '30d' ? 2592000000 :
        dateRange === '90d' ? 7776000000 : 0
      );
      result = result.filter((l) => new Date(l.timestamp).getTime() > cutoff);
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal) : aVal - bVal;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [search, categoryFilter, roleFilter, statusFilter, dateRange, sortField, sortDir]);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const handleSecAction = (type, id) => {
    setSecActions((prev) => ({ ...prev, [`${type}-${id}`]: true }));
    setTimeout(() => {
      setSecActions((prev) => ({ ...prev, [`${type}-${id}`]: false }));
    }, 2000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'logs', label: 'Audit Logs', icon: Activity },
    { id: 'events', label: 'Security Events', icon: AlertTriangle },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-7">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Security & Monitoring</h1>
              <p className="text-sm text-slate-500 mt-0.5">Monitor system activity, security events, and audit logs.</p>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100 inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {overviewCards.map((card) => (
                <motion.div
                  key={card.label}
                  variants={fadeUp}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:shadow-slate-100/80 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-11 h-11 rounded-2xl ${card.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <card.icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    {card.pulse && (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-slate-800 tracking-tight">{card.value}</p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{card.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{card.sub}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-7">
              <motion.div variants={fadeUp} className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-100/80 transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Alerts Center</h3>
                    <p className="text-[10px] text-slate-500">Real-time security notifications</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {alerts.map((alert) => {
                    const severityColors = {
                      critical: 'bg-red-50 border-red-200',
                      warning: 'bg-amber-50 border-amber-200',
                      info: 'bg-blue-50 border-blue-200',
                    };
                    const dotColors = {
                      critical: 'bg-red-400',
                      warning: 'bg-amber-400',
                      info: 'bg-blue-400',
                    };
                    const badgeColors = {
                      critical: 'bg-red-100 text-red-700 border-red-200',
                      warning: 'bg-amber-100 text-amber-700 border-amber-200',
                      info: 'bg-blue-100 text-blue-700 border-blue-200',
                    };
                    return (
                      <div key={alert.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-sm ${severityColors[alert.type]}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          alert.type === 'critical' ? 'bg-red-100 text-red-600' :
                          alert.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <alert.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-slate-800">{alert.title}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${badgeColors[alert.type]}`}>
                              {alert.type.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{alert.desc}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">{alert.time}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-100/80 transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">System Health</h3>
                    <p className="text-[10px] text-slate-500">Service status overview</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {systemHealth.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-700">{item.label}</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                            <span className={`text-[10px] font-semibold ${item.color}`}>
                              {item.status === 'operational' ? 'Operational' : 'Degraded'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          {item.latency && <span className="text-[10px] text-slate-400">{item.latency}</span>}
                          {item.uptime && <span className="text-[10px] text-slate-400">Uptime: {item.uptime}</span>}
                          {item.errorRate && <span className="text-[10px] text-slate-400">Error: {item.errorRate}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'logs' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-100/80 transition-all">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                      placeholder="Search logs by user, action, or IP..."
                      className="w-full h-11 pl-11 pr-4 rounded-2xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#14B8A6]/50 focus:ring-2 focus:ring-[#14B8A6]/10 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-500">Date:</span>
                  </div>
                  {dateRangeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setDateRange(opt.value); setCurrentPage(1); }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                        dateRange === opt.value
                          ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20'
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-500">Role:</span>
                  </div>
                  {roleFilterOptions.map((r) => (
                    <button
                      key={r}
                      onClick={() => { setRoleFilter(r); setCurrentPage(1); }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all capitalize ${
                        roleFilter === r
                          ? 'bg-purple-50 text-purple-600 border border-purple-200'
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-500">Action:</span>
                  </div>
                  {actionTypeOptions.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategoryFilter(cat); setCurrentPage(1); }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all capitalize ${
                        categoryFilter === cat
                          ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20'
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-500">Status:</span>
                  </div>
                  {statusFilterOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all capitalize ${
                        statusFilter === s
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="text-left pb-3 pr-3 font-semibold uppercase tracking-wider">
                        <button onClick={() => handleSort('user')} className="flex items-center gap-1 hover:text-slate-700 transition-colors">
                          User <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="text-left pb-3 px-3 font-semibold uppercase tracking-wider">
                        <button onClick={() => handleSort('action')} className="flex items-center gap-1 hover:text-slate-700 transition-colors">
                          Action <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="text-left pb-3 px-3 font-semibold uppercase tracking-wider hidden md:table-cell">Role</th>
                      <th className="text-left pb-3 px-3 font-semibold uppercase tracking-wider">
                        <button onClick={() => handleSort('timestamp')} className="flex items-center gap-1 hover:text-slate-700 transition-colors">
                          Timestamp <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="text-left pb-3 px-3 font-semibold uppercase tracking-wider hidden lg:table-cell">IP Address</th>
                      <th className="text-left pb-3 pl-3 font-semibold uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLogs.length > 0 ? paginatedLogs.map((log, i) => {
                      const config = categoryConfig[log.category] || categoryConfig.system;
                      const Icon = config.icon;
                      const sc = statusConfig[log.status] || statusConfig.info;
                      return (
                        <motion.tr
                          key={log.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.015 }}
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="py-3 pr-3">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg} ${config.color}`}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="font-medium text-slate-700 text-[11px]">{log.user}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-600 text-[11px]">{log.action}</td>
                          <td className="py-3 px-3 hidden md:table-cell">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-semibold border ${roleColors[log.role] || roleColors.system}`}>
                              {log.role}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-400 text-[10px] whitespace-nowrap">{formatTime(log.timestamp)}</td>
                          <td className="py-3 px-3 text-slate-400 text-[10px] font-mono hidden lg:table-cell">{log.ip}</td>
                          <td className="py-3 pl-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-semibold border ${sc.class}`}>
                              {sc.label}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan={6} className="py-16">
                          <EmptyState
                            icon={Search}
                            title="No logs found"
                            description="Try adjusting your filters or search query."
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-400">Showing {(currentPage - 1) * logsPerPage + 1} - {Math.min(currentPage * logsPerPage, filteredLogs.length)} of {filteredLogs.length}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                          page === currentPage
                            ? 'bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20'
                            : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-7">
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-100/80 transition-all">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Security Events</h3>
                  <p className="text-[10px] text-slate-500">Failed logins, password changes, and unauthorized access</p>
                </div>
              </div>
              <div className="space-y-2">
                {securityEvents.map((event) => {
                  const severityBg = event.severity === 'critical' ? 'bg-red-50 border-red-200' : event.severity === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200';
                  const typeIcon = event.type === 'failed_login' ? LogIn : event.type === 'password_change' ? Lock : event.type === 'unauthorized' ? Ban : Activity;
                  const typeColor = event.severity === 'critical' ? 'text-red-600' : event.severity === 'warning' ? 'text-amber-600' : 'text-blue-600';
                  const typeBg = event.severity === 'critical' ? 'bg-red-100' : event.severity === 'warning' ? 'bg-amber-100' : 'bg-blue-100';
                  return (
                    <div key={event.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-sm ${severityBg}`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${typeBg}`}>
                        <typeIcon className={`w-4 h-4 ${typeColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-slate-800 capitalize">{event.type.replace('_', ' ')}</span>
                          <span className={`text-[10px] font-medium text-slate-500`}>by {event.user}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                            event.severity === 'critical' ? 'bg-red-100 text-red-700 border-red-200' :
                            event.severity === 'warning' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                            'bg-blue-100 text-blue-700 border-blue-200'
                          }`}>
                            {event.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-[10px] text-slate-400 font-mono">Source: {event.source}</span>
                          {!!event.count && <span className="text-[10px] text-red-500 font-semibold">{event.count} attempts</span>}
                          {event.resource && <span className="text-[10px] text-slate-400">Target: {event.resource}</span>}
                          {event.rate && <span className="text-[10px] text-amber-600 font-semibold">{event.rate}</span>}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 flex-shrink-0">{event.time}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-100/80 transition-all">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Active Sessions</h3>
                  <p className="text-[10px] text-slate-500">Currently logged-in users ({activeSessions.length})</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="text-left pb-3 pr-3 font-semibold uppercase tracking-wider">User</th>
                      <th className="text-left pb-3 px-3 font-semibold uppercase tracking-wider hidden sm:table-cell">Device</th>
                      <th className="text-left pb-3 px-3 font-semibold uppercase tracking-wider hidden md:table-cell">Location</th>
                      <th className="text-left pb-3 px-3 font-semibold uppercase tracking-wider">Duration</th>
                      <th className="text-left pb-3 px-3 font-semibold uppercase tracking-wider">Status</th>
                      <th className="text-left pb-3 pl-3 font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSessions.map((session) => (
                      <tr key={session.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              session.role === 'Admin' ? 'bg-purple-50 text-purple-600' :
                              session.role === 'Pharmacy' ? 'bg-[#14B8A6]/10 text-[#14B8A6]' :
                              'bg-blue-50 text-blue-600'
                            }`}>
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="font-medium text-slate-700 text-[11px]">{session.user}</span>
                              <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[8px] font-semibold border ${
                                session.role === 'Admin' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                session.role === 'Pharmacy' ? 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20' :
                                'bg-blue-50 text-blue-600 border-blue-200'
                              }`}>
                                {session.role}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 hidden sm:table-cell">
                          <div className="flex items-center gap-1.5">
                            <Smartphone className="w-3 h-3 text-slate-400" />
                            <span className="text-[10px] text-slate-500 truncate max-w-[180px]">{session.device}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 hidden md:table-cell">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="text-[10px] text-slate-500">{session.location}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span className="text-[10px] text-slate-500">{session.duration}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`flex items-center gap-1.5 text-[10px] font-semibold ${
                            session.status === 'active' ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              session.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'
                            }`} />
                            {session.status === 'active' ? 'Active' : 'Idle'}
                          </span>
                        </td>
                        <td className="py-3 pl-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleSecAction('terminate', session.id)}
                              className="px-2 py-1 rounded-lg text-[9px] font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-all disabled:opacity-50"
                              disabled={secActions[`terminate-${session.id}`]}
                            >
                              {secActions[`terminate-${session.id}`] ? 'Terminated' : 'Terminate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-100/80 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Security Actions</h3>
                  <p className="text-[10px] text-slate-500">Quick actions for threat response</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Terminate Session', icon: LogOut, desc: 'Force logout a user session', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', action: 'terminate_all' },
                  { label: 'Block IP', icon: Ban, desc: 'Block an IP address temporarily', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', action: 'block_ip' },
                  { label: 'Reset Password', icon: RefreshCw, desc: 'Send password reset to user', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', action: 'reset_pwd' },
                  { label: 'Lock Account', icon: Lock, desc: 'Temporarily lock a user account', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', action: 'lock_account' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSecAction(item.action, 'global')}
                    disabled={secActions[`${item.action}-global`]}
                    className={`p-4 rounded-2xl border ${item.border} ${item.bg} hover:shadow-md transition-all disabled:opacity-50 text-left`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-2.5`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{item.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                    {secActions[`${item.action}-global`] && (
                      <span className="inline-block mt-2 text-[9px] font-semibold text-emerald-600">✓ Action dispatched</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
