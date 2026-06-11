import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Pill, MapPin, Clock, CheckCircle, Package,
  Phone, Star, Store, User, Mail,
  ArrowLeft, Home, Calendar,
  AlertCircle, Plus, Minus, XCircle, ChevronRight,
  Sparkles,
} from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';
import { useMyReservations, useCancelReservation } from '../../hooks';
import { useMedication, useCreateReservation } from '../../hooks';
import { useAuth } from '../../context/AuthContext';
import formatMAD from '../../utils/currency';

const statusSteps = [
  { key: 'PENDING', label: 'Requested', desc: 'Reservation submitted, awaiting pharmacy review' },
  { key: 'CONFIRMED', label: 'Confirmed', desc: 'Pharmacy has accepted your reservation' },
  { key: 'READY', label: 'Ready for Pickup', desc: 'Medication is ready, waiting for collection' },
  { key: 'COMPLETED', label: 'Completed', desc: 'Reservation finished successfully' },
];

const statusConfig = {
  PENDING: { color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Pending Review', icon: Clock, dot: 'bg-amber-500' },
  CONFIRMED: { color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Confirmed', icon: AlertCircle, dot: 'bg-blue-500' },
  READY: { color: 'text-brand-500', bg: 'bg-brand-50', border: 'border-brand-200', label: 'Ready for Pickup', icon: Package, dot: 'bg-brand-500' },
  COMPLETED: { color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Completed', icon: CheckCircle, dot: 'bg-emerald-500' },
  CANCELLED: { color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', label: 'Cancelled', icon: XCircle, dot: 'bg-red-500' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

// ─── CHECKOUT VIEW ──────────────────────────────────────
const CheckoutView = ({ medicationId, onComplete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [created, setCreated] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const { data: medData, loading: medLoading } = useMedication(medicationId, { autoFetch: true });
  const { mutate: createReservation } = useCreateReservation({
    successMessage: false,
    onSuccess: () => setCreated(true),
  });

  const med = medData?.data || medData;
  const pharmacy = med?.pharmacy;

  const handleConfirm = async () => {
    if (confirming || created) return;
    setConfirming(true);
    try {
      await createReservation({ medication_id: medicationId, quantity });
    } catch {
      // handled by hook
    } finally {
      setConfirming(false);
    }
  };

  if (medLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-5 bg-elevated rounded w-32" />
        <div className="bg-card rounded-2xl border border-elevated p-6 sm:p-8 space-y-5">
          <div className="flex gap-4"><div className="w-14 h-14 rounded-xl bg-elevated" /><div className="space-y-2 flex-1"><div className="h-5 bg-elevated rounded w-48" /><div className="h-4 bg-elevated rounded w-32" /></div></div>
          <div className="h-px bg-elevated" />
          <div className="space-y-3"><div className="h-4 bg-elevated rounded w-full" /><div className="h-4 bg-elevated rounded w-3/4" /></div>
        </div>
      </div>
    );
  }

  if (!med) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <AlertCircle className="w-12 h-12 text-contrast-muted mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-contrast-primary">Medication not found</h2>
        <p className="text-sm text-contrast-secondary mt-2">The medication you're looking for could not be loaded.</p>
        <button onClick={onComplete} className="mt-4 text-sm text-brand-500 hover:text-brand-600 font-medium">Go back</button>
      </div>
    );
  }

  if (created) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
          <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brand-500" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-bold text-contrast-primary">Reservation Submitted Successfully</h2>
          <p className="text-sm text-contrast-secondary mt-2 max-w-sm mx-auto">
            Your reservation has been sent to {pharmacy?.name || 'the pharmacy'}. You'll receive a confirmation shortly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <button onClick={onComplete} className="h-12 px-6 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-sm">
              <Package className="w-4 h-4" /> Track Reservation
            </button>
            <button onClick={() => navigate('/')} className="h-12 px-6 rounded-xl border border-elevated text-contrast-secondary text-sm font-medium hover:border-muted hover:bg-elevated transition-all inline-flex items-center gap-2">
              <Home className="w-4 h-4" /> Return Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={onComplete}
        className="inline-flex items-center gap-2 text-sm text-contrast-muted hover:text-contrast-secondary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to reservations
      </motion.button>

      <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
        <div className="lg:col-span-3 space-y-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-elevated p-6 sm:p-8">
            <h2 className="text-base font-semibold text-contrast-primary mb-5">Reservation Summary</h2>
            <div className="flex items-start gap-4 pb-5 border-b border-elevated">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                <Pill className="w-7 h-7 text-brand-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-contrast-primary">{med.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-contrast-muted">{med.category}</span>
                  <span className="text-contrast-muted">·</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    med.stock > 0 && !med.is_low_stock ? 'bg-brand-50 text-brand-600 border-brand-200' :
                    med.stock > 0 ? 'bg-amber-50 text-amber-600 border-amber-200' :
                    'bg-red-50 text-red-500 border-red-200'
                  }`}>
                    {med.stock > 0 && !med.is_low_stock ? 'In Stock' : med.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </div>
                {med.dosage && <p className="text-xs text-contrast-muted mt-1">{med.dosage}</p>}
              </div>
            </div>
            <div className="flex items-center justify-between py-5 border-b border-elevated">
              <span className="text-sm text-contrast-secondary">Quantity</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg border border-elevated flex items-center justify-center text-contrast-muted hover:text-contrast-secondary hover:border-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                ><Minus className="w-3.5 h-3.5" /></button>
                <span className="text-sm font-semibold text-contrast-primary w-6 text-center tabular-nums">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg border border-elevated flex items-center justify-center text-contrast-muted hover:text-contrast-secondary hover:border-muted transition-all"
                ><Plus className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="flex items-center justify-between py-5 border-b border-elevated">
              <span className="text-sm text-contrast-secondary">Unit Price</span>
              <span className="text-sm font-semibold text-contrast-primary">{formatMAD(med.price || 0)}</span>
            </div>
            <div className="flex items-center justify-between pt-5">
              <span className="text-base font-semibold text-contrast-primary">Total</span>
              <span className="text-xl font-bold text-contrast-primary">{formatMAD((med.price || 0) * quantity)}</span>
            </div>
            <div className="mt-5 p-4 rounded-xl bg-brand-50 border border-brand-100 flex items-start gap-3">
              <Calendar className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-brand-700">Estimated Pickup Time</p>
                <p className="text-xs text-brand-500 mt-0.5">Today or tomorrow after pharmacy confirmation</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-2xl border border-elevated p-6 sm:p-8">
            <h2 className="text-base font-semibold text-contrast-primary mb-4">Patient Information</h2>
            <div className="space-y-3">
              {[
                { icon: User, label: 'Full Name', value: user?.name || '—' },
                { icon: Mail, label: 'Email', value: user?.email || '—' },
                { icon: Phone, label: 'Phone', value: user?.phone || '—' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center">
                    <item.icon className="w-3.5 h-3.5 text-contrast-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-contrast-muted uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium text-contrast-primary truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl border border-elevated p-6 sm:p-8">
            <h2 className="text-base font-semibold text-contrast-primary mb-5">Reservation Timeline</h2>
            <div className="space-y-0">
              {statusSteps.map((step, i) => {
                const Icon = step.icon || Clock;
                const isActive = i === 0;
                return (
                  <div key={step.key} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${
                        isActive ? 'border-brand-500 bg-brand-50 text-brand-500' : 'border-elevated bg-card text-contrast-muted'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {i < statusSteps.length - 1 && <div className="w-0.5 h-8 bg-elevated" />}
                    </div>
                    <div className="pb-6 flex-1">
                      <p className={`text-sm font-medium ${isActive ? 'text-brand-600' : 'text-contrast-muted'}`}>{step.label}</p>
                      <p className={`text-xs mt-0.5 ${isActive ? 'text-brand-400' : 'text-contrast-muted'}`}>
                        {isActive ? 'Current step' : step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          {pharmacy && (
            <>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="bg-card rounded-2xl border border-elevated p-6 sm:p-8">
                <h2 className="text-base font-semibold text-contrast-primary mb-4">Pharmacy</h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Store className="w-6 h-6 text-brand-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-contrast-primary truncate">{pharmacy.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-[11px] font-medium text-contrast-secondary">{pharmacy.rating || '—'}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-contrast-muted mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-contrast-secondary">{pharmacy.address || pharmacy.city || 'Address not available'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-contrast-muted flex-shrink-0" />
                    <a href={`tel:${pharmacy.phone}`} className="text-sm text-brand-500 hover:text-brand-600 font-medium">{pharmacy.phone || '—'}</a>
                  </div>
                  {pharmacy.distance && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-contrast-muted flex-shrink-0" />
                      <span className="text-sm text-contrast-secondary">{pharmacy.distance} away</span>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="bg-card rounded-2xl border border-elevated p-6 sm:p-8">
                <h2 className="text-base font-semibold text-contrast-primary mb-4">Pickup Method</h2>
                <div className="p-4 rounded-xl bg-brand-50 border border-brand-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-card flex items-center justify-center"><Store className="w-5 h-5 text-brand-500" /></div>
                    <div><p className="text-sm font-medium text-brand-700">In-Store Pickup</p><p className="text-xs text-brand-500 mt-0.5">Collect at {pharmacy.name}</p></div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl border border-elevated p-6 sm:p-8">
                <button onClick={handleConfirm} disabled={confirming}
                  className="w-full h-12 rounded-xl bg-brand-500 text-white text-sm font-semibold hover:bg-brand-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  {confirming ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (<><ShoppingCart className="w-4 h-4" /> Confirm Reservation</>)}
                </button>
                <button onClick={onComplete} disabled={confirming} className="w-full mt-2 h-10 rounded-xl text-sm text-contrast-muted hover:text-contrast-secondary transition-colors font-medium">Cancel</button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── DETAIL VIEW ────────────────────────────────────────
const DetailView = ({ reservation, onBack }) => {
  const navigate = useNavigate();
  const { mutate: cancelReservation } = useCancelReservation({
    successMessage: 'Reservation cancelled',
    onSuccess: onBack,
  });

  const status = reservation.status || 'PENDING';
  const config = statusConfig[status] || statusConfig.PENDING;
  const StatusIcon = config.icon;
  const isCancelled = status === 'CANCELLED';
  const isCompleted = status === 'COMPLETED';
  const currentStepIdx = ['PENDING', 'CONFIRMED', 'READY', 'COMPLETED'].indexOf(status);

  const handleCancel = async () => {
    await cancelReservation(reservation.id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back + ID Badge */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-contrast-muted hover:text-contrast-secondary transition-colors">
          <ArrowLeft className="w-4 h-4" /> All reservations
        </button>
        <span className="px-3 py-1 rounded-full bg-elevated border border-elevated text-[11px] font-mono font-medium text-contrast-secondary">
          #{reservation.id}
        </span>
      </motion.div>

      {/* Status Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-card rounded-2xl border p-6 sm:p-8 ${isCancelled ? 'border-red-100' : 'border-elevated'}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${config.bg} border ${config.border} flex items-center justify-center`}>
              <StatusIcon className={`w-7 h-7 ${config.color}`} />
            </div>
            <div>
              <p className="text-sm text-contrast-muted">Current Status</p>
              <h2 className={`text-xl font-bold mt-0.5 ${isCancelled ? 'text-red-500' : isCompleted ? 'text-emerald-500' : 'text-contrast-primary'}`}>
                {config.label}
              </h2>
              {reservation.createdAt && (
                <p className="text-xs text-contrast-muted mt-1">
                  Reserved on {new Date(reservation.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isCancelled && !isCompleted && (
              <button onClick={handleCancel} className="h-10 px-4 rounded-xl border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition-all inline-flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" /> Cancel
              </button>
            )}
            <a href={`tel:${reservation.pharmacyPhone || ''}`} className="h-10 px-4 rounded-xl border border-elevated text-contrast-secondary text-xs font-medium hover:border-muted hover:bg-elevated transition-all inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Contact
            </a>
          </div>
        </div>

        {/* Cancelled Banner */}
        {isCancelled && (
          <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-700">Reservation Cancelled</p>
              <p className="text-xs text-red-500 mt-0.5">This reservation has been cancelled. Please contact the pharmacy for more details.</p>
            </div>
          </div>
        )}

        {/* Completed Banner */}
        {isCompleted && (
          <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-emerald-700">Reservation Completed Successfully</p>
              <p className="text-xs text-emerald-500 mt-0.5">Your medication has been collected successfully. Thank you for using DwakFJib!</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Progress Timeline — Horizontal Desktop / Vertical Mobile */}
      {!isCancelled && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card rounded-2xl border border-elevated p-6 sm:p-8"
        >
          <h3 className="text-sm font-semibold text-contrast-primary mb-6">Progress</h3>

          {/* Desktop Horizontal */}
          <div className="hidden sm:block">
            <div className="relative flex items-start justify-between">
              {statusSteps.slice(0, 4).map((step, i) => {
                const Icon = step.icon || Clock;
                const isStepActive = i <= currentStepIdx;
                const isStepCurrent = i === currentStepIdx;
                return (
                  <div key={step.key} className="flex flex-col items-center flex-1 relative">
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isStepCurrent ? 'border-brand-500 bg-brand-50 shadow-[0_0_0_4px_rgba(20,184,166,0.12)]' :
                        isStepActive ? 'border-brand-300 bg-brand-50' :
                        'border-elevated bg-card'
                      }`}>
                        <Icon className={`w-5 h-5 ${isStepActive ? 'text-brand-500' : 'text-contrast-muted'}`} />
                      </div>
                      <p className={`text-xs font-medium mt-2 text-center leading-tight ${isStepActive ? 'text-contrast-primary' : 'text-contrast-muted'}`}>
                        {step.label}
                      </p>
                      <p className="text-[10px] mt-0.5 text-center max-w-[100px] text-contrast-muted">
                        {step.desc}
                      </p>
                    </div>
                    {i < 3 && (
                      <div className="absolute top-6 left-[calc(50%+26px)] right-[calc(50%-50%)] h-0.5 -translate-y-1/2 z-0">
                        <div className={`h-full rounded-full transition-all duration-500 ${i < currentStepIdx ? 'bg-brand-300' : 'bg-elevated'}`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical */}
          <div className="sm:hidden space-y-0">
            {statusSteps.slice(0, 4).map((step, i) => {
              const Icon = step.icon || Clock;
              const isStepActive = i <= currentStepIdx;
              const isStepCurrent = i === currentStepIdx;
              return (
                <div key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                      isStepCurrent ? 'border-brand-500 bg-brand-50 shadow-[0_0_0_4px_rgba(20,184,166,0.12)]' :
                      isStepActive ? 'border-brand-300 bg-brand-50' :
                      'border-elevated bg-card'
                    }`}>
                      <Icon className={`w-4 h-4 ${isStepActive ? 'text-brand-500' : 'text-contrast-muted'}`} />
                    </div>
                    {i < 3 && <div className={`w-0.5 h-8 ${isStepActive && i < currentStepIdx ? 'bg-brand-200' : 'bg-elevated'}`} />}
                  </div>
                  <div className="pb-6 flex-1">
                    <p className={`text-sm font-medium ${isStepActive ? 'text-contrast-primary' : 'text-contrast-muted'}`}>{step.label}</p>
                    <p className="text-xs mt-0.5 text-contrast-muted">{step.desc}</p>
                    {isStepCurrent && <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-semibold">Current</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Details Grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Reservation Details */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-elevated p-6 sm:p-8"
        >
          <h3 className="text-sm font-semibold text-contrast-primary mb-4">Reservation Details</h3>
          <div className="space-y-4">
            {[
              { icon: Pill, label: 'Medication', value: reservation.medication },
              { icon: Package, label: 'Quantity', value: `${reservation.quantity || 1} unit(s)` },
              { icon: Clock, label: 'Reservation Date', value: reservation.createdAt ? new Date(reservation.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
              { icon: Calendar, label: 'Est. Pickup', value: 'Today or tomorrow after confirmation' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-3.5 h-3.5 text-contrast-muted" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-contrast-muted uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-medium text-contrast-primary truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pharmacy Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="bg-card rounded-2xl border border-elevated p-6 sm:p-8"
        >
          <h3 className="text-sm font-semibold text-contrast-primary mb-4">Pharmacy</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
              <Store className="w-5 h-5 text-brand-500" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-contrast-primary truncate">{reservation.pharmacy}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 text-amber-400 fill-current" />
                <span className="text-[11px] text-contrast-secondary">{reservation.pharmacyRating || '—'}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {reservation.pharmacyAddress && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-contrast-muted mt-0.5 flex-shrink-0" />
                <p className="text-sm text-contrast-secondary">{reservation.pharmacyAddress}</p>
              </div>
            )}
            {reservation.pharmacyPhone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-contrast-muted flex-shrink-0" />
                <a href={`tel:${reservation.pharmacyPhone}`} className="text-sm text-brand-500 hover:text-brand-600 font-medium">{reservation.pharmacyPhone}</a>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="bg-card rounded-2xl border border-elevated p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => navigate('/user/pharmacies')} className="h-11 px-5 rounded-xl border border-elevated text-contrast-secondary text-sm font-medium hover:border-muted hover:bg-elevated transition-all inline-flex items-center gap-2">
            <Store className="w-4 h-4" /> View Pharmacy
          </button>
          <a href={`tel:${reservation.pharmacyPhone || ''}`} className="h-11 px-5 rounded-xl border border-elevated text-contrast-secondary text-sm font-medium hover:border-muted hover:bg-elevated transition-all inline-flex items-center gap-2">
            <Phone className="w-4 h-4" /> Contact Pharmacy
          </a>
          <button onClick={() => navigate('/')} className="h-11 px-5 rounded-xl border border-elevated text-contrast-secondary text-sm font-medium hover:border-muted hover:bg-elevated transition-all inline-flex items-center gap-2">
            <Home className="w-4 h-4" /> Return Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ─── LIST VIEW ──────────────────────────────────────────
const ListView = ({ onSelectReservation }) => {
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: reservationsData, loading } = useMyReservations(
    statusFilter !== 'all' ? { status: statusFilter } : {},
    { autoFetch: true }
  );

  const reservations = (reservationsData?.data || reservationsData || []).map((r) => ({
    id: r.id || `#${r.id}`,
    medication: r.medication || r.medication_name || 'Unknown Medication',
    pharmacy: r.pharmacy || r.pharmacy_name || 'Unknown Pharmacy',
    pharmacyAddress: r.pharmacy_address || r.address || '',
    pharmacyPhone: r.pharmacy_phone || r.phone || '',
    pharmacyRating: r.pharmacy_rating || r.rating || '',
    status: r.status || 'PENDING',
    quantity: r.quantity || 1,
    price: r.price || r.deposit_amount || 0,
    createdAt: r.created_at,
    isExpired: r.is_expired,
  }));

  const statusCounts = {
    all: reservations.length,
    PENDING: reservations.filter((r) => r.status === 'PENDING').length,
    CONFIRMED: reservations.filter((r) => r.status === 'CONFIRMED').length,
    READY: reservations.filter((r) => r.status === 'READY').length,
    COMPLETED: reservations.filter((r) => r.status === 'COMPLETED').length,
    CANCELLED: reservations.filter((r) => r.status === 'CANCELLED').length,
  };

  const filtered = statusFilter === 'all' ? reservations : reservations.filter((r) => r.status === statusFilter);
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'PENDING', label: 'Pending' },
    { key: 'CONFIRMED', label: 'Confirmed' },
    { key: 'READY', label: 'Ready' },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'CANCELLED', label: 'Cancelled' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-contrast-primary tracking-tight">Reservation Tracking</h1>
        <p className="text-sm sm:text-base text-contrast-secondary mt-1.5">Track the progress of your medication reservations.</p>
      </motion.div>

      {/* Status Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04 }}
        className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
      >
        {tabs.map((tab) => {
          const count = statusCounts[tab.key] || 0;
          const isActive = statusFilter === tab.key;
          const tabColors = tab.key === 'CANCELLED' ? 'border-red-200 text-red-600 bg-red-50' :
            tab.key === 'COMPLETED' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' :
            'border-brand-200 text-brand-600 bg-brand-50';
          return (
            <button key={tab.key} onClick={() => setStatusFilter(tab.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                isActive ? `${tabColors} shadow-sm` : 'border-elevated text-contrast-muted hover:text-contrast-secondary hover:border-muted bg-card'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs ${isActive ? 'opacity-80' : 'text-contrast-muted'}`}>({count})</span>
            </button>
          );
        })}
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-2xl border border-elevated p-5 space-y-3 animate-pulse">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-elevated" /><div className="space-y-2 flex-1"><div className="h-4 bg-elevated rounded w-40" /><div className="h-3 bg-elevated rounded w-28" /></div></div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-card rounded-2xl border border-elevated py-16">
          <EmptyState icon={ShoppingCart} title="No reservations" description="You haven't made any reservations matching this filter yet." />
        </div>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
          {filtered.map((res) => {
            const cfg = statusConfig[res.status] || statusConfig.PENDING;
            const Icon = cfg.icon;
            return (
              <motion.button
                key={res.id}
                variants={fadeUp}
                onClick={() => onSelectReservation(res)}
                className="w-full text-left bg-card rounded-2xl border border-elevated p-5 hover:border-elevated hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${cfg.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-contrast-primary truncate">{res.medication}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                      </div>
                      <p className="text-xs text-contrast-muted mt-0.5 truncate">{res.pharmacy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {res.createdAt && (
                      <span className="text-[11px] text-contrast-muted hidden sm:block">
                        {new Date(res.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-contrast-muted group-hover:text-contrast-muted transition-colors" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

// ─── MAIN ENTRY ─────────────────────────────────────────
const ReservationTracking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const medicationId = searchParams.get('medication');
  const [selectedReservation, setSelectedReservation] = useState(null);

  if (medicationId) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <CheckoutView
          medicationId={medicationId}
          onComplete={() => setSearchParams({})}
        />
      </motion.div>
    );
  }

  if (selectedReservation) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <DetailView
          reservation={selectedReservation}
          onBack={() => setSelectedReservation(null)}
        />
      </motion.div>
    );
  }

  return <ListView onSelectReservation={setSelectedReservation} />;
};

export default ReservationTracking;
