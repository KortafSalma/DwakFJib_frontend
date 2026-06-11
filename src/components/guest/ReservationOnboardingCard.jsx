import { motion } from 'framer-motion';
import { Search, ShoppingCart, UserCheck, Truck, Sparkles } from 'lucide-react';

const steps = [
  { icon: Search, label: 'Browse', desc: 'Search medications & pharmacies' },
  { icon: ShoppingCart, label: 'Select', desc: 'Choose your medication' },
  { icon: UserCheck, label: 'Create Account', desc: 'Free sign up in seconds' },
  { icon: Truck, label: 'Reserve', desc: 'Confirm & pick up' },
];

const ReservationOnboardingCard = ({ onGetStarted }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-primary/10 p-6 sm:p-8"
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-wider">How it works</span>
        </div>
        <h3 className="text-xl font-bold mb-1">Reserve in 4 easy steps</h3>
        <p className="text-sm text-contrast-secondary mb-6">
          Create an account to start reserving medications from nearby pharmacies
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10 flex items-center justify-center mx-auto mb-2">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="relative">
                <span className="text-xs font-bold text-primary">0{i + 1}</span>
                <p className="text-sm font-medium mt-0.5">{step.label}</p>
                <p className="text-[10px] text-contrast-muted leading-tight mt-0.5">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGetStarted}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-dark font-medium shadow-glow"
        >
          <UserCheck className="w-4 h-4" />
          Get Started Free
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReservationOnboardingCard;
