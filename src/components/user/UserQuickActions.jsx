import { motion } from 'framer-motion';
import { Search, Heart, ShoppingCart, Bell, User, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { label: 'Search Meds', icon: Search, route: '/user/search' },
  { label: 'Favorites', icon: Heart, route: '/user/favorites' },
  { label: 'Reservations', icon: ShoppingCart, route: '/user/reservations' },
  { label: 'Notifications', icon: Bell, route: '/user/notifications' },
  { label: 'Profile', icon: User, route: '/user/profile' },
  { label: 'Certificates', icon: FileText, route: '/user/certificates' },
];

const colorCycle = [
  { icon: 'text-brand-400', bg: 'bg-brand-500/10', border: 'border-brand-500/20', hover: 'hover:bg-brand-500/20' },
  { icon: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', hover: 'hover:bg-red-400/20' },
  { icon: 'text-brand-400', bg: 'bg-brand-400/10', border: 'border-brand-400/20', hover: 'hover:bg-brand-400/20' },
  { icon: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', hover: 'hover:bg-yellow-400/20' },
  { icon: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', hover: 'hover:bg-blue-400/20' },
  { icon: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', hover: 'hover:bg-purple-400/20' },
];

const UserQuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2.5">
      {actions.map((action, i) => {
        const c = colorCycle[i];
        return (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            whileHover={{ y: -2, transition: { duration: 0.12 } }}
            onClick={() => navigate(action.route)}
            className={`p-4 rounded-xl border ${c.bg} backdrop-blur-md ${c.border} ${c.hover} transition-all duration-200 flex flex-col items-center gap-2 group`}
          >
            <action.icon className={`w-5 h-5 ${c.icon} transition-transform group-hover:scale-110 duration-200`} />
            <span className="text-[10px] font-medium text-white/50 group-hover:text-white/80 transition-colors">{action.label}</span>
            <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors" />
          </motion.button>
        );
      })}
    </div>
  );
};

export default UserQuickActions;
