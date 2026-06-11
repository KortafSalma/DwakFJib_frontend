import { motion } from 'framer-motion';
import { Navigation, Store } from 'lucide-react';

const ExploreNearbyBanner = ({ onExplore, pharmacies = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/10 via-dark to-primary/5 border border-secondary/10 p-6 sm:p-8"
    >
      <div className="absolute top-0 right-0 w-56 h-56 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0">
          <Store className="w-7 h-7 text-secondary" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold mb-1">
            Explore Nearby Pharmacies
          </h3>
          <p className="text-sm text-contrast-secondary">
            {pharmacies > 0
              ? `${pharmacies} pharmacies available in your area — compare prices and availability`
              : 'Find medications available at pharmacies near you'}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onExplore}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-secondary to-primary text-dark text-sm font-medium shadow-lg whitespace-nowrap"
        >
          <Navigation className="w-4 h-4" />
          Explore Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ExploreNearbyBanner;
