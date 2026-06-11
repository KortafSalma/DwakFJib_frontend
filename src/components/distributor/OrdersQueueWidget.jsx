import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle, Package } from 'lucide-react';

const priorityConfig = {
  high: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: AlertCircle },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: Clock },
  low: { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', icon: CheckCircle },
};

const OrdersQueueWidget = ({ orders = [], onAction }) => {
  const pending = orders.filter((o) => o.status === 'PENDING' || o.status === 'PROCESSING');

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {pending.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
            <CheckCircle className="w-8 h-8 text-primary/40 mx-auto mb-2" />
            <p className="text-sm text-contrast-muted">No pending orders</p>
          </motion.div>
        ) : (
          pending.map((order, i) => {
            const config = priorityConfig[order.priority] || priorityConfig.medium;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-dark/30 border border-primary/5 hover:border-primary/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${config.bg} ${config.color}`}>
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{order.id}</h4>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                          {order.priority}
                        </span>
                      </div>
                      <p className="text-xs text-contrast-secondary mt-0.5">{order.pharmacy}</p>
                      <div className="flex items-center gap-3 mt-1 text-[10px]">
                        <span className="text-contrast-muted">{order.items} items</span>
                        <span className="text-primary font-semibold">${order.total.toLocaleString()}</span>
                        <span className="text-contrast-muted">{order.date}</span>
                      </div>
                    </div>
                  </div>
                  {onAction && (
                    <button
                      onClick={() => onAction(order.id)}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all"
                    >
                      Process
                    </button>
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

export default OrdersQueueWidget;
