import { motion } from 'framer-motion';
import { Clock, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const statusConfig = {
  PENDING: { icon: Clock, color: 'text-contrast-secondary', bg: 'bg-gray-400/10' },
  PROCESSING: { icon: Package, color: 'text-secondary', bg: 'bg-secondary/10' },
  SHIPPED: { icon: Truck, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  IN_TRANSIT: { icon: Truck, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  DELIVERED: { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10' },
  CANCELLED: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
};

const DeliveryTimeline = ({ shipments = [] }) => {
  const sorted = [...shipments].sort((a, b) => new Date(b.estimatedDelivery) - new Date(a.estimatedDelivery));

  return (
    <div className="space-y-0">
      {sorted.slice(0, 8).map((shipment, i) => {
        const config = statusConfig[shipment.status] || statusConfig.PENDING;
        const StatusIcon = config.icon;
        return (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg} ${config.color}`}>
                <StatusIcon className="w-4 h-4" />
              </div>
              {i < sorted.length - 1 && <div className="w-px h-full bg-primary/10 mt-2" />}
            </div>
            <div className="pb-6 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium">{shipment.id}</h4>
                  <p className="text-[10px] text-contrast-muted">{shipment.pharmacy}</p>
                  <p className="text-[10px] text-contrast-secondary mt-0.5">{shipment.origin} → {shipment.destination}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-semibold ${config.color}`}>{shipment.status.replace('_', ' ')}</p>
                  <p className="text-[10px] text-contrast-muted">{shipment.estimatedDelivery}</p>
                </div>
              </div>
              {shipment.status === 'IN_TRANSIT' && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-contrast-muted">{shipment.driver}</span>
                    <span className="text-primary">{shipment.progress}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-dark/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${shipment.progress}%` }}
                      transition={{ delay: 0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DeliveryTimeline;
