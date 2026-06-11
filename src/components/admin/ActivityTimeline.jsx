import { motion } from 'framer-motion';

const ActivityTimeline = ({ activities = [] }) => {
  const typeColors = {
    user: 'bg-primary/10 text-primary border-primary/20',
    pharmacy: 'bg-secondary/10 text-secondary border-secondary/20',
    reservation: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    payment: 'bg-primary/10 text-primary border-primary/20',
    alert: 'bg-red-400/10 text-red-400 border-red-400/20',
  };

  return (
    <div className="space-y-0">
      {activities.map((activity, i) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex gap-4 group"
        >
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${typeColors[activity.type] || 'bg-gray-400/10 text-contrast-secondary border-gray-400/20'}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            {i < activities.length - 1 && (
              <div className="w-px h-full bg-primary/10 mt-1 group-last:hidden" />
            )}
          </div>
          <div className="pb-6 flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-contrast-secondary mt-0.5">{activity.user}</p>
              </div>
              <span className="text-[10px] text-contrast-muted whitespace-nowrap">{activity.time}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
