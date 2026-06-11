import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';

const GuestReservationPrompt = ({ medicationName, pharmacyName, onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-card to-secondary/10 border border-primary/20 p-6 sm:p-8"
    >
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Ready to Reserve</span>
            </div>
            <h3 className="text-lg font-semibold mt-0.5">
              {medicationName || 'Medication'}
            </h3>
          </div>
        </div>

        {pharmacyName && (
          <p className="text-sm text-contrast-secondary mb-4">
            Available at <span className="text-white font-medium">{pharmacyName}</span>
          </p>
        )}

        <p className="text-contrast-secondary text-sm mb-5">
          Create a free account to reserve this medication. Your selection will be saved and ready when you are.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-dark font-medium shadow-glow hover:opacity-90 transition-all"
        >
          Continue to Create Account
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <p className="text-[11px] text-contrast-muted text-center mt-3">
          No credit card required. Free to join.
        </p>
      </div>
    </motion.div>
  );
};

export default GuestReservationPrompt;
