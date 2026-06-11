import { motion } from 'framer-motion';

const NotificationFilterTabs = ({ activeFilter, onFilter, counts = {} }) => {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'RESERVATION', label: 'Reservations' },
    { key: 'DELIVERY', label: 'Deliveries' },
    { key: 'STOCK', label: 'Stock' },
    { key: 'EMERGENCY', label: 'Emergency' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <motion.button
          key={tab.key}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilter?.(tab.key)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
            activeFilter === tab.key
              ? 'bg-primary/10 text-primary border border-primary/20'
              : 'text-contrast-secondary hover:text-contrast-primary hover:bg-elevated border border-transparent'
          }`}
        >
          {tab.label}
          {counts[tab.key] > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              activeFilter === tab.key ? 'bg-primary/20' : 'bg-white/10'
            }`}>
              {counts[tab.key]}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default NotificationFilterTabs;
