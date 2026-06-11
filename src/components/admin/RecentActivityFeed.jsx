import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const mockActivities = [
  { id: 1, type: 'reservation', message: 'New reservation created', user: 'John Doe', time: '2m ago' },
  { id: 2, type: 'payment', message: 'Payment processed', user: 'Order #4521', time: '15m ago' },
  { id: 3, type: 'user', message: 'User registered', user: 'Sarah Johnson', time: '1h ago' },
  { id: 4, type: 'stock', message: 'Stock updated', user: 'MedPlus Pharmacy', time: '2h ago' },
  { id: 5, type: 'alert', message: 'Low stock warning', user: 'Paracetamol 500mg', time: '3h ago' },
];

const typeColors = {
  reservation: 'text-primary',
  payment: 'text-secondary',
  user: 'text-primary',
  stock: 'text-yellow-400',
  alert: 'text-red-400',
};

const RecentActivityFeed = ({ activities = mockActivities }) => {
  return (
    <div className="space-y-0">
      {activities.map((activity, i) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-3 py-3 border-b border-primary/5 last:border-0"
        >
          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${typeColors[activity.type] ? `bg-current ${typeColors[activity.type]}` : 'bg-gray-500'}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm">{activity.message}</p>
            <p className="text-xs text-contrast-muted">{activity.user}</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-contrast-muted flex-shrink-0">
            <Clock className="w-3 h-3" />
            {activity.time}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecentActivityFeed;
