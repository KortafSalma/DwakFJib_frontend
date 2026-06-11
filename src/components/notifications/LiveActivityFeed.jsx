import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShoppingCart, Truck, Package, Info } from 'lucide-react';

const typeIcons = {
  reservation: ShoppingCart,
  delivery: Truck,
  stock: Package,
  system: Info,
};

const LiveActivityFeed = ({ activities = [] }) => {
  const [feed, setFeed] = useState(activities);

  useEffect(() => {
    const mockActivities = [
      { type: 'reservation', action: 'New Reservation', detail: 'Sertraline 50mg at Wellness Hub', user: 'User' },
      { type: 'delivery', action: 'Delivery Complete', detail: 'SHP-004 delivered', user: 'Driver' },
      { type: 'stock', action: 'Stock Alert', detail: 'Omeprazole restocked', user: 'System' },
      { type: 'system', action: 'System Update', detail: 'Maintenance completed', user: 'System' },
    ];

    const interval = setInterval(() => {
      const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
      const newActivity = {
        id: Date.now(),
        ...randomActivity,
        time: 'Just now',
      };
      setFeed((prev) => [newActivity, ...prev].slice(0, 20));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-0">
      <AnimatePresence>
        {feed.slice(0, 10).map((activity, i) => {
          const TypeIcon = typeIcons[activity.type] || Activity;
          return (
            <motion.div
              key={activity.id || i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-3"
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <TypeIcon className="w-3.5 h-3.5 text-primary" />
                </div>
                {i < feed.length - 1 && <div className="w-px h-full bg-primary/10 mt-1" />}
              </div>
              <div className="pb-4 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-[10px] text-contrast-muted">{activity.detail}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-contrast-muted">{activity.time}</span>
                    <p className="text-[10px] text-contrast-muted">{activity.user}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default LiveActivityFeed;
