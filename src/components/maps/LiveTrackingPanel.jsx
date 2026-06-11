import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

const LiveTrackingPanel = ({ delivery }) => {
  if (!delivery) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-xl bg-card/95 backdrop-blur-md border border-primary/10"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-bold">Live Tracking</h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-semibold text-primary animate-pulse">
          LIVE
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-contrast-secondary">Driver</span>
          <span className="font-medium">{delivery.driver}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-contrast-secondary">Status</span>
          <span className="text-yellow-400 font-medium">In Transit</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-contrast-secondary">ETA</span>
          <span className="font-medium">{delivery.eta}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-contrast-secondary">Items</span>
          <span className="font-medium">{delivery.items}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] mb-1">
          <span className="text-contrast-muted">Progress</span>
          <span className="text-primary font-semibold">{delivery.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-dark/30 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${delivery.progress}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {delivery.checkpoints.map((cp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-2 text-xs"
          >
            <div className={`w-2 h-2 rounded-full ${i <= Math.floor((delivery.progress / 100) * (delivery.checkpoints.length - 1)) ? 'bg-primary' : 'bg-gray-600'}`} />
            <span className="flex-1 text-contrast-secondary">{cp.label}</span>
            <span className="text-contrast-muted">{cp.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LiveTrackingPanel;
