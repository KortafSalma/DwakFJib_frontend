import { motion } from 'framer-motion';
import { Users, Package, Truck, FileText, Settings, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  { icon: Users, label: 'Manage Users', path: '/admin/users', color: 'primary' },
  { icon: Package, label: 'Pharmacy Approvals', path: '/admin/pharmacies', color: 'secondary' },
  { icon: Truck, label: 'Distributor Approvals', path: '/admin/distributors', color: 'primary' },
  { icon: FileText, label: 'Activity Logs', path: '/admin/logs', color: 'secondary' },
  { icon: Settings, label: 'System Settings', path: '/admin/settings', color: 'primary' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications', color: 'secondary' },
];

const AdminQuickActions = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {actions.map((action, i) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <Link
            to={action.path}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-dark/30 border border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all group"
          >
            <action.icon className={`w-5 h-5 ${action.color === 'primary' ? 'text-primary' : 'text-secondary'} group-hover:scale-110 transition-transform`} />
            <span className="text-[10px] font-medium text-contrast-secondary text-center leading-tight">{action.label}</span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminQuickActions;
