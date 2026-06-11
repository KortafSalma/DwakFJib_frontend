import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Eye, Save } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

const sections = [
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    settings: [
      { key: 'email_notif', label: 'Notifications par email', desc: 'Reçevoir les alertes par email' },
      { key: 'push_notif', label: 'Notifications push', desc: 'Alertes sur votre appareil' },
      { key: 'reservation_notif', label: 'Réservations', desc: 'Changement de statut des réservations' },
    ],
  },
  {
    id: 'securite',
    label: 'Sécurité',
    icon: Shield,
    settings: [
      { key: 'two_factor', label: 'Authentification à deux facteurs', desc: 'Sécuriser votre compte' },
      { key: 'login_alerts', label: 'Alertes de connexion', desc: 'Recevoir les nouvelles connexions' },
    ],
  },
  {
    id: 'affichage',
    label: 'Affichage',
    icon: Eye,
    settings: [],
  },
];

const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${enabled ? 'bg-brand-500' : 'bg-elevated'}`}
  >
    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-sm transition-transform ${enabled ? 'translate-x-5' : ''}`} />
  </button>
);

const UserSettings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [prefs, setPrefs] = useState({
    email_notif: true,
    push_notif: false,
    reservation_notif: true,
    two_factor: false,
    login_alerts: true,
  });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-contrast-primary">Paramètres</h1>
        <p className="text-sm text-contrast-secondary mt-1">Gérez vos préférences et la sécurité de votre compte</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-2xl border border-subtle p-6">
          <h2 className="text-lg font-semibold text-contrast-primary mb-4">Thème</h2>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-contrast-primary">Mode sombre</p>
              <p className="text-xs text-contrast-muted mt-0.5">Basculer entre le mode clair et sombre</p>
            </div>
            <ToggleSwitch enabled={isDark} onChange={toggleTheme} />
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.id} className="bg-card rounded-2xl border border-subtle p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-elevated flex items-center justify-center">
                <section.icon className="w-4 h-4 text-contrast-secondary" />
              </div>
              <h2 className="text-lg font-semibold text-contrast-primary">{section.label}</h2>
            </div>

            <div className="space-y-1">
              {section.settings.length === 0 ? (
                <p className="text-sm text-contrast-muted py-3">Aucun paramètre disponible</p>
              ) : (
                section.settings.map((s) => (
                  <div key={s.key} className="flex items-center justify-between py-3 border-b border-subtle last:border-0">
                    <div>
                      <p className="text-sm font-medium text-contrast-primary">{s.label}</p>
                      <p className="text-xs text-contrast-muted mt-0.5">{s.desc}</p>
                    </div>
                    <ToggleSwitch enabled={prefs[s.key]} onChange={() => toggle(s.key)} />
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

        <button
          onClick={() => { toast.success('Paramètres enregistrés'); }}
          className="w-full h-11 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 active:bg-brand-700 transition-all inline-flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Enregistrer les paramètres
        </button>
      </div>
    </motion.div>
  );
};

export default UserSettings;