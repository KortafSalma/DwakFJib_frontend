import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

const RouteDetailsCard = ({ route }) => {
  if (!route) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-card/95 backdrop-blur-md border border-primary/10"
    >
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-bold">Route Details</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-primary mt-1" />
          <div>
            <p className="text-xs font-medium">{route.origin.name}</p>
            <p className="text-[10px] text-contrast-muted">Origin</p>
          </div>
        </div>

        <div className="ml-1.5 pl-1.5 border-l-2 border-dashed border-primary/20 space-y-3">
          {route.checkpoints.slice(1, -1).map((cp, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary/40 mt-1.5" />
              <div>
                <p className="text-xs text-contrast-secondary">{cp.label}</p>
                <p className="text-[10px] text-contrast-muted">{cp.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-secondary mt-1" />
          <div>
            <p className="text-xs font-medium">{route.destination.name}</p>
            <p className="text-[10px] text-contrast-muted">Destination</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-between text-xs">
        <span className="text-contrast-secondary">ETA</span>
        <span className="font-medium text-primary">{route.eta}</span>
      </div>
    </motion.div>
  );
};

export default RouteDetailsCard;
