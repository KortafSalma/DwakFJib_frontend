import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Star, Phone, Clock, ArrowRight, Store, Search } from 'lucide-react';
import AuthRequiredModal from '../../components/guest/AuthRequiredModal';
import FloatingGuestCTA from '../../components/guest/FloatingGuestCTA';
import { useAuth } from '../../context/AuthContext';

const pharmacies = [
  { id: 1, name: 'City Pharmacy', rating: 4.8, reviews: 234, distance: '0.3', address: '123 Main St, Downtown', phone: '(555) 123-4567', hours: '8:00 AM - 10:00 PM', open: true, specialties: ['General', 'Emergency'] },
  { id: 2, name: 'HealthPlus Drugstore', rating: 4.6, reviews: 189, distance: '0.8', address: '456 Oak Ave, Medical District', phone: '(555) 234-5678', hours: '7:00 AM - 11:00 PM', open: true, specialties: ['Chronic Care', 'Vaccinations'] },
  { id: 3, name: 'MediCare Pharmacy', rating: 4.9, reviews: 312, distance: '1.2', address: '789 Pine Rd, Health Center', phone: '(555) 345-6789', hours: '24 Hours', open: true, specialties: ['24/7', 'Emergency', 'Specialty'] },
  { id: 4, name: 'Wellness Pharmacy', rating: 4.5, reviews: 156, distance: '1.5', address: '321 Elm St, Westside', phone: '(555) 456-7890', hours: '9:00 AM - 9:00 PM', open: true, specialties: ['Wellness', 'Consultations'] },
  { id: 5, name: 'Family Care Pharmacy', rating: 4.7, reviews: 278, distance: '1.8', address: '555 Birch Ln, Suburbia', phone: '(555) 567-8901', hours: '8:30 AM - 8:30 PM', open: false, specialties: ['Pediatric', 'Senior Care'] },
  { id: 6, name: 'Express Meds', rating: 4.4, reviews: 98, distance: '2.1', address: '777 Cedar Blvd, Eastside', phone: '(555) 678-9012', hours: '8:00 AM - 11:00 PM', open: true, specialties: ['Quick Service', 'Delivery'] },
];

const PublicNearbyPharmacies = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = pharmacies.filter((p) =>
    !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (pharmacy) => {
    navigate(`/pharmacies/${pharmacy.id}`);
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-dark to-secondary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Store className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Nearby Pharmacies</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Find <span className="text-gradient">Pharmacies</span> Near You
            </h1>
            <p className="text-contrast-secondary text-sm sm:text-base mb-6">
              Browse medications, compare prices, and check availability at pharmacies in your area.
            </p>

            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pharmacies..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/60 border border-primary/10 text-sm text-white placeholder-contrast-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-contrast-secondary">{filtered.length} pharmacies near you</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/maps')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 border border-primary/10 text-sm text-contrast-secondary hover:text-white hover:border-primary/20 transition-all"
          >
            <Navigation className="w-4 h-4" />
            View Map
          </motion.button>
        </div>

        <div className="grid gap-4">
          {filtered.map((pharmacy, i) => (
            <motion.div
              key={pharmacy.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl bg-card/60 backdrop-blur-sm border border-primary/5 hover:border-primary/20 transition-all p-4 sm:p-5"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/10 flex items-center justify-center flex-shrink-0">
                  <Store className="w-6 h-6 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold group-hover:text-primary transition-colors">
                      {pharmacy.name}
                    </h3>
                    {pharmacy.open ? (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] text-primary font-medium">Open</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-[10px] text-red-400 font-medium">Closed</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-contrast-secondary">{pharmacy.rating}</span>
                      <span className="text-[10px] text-contrast-muted">({pharmacy.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-contrast-muted" />
                      <span className="text-xs text-contrast-secondary">{pharmacy.distance} mi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-contrast-muted" />
                      <span className="text-xs text-contrast-secondary">{pharmacy.hours}</span>
                    </div>
                  </div>

                  <p className="text-xs text-contrast-muted mt-1">{pharmacy.address}</p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {pharmacy.specialties.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-contrast-secondary">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:flex-col w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleViewDetails(pharmacy)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-dark text-xs font-medium shadow-glow"
                  >
                    View Details
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                  {!user && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAuthModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-primary/10 text-[11px] text-contrast-secondary hover:text-white transition-all"
                    >
                      <Phone className="w-3 h-3" />
                      <span className="hidden sm:inline">Contact</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        action="checkout"
      />

      {!user && (
        <FloatingGuestCTA
          onSignIn={() => setShowAuthModal(true)}
          delay={6000}
        />
      )}
    </div>
  );
};

export default PublicNearbyPharmacies;
