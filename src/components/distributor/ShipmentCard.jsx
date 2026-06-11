import { motion } from 'framer-motion';
import { Truck, Package, MapPin, Clock, Calendar } from 'lucide-react';

const statusConfig = {
  PENDING: { color: 'text-contrast-secondary', bg: 'bg-gray-400/10', border: 'border-gray-400/20' },
  PROCESSING: { color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
  SHIPPED: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  IN_TRANSIT: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  DELIVERED: { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  CANCELLED: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
};

const ShipmentCard = ({ shipment, onClick }) => {
  const config = statusConfig[shipment.status] || statusConfig.PENDING;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={() => onClick?.(shipment)}
      className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-primary/10 hover:border-primary/20 cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{shipment.id}</h3>
            <p className="text-[10px] text-contrast-muted">{shipment.pharmacy}</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${config.color} ${config.bg} ${config.border}`}>
          {shipment.status.replace('_', ' ')}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] text-contrast-secondary">
          <MapPin className="w-3 h-3" />
          <span>{shipment.origin} → {shipment.destination}</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-contrast-muted">
          <span className="flex items-center gap-1"><Package className="w-3 h-3" /> {shipment.items} items</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {shipment.weight}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-contrast-secondary">
          <Calendar className="w-3 h-3" />
          <span>ETA: {shipment.estimatedDelivery}</span>
        </div>
      </div>

      {shipment.status !== 'CANCELLED' && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-contrast-muted">Progress</span>
            <span className="text-primary font-semibold">{shipment.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-dark/30 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${shipment.progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ShipmentCard;
