import { motion } from 'framer-motion';
import { Package, AlertTriangle, TrendingDown, Clock } from 'lucide-react';

const InventoryStats = ({ stats }) => {
  const items = [
    { label: 'Total Medications', value: stats?.total || 247, icon: Package, color: 'primary' },
    { label: 'Low Stock', value: stats?.lowStock || 12, icon: AlertTriangle, color: 'yellow' },
    { label: 'Out of Stock', value: stats?.outOfStock || 3, icon: TrendingDown, color: 'red' },
    { label: 'Expiring Soon', value: stats?.expiring || 8, icon: Clock, color: 'secondary' },
  ];

  const colorMap = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    red: 'text-red-400 bg-red-400/10 border-red-400/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-primary/10 hover:border-primary/20 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${colorMap[item.color]}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-[10px] text-contrast-secondary uppercase tracking-wider">{item.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InventoryStats;
