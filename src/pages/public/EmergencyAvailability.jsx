import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Ambulance, MapPin, Phone, Clock, Shield, AlertTriangle, ArrowLeft } from 'lucide-react';
import AuthRequiredModal from '../../components/guest/AuthRequiredModal';
import { useAuth } from '../../context/AuthContext';

const emergencyPharmacies = [
  { id: 1, name: 'MediCare Pharmacy', address: '789 Pine Rd, Health Center', phone: '(555) 345-6789', hours: '24 Hours', distance: '1.2 mi', emergency: true, medications: ['Emergency Contraceptive', 'Epinephrine', 'Naloxone'] },
  { id: 2, name: 'City Pharmacy', address: '123 Main St, Downtown', phone: '(555) 123-4567', hours: '8:00 AM - 10:00 PM', distance: '0.3 mi', emergency: false, medications: ['Antibiotics', 'Pain Relief'] },
  { id: 3, name: 'HealthPlus Drugstore', address: '456 Oak Ave, Medical District', phone: '(555) 234-5678', hours: '7:00 AM - 11:00 PM', distance: '0.8 mi', emergency: false, medications: ['Emergency Contraceptive', 'First Aid'] },
];

const emergencyMeds = [
  { name: 'Epinephrine Auto-Injector', use: 'Severe allergic reactions', availability: 'Available at 24h pharmacies' },
  { name: 'Naloxone (Narcan)', use: 'Opioid overdose reversal', availability: 'Available at most pharmacies' },
  { name: 'Emergency Contraceptive', use: 'Morning-after pill', availability: 'Available without prescription' },
  { name: 'Antibiotics (Broad-spectrum)', use: 'Serious bacterial infections', availability: 'Prescription required' },
];

const EmergencyAvailability = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-dark to-orange-500/5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-contrast-secondary hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
              <Ambulance className="w-4 h-4 text-red-400" />
              <span className="text-xs font-medium text-red-400">Emergency Availability</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Emergency Medication <span className="text-red-400">Availability</span>
            </h1>
            <p className="text-contrast-secondary text-sm sm:text-base mb-4">
              Find critical medications and emergency pharmaceutical services near you. Updated in real-time.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-6">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <p className="text-xs text-amber-400">
                For medical emergencies, call 911 immediately. This tool is for finding medication availability only.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold mb-4">Emergency Medications</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {emergencyMeds.map((med, i) => (
            <motion.div
              key={med.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-card/60 border border-red-500/10 hover:border-red-500/20 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{med.name}</h4>
                  <p className="text-xs text-contrast-secondary mt-0.5">{med.use}</p>
                  <p className="text-xs text-primary mt-1">{med.availability}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4">Nearby Pharmacies</h2>
        <div className="space-y-3 mb-10">
          {emergencyPharmacies.map((ph, i) => (
            <motion.div
              key={ph.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 sm:p-5 rounded-xl bg-card/60 border border-primary/5 hover:border-primary/20 transition-all"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  ph.emergency
                    ? 'bg-red-500/10 border border-red-500/20'
                    : 'bg-primary/10 border border-primary/10'
                }`}>
                  {ph.emergency
                    ? <Ambulance className="w-6 h-6 text-red-400" />
                    : <Shield className="w-6 h-6 text-primary" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-semibold">{ph.name}</h4>
                    {ph.emergency && (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-[10px] text-red-400 font-medium">24/7</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-contrast-secondary">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ph.distance}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ph.hours}</span>
                  </div>
                  <p className="text-xs text-contrast-muted mt-0.5">{ph.address}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {ph.medications.map((m) => (
                      <span key={m} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-contrast-secondary">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/pharmacies/${ph.id}`)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-dark text-xs font-medium shadow-glow"
                  >
                    View
                  </motion.button>
                  {!user && (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="text-[10px] text-contrast-muted hover:text-contrast-primary transition-colors"
                    >
                      Save pharmacy
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 rounded-xl bg-card/60 border border-primary/10 text-center"
        >
          <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Need Immediate Help?</h3>
          <p className="text-sm text-contrast-secondary mb-4">
            For life-threatening emergencies, always call 911. For urgent medication needs, create an account to contact pharmacies directly.
          </p>
          {!user && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAuthModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all"
            >
              <Phone className="w-4 h-4" />
              Sign in to Contact Pharmacies
            </motion.button>
          )}
        </motion.div>
      </section>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        action="checkout"
      />
    </div>
  );
};

export default EmergencyAvailability;
