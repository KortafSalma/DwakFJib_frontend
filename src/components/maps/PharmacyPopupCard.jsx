import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Phone, Navigation } from 'lucide-react';

const PharmacyPopupCard = ({ pharmacy, onClose, onNavigate }) => {
  if (!pharmacy) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="p-4 rounded-xl bg-card/95 backdrop-blur-md border border-primary/10 shadow-xl max-w-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold">{pharmacy.name}</h3>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            pharmacy.open ? 'bg-primary/10 text-primary' : 'bg-red-400/10 text-red-400'
          }`}>
            {pharmacy.open ? 'Open Now' : 'Closed'}
          </span>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/5">
          <span className="text-contrast-muted">×</span>
        </button>
      </div>

      <div className="space-y-2 text-xs text-contrast-secondary mb-3">
        <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {pharmacy.address}</div>
        <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {pharmacy.hours}</div>
        <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {pharmacy.phone}</div>
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 text-yellow-400" /> {pharmacy.rating}
          <span className="text-contrast-muted">· {pharmacy.distance}</span>
        </div>
      </div>

      {pharmacy.stock && (
        <div className="mb-3">
          <p className="text-[10px] text-contrast-muted mb-1">Available:</p>
          <div className="flex flex-wrap gap-1">
            {pharmacy.stock.map((med) => (
              <span key={med} className="px-2 py-0.5 rounded bg-primary/10 text-[10px] text-primary">{med}</span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onNavigate?.(pharmacy)}
        className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-xs font-medium text-dark hover:opacity-90 transition-all flex items-center justify-center gap-2"
      >
        <Navigation className="w-3.5 h-3.5" />
        Get Directions
      </button>
    </motion.div>
  );
};

export default PharmacyPopupCard;
