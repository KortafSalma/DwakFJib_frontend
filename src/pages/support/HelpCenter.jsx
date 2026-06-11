import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, HelpCircle, MessageSquare, LifeBuoy,
  ChevronDown, ExternalLink, Mail, Phone, Clock, CheckCircle,
  Bell, BookOpen, Users, Store, Truck, Shield, Globe,
  Settings, CreditCard, User,
  Bug, Send, Ticket, Activity, Server,
  ArrowRight,
} from 'lucide-react';
import { EmptyState, Button, Input, Select } from '../../components/ui';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const quickHelpCards = [
  { id: 'account', icon: User, title: 'Account Issues', desc: 'Login, password reset, profile management, and account settings.', color: 'bg-sky-50 text-sky-600', border: 'border-sky-200', iconBg: 'bg-sky-100' },
  { id: 'reservations', icon: CreditCard, title: 'Reservations', desc: 'How to reserve, modify, track, and cancel medication reservations.', color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-200', iconBg: 'bg-emerald-100' },
  { id: 'pharmacy', icon: Store, title: 'Pharmacy Management', desc: 'Inventory, orders, stock alerts, and pharmacy profile setup.', color: 'bg-blue-50 text-blue-600', border: 'border-blue-200', iconBg: 'bg-blue-100' },
  { id: 'distributor', icon: Truck, title: 'Distributor Services', desc: 'Shipments, delivery tracking, route planning, and order fulfillment.', color: 'bg-violet-50 text-violet-600', border: 'border-violet-200', iconBg: 'bg-violet-100' },
  { id: 'technical', icon: Settings, title: 'Technical Support', desc: 'Platform errors, browser issues, API integrations, and connectivity.', color: 'bg-amber-50 text-amber-600', border: 'border-amber-200', iconBg: 'bg-amber-100' },
  { id: 'security', icon: Shield, title: 'Security & Privacy', desc: 'Data protection, two-factor auth, permissions, and compliance.', color: 'bg-rose-50 text-rose-600', border: 'border-rose-200', iconBg: 'bg-rose-100' },
];

const faqItems = [
  {
    q: 'How do reservations work?',
    a: 'Search for your medication, select a pharmacy with available stock, choose a pickup time, and confirm your reservation. No upfront payment is required. You will receive a confirmation and reminders via notification.',
  },
  {
    q: 'How can a pharmacy join?',
    a: 'Pharmacies can register through the platform by creating an account and submitting their license details. Once verified by our team, you can start managing inventory and receiving reservations.',
  },
  {
    q: 'How can a distributor register?',
    a: 'Distributors can register by submitting their business credentials and delivery coverage area. After verification, you can connect with pharmacies and manage orders through the dashboard.',
  },
  {
    q: 'How do I reset my password?',
    a: 'Click "Forgot Password" on the login page, enter your registered email address, and follow the reset link sent to your inbox. The link expires after 60 minutes for security.',
  },
  {
    q: 'How do I update my profile?',
    a: 'Navigate to your Profile page from the sidebar or user menu. You can update your name, contact information, avatar, and notification preferences. Changes are saved automatically.',
  },
  {
    q: 'Is my data secure on the platform?',
    a: 'Yes. All data is encrypted in transit and at rest. We use industry-standard security practices including two-factor authentication, role-based access control, and regular security audits.',
  },
  {
    q: 'How do I track my reservation status?',
    a: 'Go to your Reservations page from the dashboard. Each reservation shows its current status: Pending, Confirmed, Ready for Pickup, Completed, or Cancelled. Status updates are also sent as notifications.',
  },
  {
    q: 'Can I cancel a reservation?',
    a: 'Yes. Reservations can be cancelled from your Reservations page as long as the status is not yet "Completed". Simply find the reservation and click the cancel button. No fees are charged.',
  },
];

const docCategories = [
  { id: 'patient', icon: Users, title: 'Patient Guide', desc: 'Getting started, searching medications, making reservations, and managing your account.', color: 'bg-emerald-50 text-emerald-600', iconBg: 'bg-emerald-100' },
  { id: 'pharmacy', icon: Store, title: 'Pharmacy Guide', desc: 'Setting up your pharmacy, managing inventory, processing reservations, and analytics.', color: 'bg-blue-50 text-blue-600', iconBg: 'bg-blue-100' },
  { id: 'distributor', icon: Truck, title: 'Distributor Guide', desc: 'Order fulfillment, delivery tracking, route optimization, and revenue reports.', color: 'bg-violet-50 text-violet-600', iconBg: 'bg-violet-100' },
  { id: 'admin', icon: Shield, title: 'Administrator Guide', desc: 'User management, platform configuration, system monitoring, and audit logs.', color: 'bg-rose-50 text-rose-600', iconBg: 'bg-rose-100' },
];

const systemStatusItems = [
  { label: 'API Status', status: 'Operational', icon: Server, color: 'text-emerald-600', dot: 'bg-emerald-400', bg: 'bg-emerald-50' },
  { label: 'Platform', status: 'Operational', icon: Globe, color: 'text-emerald-600', dot: 'bg-emerald-400', bg: 'bg-emerald-50' },
  { label: 'Database', status: 'Operational', icon: Activity, color: 'text-emerald-600', dot: 'bg-emerald-400', bg: 'bg-emerald-50' },
  { label: 'Notifications', status: 'Operational', icon: Bell, color: 'text-emerald-600', dot: 'bg-emerald-400', bg: 'bg-emerald-50' },
  { label: 'Payment Gateway', status: 'Operational', icon: CreditCard, color: 'text-emerald-600', dot: 'bg-emerald-400', bg: 'bg-emerald-50' },
];

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('help');
  const [ticketView, setTicketView] = useState('open');
  const [reportForm, setReportForm] = useState({ subject: '', category: '', description: '' });
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const searchRef = useRef(null);

  const filteredFaq = useMemo(() => {
    if (!searchQuery.trim()) return faqItems;
    const q = searchQuery.toLowerCase();
    return faqItems.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredQuickHelp = useMemo(() => {
    if (!searchQuery.trim()) return quickHelpCards;
    const q = searchQuery.toLowerCase();
    return quickHelpCards.filter((c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
  }, [searchQuery]);

  const hasSearchResults = searchQuery.trim() && (filteredFaq.length > 0 || filteredQuickHelp.length > 0);
  const noResults = searchQuery.trim() && !hasSearchResults;

  const handleFaqToggle = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleReportChange = (field, value) => {
    setReportForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!reportForm.subject.trim()) errors.subject = 'Subject is required';
    if (!reportForm.category) errors.category = 'Please select a category';
    if (!reportForm.description.trim()) errors.description = 'Description is required';
    else if (reportForm.description.trim().length < 20) errors.description = 'Please provide at least 20 characters';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setReportSubmitted(true);
    setReportForm({ subject: '', category: '', description: '' });
    setTimeout(() => setReportSubmitted(false), 4000);
  };

  const tabSections = [
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'tickets', label: 'My Tickets', icon: Ticket },
    { id: 'report', label: 'Report Problem', icon: Bug },
  ];

  const reportCategories = [
    { value: 'billing', label: 'Billing & Payment' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'account', label: 'Account Problem' },
    { value: 'reservation', label: 'Reservation Issue' },
    { value: 'pharmacy', label: 'Pharmacy Related' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5 text-[#14B8A6]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Help & Support Center</h1>
              <p className="text-sm text-slate-500 mt-0.5">Find answers and get assistance quickly.</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex gap-1.5 p-1 rounded-2xl bg-slate-100 inline-flex">
          {tabSections.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'help' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-8 relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help articles, FAQs, and support topics..."
                className="w-full h-14 pl-12 pr-12 rounded-2xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]/50 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition-all"
                >
                  Clear
                </button>
              )}
            </motion.div>

            {noResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10"
              >
                <EmptyState
                  icon={Search}
                  title="No results found"
                  description={`No articles or topics match "${searchQuery}". Try a different search term or browse the categories below.`}
                />
              </motion.div>
            )}

            {(!searchQuery.trim() || hasSearchResults) && (
              <>
                {filteredQuickHelp.length > 0 && (
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {filteredQuickHelp.map((card) => (
                      <motion.button
                        key={card.id}
                        variants={staggerItem}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#14B8A6]/20 hover:shadow-md hover:shadow-[#14B8A6]/5 transition-all group"
                      >
                        <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                          <card.icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800 mb-1">{card.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                <section className="mt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Frequently Asked Questions</h2>
                  </motion.div>

                  <div className="space-y-2">
                    {filteredFaq.length > 0 ? filteredFaq.map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.03 }}
                        className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                      >
                        <button
                          onClick={() => handleFaqToggle(idx)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-slate-50/50"
                        >
                          <span className="text-sm font-medium text-slate-700 pr-4">{item.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                              openFaq === idx ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {openFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-4 pt-0">
                                <div className="w-full h-px bg-slate-100 mb-3" />
                                <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl border border-slate-200 p-8 text-center"
                      >
                        <Search className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">No FAQ articles match your search.</p>
                      </motion.div>
                    )}
                  </div>
                </section>

                <section className="mt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-[#14B8A6]" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Contact Support</h2>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#14B8A6]/20 transition-all group">
                      <div className="w-11 h-11 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5 text-[#14B8A6]" />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">Email Support</h3>
                      <p className="text-xs text-slate-500 mb-3">Get a response within 24 hours.</p>
                      <a
                        href="mailto:support@dwakfjib.ma"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#14B8A6] hover:text-[#0F766E] transition-colors"
                      >
                        support@dwakfjib.ma
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#14B8A6]/20 transition-all group">
                      <div className="w-11 h-11 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5 text-[#14B8A6]" />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">Phone Support</h3>
                      <p className="text-xs text-slate-500 mb-3">Available Mon-Fri, 9AM-6PM.</p>
                      <a
                        href="tel:+212522000000"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#14B8A6] hover:text-[#0F766E] transition-colors"
                      >
                        +212 5 22 00 00 00
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#14B8A6]/20 transition-all group">
                      <div className="w-11 h-11 rounded-2xl bg-[#14B8A6]/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <Clock className="w-5 h-5 text-[#14B8A6]" />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-1">Response Time</h3>
                      <p className="text-xs text-slate-500 mb-3">We aim to respond promptly.</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-sm font-medium text-emerald-600">Average: &lt; 4 hours</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-violet-500" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Documentation</h2>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {docCategories.map((doc) => (
                      <motion.button
                        key={doc.id}
                        variants={staggerItem}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="text-left p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#14B8A6]/20 hover:shadow-md hover:shadow-[#14B8A6]/5 transition-all group"
                      >
                        <div className={`w-11 h-11 rounded-2xl ${doc.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                          <doc.icon className={`w-5 h-5 ${doc.color}`} />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800 mb-1">{doc.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{doc.desc}</p>
                        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#14B8A6]">
                          Browse guides <ArrowRight className="w-3 h-3" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </section>

                <section className="mt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">System Status</h2>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {systemStatusItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200"
                      >
                        <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 truncate">{item.label}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                            <span className={`text-[11px] font-semibold ${item.color}`}>{item.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </>
        )}

        {activeTab === 'tickets' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setTicketView('open')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  ticketView === 'open' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Open Tickets
              </button>
              <button
                onClick={() => setTicketView('closed')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  ticketView === 'closed' ? 'bg-white text-slate-800 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Closed Tickets
              </button>
            </div>

            <EmptyState
              icon={Ticket}
              title="No support tickets found"
              description="You don't have any support tickets yet. If you encounter an issue, use the Report a Problem form to submit a ticket."
              action={
                <Button
                  variant="primary"
                  icon={Bug}
                  onClick={() => setActiveTab('report')}
                >
                  Report a Problem
                </Button>
              }
            />
          </motion.div>
        )}

        {activeTab === 'report' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl"
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center">
                  <Bug className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Report a Problem</h2>
                  <p className="text-sm text-slate-500">Describe the issue you are experiencing.</p>
                </div>
              </div>

              {reportSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Report Submitted</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Thank you. Our support team will review your report and get back to you within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setReportSubmitted(false)}>
                    Submit Another Report
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-5">
                  <Input
                    label="Subject"
                    placeholder="Brief summary of the issue..."
                    value={reportForm.subject}
                    onChange={(e) => handleReportChange('subject', e.target.value)}
                    error={formErrors.subject}
                  />

                  <Select
                    label="Category"
                    placeholder="Select a category..."
                    options={reportCategories}
                    value={reportForm.category}
                    onChange={(e) => handleReportChange('category', e.target.value)}
                    error={formErrors.category}
                  />

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-slate-600">Description</label>
                    <textarea
                      value={reportForm.description}
                      onChange={(e) => handleReportChange('description', e.target.value)}
                      placeholder="Describe the issue in detail. Include steps to reproduce if applicable..."
                      rows={5}
                      className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 resize-y min-h-[120px] ${
                        formErrors.description
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                          : 'border-slate-200 focus:border-[#14B8A6]/50 focus:ring-[#14B8A6]/20'
                      }`}
                    />
                    {formErrors.description && (
                      <p className="text-xs text-red-500 font-medium">{formErrors.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Button type="submit" variant="primary" icon={Send}>
                      Submit Report
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => { setReportForm({ subject: '', category: '', description: '' }); setFormErrors({}); }}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
