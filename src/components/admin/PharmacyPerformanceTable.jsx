import { motion } from 'framer-motion';
import { Star, TrendingUp, Package } from 'lucide-react';

const mockPharmacies = [
  { id: 1, name: 'MedPlus Pharmacy', city: 'Boston', reservations: 342, revenue: 28400, rating: 4.8, growth: 15 },
  { id: 2, name: 'HealthFirst Rx', city: 'Seattle', reservations: 289, revenue: 22100, rating: 4.5, growth: 12 },
  { id: 3, name: 'QuickMeds', city: 'Denver', reservations: 256, revenue: 19800, rating: 4.2, growth: 8 },
  { id: 4, name: 'CityCare Pharmacy', city: 'New York', reservations: 198, revenue: 16500, rating: 4.6, growth: 22 },
  { id: 5, name: 'GreenCross Rx', city: 'Los Angeles', reservations: 167, revenue: 14200, rating: 4.1, growth: 5 },
];

const PharmacyPerformanceTable = () => {
  const maxRevenue = Math.max(...mockPharmacies.map((p) => p.revenue));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-contrast-muted">
        <span>Pharmacy</span>
        <span className="text-right">Reservations</span>
        <span className="text-right">Revenue</span>
        <span className="text-right">Rating</span>
        <span className="text-right">Growth</span>
      </div>

      {mockPharmacies.map((pharmacy, i) => (
        <motion.div
          key={pharmacy.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="grid grid-cols-5 gap-2 px-4 py-3 rounded-lg bg-dark/30 border border-primary/5 hover:border-primary/10 transition-colors items-center"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
              {pharmacy.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{pharmacy.name}</p>
              <p className="text-[10px] text-contrast-muted">{pharmacy.city}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-sm">
              <Package className="w-3 h-3 text-contrast-muted" />
              {pharmacy.reservations}
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-mono">${pharmacy.revenue.toLocaleString()}</p>
            <div className="w-full h-1 rounded-full bg-dark mt-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(pharmacy.revenue / maxRevenue) * 100}%` }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-sm">
              <Star className="w-3 h-3 text-yellow-400" />
              {pharmacy.rating}
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-sm text-primary">
              <TrendingUp className="w-3 h-3" />
              +{pharmacy.growth}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PharmacyPerformanceTable;
