import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle, Clock, Heart, FileText } from 'lucide-react';

const colorMap = {
  'text-primary': { bg: 'bg-brand-500/10', border: 'border-brand-500/20', icon: 'text-brand-400', label: 'text-brand-400/70' },
  'text-secondary': { bg: 'bg-brand-400/10', border: 'border-brand-400/20', icon: 'text-brand-400', label: 'text-brand-400/70' },
  'text-yellow-400': { bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: 'text-yellow-400', label: 'text-yellow-400/70' },
  'text-red-400': { bg: 'bg-red-400/10', border: 'border-red-400/20', icon: 'text-red-400', label: 'text-red-400/70' },
  'text-blue-400': { bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: 'text-blue-400', label: 'text-blue-400/70' },
};

const UserStatsCard = ({ stats }) => {
  const data = stats || { totalReservations: 24, completed: 18, pending: 2, favorites: 5, certificates: 3 };

  const items = [
    { label: 'Total Reservations', value: data.totalReservations, icon: ShoppingCart, color: 'text-primary' },
    { label: 'Completed', value: data.completed, icon: CheckCircle, color: 'text-secondary' },
    { label: 'Pending', value: data.pending, icon: Clock, color: 'text-yellow-400' },
    { label: 'Favorites', value: data.favorites, icon: Heart, color: 'text-red-400' },
    { label: 'Certificates', value: data.certificates, icon: FileText, color: 'text-blue-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {items.map((item, i) => {
        const colors = colorMap[item.color] || colorMap['text-primary'];
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className={`p-4 rounded-xl ${colors.bg} backdrop-blur-xl ${colors.border} border hover:shadow-[0_4px_20px_rgba(20,184,166,0.06)] transition-all duration-200`}
          >
            <item.icon className={`w-5 h-5 ${colors.icon} mb-3`} />
            <p className="text-xl font-bold text-white">{item.value}</p>
            <p className={`text-[10px] font-medium ${colors.label} uppercase tracking-wider mt-0.5`}>{item.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default UserStatsCard;
