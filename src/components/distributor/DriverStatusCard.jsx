import { motion } from 'framer-motion';
import { User, Star } from 'lucide-react';

const statusColors = {
  active: 'text-primary',
  idle: 'text-yellow-400',
  offline: 'text-contrast-secondary',
};

const DriverStatusCard = ({ drivers = [] }) => {
  return (
    <div className="space-y-3">
      {drivers.map((driver, i) => (
        <motion.div
          key={driver.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center justify-between p-3 rounded-lg bg-dark/30 border border-primary/5"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-dark ${
                driver.status === 'active' ? 'bg-primary' : driver.status === 'idle' ? 'bg-yellow-400' : 'bg-gray-400'
              }`} />
            </div>
            <div>
              <p className="text-sm font-medium">{driver.name}</p>
              <div className="flex items-center gap-2 text-[10px] text-contrast-muted">
                <span className={`font-semibold ${statusColors[driver.status]}`}>{driver.status}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" /> {driver.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {driver.currentShipment ? (
              <div>
                <p className="text-xs font-medium text-primary">{driver.currentShipment}</p>
                <p className="text-[10px] text-contrast-muted">{driver.deliveries} deliveries</p>
              </div>
            ) : (
              <p className="text-xs text-contrast-muted">No assignment</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DriverStatusCard;
