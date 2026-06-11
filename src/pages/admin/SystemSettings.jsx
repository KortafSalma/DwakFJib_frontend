import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Shield, Bell, Globe, Database, Save,
  Search, X, RotateCcw, CheckCircle, Sliders,
  Clock, Lock, Mail, MessageSquare, Smartphone,
  Languages, DollarSign, MapPin, HardDrive,
  Upload, RefreshCw, AlertTriangle, FileText,
  Users, Building2, Fingerprint, Link2,
  Palette, Activity, UserCheck, Truck,
  Calendar, ShoppingCart, Layout, Monitor, Sparkles,
} from 'lucide-react';
import { ToggleSwitch } from '../../components/ui';
import { useDemo } from '../../context/DemoContext';

const tabs = [
  { id: 'general', label: 'General Settings', icon: Settings, count: 5 },
  { id: 'users', label: 'User Settings', icon: Users, count: 3 },
  { id: 'pharmacy', label: 'Pharmacy Settings', icon: Building2, count: 3 },
  { id: 'distributor', label: 'Distributor Settings', icon: Truck, count: 3 },
  { id: 'reservations', label: 'Reservations', icon: ShoppingCart, count: 2 },
  { id: 'notifications', label: 'Notifications', icon: Bell, count: 3 },
  { id: 'security', label: 'Security', icon: Shield, count: 4 },
  { id: 'integrations', label: 'Integrations', icon: Link2, count: 3 },
  { id: 'appearance', label: 'Appearance', icon: Palette, count: 3 },
  { id: 'audit', label: 'Audit Logs', icon: Activity, count: 4 },
  { id: 'demo', label: 'Demo Mode', icon: Monitor, count: 3 },
];

const defaultSettings = {
  siteName: 'DwakFJib',
  siteDescription: 'Plateforme SaaS de Gestion de Stock Pharmaceutique et Logistique de Santé',
  supportEmail: 'support@dwakfjib.ma',
  contactPhone: '+212 5 22 00 00 00',
  contactAddress: 'Casablanca, Maroc',
  maxReservationDays: '7',
  autoApprovePharmacies: false,
  autoApproveDistributors: false,
  MFARequired: true,
  sessionTimeout: '60',
  maxLoginAttempts: '5',
  passwordMinLength: '8',
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  defaultLanguage: 'fr',
  defaultCurrency: 'MAD',
  timezone: 'Africa/Casablanca',
  dataRetentionDays: '365',
  autoBackupEnabled: true,
  backupFrequency: 'daily',
  lowStockThreshold: '10',
  reservationExpiryHours: '24',
  enableRegistration: true,
  requireEmailVerification: true,
};

