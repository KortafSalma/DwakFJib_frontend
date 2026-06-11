import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, Star, Phone, Clock, ArrowLeft, Store, Shield, Pill,
  Navigation, Mail, Package, CheckCircle, TrendingUp, Heart,
  Quote, ChevronRight, Sparkles, ShoppingCart,
} from 'lucide-react';
import AuthRequiredModal from '../../components/guest/AuthRequiredModal';
import { useAuth } from '../../context/AuthContext';
import { useGuest } from '../../context/GuestContext';
import formatMAD from '../../utils/currency';

const pharmacyData = {
  id: 1,
  name: 'City Pharmacy',
  rating: 4.8,
  totalReviews: 234,
  distance: '0.3 mi',
  address: '123 Main St, Downtown, Casablanca 20000',
  phone: '(555) 123-4567',
  email: 'contact@citypharmacy.ma',
  hours: '8:00 AM - 10:00 PM',
  open: true,
  isVerified: true,
  description: 'Your trusted neighborhood pharmacy serving the community for over 20 years. We offer a wide range of medications, health products, and personalized pharmaceutical care.',
  specialties: ['General Pharmacy', 'Emergency Services', 'Health Consultations'],
  location: { lat: 33.5731, lng: -7.5898 },
  stats: {
    totalMedications: 245,
    successfulReservations: 1892,
    avgResponseTime: '12 min',
    satisfaction: '98%',
  },
  medications: [
    { id: 1, name: 'Amoxicillin', category: 'Antibiotic', price: 12.99, stock: 45, is_low_stock: false },
    { id: 2, name: 'Paracetamol', category: 'Pain Relief', price: 5.99, stock: 120, is_low_stock: false },
    { id: 3, name: 'Ibuprofen', category: 'Anti-inflammatory', price: 8.49, stock: 8, is_low_stock: true },
    { id: 4, name: 'Omeprazole', category: 'Gastric', price: 15.99, stock: 34, is_low_stock: false },
    { id: 5, name: 'Lisinopril', category: 'Blood Pressure', price: 18.75, stock: 2, is_low_stock: true },
  ],
  reviews: [
    { id: 1, user: 'Ahmed M.', rating: 5, text: 'Excellent pharmacy with very helpful staff. They had all the medications I needed in stock.', date: '2 days ago' },
    { id: 2, user: 'Sarah K.', rating: 4, text: 'Quick service and good prices. The reservation system made it easy to pick up my order.', date: '1 week ago' },
    { id: 3, user: 'Youssef B.', rating: 5, text: 'Best pharmacy in the neighborhood. Always open late and the pharmacists are very knowledgeable.', date: '2 weeks ago' },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const getAvailability = (med) => {
  if (med.stock <= 0) return { label: 'Out of Stock', classes: 'bg-red-50 text-red-500 border-red-200' };
  if (med.is_low_stock) return { label: 'Low Stock', classes: 'bg-amber-50 text-amber-600 border-amber-200' };
  return { label: 'In Stock', classes: 'bg-brand-50 text-brand-600 border-brand-200' };
};

const PublicPharmacyDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { prepareReservation } = useGuest();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const pharmacy = pharmacyData;

  const handleReserve = (med) => {
    if (user) {
      navigate(`/user/reservations?medication=${med.id}`);
      return;
    }
    prepareReservation({
      medicationId: med.id,
      medicationName: med.name,
      pharmacyName: pharmacy.name,
      quantity: 1,
    });
    setShowAuthModal(true);
  };

  const handleAuthClose = (success) => {
    setShowAuthModal(false);
    if (success) {
      navigate('/user/reservations');
    }
  };

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-contrast-muted hover:text-contrast-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to pharmacies
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card rounded-2xl border border-elevated p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center flex-shrink-0">
              <Store className="w-8 h-8 text-brand-500" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">{pharmacy.name}</h1>
                {pharmacy.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-[10px] font-semibold text-brand-600">
                    <Shield className="w-3 h-3" /> Verified
                  </span>
                )}
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                  pharmacy.open
                    ? 'bg-brand-50 text-brand-600 border-brand-200'
                    : 'bg-red-50 text-red-500 border-red-200'
                }`}>
                  {pharmacy.open ? 'Open Now' : 'Closed'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm mt-2">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="font-semibold text-contrast-primary">{pharmacy.rating}</span>
                  <span className="text-contrast-muted">({pharmacy.totalReviews} reviews)</span>
                </div>
                <span className="hidden sm:block text-contrast-muted">·</span>
                <div className="flex items-center gap-1.5 text-contrast-secondary">
                  <MapPin className="w-4 h-4 text-contrast-muted" />
                  {pharmacy.distance} away
                </div>
                <span className="hidden sm:block text-contrast-muted">·</span>
                <div className="flex items-center gap-1.5 text-contrast-secondary">
                  <Clock className="w-4 h-4 text-contrast-muted" />
                  {pharmacy.hours}
                </div>
              </div>

              <p className="text-sm text-contrast-secondary mt-4 leading-relaxed max-w-2xl">{pharmacy.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {pharmacy.specialties.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-[11px] font-medium text-brand-600">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  onClick={() => handleReserve(pharmacy.medications[0])}
                  className="h-11 px-6 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Reserve Medication
                </button>
                <button
                  onClick={() => navigate(`/maps?lat=${pharmacy.location.lat}&lng=${pharmacy.location.lng}`)}
                  className="h-11 px-5 rounded-xl border border-elevated text-contrast-secondary text-sm font-medium hover:border-muted hover:bg-elevated transition-all inline-flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
                <a
                  href={`tel:${pharmacy.phone}`}
                  className="h-11 px-5 rounded-xl border border-elevated text-contrast-secondary text-sm font-medium hover:border-muted hover:bg-elevated transition-all inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Contact
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: MapPin, label: 'Address', value: pharmacy.address },
            { icon: Phone, label: 'Phone', value: pharmacy.phone, href: `tel:${pharmacy.phone}` },
            { icon: Mail, label: 'Email', value: pharmacy.email, href: `mailto:${pharmacy.email}` },
            { icon: Clock, label: 'Hours', value: pharmacy.hours },
          ].map((item) => (
            <motion.div key={item.label} variants={fadeUp} className="bg-card rounded-2xl border border-elevated p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-brand-500" />
                </div>
                <span className="text-xs font-semibold text-contrast-muted uppercase tracking-wider">{item.label}</span>
              </div>
              {item.href ? (
                <a href={item.href} className="text-sm font-medium text-contrast-primary hover:text-brand-500 transition-colors">{item.value}</a>
              ) : (
                <p className="text-sm font-medium text-contrast-primary">{item.value}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl border border-elevated overflow-hidden"
        >
          <div className="h-48 sm:h-56 bg-gradient-to-br from-brand-50 to-slate-50 flex items-center justify-center relative">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-brand-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-contrast-primary">{pharmacy.address}</p>
              <p className="text-xs text-contrast-muted mt-1">{pharmacy.location.lat.toFixed(4)}, {pharmacy.location.lng.toFixed(4)}</p>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 border border-elevated text-[11px] text-contrast-secondary">
              <MapPin className="w-3 h-3 text-brand-500" />
              Pharmacy location
            </div>
          </div>
        </motion.div>

        {/* Medications */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-contrast-primary">Available Medications</h2>
              <p className="text-sm text-contrast-muted mt-0.5">{pharmacy.medications.length} medications in stock</p>
            </div>
            <button
              onClick={() => navigate('/user/search')}
              className="hidden sm:inline-flex items-center gap-1 text-sm text-brand-500 hover:text-brand-600 font-medium"
            >
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
            {pharmacy.medications.map((med) => {
              const availability = getAvailability(med);
              return (
                <motion.div
                  key={med.id}
                  variants={fadeUp}
                  className="bg-card rounded-2xl border border-elevated p-4 sm:p-5 hover:border-elevated hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                        <Pill className="w-5 h-5 text-brand-500" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-contrast-primary truncate">{med.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] text-contrast-muted">{med.category}</span>
                          <span className="text-contrast-muted">·</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${availability.classes}`}>
                            {availability.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-base font-bold text-contrast-primary">{formatMAD(med.price)}</span>
                      <button
                        onClick={() => handleReserve(med)}
                        disabled={med.stock <= 0}
                        className={`h-9 px-4 rounded-xl text-xs font-medium transition-all inline-flex items-center gap-1.5 ${
                          med.stock > 0
                            ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-sm'
                            : 'bg-elevated text-contrast-muted cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {med.stock > 0 ? 'Reserve' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-lg font-semibold text-contrast-primary mb-4">Pharmacy Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Package, label: 'Total Medications', value: pharmacy.stats.totalMedications, color: 'text-brand-500', bg: 'bg-brand-50' },
              { icon: CheckCircle, label: 'Successful Reservations', value: pharmacy.stats.successfulReservations, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { icon: TrendingUp, label: 'Avg. Response Time', value: pharmacy.stats.avgResponseTime, color: 'text-amber-500', bg: 'bg-amber-50' },
              { icon: Heart, label: 'Patient Satisfaction', value: pharmacy.stats.satisfaction, color: 'text-rose-500', bg: 'bg-rose-50' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl border border-elevated p-5">
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <p className="text-xl font-bold text-contrast-primary">{stat.value}</p>
                <p className="text-xs text-contrast-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-contrast-primary">Patient Reviews</h2>
              <p className="text-sm text-contrast-muted mt-0.5">{pharmacy.reviews.length} reviews</p>
            </div>
          </div>

          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
            {pharmacy.reviews.map((review) => (
              <motion.div key={review.id} variants={fadeUp} className="bg-card rounded-2xl border border-elevated p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-500">{review.user.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-contrast-primary">{review.user}</p>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-contrast-muted'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-contrast-muted flex-shrink-0">{review.date}</span>
                </div>
                <div className="flex gap-2">
                  <Quote className="w-3.5 h-3.5 text-contrast-muted flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-contrast-secondary leading-relaxed">{review.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          <div className="relative">
            <Sparkles className="w-8 h-8 text-white/60 mx-auto mb-3" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Reserve Your Medication</h2>
            <p className="text-sm text-white/70 mt-2 max-w-md mx-auto">
              Reserve your medication instantly and pick it up at {pharmacy.name}. No upfront payment needed.
            </p>
            <button
              onClick={() => handleReserve(pharmacy.medications[0])}
              className="mt-6 h-12 px-8 rounded-xl bg-card text-brand-600 text-sm font-semibold hover:bg-brand-50 transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Reserve Now
            </button>
          </div>
        </motion.div>
      </div>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={handleAuthClose}
        action="reservation"
      />
    </div>
  );
};

export default PublicPharmacyDetails;
