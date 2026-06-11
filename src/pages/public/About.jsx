import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Heart, Users, Globe, Sparkles, ArrowRight, Pill, MapPin, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';

const stats = [
  { icon: Users, value: '10K+', label: 'Active Users' },
  { icon: MapPin, value: '500+', label: 'Partner Pharmacies' },
  { icon: Pill, value: '50K+', label: 'Medications Listed' },
  { icon: Clock, value: '99.9%', label: 'Uptime' },
];

const values = [
  { icon: Shield, title: 'Trust & Safety', desc: 'All pharmacies are verified and licensed. Your health data is encrypted and secure.' },
  { icon: Heart, title: 'Patient First', desc: 'We prioritize patient needs with transparent pricing and easy medication access.' },
  { icon: Users, title: 'Community Driven', desc: 'Built for patients, pharmacists, and healthcare providers to work together.' },
  { icon: Globe, title: 'Universal Access', desc: 'Making healthcare accessible to everyone, everywhere, at any time.' },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-dark to-secondary/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">About DwakFJib</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Transforming <span className="text-gradient">Healthcare Access</span>
            </h1>
            <p className="text-lg text-contrast-secondary max-w-2xl mx-auto">
              We're on a mission to make medication management seamless, transparent, and accessible for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl bg-card/60 border border-primary/10"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
              <p className="text-xs text-contrast-secondary mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card/60 border border-primary/5 hover:border-primary/20 transition-all"
            >
              <v.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-contrast-secondary">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-dark to-secondary/10 border border-primary/10 p-8 sm:p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-contrast-secondary mb-6 max-w-lg mx-auto">
            Join thousands of users who trust DwakFJib for their medication needs. No account needed to browse.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" icon={ArrowRight}>Get Started Free</Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" size="lg">Browse Medications</Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
