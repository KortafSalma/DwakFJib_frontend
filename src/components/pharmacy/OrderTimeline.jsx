import { motion } from 'framer-motion';
import { Clock, Package, CheckCircle, XCircle, Truck, AlertCircle } from 'lucide-react';
import formatMAD from '../../utils/currency';

const statusConfig = {
  PENDING: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: Clock },
  PROCESSING: { color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20', icon: Package },
  SHIPPED: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: Truck },
  DELIVERED: { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', icon: CheckCircle },
  CANCELLED: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: XCircle },
  RETURNED: { color: 'text-contrast-secondary', bg: 'bg-gray-400/10', border: 'border-gray-400/20', icon: AlertCircle },
};

const OrderTimeline = ({ orders = [] }) => {
  const sorted = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-0">
      {sorted.slice(0, 8).map((order, i) => {
        const config = statusConfig[order.status] || statusConfig.PENDING;
        const StatusIcon = config.icon;
        return (
          <motion.div
            key={order.id}
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
                  <h4 className="text-sm font-medium">{order.id}</h4>
                  <p className="text-[10px] text-contrast-muted">{order.supplier} · {order.items} items</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-semibold ${config.color}`}>{order.status}</p>
                  <p className="text-[10px] text-contrast-muted">{order.date}</p>
                </div>
              </div>
              <div className="mt-1 text-xs text-contrast-secondary">{formatMAD(order.total)}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
