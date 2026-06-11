import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Clock, X } from 'lucide-react';

const ReservationContinueCard = ({ reservation, onContinue, onDismiss }) => {
  if (!reservation) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed bottom-6 right-6 z-40 max-w-sm w-full"
    >
      <div className="bg-card/90 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl p-4">
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-contrast-muted hover:text-contrast-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <ShoppingCart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {reservation.medicationName || 'Pending Reservation'}
            </p>
            <p className="text-xs text-contrast-secondary">
              {reservation.pharmacyName || 'Pharmacy'}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] text-amber-400">Awaiting account</span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-dark text-sm font-medium shadow-glow"
        >
          Complete Reservation
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReservationContinueCard;
