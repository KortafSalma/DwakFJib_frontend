import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, CheckCircle, XCircle, User, Calendar } from 'lucide-react';
import { mockReservations } from '../../mock/pharmacyData';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const statusConfig = {
  PENDING: { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: Clock },
  PAID: { color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200', icon: CheckCircle },
  COMPLETED: { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle },
  CANCELLED: { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
};

const ReservationManagement = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = mockReservations.filter((r) => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSearch = r.medication.toLowerCase().includes(search.toLowerCase()) || r.user.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: mockReservations.length,
    PENDING: mockReservations.filter((r) => r.status === 'PENDING').length,
    PAID: mockReservations.filter((r) => r.status === 'PAID').length,
    COMPLETED: mockReservations.filter((r) => r.status === 'COMPLETED').length,
    CANCELLED: mockReservations.filter((r) => r.status === 'CANCELLED').length,
  };

  const pendingQueue = mockReservations.filter((r) => r.status === 'PENDING' || r.status === 'PAID');

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Reservation Management</h1>
          <p className="text-sm text-contrast-muted mt-1">Track and manage all reservations</p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by medication or patient..."
              className="w-full h-11 pl-11 pr-4 rounded-2xl border border-elevated bg-card text-sm text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(statusCounts).map(([key, count]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  statusFilter === key
                    ? 'bg-brand-50 text-brand-600 border border-brand-200'
                    : 'bg-card text-contrast-muted border border-elevated hover:border-muted hover:text-contrast-primary'
                }`}
              >
                {key === 'all' ? 'All' : key}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  statusFilter === key ? 'bg-brand-100 text-brand-600' : 'bg-elevated text-contrast-muted'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Reservation List */}
          <div className="xl:col-span-2">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-semibold text-contrast-primary">Reservations</h2>
                  <p className="text-xs text-contrast-muted mt-0.5">{filtered.length} records</p>
                </div>
              </div>
              <div className="space-y-2">
                {filtered.map((res) => {
                  const config = statusConfig[res.status] || statusConfig.PENDING;
                  const StatusIcon = config.icon;
                  return (
                    <motion.div
                      key={res.id}
                      variants={fadeUp}
                      className="flex items-start gap-4 p-4 rounded-xl bg-elevated border border-elevated hover:border-elevated transition-all"
                    >
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${config.bg} ${config.border}`}>
                        <StatusIcon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-semibold text-contrast-primary">{res.id}</h4>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.color} ${config.border}`}>
                            {res.status}
                          </span>
                        </div>
                        <p className="text-sm text-contrast-secondary mt-0.5">{res.medication}</p>
                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                          <span className="flex items-center gap-1 text-[11px] text-contrast-muted">
                            <User className="w-3 h-3" />
                            {res.user}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-contrast-muted">
                            <Calendar className="w-3 h-3" />
                            {res.date}
                          </span>
                          <span className="text-[11px] text-contrast-muted">Qty: {res.quantity}</span>
                          <span className="text-[11px] font-medium text-brand-600">Deposit: ${res.deposit}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="w-10 h-10 text-contrast-muted mx-auto mb-3" />
                    <p className="text-sm text-contrast-secondary">No reservations found</p>
                    <p className="text-xs text-contrast-muted mt-1">Try adjusting your filters</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Pending Queue Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all duration-200"
            >
              <h2 className="text-base font-semibold text-contrast-primary mb-1">Pending Queue</h2>
              <p className="text-xs text-contrast-muted mb-5">{pendingQueue.length} awaiting action</p>
              <div className="space-y-3">
                {pendingQueue.map((res) => {
                  const config = statusConfig[res.status] || statusConfig.PENDING;
                  return (
                    <motion.div
                      key={res.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-3 rounded-xl border border-elevated hover:border-elevated transition-all"
                    >
                      <div className={`w-2 h-2 rounded-full ${res.status === 'PENDING' ? 'bg-amber-400' : 'bg-brand-400'} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-contrast-primary">{res.id}</p>
                        <p className="text-[10px] text-contrast-muted truncate">{res.medication}</p>
                        <p className="text-[10px] text-contrast-muted">{res.user} · ${res.deposit}</p>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                        {res.status}
                      </span>
                    </motion.div>
                  );
                })}
                {pendingQueue.length === 0 && (
                  <div className="text-center py-6">
                    <CheckCircle className="w-8 h-8 text-contrast-muted mx-auto mb-2" />
                    <p className="text-xs text-contrast-secondary">All caught up!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationManagement;
