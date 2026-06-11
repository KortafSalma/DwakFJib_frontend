import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import StatCard from '../../components/ui/StatCard';

const DistributorDashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold">Distributor Dashboard</h1>
        <p className="text-contrast-secondary mt-1">Track orders and deliveries</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Truck} label="Total Orders" value="0" change={0} />
        <StatCard icon={Truck} label="Pending" value="0" change={0} color="yellow" />
        <StatCard icon={Truck} label="Delivered" value="0" change={0} color="primary" />
        <StatCard icon={Truck} label="Revenue" value="0 DH" change={0} color="secondary" />
      </div>

      <div className="bg-card/60 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
        <p className="text-contrast-secondary">Dashboard content will be built in Phase 2</p>
      </div>
    </div>
  );
};

export default DistributorDashboard;
