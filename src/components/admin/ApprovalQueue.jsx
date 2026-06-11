import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const ApprovalQueue = ({ items = [], onApprove, onReject }) => {
  if (items.length === 0) {
    return (
      <div className="py-8 text-center">
        <CheckCircle className="w-8 h-8 text-primary/40 mx-auto mb-2" />
        <p className="text-sm text-contrast-muted">All caught up! No pending approvals.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl bg-dark/30 border border-primary/5 hover:border-primary/10 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-contrast-secondary mt-0.5">{item.description || item.address}</p>
                  <p className="text-[10px] text-contrast-muted mt-1">Submitted {item.submitted}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => onReject?.(item.id)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-all"
                  title="Reject"
                >
                  <XCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onApprove?.(item.id)}
                  className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-all"
                  title="Approve"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ApprovalQueue;
