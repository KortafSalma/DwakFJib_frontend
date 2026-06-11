import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';

const UserDashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <p className="text-contrast-secondary mt-1">View your reservations and certificates</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={User} label="Reservations" value="0" change={0} />
        <StatCard icon={User} label="Active" value="0" change={0} color="primary" />
        <StatCard icon={User} label="Certificates" value="0" change={0} color="secondary" />
        <StatCard icon={User} label="Notifications" value="0" change={0} color="yellow" />
      </div>

      <div className="bg-card/60 backdrop-blur-md border border-primary/10 rounded-xl p-8 text-center">
        <p className="text-contrast-secondary">Dashboard content will be built in Phase 2</p>
      </div>
    </div>
  );
};

export default UserDashboard;
