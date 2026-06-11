import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Pill, MapPin } from 'lucide-react';
import DashboardSection from '../../components/ui/DashboardSection';
import Card from '../../components/ui/Card';
import InteractiveMap from '../../components/maps/InteractiveMap';
import PharmacyMarker from '../../components/maps/PharmacyMarker';
import EmergencyAvailabilityWidget from '../../components/maps/EmergencyAvailabilityWidget';
import FloatingMapControls from '../../components/maps/FloatingMapControls';
import { mockMapPharmacies, mockEmergencyMedications } from '../../mock/mapData';

const EmergencyAvailabilityMap = () => {
  const [selectedMed, setSelectedMed] = useState(null);
  const emergencyPharmacies = mockMapPharmacies.filter((p) => p.emergency || p.open);

  const filteredMeds = selectedMed
    ? mockEmergencyMedications.filter((m) => m.name.toLowerCase().includes(selectedMed.toLowerCase()))
    : mockEmergencyMedications;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Emergency Availability</h1>
          <p className="text-sm text-contrast-secondary">Find emergency medications nearby</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-400/10 border border-red-400/20">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-xs font-medium text-red-400">Emergency Mode</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="h-[500px] relative">
              <InteractiveMap center={[40.7128, -74.0060]} zoom={14} className="h-full">
                {emergencyPharmacies.map((pharmacy) => (
                  <PharmacyMarker key={pharmacy.id} pharmacy={pharmacy} />
                ))}
              </InteractiveMap>
              <FloatingMapControls />
            </div>
          </Card>
        </div>
        <div>
          <DashboardSection title="Emergency Medications" subtitle="Available nearby">
            <Card>
              <div className="mb-3">
                <input
                  type="text"
                  value={selectedMed || ''}
                  onChange={(e) => setSelectedMed(e.target.value)}
                  placeholder="Search medication..."
                  className="w-full px-3 py-2 rounded-lg bg-dark/50 border border-white/10 text-sm text-white placeholder-contrast-muted focus:outline-none focus:ring-2 focus:ring-red-400/30"
                />
              </div>
              <EmergencyAvailabilityWidget medications={filteredMeds} />
            </Card>
          </DashboardSection>
        </div>
      </div>

      <DashboardSection title="Emergency Pharmacies" subtitle="24/7 or extended hours">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyPharmacies.map((pharmacy) => (
            <motion.div
              key={pharmacy.id}
              whileHover={{ y: -2 }}
              className="p-4 rounded-xl bg-card/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold">{pharmacy.name}</h3>
                </div>
                {pharmacy.emergency && (
                  <span className="px-2 py-0.5 rounded-full bg-red-400/10 text-[10px] font-semibold text-red-400">
                    Emergency
                  </span>
                )}
              </div>
              <div className="space-y-1 text-[10px] text-contrast-muted">
                <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {pharmacy.address}</div>
                <p>{pharmacy.hours}</p>
                <p>Stock: {pharmacy.stock?.join(', ')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </DashboardSection>
    </motion.div>
  );
};

export default EmergencyAvailabilityMap;