const settingLabels = {
  siteName: 'Platform Name',
  siteDescription: 'Platform Description',
  supportEmail: 'Support Email',
  contactPhone: 'Contact Phone',
  contactAddress: 'Contact Address',
  maxReservationDays: 'Max Reservation Days',
  autoApprovePharmacies: 'Auto-approve Pharmacies',
  autoApproveDistributors: 'Auto-approve Distributors',
  MFARequired: 'Require MFA',
  sessionTimeout: 'Session Timeout (min)',
  maxLoginAttempts: 'Max Login Attempts',
  passwordMinLength: 'Min Password Length',
  emailNotifications: 'Email Notifications',
  smsNotifications: 'SMS Notifications',
  pushNotifications: 'Push Notifications',
  defaultLanguage: 'Default Language',
  defaultCurrency: 'Currency',
  timezone: 'Timezone',
  dataRetentionDays: 'Data Retention (days)',
  autoBackupEnabled: 'Auto-backup Enabled',
  backupFrequency: 'Backup Frequency',
  lowStockThreshold: 'Low Stock Threshold',
  reservationExpiryHours: 'Reservation Expiry (hours)',
  enableRegistration: 'Enable Registration',
  requireEmailVerification: 'Require Email Verification',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const SystemSettings = () => {
  const { demoMode, toggleDemoMode, demoDataLoaded, enableDemoData, disableDemoData } = useDemo();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({ ...defaultSettings });
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);

  const originalSettings = useMemo(() => ({ ...defaultSettings }), []);

  const hasChanges = useMemo(
    () => Object.keys(settings).some((key) => settings[key] !== originalSettings[key]),
    [settings, originalSettings]
  );

  const toggleCount = useMemo(
    () => Object.values(settings).filter((v) => v === true).length,
    [settings]
  );

  const pendingChanges = useMemo(
    () => Object.keys(settings).filter((key) => settings[key] !== originalSettings[key]).length,
    [settings, originalSettings]
  );

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    setSearchQuery('');
  }, []);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setToast('Settings saved successfully');
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleReset = useCallback(() => {
    setSettings({ ...defaultSettings });
    setToast('Settings reset to defaults');
    setTimeout(() => setToast(null), 3000);
  }, []);

  const filteredTabs = useMemo(() => {
    if (!searchQuery) return tabs;
    const q = searchQuery.toLowerCase();
    return tabs.filter((t) =>
      t.label.toLowerCase().includes(q) ||
      Object.entries(settingLabels).some(([key, label]) =>
        label.toLowerCase().includes(q) && keyToTabId(key) === t.id
      )
    );
  }, [searchQuery]);

  function keyToTabId(key) {
    const map = {
      siteName: 'general', siteDescription: 'general', supportEmail: 'general',
      contactPhone: 'general', contactAddress: 'general',
      enableRegistration: 'users', requireEmailVerification: 'users',
      autoApprovePharmacies: 'pharmacy', lowStockThreshold: 'pharmacy',
      autoApproveDistributors: 'distributor',
      maxReservationDays: 'reservations', reservationExpiryHours: 'reservations',
      emailNotifications: 'notifications', smsNotifications: 'notifications', pushNotifications: 'notifications',
      MFARequired: 'security', sessionTimeout: 'security', maxLoginAttempts: 'security', passwordMinLength: 'security',
      defaultLanguage: 'general', defaultCurrency: 'general', timezone: 'general',
      dataRetentionDays: 'general', autoBackupEnabled: 'general', backupFrequency: 'general',
    };
    return map[key] || 'general';
  }

  const inputClasses = "w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 transition-all";
  const selectClasses = "w-full h-11 px-4 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 transition-all appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M5.5%207l4.5%204.5L14.5%207%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10";

  const renderToggleRow = (key, label, desc, Icon = null) => (
    <div className="flex items-center justify-between py-3.5 px-5 rounded-2xl bg-[#F8FAFC] hover:bg-slate-100/70 transition-colors -mx-1">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="w-4 h-4 text-slate-500" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
        </div>
      </div>
      <ToggleSwitch enabled={settings[key]} onChange={() => updateSetting(key, !settings[key])} />
    </div>
  );

  const SectionCard = ({ icon: Icon, title, desc, children, color = 'bg-[#14B8A6]' }) => (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-100/80 transition-all duration-300">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color === 'bg-[#14B8A6]' ? 'bg-[#14B8A6]/10 text-[#14B8A6]' : color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          {desc && <p className="text-xs text-slate-500 mt-0.5">{desc}</p>}
        </div>
      </div>
      {children}
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-5">
      <SectionCard icon={Settings} title="Platform" desc="Core platform information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Platform Name</label>
            <input className={inputClasses} value={settings.siteName} onChange={(e) => updateSetting('siteName', e.target.value)} placeholder="Platform name" />
            <p className="text-xs text-slate-400 mt-1.5">Displayed across the entire platform</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Support Email</label>
            <input className={inputClasses} value={settings.supportEmail} onChange={(e) => updateSetting('supportEmail', e.target.value)} placeholder="support@example.com" />
            <p className="text-xs text-slate-400 mt-1.5">Primary contact for user inquiries</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Platform Description</label>
            <textarea
              className="w-full h-20 px-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 transition-all resize-none"
              value={settings.siteDescription}
              onChange={(e) => updateSetting('siteDescription', e.target.value)}
              placeholder="Platform description"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Contact Phone</label>
            <input className={inputClasses} value={settings.contactPhone} onChange={(e) => updateSetting('contactPhone', e.target.value)} placeholder="+212 X XX XX XX XX" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Contact Address</label>
            <input className={inputClasses} value={settings.contactAddress} onChange={(e) => updateSetting('contactAddress', e.target.value)} placeholder="City, Country" />
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={Globe} title="Localization" desc="Regional preferences" color="bg-indigo-50 text-indigo-600">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-slate-400" /> Default Language
            </label>
            <select className={selectClasses} value={settings.defaultLanguage} onChange={(e) => updateSetting('defaultLanguage', e.target.value)}>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Currency
            </label>
            <select className={selectClasses} value={settings.defaultCurrency} onChange={(e) => updateSetting('defaultCurrency', e.target.value)}>
              <option value="MAD">MAD (د.م.)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Timezone
            </label>
            <select className={selectClasses} value={settings.timezone} onChange={(e) => updateSetting('timezone', e.target.value)}>
              <option value="Africa/Casablanca">Casablanca</option>
              <option value="Africa/Rabat">Rabat</option>
              <option value="Europe/Paris">Paris</option>
              <option value="America/New_York">New York</option>
            </select>
          </div>
        </div>
      </SectionCard>

      <SectionCard icon={HardDrive} title="Data & Backup" desc="Data retention and backup configuration" color="bg-slate-100 text-slate-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Data Retention (days)</label>
            <input className={inputClasses} value={settings.dataRetentionDays} onChange={(e) => updateSetting('dataRetentionDays', e.target.value)} placeholder="365" />
            <p className="text-xs text-slate-400 mt-1.5">How long to keep historical records</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Backup Frequency</label>
            <select className={selectClasses} value={settings.backupFrequency} onChange={(e) => updateSetting('backupFrequency', e.target.value)}>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        <div className="mt-4">{renderToggleRow('autoBackupEnabled', 'Auto-backup Enabled', 'Automatic scheduled database backups', Upload)}</div>
      </SectionCard>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-5">
      <SectionCard icon={UserCheck} title="Registration" desc="User registration policies" color="bg-blue-50 text-blue-600">
        <div className="space-y-1">
          {renderToggleRow('enableRegistration', 'Enable Registration', 'Allow new users to register on the platform', UserCheck)}
        </div>
      </SectionCard>
      <SectionCard icon={Mail} title="Account Verification" desc="Verification requirements" color="bg-amber-50 text-amber-600">
        <div className="space-y-1">
          {renderToggleRow('requireEmailVerification', 'Require Email Verification', 'Users must verify their email before accessing the platform')}
        </div>
      </SectionCard>
    </div>
  );

  const renderPharmacySettings = () => (
    <div className="space-y-5">
      <SectionCard icon={Building2} title="Verification" desc="Pharmacy approval workflow">
        <div className="space-y-1">
          {renderToggleRow('autoApprovePharmacies', 'Auto-approve Pharmacies', 'New pharmacy registrations automatically approved')}
        </div>
      </SectionCard>
      <SectionCard icon={Sliders} title="Inventory Thresholds" desc="Stock management rules" color="bg-amber-50 text-amber-600">
        <div>
          <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Low Stock Threshold</label>
          <input className={inputClasses} value={settings.lowStockThreshold} onChange={(e) => updateSetting('lowStockThreshold', e.target.value)} placeholder="10" />
          <p className="text-xs text-slate-400 mt-1.5">Alert when stock falls below this number</p>
        </div>
      </SectionCard>
    </div>
  );

  const renderDistributorSettings = () => (
    <div className="space-y-5">
      <SectionCard icon={Truck} title="Approval" desc="Distributor onboarding rules">
        <div className="space-y-1">
          {renderToggleRow('autoApproveDistributors', 'Auto-approve Distributors', 'New distributor applications automatically approved')}
        </div>
      </SectionCard>
    </div>
  );

  const renderReservationSettings = () => (
    <div className="space-y-5">
      <SectionCard icon={ShoppingCart} title="Reservation Policies" desc="Booking and expiry configuration">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Max Reservation Days
            </label>
            <input className={inputClasses} value={settings.maxReservationDays} onChange={(e) => updateSetting('maxReservationDays', e.target.value)} placeholder="7" />
            <p className="text-xs text-slate-400 mt-1.5">Maximum days a reservation can be held</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Reservation Expiry (hours)
            </label>
            <input className={inputClasses} value={settings.reservationExpiryHours} onChange={(e) => updateSetting('reservationExpiryHours', e.target.value)} placeholder="24" />
            <p className="text-xs text-slate-400 mt-1.5">Auto-cancel after inactivity</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-5">
      <SectionCard icon={Bell} title="Channels" desc="Configure notification delivery methods">
        <div className="space-y-1">
          {renderToggleRow('emailNotifications', 'Email Notifications', 'Send system alerts via email', Mail)}
          {renderToggleRow('smsNotifications', 'SMS Notifications', 'Send critical alerts via SMS', MessageSquare)}
          {renderToggleRow('pushNotifications', 'Push Notifications', 'In-app push notifications for all users', Smartphone)}
        </div>
      </SectionCard>
      <div className="bg-gradient-to-r from-[#14B8A6]/5 to-transparent rounded-2xl border border-[#14B8A6]/20 p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-[#14B8A6]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Notification Channels</p>
            <p className="text-xs text-slate-500 mt-1">Channels are independent — disabling one does not affect others. Configure each channel separately based on your operational needs.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-5">
      <SectionCard icon={Lock} title="Authentication" desc="Access and password policies" color="bg-rose-50 text-rose-600">
        <div className="space-y-1">{renderToggleRow('MFARequired', 'Require MFA', 'Multi-factor authentication for all admin accounts', Fingerprint)}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Session Timeout (min)</label>
            <input className={inputClasses} value={settings.sessionTimeout} onChange={(e) => updateSetting('sessionTimeout', e.target.value)} placeholder="60" />
            <p className="text-xs text-slate-400 mt-1.5">Auto-logout after inactivity</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Max Login Attempts</label>
            <input className={inputClasses} value={settings.maxLoginAttempts} onChange={(e) => updateSetting('maxLoginAttempts', e.target.value)} placeholder="5" />
            <p className="text-xs text-slate-400 mt-1.5">Before account is temporarily locked</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Min Password Length</label>
            <input className={inputClasses} value={settings.passwordMinLength} onChange={(e) => updateSetting('passwordMinLength', e.target.value)} placeholder="8" />
            <p className="text-xs text-slate-400 mt-1.5">Minimum characters for passwords</p>
          </div>
        </div>
      </SectionCard>
      <SectionCard icon={Shield} title="Session Policy" desc="Security best practices" color="bg-purple-50 text-purple-600">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Security Recommendation</p>
              <p className="text-xs text-amber-700 mt-1">
                Enabling MFA and setting a session timeout under 120 minutes is recommended for production environments. Review your security policies regularly.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-5">
      <SectionCard icon={Mail} title="Email Service" desc="SMTP configuration" color="bg-blue-50 text-blue-600">
        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">SMTP Server</p>
              <p className="text-xs text-slate-500">Configured via .env — mailtrap.io</p>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">Active</span>
          </div>
        </div>
      </SectionCard>
      <SectionCard icon={MapPin} title="Maps API" desc="Geolocation and mapping" color="bg-emerald-50 text-emerald-600">
        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Leaflet / OpenStreetMap</p>
              <p className="text-xs text-slate-500">Open-source map tiles with React-Leaflet</p>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">Active</span>
          </div>
        </div>
      </SectionCard>
      <SectionCard icon={DollarSign} title="Payment Service" desc="Transaction processing" color="bg-amber-50 text-amber-600">
        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Stripe / CMI</p>
              <p className="text-xs text-slate-500">Payment gateway for MAD transactions</p>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">Active</span>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-5">
      <SectionCard icon={Palette} title="Branding" desc="Platform visual identity" color="bg-violet-50 text-violet-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Primary Color</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6] border-2 border-slate-200" />
              <input className={inputClasses} value="#14B8A6" readOnly />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">Secondary Color</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F766E] border-2 border-slate-200" />
              <input className={inputClasses} value="#0F766E" readOnly />
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard icon={Layout} title="Logo" desc="Platform logo management" color="bg-slate-100 text-slate-600">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#0F766E] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            D
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">DwakFJib Logo</p>
            <p className="text-xs text-slate-500 mt-0.5">SVG — 48x48px — Upload via media manager</p>
            <button className="mt-2 px-4 py-2 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all">
              Change Logo
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const renderAuditLogs = () => (
    <div className="space-y-5">
      <SectionCard icon={Activity} title="Recent Activity" desc="Latest system changes and admin actions">
        <div className="space-y-2">
          {[
            { action: 'System Settings Updated', user: 'Admin', time: '2 hours ago', type: 'config' },
            { action: 'New Pharmacy Verified', user: 'Admin', time: '5 hours ago', type: 'approval' },
            { action: 'User Role Changed', user: 'Admin', time: '1 day ago', type: 'user' },
            { action: 'Backup Completed', user: 'System', time: '1 day ago', type: 'system' },
            { action: 'Distributor Approved', user: 'Admin', time: '2 days ago', type: 'approval' },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 hover:border-slate-200 transition-all">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                log.type === 'config' ? 'bg-[#14B8A6]/10 text-[#14B8A6]' :
                log.type === 'approval' ? 'bg-emerald-50 text-emerald-600' :
                log.type === 'user' ? 'bg-blue-50 text-blue-600' :
                'bg-slate-100 text-slate-600'
              }`}>
                <Activity className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{log.action}</p>
                <p className="text-xs text-slate-500">
                  by <span className="font-medium text-slate-700">{log.user}</span> — {log.time}
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                log.type === 'config' ? 'bg-[#14B8A6]/5 text-[#14B8A6] border-[#14B8A6]/20' :
                log.type === 'system' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                'bg-emerald-50 text-emerald-600 border-emerald-200'
              }`}>
                {log.type}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );

  const renderDemoSettings = () => (
    <div className="space-y-5">
      <SectionCard icon={Monitor} title="Demo Mode" desc="Presentation mode for platform demonstrations">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3.5 px-5 rounded-2xl bg-[#F8FAFC] hover:bg-slate-100/70 transition-colors -mx-1">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Monitor className="w-4 h-4 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">Enable Demo Mode</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Activate presentation enhancements, demo navigation panel, and presentation screens
                </p>
              </div>
            </div>
            <ToggleSwitch enabled={demoMode} onChange={toggleDemoMode} />
          </div>

          {demoMode && (
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3.5 px-5 rounded-2xl bg-[#F8FAFC] hover:bg-slate-100/70 transition-colors -mx-1">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Database className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">Load Demo Data</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Load sample data for demonstration purposes. Real data will not be modified.
                    </p>
                  </div>
                </div>
                <ToggleSwitch enabled={demoDataLoaded} onChange={demoDataLoaded ? disableDemoData : enableDemoData} />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Demo Mode Notice</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Demo mode enables additional presentation features including the floating navigation panel
                      and dedicated demo screens. All demo screens are accessible at /demo/* routes.
                      Demo data is clearly marked and does not affect production data.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#14B8A6]/5 to-transparent rounded-2xl border border-[#14B8A6]/20 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#14B8A6] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Presentation Screens Available</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Access presentation screens at: /demo, /demo/platform-overview, /demo/architecture,
                      /demo/tech-stack, /demo/uml, /demo/statistics, /demo/patient-flow, /demo/pharmacy-flow,
                      /demo/distributor-flow, /demo/admin-flow, /demo/script
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard icon={Sparkles} title="Environment Config" desc="Server-side demo mode" color="bg-purple-50 text-purple-600">
        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">VITE_DEMO_MODE</p>
              <p className="text-xs text-slate-500">Set VITE_DEMO_MODE=true in frontend/.env to enable demo mode by default</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${demoMode ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
              {demoMode ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'users': return renderUserSettings();
      case 'pharmacy': return renderPharmacySettings();
      case 'distributor': return renderDistributorSettings();
      case 'reservations': return renderReservationSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
      case 'integrations': return renderIntegrationsSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'audit': return renderAuditLogs();
      case 'demo': return renderDemoSettings();
      default: return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-7">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1 h-7 rounded-full" style={{ backgroundColor: '#14B8A6' }} />
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: '#0F172A' }}>System Settings</h1>
              </div>
              <p className="text-sm ml-4" style={{ color: '#64748B' }}>Manage platform configuration, security, notifications and preferences.</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all" style={{ color: '#64748B' }}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white transition-all shadow-sm ${
                  saving || !hasChanges ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                }`}
                style={{ backgroundColor: '#14B8A6' }}
              >
                {saving ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-4 h-4" /> Save Changes</>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Categories', value: tabs.length, icon: Sliders, color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
            { label: 'Total Settings', value: Object.keys(settings).length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active Toggles', value: toggleCount, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Pending Changes', value: pendingChanges, icon: RefreshCw, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:shadow-slate-100/80 transition-all duration-300 group"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${stat.bg} mb-3 group-hover:scale-105 transition-transform duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold tracking-tight" style={{ color: '#0F172A' }}>{stat.value}</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: '#64748B' }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#94A3B8' }} />
          <input
            type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); if (e.target.value && !filteredTabs.find((t) => t.id === activeTab)) setActiveTab(filteredTabs[0]?.id || 'general'); }}
            placeholder="Search settings..."
            className="w-full h-11 pl-11 pr-10 rounded-2xl border border-slate-200 bg-white text-sm outline-none transition-all"
            style={{ color: '#0F172A' }}
            onFocus={(e) => { e.target.style.borderColor = '#14B8A6'; e.target.style.boxShadow = '0 0 0 2px rgba(20,184,166,0.1)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: '#94A3B8' }}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

          {/* Desktop Sidebar */}
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} className="hidden lg:block">
            <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-sm sticky top-24">
              <div className="space-y-0.5">
                {filteredTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button key={tab.id} onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium transition-all relative ${
                        isActive ? 'text-white' : 'hover:bg-slate-50'
                      }`}
                      style={isActive ? { backgroundColor: '#14B8A6', color: '#FFFFFF' } : { color: '#64748B' }}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isActive ? 'bg-white/20' : 'bg-slate-100'
                      }`}>
                        <Icon className="w-4 h-4" style={isActive ? { color: '#FFFFFF' } : { color: '#94A3B8' }} />
                      </div>
                      <span className="flex-1 text-left text-xs font-semibold">{tab.label}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
                {filteredTabs.length === 0 && (
                  <div className="px-4 py-10 text-center">
                    <Search className="w-5 h-5 mx-auto mb-2" style={{ color: '#94A3B8' }} />
                    <p className="text-xs" style={{ color: '#94A3B8' }}>No matching settings</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Mobile Accordion Tabs */}
          <div className="lg:hidden overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 pb-2">
              {filteredTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                      isActive ? 'text-white border-transparent' : 'bg-white border-slate-200'
                    }`}
                    style={isActive ? { backgroundColor: '#14B8A6', color: '#FFFFFF' } : { color: '#64748B' }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 hover:shadow-lg hover:shadow-slate-100/80 transition-all duration-300">
              {renderContent()}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Persistent Save Bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0F172A' }}>Unsaved Changes</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>{pendingChanges} setting{pendingChanges !== 1 ? 's' : ''} modified</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 bg-white hover:bg-slate-50 transition-all" style={{ color: '#64748B' }}>
                  Reset
                </button>
                <button onClick={handleSave} disabled={saving}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md flex items-center gap-2 ${
                    saving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{ backgroundColor: '#14B8A6' }}>
                  {saving ? <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border" style={{ backgroundColor: '#0F172A', borderColor: '#1E293B' }}>
              <CheckCircle className="w-4 h-4" style={{ color: '#14B8A6' }} />
              <span className="text-sm font-medium text-white">{toast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SystemSettings;
