import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Truck, Shield, Bell, SlidersHorizontal, Mail, Phone,
  Camera, Save, X, Key, MapPin, Building2, FileText,
  ChevronDown, AlertTriangle, Trash2, LogOut,
  Check, Activity, Smartphone,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { distributeurData } from '../../mock/mockData';

const sections = [
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'business', label: 'Business Details', icon: Building2 },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
  { id: 'activity', label: 'Account Activity', icon: Activity },
];

const ToggleSwitch = ({ enabled, onChange }) => (
  <button type="button" onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${enabled ? 'bg-[#14B8A6]' : 'bg-slate-200'}`}>
    <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-5' : ''}`} />
  </button>
);

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
    <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-[#14B8A6]" />
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
    </div>
  </div>
);

const ActivityItem = ({ icon: Icon, title, description, time, status }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${status === 'success' ? 'bg-emerald-50 text-emerald-600' : status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-slate-900">{title}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
    <span className="text-[11px] text-slate-400 whitespace-nowrap">{time}</span>
  </div>
);

const DistributorProfile = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  const [mobileOpen, setMobileOpen] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(user?.photo || null);
  const photoRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
    setHasChanges(true);
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setHasChanges(true);
  };

  const activityLogs = [
    { icon: LogOut, title: 'Session ended', description: 'Firefox on Windows', time: '3h ago', status: 'neutral' },
    { icon: Smartphone, title: 'New login', description: 'Chrome on Android', time: 'Yesterday', status: 'success' },
    { icon: Truck, title: 'Delivery completed', description: 'Order LIV-004 delivered', time: 'Yesterday', status: 'success' },
    { icon: FileText, title: 'Invoice generated', description: 'INV-2026-0891', time: '2 days ago', status: 'success' },
  ];

  const inputClasses = "w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/10 transition-all";
  const labelClasses = "block text-xs font-semibold text-slate-700 mb-1.5";

  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-[#14B8A6]/5 to-[#0F766E]/5 border border-[#14B8A6]/10">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#14B8A6]/20 bg-white shadow-sm">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#14B8A6]/10 to-[#0F766E]/10">
                      <User className="w-10 h-10 text-[#14B8A6]/40" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 flex gap-1">
                  <button onClick={() => photoRef.current?.click()} className="w-8 h-8 rounded-lg bg-[#14B8A6] text-white flex items-center justify-center hover:bg-[#0F766E] transition-all shadow-sm">
                    <Camera className="w-4 h-4" />
                  </button>
                  {photoPreview && (
                    <button onClick={removePhoto} className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-sm">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-slate-900">{distributeurData.nom}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Active
                  </span>
                  <span className="text-xs text-slate-400">{distributeurData.entreprise}</span>
                </div>
                <p className="text-sm text-slate-500 mt-2">Distributor account with delivery tracking and order management.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoRow icon={User} label="Distributor Name" value={distributeurData.nom} />
              <InfoRow icon={Mail} label="Email" value={user?.email || 'distributeur@example.ma'} />
              <InfoRow icon={Phone} label="Phone" value={distributeurData.telephone} />
              <InfoRow icon={MapPin} label="Address" value={distributeurData.adresse} />
              <InfoRow icon={Building2} label="Company" value={distributeurData.entreprise} />
              <InfoRow icon={FileText} label="ICE" value={distributeurData.ice} />
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#14B8A6]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Business Information</h3>
                <p className="text-xs text-slate-500">Manage your company details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Company Name</label>
                <input className={inputClasses} defaultValue={distributeurData.entreprise} onChange={() => setHasChanges(true)} />
              </div>
              <div>
                <label className={labelClasses}>Phone</label>
                <input className={inputClasses} defaultValue={distributeurData.telephone} onChange={() => setHasChanges(true)} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClasses}>Address</label>
                <input className={inputClasses} defaultValue={distributeurData.adresse} onChange={() => setHasChanges(true)} />
              </div>
              <div>
                <label className={labelClasses}>ICE Number</label>
                <input className={inputClasses} defaultValue={distributeurData.ice} onChange={() => setHasChanges(true)} />
              </div>
              <div>
                <label className={labelClasses}>RC Number</label>
                <input className={inputClasses} defaultValue={distributeurData.registreCommerce} onChange={() => setHasChanges(true)} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Revenue', value: distributeurData.kpis.revenuTotal },
                { label: 'Monthly Orders', value: distributeurData.kpis.commandesMois },
                { label: 'Active Pharmacies', value: distributeurData.kpis.pharmaciesActives },
                { label: 'Products', value: distributeurData.kpis.produitsDisponibles },
                { label: 'Delivery Rate', value: distributeurData.kpis.tauxLivraison },
                { label: 'Rating', value: distributeurData.kpis.noteMoyenne },
              ].map((kpi) => (
                <div key={kpi.label} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-lg font-bold text-slate-900">{kpi.value}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{kpi.label}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-[#14B8A6]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Change Password</h3>
                <p className="text-xs text-slate-500">Update your account password</p>
              </div>
            </div>
            <div className="space-y-4 max-w-md">
              <div>
                <label className={labelClasses}>Current Password</label>
                <input type="password" className={inputClasses} placeholder="Enter current password" />
              </div>
              <div>
                <label className={labelClasses}>New Password</label>
                <input type="password" className={inputClasses} placeholder="Enter new password" />
              </div>
              <div>
                <label className={labelClasses}>Confirm New Password</label>
                <input type="password" className={inputClasses} placeholder="Confirm new password" />
              </div>
              <button className="h-10 px-5 rounded-xl bg-[#14B8A6] text-white text-sm font-semibold hover:bg-[#0F766E] transition-all">Update Password</button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#14B8A6]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
                <p className="text-xs text-slate-500">Manage your alert preferences</p>
              </div>
            </div>
            <div className="space-y-1">
              {[
                { label: 'Email Notifications', desc: 'Receive alerts via email' },
                { label: 'Order Alerts', desc: 'New and updated orders' },
                { label: 'Delivery Alerts', desc: 'Delivery status updates' },
                { label: 'Invoice Alerts', desc: 'Payment and invoice notifications' },
                { label: 'System Notifications', desc: 'Platform updates and announcements' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <ToggleSwitch enabled={true} onChange={() => {}} />
                </div>
              ))}
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 text-[#14B8A6]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Preferences</h3>
                <p className="text-xs text-slate-500">Customize your experience</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Language</label>
                <select className={inputClasses}><option>English</option><option>Français</option><option>العربية</option></select>
              </div>
              <div>
                <label className={labelClasses}>Time Zone</label>
                <select className={inputClasses}><option>Africa/Casablanca (UTC+1)</option><option>UTC</option></select>
              </div>
              <div>
                <label className={labelClasses}>Currency</label>
                <select className={inputClasses}><option>MAD - Moroccan Dirham</option><option>EUR - Euro</option></select>
              </div>
              <div>
                <label className={labelClasses}>Delivery Radius</label>
                <select className={inputClasses}><option>50 km</option><option>100 km</option><option>200 km</option><option>National</option></select>
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#14B8A6]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
                <p className="text-xs text-slate-500">Your recent account events</p>
              </div>
            </div>
            <div className="space-y-2">
              {activityLogs.map((log, i) => <ActivityItem key={i} {...log} />)}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-[#F8FAFC]/80 backdrop-blur-xl border-b border-slate-200 mb-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">My Profile</h1>
              <p className="text-sm text-slate-500 mt-0.5">Manage your distributor account information.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="h-10 px-5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">Cancel</button>
              <button className={`h-10 px-5 rounded-xl text-sm font-semibold text-white transition-all flex items-center gap-2 ${hasChanges ? 'bg-[#14B8A6] hover:bg-[#0F766E] shadow-sm' : 'bg-slate-300 cursor-not-allowed'}`} disabled={!hasChanges}>
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-32 space-y-1">
              {sections.map((section) => (
                <button key={section.id} onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === section.id ? 'bg-white text-[#14B8A6] shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSection === section.id ? 'bg-[#14B8A6]/10' : 'bg-transparent'}`}>
                    <section.icon className="w-4 h-4" />
                  </div>
                  <span>{section.label}</span>
                  {activeSection === section.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />}
                </button>
              ))}
            </nav>

            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-[#14B8A6]/5 to-[#0F766E]/5 border border-[#14B8A6]/10">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Account Status</h4>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Status</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Active</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Verified</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-medium"><Check className="w-3 h-3" /> Verified</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Role</span>
                  <span className="text-slate-700 font-medium">Distributor</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Joined</span>
                  <span className="text-slate-700 font-medium">May 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="lg:hidden space-y-2 mb-6">
              {sections.map((section) => {
                const isOpen = mobileOpen === section.id;
                return (
                  <div key={section.id} className="rounded-xl bg-white border border-slate-200 overflow-hidden">
                    <button onClick={() => setMobileOpen(isOpen ? null : section.id)} className="w-full flex items-center justify-between p-4 text-sm font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/10 flex items-center justify-center"><section.icon className="w-4 h-4 text-[#14B8A6]" /></div>
                        <span>{section.label}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="px-4 pb-4 border-t border-slate-100 pt-4">{renderSection(section.id)}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div key={activeSection} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  {renderSection(activeSection)}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 p-6 rounded-2xl bg-white border border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-500" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-red-900">Danger Zone</h3>
                    <p className="text-xs text-red-600/70">Irreversible account actions</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center justify-center gap-2 h-10 px-5 rounded-xl border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"><LogOut className="w-4 h-4" />Deactivate Account</button>
                  <button className="flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 transition-all shadow-sm"><Trash2 className="w-4 h-4" />Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorProfile;
