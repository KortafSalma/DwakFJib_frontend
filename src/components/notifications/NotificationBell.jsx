import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

const NotificationBell = ({ count = 0, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="relative p-2 rounded-lg hover:bg-white/5 transition-all"
    >
      <Bell className="w-5 h-5 text-contrast-secondary" />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
        >
          <span className="text-[9px] font-bold text-white">{count > 9 ? '9+' : count}</span>
        </motion.div>
      )}
      {count > 0 && (
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500"
        />
      )}
    </motion.button>
  );
};

export default NotificationBell;
