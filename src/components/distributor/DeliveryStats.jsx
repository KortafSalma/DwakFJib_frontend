import { motion } from 'framer-motion';
import { Truck, Package, CheckCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

const DeliveryStats = ({ stats }) => {
  const data = stats || {
    total: 156,
    inTransit: 23,
    delivered: 118,
    delayed: 8,
    onTimeRate: 94.5,
    avgDeliveryTime: '2.4h',
  };

  const items = [
    { label: 'Total Shipments', value: data.total, icon: Truck, color: 'text-white' },
    { label: 'In Transit', value: data.inTransit, icon: Clock, color: 'text-yellow-400' },
    { label: 'Delivered', value: data.delivered, icon: CheckCircle, color: 'text-primary' },
    { label: 'Delayed', value: data.delayed, icon: AlertTriangle, color: 'text-red-400' },
    { label: 'On-Time Rate', value: `${data.onTimeRate}%`, icon: TrendingUp, color: 'text-secondary' },
    { label: 'Avg Time', value: data.avgDeliveryTime, icon: Package, color: 'text-blue-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-primary/10"
        >
          <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
          <p className="text-xl font-bold">{item.value}</p>
          <p className="text-[10px] text-contrast-muted uppercase tracking-wider">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DeliveryStats;
