import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play, CheckCircle,
  Monitor, ArrowRight, Clock
} from 'lucide-react';
import { DemoBadge } from '../../components/demo/DemoBadge';

const presentationSteps = [
  {
    step: 1,
    title: 'Introduction',
    subtitle: 'Platform overview and context',
    desc: 'Start with the Demo Home screen to present the DWAFIJBK platform. Explain the healthcare ecosystem connecting patients, pharmacies, distributors, and administrators.',
    duration: '2 minutes',
    path: '/demo',
    icon: Monitor
  },
  {
    step: 2,
    title: 'Patient Flow',
    subtitle: 'End-to-end patient journey',
    desc: 'Walk through the patient experience: registration, medication search, pharmacy selection, reservation creation, and tracking. Highlight the seamless user experience.',
    duration: '3 minutes',
    path: '/demo/patient-flow',
    icon: Monitor
  },
  {
    step: 3,
    title: 'Pharmacy Flow',
    subtitle: 'Pharmacy operations dashboard',
    desc: 'Demonstrate pharmacy capabilities: inventory management, reservation processing, sales analytics, and distributor ordering. Show real-time stock alerts.',
    duration: '3 minutes',
    path: '/demo/pharmacy-flow',
    icon: Monitor
  },
  {
    step: 4,
    title: 'Distributor Flow',
    subtitle: 'Distribution network management',
    desc: 'Present the distributor interface: order queue, delivery tracking, route optimization, and revenue analytics. Emphasize the logistics capabilities.',
    duration: '2 minutes',
    path: '/demo/distributor-flow',
    icon: Monitor
  },
  {
    step: 5,
    title: 'Admin Flow',
    subtitle: 'Platform administration',
    desc: 'Showcase admin features: user management, pharmacy/distributor approvals, platform analytics, system settings, and audit logs.',
    duration: '3 minutes',
    path: '/demo/admin-flow',
    icon: Monitor
  },
  {
    step: 6,
    title: 'Analytics & Reports',
    subtitle: 'Data-driven insights',
    desc: 'Review platform statistics, system architecture, technology stack, and project metrics. Present the comprehensive analytics dashboard.',
    duration: '2 minutes',
    path: '/demo/statistics',
    icon: Monitor
  },
  {
    step: 7,
    title: 'Conclusion',
    subtitle: 'Summary and Q&A',
    desc: 'Summarize the platform benefits: multi-tenant architecture, role-based access, comprehensive feature set, and modern technology stack. Open for questions.',
    duration: '5 minutes',
    path: '/demo/platform-overview',
    icon: Monitor
  },
];

const DemoScript = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const goToStep = (index) => {
    setCurrentStep(index);
    navigate(presentationSteps[index].path);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <DemoBadge />
          </div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-7 rounded-full" style={{ backgroundColor: '#14B8A6' }} />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: '#0F172A' }}>
              Demo Script Mode
            </h1>
          </div>
          <p className="text-sm ml-4" style={{ color: '#64748B' }}>
            Suggested presentation sequence for platform demonstration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            {presentationSteps.map((step, i) => {
              const isActive = currentStep === i;
              const isDone = i < currentStep;
              return (
                <button
                  key={step.step}
                  onClick={() => goToStep(i)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'text-white shadow-md'
                      : isDone
                      ? 'hover:bg-slate-100'
                      : 'hover:bg-slate-50'
                  }`}
                  style={isActive ? { backgroundColor: '#14B8A6' } : { backgroundColor: '#FFFFFF' }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-white/20' : isDone ? 'bg-emerald-50' : 'bg-slate-100'
                  }`}>
                    {isDone ? (
                      <CheckCircle className="w-4 h-4" style={{ color: '#10B981' }} />
                    ) : (
                      <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {step.step}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? '#FFFFFF' : '#0F172A' }}>
                      {step.title}
                    </p>
                    <p className={`text-[10px] truncate ${isActive ? 'text-white/70' : ''}`} style={{ color: isActive ? undefined : '#94A3B8' }}>
                      {step.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" style={{ color: isActive ? '#FFFFFF' : '#94A3B8' }} />
                    <span className={`text-[10px] ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? undefined : '#94A3B8' }}>
                      {step.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-slate-200 p-6 lg:p-8"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <div className="flex items-center gap-2 mb-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: i <= currentStep ? '#14B8A6' : '#E2E8F0'
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 mb-6">
              <div>
                <p className="text-xs font-medium" style={{ color: '#14B8A6' }}>
                  Step {presentationSteps[currentStep].step} of 7
                </p>
                <h2 className="text-xl font-bold mt-0.5" style={{ color: '#0F172A' }}>
                  {presentationSteps[currentStep].title}
                </h2>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  {presentationSteps[currentStep].subtitle}
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ backgroundColor: '#F8FAFC', color: '#64748B' }}>
                <Clock className="w-3 h-3" />
                {presentationSteps[currentStep].duration}
              </div>
            </div>

            <div
              className="p-4 rounded-xl mb-6"
              style={{ backgroundColor: '#F8FAFC' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                {presentationSteps[currentStep].desc}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(presentationSteps[currentStep].path)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg"
                style={{ backgroundColor: '#14B8A6' }}
              >
                <Play className="w-4 h-4" />
                Open Screen
              </button>

              {currentStep < 6 && (
                <button
                  onClick={() => goToStep(currentStep + 1)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: '#F8FAFC',
                    color: '#475569',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DemoScript;
