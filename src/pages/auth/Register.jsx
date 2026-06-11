import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Heart, Building2, Truck, MapPin, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getFieldErrors } from '../../utils/apiErrorHandler';

const registerSchema = z.object({
  name: z.string().min(2, 'Must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  role: z.enum(['USER', 'PHARMACY', 'DISTRIBUTOR']),
  pharmacyAddress: z.string().optional(),
  authorizationType: z.string().optional(),
  companyName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
  if (data.role === 'PHARMACY') {
    if (!data.pharmacyAddress || data.pharmacyAddress.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Pharmacy address is required',
        path: ['pharmacyAddress'],
      });
    }
    if (!data.authorizationType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select an authorization type',
        path: ['authorizationType'],
      });
    }
  }
  if (data.role === 'DISTRIBUTOR') {
    if (!data.companyName || data.companyName.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Company name is required',
        path: ['companyName'],
      });
    }
  }
});

const roles = [
  { value: 'USER', label: 'Patient', icon: Heart, desc: 'Search and reserve medications' },
  { value: 'PHARMACY', label: 'Pharmacy', icon: Building2, desc: 'Manage inventory and orders' },
  { value: 'DISTRIBUTOR', label: 'Distributor', icon: Truck, desc: 'Track deliveries and logistics' },
];

const authTypes = [
  { value: '', label: 'Select authorization type' },
  { value: 'INDEPENDENT', label: 'Independent Pharmacy' },
  { value: 'CHAIN', label: 'Chain Pharmacy' },
  { value: 'HOSPITAL', label: 'Hospital Pharmacy' },
];

const nameConfig = {
  USER: { label: 'Username', placeholder: 'johndoe', icon: User },
  PHARMACY: { label: 'Pharmacy name', placeholder: 'Your pharmacy name', icon: Building2 },
  DISTRIBUTOR: { label: 'Distributor name', placeholder: 'Your name', icon: Truck },
};

const getStrength = (pw) => {
  let s = 0;
  if (!pw) return 0;
  if (pw.length >= 6) s += 20;
  if (pw.length >= 8) s += 10;
  if (/[a-z]/.test(pw)) s += 15;
  if (/[A-Z]/.test(pw)) s += 15;
  if (/[0-9]/.test(pw)) s += 15;
  if (/[^a-zA-Z0-9]/.test(pw)) s += 15;
  if (pw.length >= 12) s += 10;
  return Math.min(s, 100);
};

const strengthMeta = (score) => {
  if (score >= 80) return { label: 'Strong password', color: 'text-brand-600', bars: 'bg-brand-500' };
  if (score >= 60) return { label: 'Good password', color: 'text-brand-500', bars: 'bg-brand-400' };
  if (score >= 40) return { label: 'Fair password', color: 'text-amber-500', bars: 'bg-amber-400' };
  return { label: 'Weak password', color: 'text-red-400', bars: 'bg-red-400' };
};

const statsData = [
  { value: '1,250+', label: 'Pharmacies' },
  { value: '320+', label: 'Distributors' },
  { value: '85K+', label: 'Patients' },
];

