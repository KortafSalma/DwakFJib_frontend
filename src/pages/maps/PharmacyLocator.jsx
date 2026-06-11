import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock } from 'lucide-react';
import DashboardSection from '../../components/ui/DashboardSection';
import Card from '../../components/ui/Card';
import InteractiveMap from '../../components/maps/InteractiveMap';
import PharmacyMarker from '../../components/maps/PharmacyMarker';
import PharmacyPopupCard from '../../components/maps/PharmacyPopupCard';
import LocationSearchBar from '../../components/maps/LocationSearchBar';
import FloatingMapControls from '../../components/maps/FloatingMapControls';
import { mockMapPharmacies } from '../../mock/mapData';

const PharmacyLocator = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = filterOpen ? mockMapPharmacies.filter((p) => p.open) : mockMapPharmacies;

  const handleSelect = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowPopup(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pharmacy Locator</h1>
          <p className="text-sm text-contrast-secondary">Locate and explore pharmacies</p>
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            filterOpen ? 'bg-primary/10 text-primary border border-primary/20' : 'text-contrast-secondary border border-transparent hover:bg-white/5'
          }`}
        >
          {filterOpen ? 'Open Only' : 'All Pharmacies'}
        </button>
      </div>

      <LocationSearchBar pharmacies={mockMapPharmacies} />

      <div className="relative">
        <Card className="p-0 overflow-hidden">
          <div className="h-[600px] relative">
            <InteractiveMap center={[40.7128, -74.0060]} zoom={14} className="h-full">
              {filtered.map((pharmacy) => (
                <PharmacyMarker key={pharmacy.id} pharmacy={pharmacy} />
              ))}
            </InteractiveMap>
            <FloatingMapControls />

            {showPopup && selectedPharmacy && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-[1000]"
              >
                <PharmacyPopupCard
                  pharmacy={selectedPharmacy}
                  onClose={() => setShowPopup(false)}
                />
              </motion.div>
            )}
          </div>
        </Card>
      </div>

      <DashboardSection title="Nearby Pharmacies" subtitle={`${filtered.length} locations`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {filtered.map((pharmacy) => (
            <motion.div
              key={pharmacy.id}
              whileHover={{ y: -2 }}
              onClick={() => handleSelect(pharmacy)}
              className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-white/10 hover:border-white/20 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  pharmacy.open ? 'bg-primary/10 text-primary' : 'bg-red-400/10 text-red-400'
                }`}>
                  {pharmacy.open ? 'Open' : 'Closed'}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium">{pharmacy.rating}</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-1">{pharmacy.name}</h3>
              <div className="space-y-1 text-[10px] text-contrast-muted">
                <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {pharmacy.distance}</div>
                <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {pharmacy.hours}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardSection>
    </motion.div>
  );
};

export default PharmacyLocator;
