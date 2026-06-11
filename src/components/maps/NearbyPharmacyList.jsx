import { motion } from 'framer-motion';
import { Star, Navigation } from 'lucide-react';

const NearbyPharmacyList = ({ pharmacies = [], onSelect }) => {
  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {pharmacies.map((pharmacy, i) => (
        <motion.div
          key={pharmacy.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelect?.(pharmacy)}
          className="p-3 rounded-lg bg-dark/30 border border-primary/5 hover:border-primary/10 cursor-pointer transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${pharmacy.open ? 'bg-primary' : 'bg-gray-600'}`} />
              <div>
                <p className="text-sm font-medium">{pharmacy.name}</p>
                <p className="text-[10px] text-contrast-muted">{pharmacy.distance} · {pharmacy.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium">{pharmacy.rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-[10px] font-semibold ${pharmacy.open ? 'text-primary' : 'text-red-400'}`}>
              {pharmacy.open ? 'Open' : 'Closed'} · {pharmacy.hours}
            </span>
            <button className="flex items-center gap-1 px-2 py-1 rounded bg-primary/10 text-[10px] text-primary hover:bg-primary/20 transition-all">
              <Navigation className="w-3 h-3" />
              Directions
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NearbyPharmacyList;
