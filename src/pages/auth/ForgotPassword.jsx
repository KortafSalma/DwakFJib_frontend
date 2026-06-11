import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, ArrowLeft } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import api from '../../api/axios';

const forgotSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post('/password/forgot', data);
      setSent(true);
      toast.success('Reset link sent to your email');
    } catch (err) {
      toast.error(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-card/60 backdrop-blur-md border border-primary/10 rounded-2xl p-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-sm text-contrast-secondary hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="text-contrast-secondary text-sm mt-1">
              {sent
                ? 'Check your email for the reset link'
                : 'Enter your email to receive a reset link'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              error={errors.email?.message}
              {...register('email')}
            />

            <Button type="submit" className="w-full" loading={loading} disabled={sent}>
              {sent ? 'Link Sent' : 'Send Reset Link'}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
