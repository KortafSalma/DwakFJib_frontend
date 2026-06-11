import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const DistributorReservations = () => (
  <div className="bg-body min-h-screen">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Reservations</h1>
        <p className="text-sm text-contrast-secondary mt-1">Distributor reservation management</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mt-8 text-center py-16 bg-card rounded-2xl border border-elevated"
      >
        <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-7 h-7 text-brand-500" />
        </div>
        <h2 className="text-lg font-semibold text-contrast-primary">Reservations Coming Soon</h2>
        <p className="text-sm text-contrast-secondary mt-1 max-w-sm mx-auto">
          Distributor reservation tracking will be available here.
        </p>
        <a
          href="/distributor"
          className="mt-6 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-500 text-sm font-medium text-white hover:bg-brand-600 transition-all"
        >
          Back to Dashboard
        </a>
      </motion.div>
    </div>
  </div>
);

export default DistributorReservations;
