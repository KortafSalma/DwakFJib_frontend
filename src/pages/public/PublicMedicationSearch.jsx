import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import PublicSearchHero from '../../components/guest/PublicSearchHero';
import PublicMedicationPreview from '../../components/guest/PublicMedicationPreview';
import AuthRequiredModal from '../../components/guest/AuthRequiredModal';
import FloatingGuestCTA from '../../components/guest/FloatingGuestCTA';
import ExploreNearbyBanner from '../../components/guest/ExploreNearbyBanner';
import SmartLoginPrompt from '../../components/guest/SmartLoginPrompt';
import { useGuest } from '../../context/GuestContext';
import { useAuth } from '../../context/AuthContext';

const mockMedications = [
  { id: 1, name: 'Amoxicillin', category: 'Antibiotic', price: 12.99, stock: 45, pharmacy: 'City Pharmacy', inStock: true, description: 'Antibiotic used to treat bacterial infections', dosage: '500mg' },
  { id: 2, name: 'Paracetamol', category: 'Pain Relief', price: 5.99, stock: 120, pharmacy: 'HealthPlus Drugstore', inStock: true, description: 'Effective pain reliever and fever reducer', dosage: '500mg' },
  { id: 3, name: 'Ibuprofen', category: 'Anti-inflammatory', price: 8.49, stock: 78, pharmacy: 'City Pharmacy', inStock: true, description: 'NSAID for pain and inflammation', dosage: '400mg' },
  { id: 4, name: 'Omeprazole', category: 'Gastric', price: 15.99, stock: 34, pharmacy: 'MediCare Pharmacy', inStock: true, description: 'Proton pump inhibitor for acid reflux', dosage: '20mg' },
  { id: 5, name: 'Metformin', category: 'Diabetes', price: 9.99, stock: 56, pharmacy: 'HealthPlus Drugstore', inStock: true, description: 'First-line medication for type 2 diabetes', dosage: '850mg' },
  { id: 6, name: 'Atorvastatin', category: 'Cholesterol', price: 22.50, stock: 0, pharmacy: 'MediCare Pharmacy', inStock: false, description: 'Statin used to lower cholesterol levels', dosage: '10mg' },
  { id: 7, name: 'Lisinopril', category: 'Blood Pressure', price: 18.75, stock: 29, pharmacy: 'City Pharmacy', inStock: true, description: 'ACE inhibitor for hypertension', dosage: '10mg' },
  { id: 8, name: 'Salbutamol', category: 'Respiratory', price: 11.25, stock: 67, pharmacy: 'Wellness Pharmacy', inStock: true, description: 'Bronchodilator for asthma relief', dosage: '100mcg' },
  { id: 9, name: 'Ciprofloxacin', category: 'Antibiotic', price: 14.99, stock: 22, pharmacy: 'HealthPlus Drugstore', inStock: true, description: 'Broad-spectrum antibiotic', dosage: '500mg' },
];

const categories = ['All', 'Antibiotic', 'Pain Relief', 'Anti-inflammatory', 'Gastric', 'Diabetes', 'Blood Pressure', 'Respiratory'];

function filterMedications(value, category) {
  return mockMedications.filter((med) => {
    const matchQuery = !value || med.name.toLowerCase().includes(value.toLowerCase()) ||
      med.category.toLowerCase().includes(value.toLowerCase()) ||
      med.description?.toLowerCase().includes(value.toLowerCase());
    const matchCategory = category === 'All' || med.category === category;
    return matchQuery && matchCategory;
  });
}

const PublicMedicationSearch = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { prepareReservation } = useGuest();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const searchTimer = useRef(null);
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      const timer = setTimeout(() => {
        setResults(filterMedications('', 'All'));
        setLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    setLoading(true);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setResults(filterMedications(value, selectedCategory));
      setLoading(false);
    }, 400);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setLoading(true);
  };

  useEffect(() => {
    if (initialLoad.current) return;
    if (!query && selectedCategory === 'All') return;
    const timer = setTimeout(() => {
      setResults(filterMedications(query, selectedCategory));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, query]);

  const handleReserve = (med) => {
    if (user) {
      navigate(`/user/reservations?medication=${med.id}`);
      return;
    }
    prepareReservation({
      medicationId: med.id,
      medicationName: med.name,
      pharmacyName: med.pharmacy,
      quantity: 1,
    });
    setShowAuthModal(true);
  };

  const handleAuthModalClose = (success) => {
    setShowAuthModal(false);
    if (success) {
      navigate('/login', {
        state: { from: '/user/reservations', pendingAction: 'reservation' }
      });
    }
  };

  const handleEmergency = () => navigate('/emergency-availability');
  const handleExplore = () => navigate('/pharmacies');

  return (
    <div className="min-h-screen">
      <PublicSearchHero onSearch={handleSearch} onEmergency={handleEmergency} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold">Available Medications</h2>
            <p className="text-sm text-contrast-secondary">{results.length} medications found</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:hidden">
              <SmartLoginPrompt
                compact
                onAction={() => setShowAuthModal(true)}
                message="Sign in to save favorites and reserve medications"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 border border-primary/10 text-sm text-contrast-secondary hover:text-white hover:border-primary/20 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-4 rounded-xl bg-card/60 border border-primary/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Category</span>
                  <button onClick={() => setShowFilters(false)} className="text-contrast-muted hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'bg-white/5 text-contrast-secondary border border-white/10 hover:text-white hover:border-primary/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <PublicMedicationPreview
          medications={results}
          onReserve={handleReserve}
          loading={loading}
        />

        <div className="mt-8">
          <ExploreNearbyBanner onExplore={handleExplore} pharmacies={12} />
        </div>

        {!user && (
          <div className="mt-6">
            <SmartLoginPrompt
              onAction={() => setShowAuthModal(true)}
            />
          </div>
        )}
      </div>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={handleAuthModalClose}
        action="reservation"
      />

      {!user && (
        <FloatingGuestCTA
          onSignIn={() => setShowAuthModal(true)}
          delay={5000}
        />
      )}
    </div>
  );
};

export default PublicMedicationSearch;
