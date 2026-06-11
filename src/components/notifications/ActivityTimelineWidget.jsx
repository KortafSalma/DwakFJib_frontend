import { motion } from 'framer-motion';
import { Clock, ShoppingCart, Truck, Package, Info, User } from 'lucide-react';

const typeIcons = {
  reservation: ShoppingCart,
  delivery: Truck,
  stock: Package,
  system: Info,
};

const ActivityTimelineWidget = ({ activities = [] }) => {
  return (
    <div className="space-y-0">
      {activities.slice(0, 8).map((activity, i) => {
        const TypeIcon = typeIcons[activity.type] || Clock;
        return (
          <motion.div
            key={activity.id || i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-3"
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <TypeIcon className="w-3.5 h-3.5 text-primary" />
              </div>
              {i < activities.length - 1 && <div className="w-px h-full bg-primary/10 mt-1" />}
            </div>
            <div className="pb-4 flex-1">
              <p className="text-sm font-medium">{activity.action}</p>
              <p className="text-[10px] text-contrast-muted">{activity.detail}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-contrast-muted">{activity.time}</span>
                <span className="text-[10px] text-contrast-muted">·</span>
                <span className="flex items-center gap-1 text-[10px] text-contrast-muted">
                  <User className="w-3 h-3" /> {activity.user}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ActivityTimelineWidget;
