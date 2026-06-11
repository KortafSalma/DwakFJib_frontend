import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Package, ShoppingCart, Truck, MessageSquare } from 'lucide-react';

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    RESERVATION: { email: true, push: true, sms: false },
    DELIVERY: { email: true, push: true, sms: true },
    STOCK: { email: false, push: true, sms: false },
    SYSTEM: { email: true, push: false, sms: false },
    EMERGENCY: { email: true, push: true, sms: true },
    MESSAGE: { email: false, push: true, sms: false },
  });

  const toggle = (type, channel) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: { ...prev[type], [channel]: !prev[type][channel] },
    }));
  };

  const typeConfig = [
    { key: 'RESERVATION', label: 'Reservations', icon: ShoppingCart },
    { key: 'DELIVERY', label: 'Deliveries', icon: Truck },
    { key: 'STOCK', label: 'Stock Alerts', icon: Package },
    { key: 'EMERGENCY', label: 'Emergency', icon: AlertTriangle },
    { key: 'MESSAGE', label: 'Messages', icon: MessageSquare },
    { key: 'SYSTEM', label: 'System', icon: Bell },
  ];

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-8 h-4 rounded-full transition-colors ${enabled ? 'bg-primary' : 'bg-gray-600'}`}
    >
      <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-card transition-transform ${enabled ? 'translate-x-4' : ''}`} />
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-[10px] text-contrast-muted uppercase tracking-wider px-4">
        <span>Type</span>
        <div className="flex gap-8">
          <span>Push</span>
          <span>Email</span>
          <span>SMS</span>
        </div>
      </div>

      {typeConfig.map((type) => {
        const TypeIcon = type.icon;
        const pref = preferences[type.key];
        return (
          <motion.div
            key={type.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 rounded-xl bg-dark/30 border border-primary/5"
          >
            <div className="flex items-center gap-3">
              <TypeIcon className="w-4 h-4 text-contrast-secondary" />
              <span className="text-sm font-medium">{type.label}</span>
            </div>
            <div className="flex gap-8">
              <ToggleSwitch enabled={pref.push} onChange={() => toggle(type.key, 'push')} />
              <ToggleSwitch enabled={pref.email} onChange={() => toggle(type.key, 'email')} />
              <ToggleSwitch enabled={pref.sms} onChange={() => toggle(type.key, 'sms')} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default NotificationPreferences;
