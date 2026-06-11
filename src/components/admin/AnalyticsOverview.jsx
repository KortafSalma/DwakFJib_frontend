import { motion } from 'framer-motion';
import { TrendingUp, Users, ShoppingCart, Package } from 'lucide-react';

const AnalyticsOverview = ({ stats }) => {
  const items = [
    { label: 'User Growth', value: `${stats.users.growth}%`, icon: Users, color: 'primary' },
    { label: 'Pharmacy Growth', value: `${stats.pharmacies.growth}%`, icon: Package, color: 'secondary' },
    { label: 'Reservation Growth', value: `${stats.reservations.growth}%`, icon: ShoppingCart, color: 'yellow' },
    { label: 'Revenue Growth', value: `${stats.revenue.growth}%`, icon: TrendingUp, color: 'primary' },
  ];

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center justify-between p-3 rounded-lg bg-dark/30 border border-primary/5"
        >
          <div className="flex items-center gap-3">
            <item.icon className="w-4 h-4 text-contrast-secondary" />
            <span className="text-sm text-contrast-secondary">{item.label}</span>
          </div>
          <span className={`text-sm font-semibold ${item.color === 'primary' ? 'text-primary' : item.color === 'secondary' ? 'text-secondary' : 'text-yellow-400'}`}>
            +{item.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalyticsOverview;
