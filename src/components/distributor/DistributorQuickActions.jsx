import { motion } from 'framer-motion';
import { Truck, Package, Route, BarChart3, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DistributorQuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { label: 'View Shipments', icon: Truck, route: '/distributor/shipments', color: 'primary' },
    { label: 'Track Deliveries', icon: Route, route: '/distributor/tracking', color: 'secondary' },
    { label: 'Orders Queue', icon: Package, route: '/distributor/orders', color: 'yellow' },
    { label: 'Routes', icon: Route, route: '/distributor/routes', color: 'blue' },
    { label: 'Analytics', icon: BarChart3, route: '/distributor/analytics', color: 'purple' },
    { label: 'Settings', icon: Settings, route: '/distributor/settings', color: 'gray' },
  ];

  const colorMap = {
    primary: 'text-primary hover:bg-primary/10 border-primary/10 hover:border-primary/20',
    secondary: 'text-secondary hover:bg-secondary/10 border-secondary/10 hover:border-secondary/20',
    yellow: 'text-yellow-400 hover:bg-yellow-400/10 border-yellow-400/10 hover:border-yellow-400/20',
    blue: 'text-blue-400 hover:bg-blue-400/10 border-blue-400/10 hover:border-blue-400/20',
    purple: 'text-purple-400 hover:bg-purple-400/10 border-purple-400/10 hover:border-purple-400/20',
    gray: 'text-contrast-secondary hover:bg-gray-400/10 border-gray-400/10 hover:border-gray-400/20',
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
      {actions.map((action, i) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -2 }}
          onClick={() => navigate(action.route)}
          className={`p-4 rounded-xl border bg-card/40 backdrop-blur-sm transition-all flex flex-col items-center gap-2 ${colorMap[action.color]}`}
        >
          <action.icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default DistributorQuickActions;
