import { useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Pill, Search, MapPin, ShoppingCart, Heart, Shield, Clock, Sparkles,
  Store, Users, Star, ArrowRight, Menu, X, CheckCircle, TrendingUp,
  Building2, Truck, Mail, Phone, Globe, Package,
  Bell, BarChart3, Zap, ChevronDown, Activity,
  ClipboardList, Navigation, Lock, UserPlus,
  MessageSquare
} from 'lucide-react';
import AuthRequiredModal from '../components/guest/AuthRequiredModal';
import FloatingGuestCTA from '../components/guest/FloatingGuestCTA';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'How It Works', href: '/#how-it-works', section: 'how-it-works' },
  { label: 'For Patients', href: '/#for-patients', section: 'for-patients' },
  { label: 'For Pharmacies', href: '/#for-pharmacies', section: 'for-pharmacies' },
  { label: 'Features', href: '/#features', section: 'features' },
  { label: 'FAQ', href: '/#faq', section: 'faq' },
];

const trustStats = [
  { value: '1,200+', label: 'Pharmacies', icon: Store },
  { value: '300+', label: 'Distributors', icon: Truck },
  { value: '85K+', label: 'Patients', icon: Users },
  { value: '500K+', label: 'Reservations', icon: ShoppingCart },
];

const patientBenefits = [
  { icon: Search, title: 'Medication Search', desc: 'Find any medication with real-time availability and pricing across all partner pharmacies.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: ShoppingCart, title: 'Fast Reservation', desc: 'Reserve in seconds with no upfront payment. Pick up at your convenience.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: MapPin, title: 'Nearby Pharmacies', desc: 'Discover pharmacies near you with live stock updates and distance sorting.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Bell, title: 'Real-time Alerts', desc: 'Get notified when your medication is ready, restocked, or available nearby.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const pharmacyBenefits = [
  { icon: Package, title: 'Inventory Management', desc: 'Track stock levels, set reorder thresholds, and manage medications effortlessly.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: ClipboardList, title: 'Reservation Management', desc: 'Handle patient reservations with a streamlined queue and status tracking.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Truck, title: 'Distributor Orders', desc: 'Order directly from distributors with automated restock suggestions.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: TrendingUp, title: 'Analytics Dashboard', desc: 'View sales trends, popular medications, and performance metrics.', color: 'text-blue-600', bg: 'bg-blue-50' },
];

const distributorBenefits = [
  { icon: Package, title: 'Product Management', desc: 'Manage your product catalog with bulk updates and category organization.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Building2, title: 'Pharmacy Orders', desc: 'Receive and fulfill orders from pharmacies with smart routing.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: BarChart3, title: 'Performance Analytics', desc: 'Track delivery times, revenue, and pharmacy satisfaction scores.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Navigation, title: 'Delivery Tracking', desc: 'Real-time GPS tracking with optimized route planning for drivers.', color: 'text-violet-600', bg: 'bg-violet-50' },
];

const platformFeatures = [
  { icon: Search, title: 'Smart Search', desc: 'AI-powered medication search with autocomplete, filters, and alternatives.', color: 'text-[#14B8A6]', bg: 'bg-[#14B8A6]/10' },
  { icon: Activity, title: 'Real-Time Inventory', desc: 'Live stock levels across all pharmacies. See availability before you go.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: ShoppingCart, title: 'Reservation Tracking', desc: 'Track every reservation from confirmation to pickup with status updates.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: BarChart3, title: 'Analytics', desc: 'Comprehensive dashboards for patients, pharmacies, and distributors.', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: Bell, title: 'Notifications', desc: 'Multi-channel alerts via in-app, email, and SMS for critical updates.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Lock, title: 'Security', desc: 'Enterprise-grade encryption, MFA, and role-based access control.', color: 'text-red-600', bg: 'bg-red-50' },
];

const faqs = [
  { q: 'How do reservations work?', a: 'Search for a medication, select a pharmacy with stock available, and confirm your reservation. No payment is required upfront. You pick up and pay at the pharmacy when it\'s convenient for you.' },
  { q: 'How do pharmacies join the platform?', a: 'Pharmacies can register through our sign-up page. After submitting their license and business details, our team verifies the information and activates the account within 24-48 hours.' },
  { q: 'How do distributors register?', a: 'Distributors register by providing their business license, warehouse details, and delivery coverage area. Once verified, they can receive orders from partner pharmacies and manage their delivery fleet.' },
  { q: 'How secure is the platform?', a: 'We use end-to-end encryption, SOC 2 compliant infrastructure, and role-based access control. All user data is protected with industry-standard security practices and regular audits.' },
  { q: 'Is there a mobile app available?', a: 'Our platform is fully responsive and works seamlessly on all devices. A dedicated mobile app is coming soon for iOS and Android.' },
  { q: 'How much does it cost?', a: 'Browsing and searching medications is completely free. Pharmacies and distributors can choose from tiered subscription plans based on their needs.' },
];

const steps = [
  { step: 1, title: 'Search Medication', icon: Search, desc: 'Browse our database with real-time availability across all partner pharmacies.' },
  { step: 2, title: 'Find Nearby Pharmacy', icon: MapPin, desc: 'Compare prices, distances, and pickup times to find the best option.' },
  { step: 3, title: 'Reserve Instantly', icon: CheckCircle, desc: 'Secure your medication with a simple reservation. No payment needed.' },
  { step: 4, title: 'Pickup or Delivery', icon: Truck, desc: 'Get your medication through same-day pickup or doorstep delivery.' },
];

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0F766E] flex items-center justify-center shadow-sm">
      <Pill className="w-5 h-5 text-white" />
    </div>
    <span className="text-lg font-bold text-slate-800 tracking-tight">DwakFJib</span>
  </div>
);

const AppPreview = () => (
  <div className="relative w-full h-full min-h-[520px] flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/5 to-transparent rounded-3xl" />
    <div className="relative w-full max-w-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-medium text-slate-400">Dashboard · Medication Search</span>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search medications..." readOnly className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-400" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Antibiotics', 'Diabetes', 'Cardiology'].map((cat) => (
            <div key={cat} className="px-3 py-2 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] text-[11px] font-semibold text-center">{cat}</div>
          ))}
        </div>
        {[
          { name: 'Amoxicillin 500mg', pharmacy: 'HealthPlus Pharmacy', price: '12,99 DH', stock: true },
          { name: 'Metformin 850mg', pharmacy: 'MediCare Center', price: '8,50 DH', stock: true },
          { name: 'Lisinopril 10mg', pharmacy: 'GreenCross', price: '15,75 DH', stock: false },
        ].map((med, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-[#14B8A6]/20 hover:bg-[#14B8A6]/[0.02] transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl ${med.stock ? 'bg-emerald-50' : 'bg-slate-50'} flex items-center justify-center`}>
              <Pill className={`w-5 h-5 ${med.stock ? 'text-emerald-500' : 'text-slate-300'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-700 truncate">{med.name}</h4>
              <p className="text-xs text-slate-400">{med.pharmacy}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-700">{med.price}</p>
              <span className={`text-[10px] font-semibold ${med.stock ? 'text-emerald-500' : 'text-red-400'}`}>
                {med.stock ? 'In Stock' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
        <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all">
          Reserve Medication
        </button>
      </div>
    </div>
  </div>
);

const SectionLabel = ({ icon: Icon, children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-5">
    {Icon && <Icon className="w-3.5 h-3.5 text-[#14B8A6]" />}
    <span className="text-xs font-semibold text-[#14B8A6] tracking-wide uppercase">{children}</span>
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }),
};

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const { scrollY } = useScroll();
  const navShadow = useTransform(scrollY, [0, 60], ['0 0 0 rgba(0,0,0,0)', '0 1px 3px rgba(0,0,0,0.06)']);

  const handleNavClick = useCallback((item) => {
    if (item.section) {
      if (location.pathname === '/') {
        document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      navigate(item.href);
      return;
    }
    navigate(item.href);
  }, [location.pathname, navigate]);

  const handleAction = (path) => {
    if (path === 'reserve' && !user) {
      setShowAuthModal(true);
      return;
    }
    if (path === 'login') { navigate('/login'); return; }
    if (path === 'register') { navigate('/register'); return; }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">
      {/* ─── NAV ─── */}
      <motion.nav
        style={{ boxShadow: navShadow }}
        className="fixed top-0 left-0 right-0 z-50 h-18 bg-white/80 backdrop-blur-xl border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex-shrink-0">
            <Logo />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => handleAction('login')}
              className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">
              Sign In
            </button>
            <button onClick={() => handleAction('register')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all">
              Get Started
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-2 shadow-xl">
              {navItems.map((item) => (
                <button key={item.href} onClick={() => { handleNavClick(item); setMobileOpen(false); }}
                  className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-50 transition-all">
                  {item.label}
                </button>
              ))}
              <hr className="my-2 border-slate-100" />
              <button onClick={() => { handleAction('login'); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50">
                Sign In
              </button>
              <button onClick={() => { handleAction('register'); setMobileOpen(false); }}
                className="block w-full text-center px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white font-semibold text-sm">
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span className="text-xs font-semibold text-[#14B8A6] tracking-wide uppercase">Trusted Healthcare Platform</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-slate-800">
                Find and Reserve{' '}
                <span className="text-[#14B8A6]">Medication</span>{' '}
                <br className="hidden sm:block" />
                Instantly
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="mt-5 text-lg text-slate-500 leading-relaxed max-w-lg">
                DwakFJib connects patients, pharmacies, and distributors through a unified healthcare platform.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={() => handleAction('register')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-bold hover:shadow-xl hover:shadow-[#14B8A6]/25 transition-all">
                  <UserPlus className="w-4 h-4" />
                  Get Started
                </button>
                <button onClick={() => handleAction('login')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:border-slate-300 hover:shadow-sm transition-all">
                  Sign In
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                className="flex flex-wrap items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#14B8A6]" />
                  <span className="text-xs text-slate-400 font-medium">Free to browse</span>
                </div>
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#14B8A6]" />
                  <span className="text-xs text-slate-400 font-medium">1,200+ pharmacies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#14B8A6]" />
                  <span className="text-xs text-slate-400 font-medium">Instant reservation</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:block">
              <AppPreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trustStats.map((stat, i) => (
              <motion.div key={stat.label} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 text-center hover:shadow-md hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-[#14B8A6]" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1.5 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel icon={TrendingUp}>Simple Process</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              How it{' '}<span className="text-[#14B8A6]">works</span>
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">Get your medication in four simple steps.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200" />
            <div className="grid md:grid-cols-4 gap-8 md:gap-6">
              {steps.map((step, i) => (
                <motion.div key={step.step} custom={i} variants={fadeUp} initial="hidden"
                  whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                  className="relative text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center mx-auto mb-5 relative z-10 border-2 border-white shadow-md">
                    <step.icon className="w-6 h-6 text-[#14B8A6]" />
                  </div>
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0F766E] text-white text-xs font-bold mb-3 shadow-sm">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-700 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOR PATIENTS ─── */}
      <section id="for-patients" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            <div className="lg:w-5/12 lg:sticky lg:top-32">
              <SectionLabel icon={Users}>For Patients</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                Find and reserve your{' '}<span className="text-[#14B8A6]">medication</span> with ease
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                No more calling multiple pharmacies. Search, compare, and reserve in seconds.
              </p>
              <button onClick={() => handleAction('register')}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all">
                Start Browsing <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:w-7/12">
              <div className="grid sm:grid-cols-2 gap-4">
                {patientBenefits.map((benefit, i) => (
                  <motion.div key={benefit.title} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-slate-300 transition-all group">
                    <div className={`w-11 h-11 rounded-xl ${benefit.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                      <benefit.icon className={`w-5.5 h-5.5 ${benefit.color}`} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700 mb-1.5">{benefit.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOR PHARMACIES ─── */}
      <section id="for-pharmacies" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col lg:flex-row-reverse items-start gap-12 lg:gap-16">
            <div className="lg:w-5/12 lg:sticky lg:top-32">
              <SectionLabel icon={Building2}>For Pharmacies</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                Streamline your{' '}<span className="text-[#14B8A6]">pharmacy</span> operations
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Manage inventory, reservations, and distributor orders from one dashboard.
              </p>
              <button onClick={() => handleAction('register')}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all">
                Join as Pharmacy <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:w-7/12">
              <div className="grid sm:grid-cols-2 gap-4">
                {pharmacyBenefits.map((benefit, i) => (
                  <motion.div key={benefit.title} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                    className="bg-[#F8FAFC] rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-slate-300 transition-all group">
                    <div className={`w-11 h-11 rounded-xl ${benefit.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                      <benefit.icon className={`w-5.5 h-5.5 ${benefit.color}`} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700 mb-1.5">{benefit.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOR DISTRIBUTORS ─── */}
      <section id="for-distributors" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            <div className="lg:w-5/12 lg:sticky lg:top-32">
              <SectionLabel icon={Truck}>For Distributors</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                Power your{' '}<span className="text-[#14B8A6]">distribution</span> network
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                Manage products, fulfill pharmacy orders, and track deliveries in real time.
              </p>
              <button onClick={() => handleAction('register')}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all">
                Join as Distributor <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:w-7/12">
              <div className="grid sm:grid-cols-2 gap-4">
                {distributorBenefits.map((benefit, i) => (
                  <motion.div key={benefit.title} custom={i} variants={fadeUp} initial="hidden"
                    whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-slate-300 transition-all group">
                    <div className={`w-11 h-11 rounded-xl ${benefit.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                      <benefit.icon className={`w-5.5 h-5.5 ${benefit.color}`} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-700 mb-1.5">{benefit.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PLATFORM FEATURES ─── */}
      <section id="features" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel icon={Sparkles}>Platform Features</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              Everything you need,{' '}<span className="text-[#14B8A6]">nothing you don't</span>
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">A complete healthcare marketplace platform.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {platformFeatures.map((feature, i) => (
              <motion.div key={feature.title} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-slate-300 transition-all group">
                <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <feature.icon className={`w-5.5 h-5.5 ${feature.color}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-700 mb-1.5">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel icon={MessageSquare}>Testimonials</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              Trusted by{' '}<span className="text-[#14B8A6]">healthcare professionals</span>
            </h2>
            <p className="mt-4 text-slate-500 leading-relaxed">Real feedback from our community.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'DwakFJib completely transformed how we manage inventory and patient reservations. Our workflow has never been smoother.', name: 'Dr. Sarah Chen', role: 'Pharmacist, HealthPlus', icon: Store },
              { quote: 'The real-time tracking and route optimization saved us hours of delivery time. An essential tool for modern distribution.', name: 'James Rodriguez', role: 'Operations Director, MedTrans', icon: Truck },
              { quote: 'Finding my medication used to be a hassle. Now I can check availability and reserve in under a minute.', name: 'Emily Thompson', role: 'Patient', icon: Users },
            ].map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#14B8A6]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-14">
            <SectionLabel icon={Zap}>FAQ</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              Frequently asked{' '}<span className="text-[#14B8A6]">questions</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                className={`rounded-2xl border transition-all cursor-pointer ${openFaq === i ? 'border-[#14B8A6]/30 bg-[#14B8A6]/[0.02] shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="flex items-center justify-between px-6 py-4">
                  <h3 className="text-sm font-bold text-slate-700 pr-4">{faq.q}</h3>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <p className="px-6 pb-4 text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#14B8A6] via-[#0F9488] to-[#0F766E] p-10 md:p-16 lg:p-20 text-center">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <Heart className="w-12 h-12 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl mx-auto">
                Ready to Simplify{' '}<span className="text-white/70">Healthcare Access?</span>
              </h2>
              <p className="mt-4 text-lg text-white/70 max-w-lg mx-auto">
                Join thousands of users, pharmacies, and distributors already on the platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <button onClick={() => handleAction('register')}
                  className="px-8 py-3.5 rounded-2xl bg-white text-[#0F766E] font-bold text-sm hover:bg-[#F8FAFC] transition-all inline-flex items-center gap-2 shadow-lg">
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </button>
                <button onClick={() => window.location.href = 'mailto:hello@dwakfjib.com'}
                  className="px-8 py-3.5 rounded-2xl bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/20 transition-all inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            <div className="lg:col-span-2">
              <Logo />
              <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
                Your trusted healthcare marketplace. Find, compare, and reserve medications from nearby pharmacies.
              </p>
              <div className="flex items-center gap-3 mt-6">
                {[
                  { icon: Mail, href: 'mailto:hello@dwakfjib.com' },
                  { icon: Phone, href: 'tel:+15551234567' },
                  { icon: Globe, href: '/about' },
                ].map(({ icon: Icon, href }, i) => (
                  <a key={i} href={href}
                    className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 hover:bg-[#14B8A6]/10 hover:text-[#14B8A6] flex items-center justify-center transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Product</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Search Medications', href: '/search' },
                  { label: 'Nearby Pharmacies', href: '/pharmacies' },
                  { label: 'For Pharmacies', href: '/register' },
                  { label: 'For Distributors', href: '/register' },
                ].map((link) => (
                  <li key={link.label}>
                    <button onClick={() => navigate(link.href)}
                      className="text-sm text-slate-400 hover:text-[#14B8A6] transition-colors duration-200">{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Company</h4>
              <ul className="space-y-3">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Emergency', href: '/emergency-availability' },
                  { label: 'Privacy Policy', href: '/about' },
                  { label: 'Terms of Service', href: '/about' },
                ].map((link) => (
                  <li key={link.label}>
                    <button onClick={() => navigate(link.href)}
                      className="text-sm text-slate-400 hover:text-[#14B8A6] transition-colors duration-200">{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Support</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Help Center', href: '/support' },
                  { label: 'Contact Us', href: 'mailto:hello@dwakfjib.com', external: true },
                  { label: 'Status', href: '/about' },
                  { label: 'Community', href: '/about' },
                ].map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href}
                        className="text-sm text-slate-400 hover:text-[#14B8A6] transition-colors duration-200">{link.label}</a>
                    ) : (
                      <button onClick={() => navigate(link.href)}
                        className="text-sm text-slate-400 hover:text-[#14B8A6] transition-colors duration-200">{link.label}</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">&copy; 2026 DwakFJib. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <button onClick={() => navigate('/about')} className="hover:text-[#14B8A6] transition-colors">Privacy Policy</button>
              <button onClick={() => navigate('/about')} className="hover:text-[#14B8A6] transition-colors">Terms of Service</button>
              <button onClick={() => navigate('/about')} className="hover:text-[#14B8A6] transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </footer>

      <AuthRequiredModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} action="reservation" />
      {!user && <FloatingGuestCTA onSignIn={() => setShowAuthModal(true)} delay={8000} />}
    </div>
  );
};

export default Home;
