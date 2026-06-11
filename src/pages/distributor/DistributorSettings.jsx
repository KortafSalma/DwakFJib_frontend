import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Bell, Shield, Mail, Key, Database, Save } from 'lucide-react';
import { SettingsField, SettingsRow } from '../../components/ui';

const tabs = [
  { key: 'general', label: 'General', icon: Truck },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'api', label: 'API', icon: Key },
  { key: 'database', label: 'Database', icon: Database },
];

const DistributorSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabsContent = {
    general: (
      <div className="space-y-1">
        <SettingsField label="Company Name" type="text" defaultValue="FastTrack Logistics" />
        <SettingsField label="License Number" type="text" defaultValue="DL-2026-0089" />
        <SettingsField label="Contact Email" type="email" defaultValue="ops@fasttrack.com" />
        <SettingsField label="Phone Number" type="tel" defaultValue="+1 (555) 987-6543" />
        <SettingsField label="Warehouse Address" type="text" defaultValue="456 Distribution Center Blvd" />
      </div>
    ),
    notifications: (
      <div>
        {[
          { label: 'New Order Alerts', description: 'Notify on incoming pharmacy orders', default: true },
          { label: 'Shipment Updates', description: 'Track delivery status changes', default: true },
          { label: 'Delay Warnings', description: 'Alert when shipments are delayed', default: true },
          { label: 'Driver Status', description: 'Notify on driver availability changes', default: false },
          { label: 'Daily Summary', description: 'Receive daily delivery report', default: false },
        ].map((item) => (
          <SettingsRow key={item.label} {...item} />
        ))}
      </div>
    ),
    security: (
      <div>
        {[
          { label: 'Two-Factor Authentication', description: 'Require 2FA for all staff accounts', default: false },
          { label: 'Session Timeout', description: 'Auto-logout after 30 minutes of inactivity', default: true },
          { label: 'GPS Tracking', description: 'Enable real-time driver location tracking', default: true },
          { label: 'Audit Logging', description: 'Log all shipment and order changes', default: true },
        ].map((item) => (
          <SettingsRow key={item.label} {...item} />
        ))}
      </div>
    ),
    email: (
      <div className="space-y-1">
        <SettingsField label="SMTP Host" type="text" defaultValue="smtp.fasttrack.com" />
        <SettingsField label="SMTP Port" type="text" defaultValue="587" />
        <SettingsField label="SMTP Username" type="email" defaultValue="noreply@fasttrack.com" />
        <SettingsField label="From Name" type="text" defaultValue="FastTrack Logistics" />
      </div>
    ),
    api: (
      <div className="space-y-1">
        <div className="py-3">
          <label className="block text-xs font-medium text-contrast-secondary mb-1.5">API Key</label>
          <div className="flex items-center gap-2">
            <input
              type="password"
              defaultValue="sk-distributor-xxxxxxxxxxxxxxxxxxxx"
              readOnly
              className="flex-1 h-10 px-4 rounded-xl border border-elevated bg-elevated text-sm text-contrast-primary font-mono outline-none"
            />
            <button className="h-10 px-4 rounded-xl bg-brand-50 text-brand-600 text-sm font-medium hover:bg-brand-100 transition-all border border-brand-200">
              Regenerate
            </button>
          </div>
        </div>
        <SettingsField label="Webhook URL" type="url" defaultValue="https://api.fasttrack.com/webhooks" />
        <SettingsRow label="Enable API Access" description="Allow third-party integrations" default={true} />
      </div>
    ),
    database: (
      <div className="space-y-1">
        <div className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-contrast-primary">Database Usage</span>
            <span className="text-xs text-contrast-secondary">3.8 GB / 10 GB</span>
          </div>
          <div className="h-2.5 rounded-full bg-elevated overflow-hidden">
            <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-brand-500 to-brand-400" />
          </div>
        </div>
        {[
          { label: 'Auto Backup', description: 'Daily automated database backups', default: true },
          { label: 'Data Retention', description: 'Keep records for 5 years', default: true },
          { label: 'Analytics Tracking', description: 'Collect delivery analytics', default: false },
        ].map((item) => (
          <SettingsRow key={item.label} {...item} />
        ))}
      </div>
    ),
  };

  return (
    <div className="bg-body min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Distributor Settings</h1>
            <p className="text-sm text-contrast-secondary mt-1">Configure your distributor preferences</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-sm font-medium text-white hover:bg-brand-600 transition-all">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card rounded-2xl border border-elevated p-6 hover:border-elevated hover:shadow-sm transition-all"
        >
          <div className="flex gap-1 p-1 rounded-xl bg-elevated border border-elevated mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-card text-contrast-primary shadow-sm border border-elevated'
                    : 'text-contrast-secondary hover:text-contrast-primary'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="max-w-lg">
            {tabsContent[activeTab]}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DistributorSettings;
