import { motion } from 'framer-motion';
import { Clock, CheckCircle, Package, XCircle } from 'lucide-react';

const statusConfig = {
  PENDING: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  CONFIRMED: { icon: CheckCircle, color: 'text-brand-400', bg: 'bg-brand-400/10', border: 'border-brand-400/20' },
  READY: { icon: Package, color: 'text-brand-400', bg: 'bg-brand-400/10', border: 'border-brand-400/20' },
  COMPLETED: { icon: CheckCircle, color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10' },
  CANCELLED: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
};

const RecentReservations = ({ reservations = [] }) => {
  const recent = [...reservations].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Clock className="w-8 h-8 text-white/20 mb-2" />
        <p className="text-sm text-white/30">No reservations yet</p>
        <p className="text-xs text-white/20 mt-1">Search and reserve your first medication</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recent.map((res, i) => {
        const config = statusConfig[res.status] || statusConfig.PENDING;
        const StatusIcon = config.icon;
        return (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            whileHover={{ x: 2, transition: { duration: 0.1 } }}
            className={`flex items-center justify-between p-3 rounded-lg ${config.bg} backdrop-blur-xl ${config.border} border transition-all duration-200 cursor-default`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.bg}`}>
                <StatusIcon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{res.medication}</p>
                <p className="text-[11px] text-white/40">{res.pharmacy}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${config.color} ${config.bg}`}>
                {res.status}
              </span>
              <p className="text-xs font-mono text-white/50 mt-1">${res.price}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RecentReservations;
