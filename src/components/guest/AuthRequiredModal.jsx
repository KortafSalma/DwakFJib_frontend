import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { X, Pill, Mail, Lock, User, ArrowRight, Sparkles, Shield, Heart, MapPin } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useGuest } from '../../context/GuestContext';
import { getFieldErrors } from '../../utils/apiErrorHandler';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const benefits = [
  { icon: Heart, text: 'Reserve medications instantly' },
  { icon: MapPin, text: 'Find nearby pharmacy availability' },
  { icon: Shield, text: 'Track your reservations in real-time' },
];

const AuthRequiredModal = ({ isOpen, onClose, action = 'reservation' }) => {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const { login, register: registerUser } = useAuth();
  const { pendingReservation } = useGuest();

  const actionLabels = {
    reservation: 'complete your reservation',
    favorite: 'save favorites',
    checkout: 'proceed to checkout',
    upload: 'upload certificates',
    track: 'track reservations',
    notify: 'access notifications',
    dashboard: 'access dashboard',
  };

  const label = actionLabels[action] || 'continue';

  const loginForm = useForm({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm({ resolver: zodResolver(registerSchema) });

  const handleLogin = async (data) => {
    setLoading(true);
    setFieldErrors({});
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      onClose(true);
    } catch (err) {
      if (err?.status === 422) {
        const fe = getFieldErrors(err);
        setFieldErrors(fe);
        Object.entries(fe).forEach(([field, msgs]) => {
          loginForm.setError(field, { message: Array.isArray(msgs) ? msgs[0] : msgs });
        });
      } else {
        toast.error(err?.message || 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data) => {
    setLoading(true);
    setFieldErrors({});
    try {
      await registerUser(data);
      toast.success('Account created successfully!');
      onClose(true);
    } catch (err) {
      if (err?.status === 422) {
        const fe = getFieldErrors(err);
        setFieldErrors(fe);
        Object.entries(fe).forEach(([field, msgs]) => {
          registerForm.setError(field, { message: Array.isArray(msgs) ? msgs[0] : msgs });
        });
      } else {
        toast.error(err?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => onClose(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg"
            >
              <div className="relative bg-card/80 backdrop-blur-xl border border-primary/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />

                <button
                  onClick={() => onClose(false)}
                  className="absolute top-4 right-4 z-10 text-contrast-muted hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative p-6 sm:p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 mb-4">
                      <Pill className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gradient">
                      Create your free account
                    </h2>
                    <p className="text-contrast-secondary text-sm mt-2">
                      {pendingReservation
                        ? `Continue to ${label}`
                        : `Create an account to ${label}`}
                    </p>
                  </motion.div>

                  {pendingReservation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-5 p-3 rounded-xl bg-primary/5 border border-primary/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-white">
                            {pendingReservation.medicationName || 'Medication'} at {pendingReservation.pharmacyName || 'pharmacy'}
                          </p>
                          <p className="text-xs text-contrast-secondary">Your selection is saved — sign in to continue</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-1 p-1 rounded-xl bg-dark/50 border border-primary/5 mb-6">
                    <button
                      onClick={() => setMode('login')}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                        mode === 'login'
                          ? 'bg-primary text-dark shadow-glow'
                          : 'text-contrast-secondary hover:text-contrast-primary'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setMode('register')}
                      className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                        mode === 'register'
                          ? 'bg-primary text-dark shadow-glow'
                          : 'text-contrast-secondary hover:text-contrast-primary'
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {mode === 'login' ? (
                      <motion.div
                        key="login"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                          <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                            error={loginForm.formState.errors.email?.message || fieldErrors.email?.[0]}
                            {...loginForm.register('email')}
                          />
                          <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            error={loginForm.formState.errors.password?.message || fieldErrors.password?.[0]}
                            {...loginForm.register('password')}
                          />
                          <Button type="submit" className="w-full" loading={loading}>
                            {!loading && <ArrowRight className="w-4 h-4" />}
                            Sign In
                          </Button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="register"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                          <Input
                            label="Full Name"
                            placeholder="John Doe"
                            icon={User}
                            error={registerForm.formState.errors.name?.message || fieldErrors.name?.[0]}
                            {...registerForm.register('name')}
                          />
                          <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                            error={registerForm.formState.errors.email?.message || fieldErrors.email?.[0]}
                            {...registerForm.register('email')}
                          />
                          <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            error={registerForm.formState.errors.password?.message || fieldErrors.password?.[0]}
                            {...registerForm.register('password')}
                          />
                          <Button type="submit" className="w-full" loading={loading}>
                            {!loading && <ArrowRight className="w-4 h-4" />}
                            Create Free Account
                          </Button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 pt-4 border-t border-primary/10"
                  >
                    <p className="text-xs text-contrast-muted text-center mb-3">Join thousands of users</p>
                    <div className="grid grid-cols-3 gap-2">
                      {benefits.map((b, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 text-center">
                          <b.icon className="w-4 h-4 text-primary" />
                          <span className="text-[10px] text-contrast-muted leading-tight">{b.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthRequiredModal;