const Register = () => {
  const { register: registerUser, getRedirectPath } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'USER' },
  });

  const watchedPassword = watch('password');
  const selectedRole = watch('role');
  const strength = useMemo(() => getStrength(watchedPassword || ''), [watchedPassword]);
  const meta = useMemo(() => strengthMeta(strength), [strength]);

  useEffect(() => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.pharmacyAddress;
      delete next.authorizationType;
      delete next.companyName;
      delete next.confirmPassword;
      return next;
    });
    clearErrors(['pharmacyAddress', 'authorizationType', 'companyName', 'confirmPassword']);
  }, [selectedRole, clearErrors]);

  const onSubmit = async (data) => {
    setLoading(true);
    setFieldErrors({});
    // eslint-disable-next-line no-unused-vars
    const { confirmPassword, ...submitData } = data;
    try {
      await registerUser(submitData);
      toast.success('Account created successfully!');
      navigate(getRedirectPath(), { replace: true });
    } catch (err) {
      if (err?.status === 422) {
        const fieldErrs = getFieldErrors(err);
        setFieldErrors(fieldErrs);
        Object.entries(fieldErrs).forEach(([field, messages]) => {
          setError(field, { message: Array.isArray(messages) ? messages[0] : messages });
        });
      } else {
        toast.error(err?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const NameIcon = nameConfig[selectedRole]?.icon || User;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ═══ LEFT PANEL — Registration Form (50%) ═══ */}
      <div className="w-full lg:w-1/2 bg-card min-h-screen flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-[440px]">
          <div className="lg:hidden mb-10 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <span className="text-lg font-bold text-contrast-primary tracking-tight">DwakFJib</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-contrast-primary tracking-tight">Create your account</h1>
              <p className="text-base text-contrast-secondary mt-2">Join Morocco's healthcare logistics platform</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-contrast-primary">Account type</label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => {
                    const selected = selectedRole === role.value;
                    const Icon = role.icon;
                    return (
                      <label
                        key={role.value}
                        className={`relative rounded-xl border-2 p-3 sm:p-4 cursor-pointer transition-all duration-200 ${
                          selected
                            ? 'bg-card border-brand-500 shadow-[0_0_0_3px_rgba(20,184,166,0.12),0_4px_12px_rgba(20,184,166,0.08)]'
                            : 'bg-card border-elevated hover:border-brand-300 hover:shadow-sm'
                        }`}
                      >
                        <input
                          type="radio"
                          value={role.value}
                          {...register('role')}
                          className="sr-only"
                        />
                        {selected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shadow-sm">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                            selected ? 'bg-brand-50 text-brand-500' : 'bg-elevated text-contrast-secondary'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-xs font-semibold transition-colors duration-200 ${
                            selected ? 'text-brand-600' : 'text-contrast-primary'
                          }`}>
                            {role.label}
                          </span>
                          <span className={`text-[10px] leading-tight transition-colors duration-200 ${
                            selected ? 'text-brand-600/70' : 'text-contrast-secondary'
                          }`}>
                            {role.desc}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRole}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Name field (label varies by role) */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-contrast-primary">{nameConfig[selectedRole].label}</label>
                    <div className="relative">
                      <NameIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
                      <input
                        type="text"
                        placeholder={nameConfig[selectedRole].placeholder}
                        autoComplete="name"
                        {...register('name')}
                        className={`w-full h-12 pl-10 pr-3.5 rounded-xl border text-sm text-contrast-primary placeholder:text-contrast-muted bg-card outline-none transition-all duration-200 ${
                          errors.name?.message || fieldErrors.name?.[0]
                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                            : 'border-elevated focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10'
                        }`}
                      />
                    </div>
                    {(errors.name?.message || fieldErrors.name?.[0]) && (
                      <p className="text-xs text-red-500 mt-1">{errors.name?.message || fieldErrors.name?.[0]}</p>
                    )}
                  </div>

                  {/* Pharmacy Address — only for PHARMACY */}
                  {selectedRole === 'PHARMACY' && (
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-contrast-primary">Pharmacy address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
                        <input
                          type="text"
                          placeholder="123 Healthcare Ave, Suite 100"
                          {...register('pharmacyAddress')}
                          className={`w-full h-12 pl-10 pr-3.5 rounded-xl border text-sm text-contrast-primary placeholder:text-contrast-muted bg-card outline-none transition-all duration-200 ${
                            errors.pharmacyAddress?.message || fieldErrors.pharmacyAddress?.[0]
                              ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                              : 'border-elevated focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10'
                          }`}
                        />
                      </div>
                      {(errors.pharmacyAddress?.message || fieldErrors.pharmacyAddress?.[0]) && (
                        <p className="text-xs text-red-500 mt-1">{errors.pharmacyAddress?.message || fieldErrors.pharmacyAddress?.[0]}</p>
                      )}
                    </div>
                  )}

                  {/* Authorization Type — only for PHARMACY */}
                  {selectedRole === 'PHARMACY' && (
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-contrast-primary">Authorization type</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted pointer-events-none" />
                        <select
                          {...register('authorizationType')}
                          className={`w-full h-12 pl-10 pr-3.5 rounded-xl border text-sm bg-card outline-none appearance-none cursor-pointer transition-all duration-200 ${
                            errors.authorizationType?.message || fieldErrors.authorizationType?.[0]
                              ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                              : 'border-elevated focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10'
                          } ${
                            !watch('authorizationType') ? 'text-contrast-muted' : 'text-contrast-primary'
                          }`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394A3B8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: 'right 0.75rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.25rem',
                          }}
                        >
                          {authTypes.map((t) => (
                            <option key={t.value} value={t.value} disabled={!t.value}>{t.label}</option>
                          ))}
                        </select>
                      </div>
                      {(errors.authorizationType?.message || fieldErrors.authorizationType?.[0]) && (
                        <p className="text-xs text-red-500 mt-1">{errors.authorizationType?.message || fieldErrors.authorizationType?.[0]}</p>
                      )}
                    </div>
                  )}

                  {/* Company Name — only for DISTRIBUTOR */}
                  {selectedRole === 'DISTRIBUTOR' && (
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-contrast-primary">Company name</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
                        <input
                          type="text"
                          placeholder="Your company name"
                          {...register('companyName')}
                          className={`w-full h-12 pl-10 pr-3.5 rounded-xl border text-sm text-contrast-primary placeholder:text-contrast-muted bg-card outline-none transition-all duration-200 ${
                            errors.companyName?.message || fieldErrors.companyName?.[0]
                              ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                              : 'border-elevated focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10'
                          }`}
                        />
                      </div>
                      {(errors.companyName?.message || fieldErrors.companyName?.[0]) && (
                        <p className="text-xs text-red-500 mt-1">{errors.companyName?.message || fieldErrors.companyName?.[0]}</p>
                      )}
                    </div>
                  )}

                  {/* Email — always shown */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-contrast-primary">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...register('email')}
                        className={`w-full h-12 pl-10 pr-3.5 rounded-xl border text-sm text-contrast-primary placeholder:text-contrast-muted bg-card outline-none transition-all duration-200 ${
                          errors.email?.message || fieldErrors.email?.[0]
                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                            : 'border-elevated focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10'
                        }`}
                      />
                    </div>
                    {(errors.email?.message || fieldErrors.email?.[0]) && (
                      <p className="text-xs text-red-500 mt-1">{errors.email?.message || fieldErrors.email?.[0]}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-contrast-primary">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        autoComplete="new-password"
                        {...register('password')}
                        className={`w-full h-12 pl-10 pr-10 rounded-xl border text-sm text-contrast-primary placeholder:text-contrast-muted bg-card outline-none transition-all duration-200 ${
                          errors.password?.message || fieldErrors.password?.[0]
                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                            : 'border-elevated focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-contrast-muted hover:text-contrast-secondary transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {watchedPassword && watchedPassword.length > 0 && (
                      <div className="mt-2 space-y-1.5">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                strength >= level * 20 ? meta.bars : 'bg-elevated'
                              }`}
                            />
                          ))}
                        </div>
                        <p className={`text-xs ${meta.color}`}>{meta.label}</p>
                      </div>
                    )}
                    {(errors.password?.message || fieldErrors.password?.[0]) && (
                      <p className="text-xs text-red-500 mt-1">{errors.password?.message || fieldErrors.password?.[0]}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-contrast-primary">Confirm password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-contrast-muted" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        {...register('confirmPassword')}
                        className={`w-full h-12 pl-10 pr-10 rounded-xl border text-sm text-contrast-primary placeholder:text-contrast-muted bg-card outline-none transition-all duration-200 ${
                          errors.confirmPassword?.message || fieldErrors.confirmPassword?.[0]
                            ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                            : 'border-elevated focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-contrast-muted hover:text-contrast-secondary transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {(errors.confirmPassword?.message || fieldErrors.confirmPassword?.[0]) && (
                      <p className="text-xs text-red-500 mt-1">{errors.confirmPassword?.message || fieldErrors.confirmPassword?.[0]}</p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 pt-1">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="peer sr-only"
                  />
                  <label htmlFor="terms" className="block w-4 h-4 rounded border border-muted peer-checked:border-brand-500 peer-checked:bg-brand-500 transition-all duration-200 cursor-pointer hover:border-muted">
                    <svg className="w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </label>
                </div>
                <label htmlFor="terms" className="text-sm text-contrast-secondary cursor-pointer select-none leading-relaxed">
                  I agree to the{' '}
                  <Link to="/about" className="text-brand-500 hover:text-brand-600 font-medium transition-colors">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/about" className="text-brand-500 hover:text-brand-600 font-medium transition-colors">Privacy Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !acceptedTerms}
                className="w-full h-12 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 active:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-contrast-secondary mt-8">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-brand-500 hover:text-brand-600 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL — Minimal Branding (50%) ═══ */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-700/80 relative overflow-hidden min-h-screen">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-500/8 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-brand-400/5 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between w-full px-16 py-20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">DwakFJib</span>
          </div>

          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/10 border border-white/10 text-xs font-medium text-white/70 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                Healthcare Logistics Platform
              </span>

              <h2 className="text-3xl font-bold text-white leading-[1.2] tracking-tight">
                Connecting Pharmacies,<br />
                Distributors &amp; Patients
              </h2>

              <p className="mt-4 text-base text-white/60 leading-relaxed">
                DwakFJib simplifies medication search, reservations and healthcare
                delivery through one intelligent platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-4 mt-12">
              {statsData.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div />
        </div>
      </div>
    </div>
  );
};

export default Register;
