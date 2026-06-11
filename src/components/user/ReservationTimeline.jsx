import { motion } from 'framer-motion';
import { Clock, CheckCircle, Package, XCircle } from 'lucide-react';
import formatMAD from '../../utils/currency';

const statusConfig = {
  PENDING: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', label: 'Pending' },
  CONFIRMED: { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', label: 'Confirmed' },
  READY: { icon: Package, color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20', label: 'Ready for Pickup' },
  COMPLETED: { icon: CheckCircle, color: 'text-contrast-secondary', bg: 'bg-gray-400/10', border: 'border-gray-400/20', label: 'Completed' },
  CANCELLED: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', label: 'Cancelled' },
};

const ReservationTimeline = ({ reservations = [] }) => {
  const sorted = [...reservations].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-0">
      {sorted.map((res, i) => {
        const config = statusConfig[res.status] || statusConfig.PENDING;
        const StatusIcon = config.icon;
        return (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${config.bg} ${config.color} ${config.border}`}>
                <StatusIcon className="w-4 h-4" />
              </div>
              {i < sorted.length - 1 && <div className="w-px h-full bg-primary/10 mt-2" />}
            </div>
            <div className="pb-6 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{res.id}</h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-contrast-secondary mt-0.5">{res.medication}</p>
                  <p className="text-[10px] text-contrast-muted mt-0.5">{res.pharmacy}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-mono">{formatMAD(res.price)}</p>
                  <p className="text-[10px] text-contrast-muted">{res.date}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ReservationTimeline;
