import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Stethoscope, Truck, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { demoCredentials } from '../../mock/mockData';
import { getFieldErrors } from '../../utils/apiErrorHandler';

const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const roles = [
  {
    id: 'patient',
    label: 'Patient',
    icon: User,
    demo: demoCredentials.patient,
  },
  {
    id: 'pharmacien',
    label: 'Pharmacien',
    icon: Stethoscope,
    demo: demoCredentials.pharmacien,
  },
  {
    id: 'distributeur',
    label: 'Distributeur',
    icon: Truck,
    demo: demoCredentials.distributeur,
  },
];

const ErrorToast = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, x: 40, scale: 0.95 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 40, scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    className="flex items-center gap-3 px-4 py-3.5 bg-red-500/10 backdrop-blur-xl border border-red-400/20 rounded-2xl shadow-2xl shadow-red-500/10 min-w-[320px]"
  >
    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
      <XCircle className="w-4.5 h-4.5 text-red-400" />
    </div>
    <p className="text-sm font-medium text-red-100">{message}</p>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('patient');
  const [shouldRedirect, setShouldRedirect] = useState('');

  const rolePaths = { patient: '/user', pharmacien: '/pharmacy', distributeur: '/distributor', admin: '/admin' };
  const from = location.state?.from || rolePaths[selectedRole] || '/';
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (shouldRedirect) {
      navigate(shouldRedirect, { replace: true });
    }
  }, [shouldRedirect, navigate]);

  useEffect(() => {
    const t = setTimeout(() => {
      const e = document.querySelector('input[name="email"]');
      const p = document.querySelector('input[name="password"]');
      if (e?.value) setValue('email', e.value);
      if (p?.value) setValue('password', p.value);
    }, 200);
    return () => clearTimeout(t);
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setFieldErrors({});
    try {
      const email = data.email || document.querySelector('input[name="email"]')?.value || '';
      const password = data.password || document.querySelector('input[name="password"]')?.value || '';
      await login(email, password);
      toast.success('Connexion réussie !');
      const redirectTo = data.email === 'admin@dwakfjib.ma' ? '/admin' : from;
      setShouldRedirect(redirectTo);
    } catch (err) {
      if (err?.status === 422) {
        const fieldErrs = getFieldErrors(err);
        setFieldErrors(fieldErrs);
        Object.entries(fieldErrs).forEach(([field, messages]) => {
          setError(field, { message: Array.isArray(messages) ? messages[0] : messages });
        });
      } else {
        toast.custom(() => <ErrorToast message={err?.message || 'Identifiants incorrects'} />, {
          id: 'login-error',
          duration: 4000,
          position: 'top-right',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#0B1220]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#14B8A6]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#14B8A6]/8 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4wMyIvPjwvc3ZnPg==')] opacity-50" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[420px]"
      >
        <motion.div
          variants={itemVariants}
          className="relative rounded-[20px] border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-8 sm:p-10"
        >
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

          <div className="relative z-10">
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-8">
              <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#14B8A6] to-emerald-600 flex items-center justify-center shadow-lg shadow-[#14B8A6]/20 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-2">DwakFJib</span>
              <h1 className="text-[28px] font-bold text-white tracking-tight leading-none">Connexion</h1>
              <p className="text-sm text-white/50 mt-2.5 font-normal">Connectez-vous à votre espace</p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-7">
              <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.12em] mb-3 text-center">Je suis</p>
              <div className="grid grid-cols-3 gap-2.5">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isActive = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`relative flex flex-col items-center gap-2 py-3.5 px-2 rounded-2xl border text-center transition-all duration-300 ${
                        isActive
                          ? 'border-[#14B8A6]/60 bg-[#14B8A6]/10 shadow-lg shadow-[#14B8A6]/10 scale-[1.02]'
                          : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.06] hover:scale-[1.02]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-[#14B8A6] to-emerald-500 shadow-lg shadow-[#14B8A6]/25'
                          : 'bg-white/[0.06]'
                      }`}>
                        <Icon className={`w-5 h-5 transition-all duration-300 ${
                          isActive ? 'text-white' : 'text-white/40'
                        }`} />
                      </div>
                      <span className={`text-[11px] font-semibold leading-tight transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-white/50'
                      }`}>
                        {role.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="roleGlow"
                          className="absolute inset-0 rounded-2xl ring-1 ring-[#14B8A6]/30"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4.5">
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-[13px] font-medium text-white/70">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="email@gmail.com"
                    autoComplete="email"
                    {...register('email')}
                    className={`w-full h-11 pl-10 pr-3.5 rounded-xl text-sm text-white placeholder:text-white/30 bg-white/[0.06] border outline-none transition-all duration-300 ${
                      errors.email?.message || fieldErrors.email?.[0]
                        ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/15'
                        : 'border-white/[0.08] focus:border-[#14B8A6]/50 focus:ring-2 focus:ring-[#14B8A6]/12'
                    }`}
                  />
                </div>
                {(errors.email?.message || fieldErrors.email?.[0]) && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.email?.message || fieldErrors.email?.[0]}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-[13px] font-medium text-white/70">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register('password')}
                    className={`w-full h-11 pl-10 pr-10 rounded-xl text-sm text-white placeholder:text-white/30 bg-white/[0.06] border outline-none transition-all duration-300 ${
                      errors.password?.message || fieldErrors.password?.[0]
                        ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/15'
                        : 'border-white/[0.08] focus:border-[#14B8A6]/50 focus:ring-2 focus:ring-[#14B8A6]/12'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {(errors.password?.message || fieldErrors.password?.[0]) && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.password?.message || fieldErrors.password?.[0]}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="w-[18px] h-[18px] rounded-md border border-white/[0.12] bg-white/[0.04] peer-checked:border-[#14B8A6] peer-checked:bg-[#14B8A6]/20 transition-all duration-200 group-hover:border-white/[0.2] flex items-center justify-center">
                      <svg className="w-[11px] h-[11px] text-[#14B8A6] opacity-0 peer-checked:opacity-100 transition-opacity duration-200" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[13px] text-white/50 group-hover:text-white/70 transition-colors">Se souvenir de moi</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-[13px] text-[#14B8A6]/80 hover:text-[#14B8A6] font-medium transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full h-12 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-emerald-500 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 inline-flex items-center justify-center gap-2 overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#14B8A6]/0 via-white/[0.08] to-[#14B8A6]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10">
                    {loading ? (
                      <svg className="animate-spin h-4 w-4 mx-auto" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <span className="flex items-center gap-2">
                        Se connecter
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </span>
                </button>
              </motion.div>
            </form>

            <motion.p
              variants={itemVariants}
              className="text-center text-[13px] text-white/40 mt-8"
            >
              Pas encore de compte ?{' '}
              <Link
                to="/register"
                className="text-[#14B8A6]/80 hover:text-[#14B8A6] font-semibold transition-colors"
              >
                Créer un compte
              </Link>
            </motion.p>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-center text-[11px] text-white/20 mt-6"
        >
          &copy; {new Date().getFullYear()} DwakFJib. Tous droits réservés.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
