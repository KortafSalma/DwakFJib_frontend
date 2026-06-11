import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, User, Calendar } from 'lucide-react';
import formatMAD from '../../utils/currency';

const statusConfig = {
  PENDING: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: Clock },
  PAID: { color: 'text-primary', bg: 'bg-primary/10', icon: CheckCircle },
  CANCELLED: { color: 'text-red-400', bg: 'bg-red-400/10', icon: XCircle },
  COMPLETED: { color: 'text-secondary', bg: 'bg-secondary/10', icon: CheckCircle },
};

const ReservationQueue = ({ reservations = [], onAction }) => {
  const pending = reservations.filter((r) => r.status === 'PENDING');

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {pending.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
            <CheckCircle className="w-8 h-8 text-primary/40 mx-auto mb-2" />
            <p className="text-sm text-contrast-muted">No pending reservations</p>
          </motion.div>
        ) : (
          pending.map((res, i) => {
            const config = statusConfig[res.status] || statusConfig.PENDING;
            const StatusIcon = config.icon;
            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-dark/30 border border-primary/5 hover:border-primary/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${config.bg} ${config.color}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{res.medication}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-[10px] text-contrast-muted">
                          <User className="w-3 h-3" />
                          {res.user}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-contrast-muted">
                          <Calendar className="w-3 h-3" />
                          {res.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[10px]">
                        <span className="text-contrast-secondary">Qty: {res.quantity}</span>
                        <span className="text-primary">Deposit: {formatMAD(res.deposit)}</span>
                      </div>
                    </div>
                  </div>
                  {onAction && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => onAction(res.id, 'cancel')}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-all"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onAction(res.id, 'approve')}
                        className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-all"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReservationQueue;
