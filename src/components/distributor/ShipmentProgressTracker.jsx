import { motion } from 'framer-motion';
import { Truck, Package, MapPin, CheckCircle } from 'lucide-react';

const ShipmentProgressTracker = ({ shipment }) => {
  if (!shipment) return null;

  const stages = [
    { key: 'PENDING', label: 'Pending', icon: Package },
    { key: 'PROCESSING', label: 'Processing', icon: Package },
    { key: 'SHIPPED', label: 'Shipped', icon: Truck },
    { key: 'IN_TRANSIT', label: 'In Transit', icon: MapPin },
    { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
  ];

  const currentIndex = stages.findIndex((s) => s.key === shipment.status);
  const isCancelled = shipment.status === 'CANCELLED';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {stages.map((stage, i) => {
          const isCompleted = !isCancelled && i <= currentIndex;
          const isCurrent = i === currentIndex;
          const isCancelledStage = isCancelled && i > currentIndex;
          return (
            <div key={stage.key} className="flex flex-col items-center flex-1">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCancelledStage
                    ? 'border-gray-600 bg-gray-600/10 text-contrast-muted'
                    : isCompleted
                    ? 'border-primary bg-primary/10 text-primary'
                    : isCurrent
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-gray-600 bg-dark/30 text-contrast-muted'
                }`}
              >
                <stage.icon className="w-4 h-4" />
              </motion.div>
              <span className={`text-[10px] mt-2 text-center ${
                isCancelledStage ? 'text-contrast-muted' : isCompleted ? 'text-primary' : isCurrent ? 'text-secondary' : 'text-contrast-muted'
              }`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative h-1 bg-dark/30 rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isCancelled ? '0%' : `${((currentIndex + 1) / stages.length) * 100}%` }}
          transition={{ duration: 0.8 }}
          className={`absolute top-0 left-0 h-full rounded-full ${
            isCancelled ? 'bg-red-400/40' : 'bg-gradient-to-r from-primary to-secondary'
          }`}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-contrast-muted">
        <span>Origin: {shipment.origin}</span>
        <span>Destination: {shipment.destination}</span>
      </div>
    </div>
  );
};

export default ShipmentProgressTracker;
