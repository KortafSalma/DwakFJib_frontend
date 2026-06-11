import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { formatDateShort } from '../../utils/formatters';
import formatMAD from '../../utils/currency';

const allReservations = Array.from({ length: 30 }, (_, i) => ({
  id: `R-${9000 + i}`,
  patient: ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Lee', 'Emma Wilson', 'Frank Brown', 'Grace Kim', 'Henry Taylor', 'Iris Martinez', 'Jack Anderson'][i % 10],
  medication: ['Aspirin 500mg', 'Amoxicillin 250mg', 'Lisinopril 10mg', 'Metformin 500mg', 'Atorvastatin 20mg', 'Omeprazole 20mg', 'Losartan 50mg', 'Albuterol HFA', 'Levothyroxine 75mcg', 'Gabapentin 300mg'][i % 10],
  pharmacy: ['MedPlus NYC', 'HealthFirst LA', 'CarePoint CHI', 'PharmaDirect HOU', 'WellnessHub SF', 'CityDrugs BOS', 'GreenCross SEA', 'MedCare DEN', 'PrimePharm MIA', 'HealthPlus ATL'][i % 10],
  quantity: Math.floor(Math.random() * 5) + 1,
  status: ['PENDING', 'CONFIRMED', 'READY', 'COMPLETED', 'CANCELLED'][i % 5],
  created: new Date(Date.now() - i * 7200000 - Math.random() * 7200000).toISOString(),
  price: (Math.random() * 50 + 5).toFixed(2), /* in DH */
}));

const statusConfig = {
  PENDING: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: Clock },
  CONFIRMED: { label: 'Confirmed', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: AlertCircle },
  READY: { label: 'Ready', color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200', icon: CheckCircle },
  COMPLETED: { label: 'Completed', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle },
  CANCELLED: { label: 'Cancelled', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: XCircle },
};

const AdminReservations = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const filtered = allReservations.filter((r) => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSearch = r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.medication.toLowerCase().includes(search.toLowerCase()) ||
      r.pharmacy.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const statusStats = allReservations.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">All Reservations</h1>
          <p className="text-sm text-contrast-secondary mt-1">Monitor all platform reservations across pharmacies</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 }} className="grid grid-cols-5 gap-3">
          {['PENDING', 'CONFIRMED', 'READY', 'COMPLETED', 'CANCELLED'].map((status) => {
            const cfg = statusConfig[status];
            const count = statusStats[status] || 0;
            return (
              <button
                key={status}
                onClick={() => { setStatusFilter(statusFilter === status ? 'all' : status); setCurrentPage(1); }}
                className={`bg-card rounded-2xl border p-4 hover:shadow-sm transition-all text-center ${
                  statusFilter === status ? 'border-brand-300 ring-2 ring-brand-500/10' : 'border-elevated hover:border-elevated'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mx-auto ${cfg.bg} mb-2`}>
                  <cfg.icon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <p className="text-lg font-bold text-contrast-primary">{count}</p>
                <p className={`text-[10px] font-medium ${cfg.color}`}>{cfg.label}</p>
              </button>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search reservations..."
                className="w-full h-11 pl-11 pr-4 rounded-2xl border border-elevated bg-card text-sm text-contrast-primary placeholder:text-contrast-muted outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['all', 'PENDING', 'CONFIRMED', 'READY', 'COMPLETED', 'CANCELLED'].map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                    statusFilter === s
                      ? 'bg-brand-50 text-brand-600 border border-brand-200'
                      : 'bg-card text-contrast-secondary border border-elevated hover:border-muted hover:text-contrast-primary'
                  }`}
                >
                  {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {paginated.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-10 h-10 text-contrast-muted mx-auto mb-3" />
              <p className="text-sm text-contrast-secondary">No reservations found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-contrast-muted border-b border-elevated">
                    <th className="text-left pb-3 font-medium">ID</th>
                    <th className="text-left pb-3 font-medium">Patient</th>
                    <th className="text-left pb-3 font-medium">Medication</th>
                    <th className="text-left pb-3 font-medium">Pharmacy</th>
                    <th className="text-right pb-3 font-medium">Qty</th>
                    <th className="text-right pb-3 font-medium">Price</th>
                    <th className="text-center pb-3 font-medium">Status</th>
                    <th className="text-right pb-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((r, i) => {
                    const cfg = statusConfig[r.status];
                    const StatusIcon = cfg.icon;
                    return (
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-elevated last:border-0 hover:bg-elevated transition-all group"
                      >
                        <td className="py-3 font-medium text-contrast-primary">{r.id}</td>
                        <td className="py-3 text-contrast-primary">{r.patient}</td>
                        <td className="py-3 text-contrast-primary">{r.medication}</td>
                        <td className="py-3 text-contrast-primary">{r.pharmacy}</td>
                        <td className="py-3 text-right text-contrast-primary">{r.quantity}</td>
                        <td className="py-3 text-right text-contrast-primary">{formatMAD(r.price)}</td>
                        <td className="py-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                            <StatusIcon className="w-3 h-3" />
                            {cfg.label}
                          </span>
                        </td>
                        <td className="py-3 text-right text-contrast-muted">{formatDateShort(r.created)}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-elevated">
              <p className="text-xs text-contrast-muted">Showing {(currentPage - 1) * perPage + 1} - {Math.min(currentPage * perPage, filtered.length)} of {filtered.length}</p>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                      page === currentPage
                        ? 'bg-brand-50 text-brand-600 border border-brand-200'
                        : 'text-contrast-secondary hover:text-contrast-primary hover:bg-elevated border border-elevated'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminReservations;
