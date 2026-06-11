import { motion } from 'framer-motion';
import { AlertTriangle, Pill, MapPin } from 'lucide-react';

const EmergencyAvailabilityWidget = ({ medications = [] }) => {
  const displayMeds = medications.length > 0 ? medications : [
    { name: 'Amoxicillin 500mg', category: 'Antibiotics', available: ['HealthPlus Pharmacy', 'Wellness Hub'], nearest: '0.8km' },
    { name: 'EpiPen', category: 'Emergency', available: ['Wellness Hub'], nearest: '3.5km' },
    { name: 'Insulin', category: 'Diabetes', available: ['HealthPlus Pharmacy', 'MediCare Center'], nearest: '0.8km' },
    { name: 'Nitroglycerin', category: 'Cardiology', available: ['HealthPlus Pharmacy'], nearest: '0.8km' },
    { name: 'Albuterol Inhaler', category: 'Respiratory', available: ['Wellness Hub', 'City Pharmacy'], nearest: '3.5km' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-400/10 border border-red-400/20">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <span className="text-xs font-medium text-red-400">Emergency Medications</span>
      </div>

      {displayMeds.map((med, i) => (
        <motion.div
          key={med.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-3 rounded-lg bg-dark/30 border border-primary/5"
        >
          <div className="flex items-center gap-2 mb-2">
            <Pill className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm font-medium">{med.name}</p>
              <p className="text-[10px] text-contrast-muted">{med.category}</p>
            </div>
          </div>
          <div className="space-y-1">
            {med.available.map((pharmacy) => (
              <div key={pharmacy} className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 text-contrast-secondary"><MapPin className="w-3 h-3" /> {pharmacy}</span>
                <span className="text-primary">{med.nearest}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EmergencyAvailabilityWidget;
