import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';

const PharmacyCard = ({ pharmacy }) => {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="p-4 rounded-xl bg-card backdrop-blur-xl border border-subtle hover:border-elevated transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-contrast-primary truncate">{pharmacy.name}</h3>
          <div className="flex items-center gap-1.5 text-[10px] text-contrast-muted mt-1">
            <MapPin className="w-3 h-3 text-brand-400 flex-shrink-0" />
            <span className="truncate">{pharmacy.address}</span>
            {pharmacy.distance && <span className="text-contrast-muted/60">· {pharmacy.distance}</span>}
          </div>
        </div>
        <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
          pharmacy.open ? 'bg-brand-500/10 text-brand-400 border-brand-500/20' : 'bg-red-400/10 text-red-400 border-red-400/20'
        }`}>
          {pharmacy.open ? 'Open' : 'Closed'}
        </span>
      </div>

      <div className="flex items-center gap-4 text-[10px] text-contrast-muted mb-3">
        {pharmacy.hours && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {pharmacy.hours}</span>}
        {pharmacy.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {pharmacy.phone}</span>}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs font-medium text-contrast-secondary">{pharmacy.rating}</span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 text-xs font-medium hover:bg-brand-500/20 hover:shadow-[0_2px_8px_rgba(20,184,166,0.15)] transition-all">
          <Navigation className="w-3 h-3" />
          Directions
        </button>
      </div>
    </motion.div>
  );
};

export default PharmacyCard;