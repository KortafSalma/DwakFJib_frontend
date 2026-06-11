import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { DemoBadge, DemoDataBadge } from './DemoBadge';

const StepGrid = ({ steps, gridCols }) => (
  <div
    className="grid grid-cols-1 gap-3 mb-8"
    style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
  >
    {steps.map((step, i) => (
      <motion.div
        key={step.num}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + i * 0.05 }}
        className="flex items-center gap-2"
      >
        <div
          className="flex-1 p-3 rounded-xl text-center"
          style={{ backgroundColor: '#FFFFFF', border: `1px solid ${step.color}20` }}
        >
          <p className="text-xs font-bold" style={{ color: step.color }}>Step {step.num}</p>
          <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#0F172A' }}>{step.title}</p>
        </div>
        {i < steps.length - 1 && (
          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 hidden lg:block" style={{ color: '#CBD5E1' }} />
        )}
      </motion.div>
    ))}
  </div>
);

const CardStep = ({ step, i, navigate, buttonLabel }) => {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + i * 0.08 }}
      className="rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all duration-300"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${step.color}12`, color: step.color }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white" style={{ backgroundColor: step.color }}>
              Step {step.num}
            </span>
            <h3 className="text-base font-bold" style={{ color: '#0F172A' }}>{step.title}</h3>
          </div>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>{step.desc}</p>
          <button
            onClick={() => navigate(step.path)}
            className="flex items-center gap-1.5 mt-3 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{
              backgroundColor: `${step.color}10`,
              color: step.color,
              border: `1px solid ${step.color}20`
            }}
          >
            <span>{buttonLabel} {step.title}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const CardSteps = ({ steps, navigate, buttonLabel }) => (
  <div className="space-y-5">
    {steps.map((step, i) => <CardStep key={step.num} step={step} i={i} navigate={navigate} buttonLabel={buttonLabel} />)}
  </div>
);

const VerticalStep = ({ step, i, steps, navigate, buttonLabel }) => {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + i * 0.08 }}
    >
      <div className="flex items-stretch gap-4 lg:gap-6">
        <div className="hidden lg:flex flex-col items-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: step.color, color: '#FFFFFF' }}
          >
            <Icon className="w-6 h-6" />
          </div>
          {i < steps.length - 1 && (
            <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: '#E2E8F0' }} />
          )}
        </div>
        <div
          className="flex-1 rounded-2xl border border-slate-200 p-5 lg:p-6 hover:shadow-lg transition-all duration-300"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center lg:hidden flex-shrink-0"
              style={{ backgroundColor: `${step.color}15`, color: step.color }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-white" style={{ backgroundColor: step.color }}>
                  Step {step.num}
                </span>
                <h3 className="text-base font-bold" style={{ color: '#0F172A' }}>{step.title}</h3>
              </div>
              <p className="text-sm mt-1" style={{ color: '#64748B' }}>{step.desc}</p>
              <button
                onClick={() => navigate(step.path)}
                className="flex items-center gap-1.5 mt-3 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{
                  backgroundColor: `${step.color}10`,
                  color: step.color,
                  border: `1px solid ${step.color}20`
                }}
              >
                <span>{buttonLabel} {step.title}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VerticalSteps = ({ steps, navigate, buttonLabel }) => (
  <div className="space-y-5">
    {steps.map((step, i) => <VerticalStep key={step.num} step={step} i={i} steps={steps} navigate={navigate} buttonLabel={buttonLabel} />)}
  </div>
);

const TimelineStep = ({ step, i, navigate, buttonLabel }) => {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + i * 0.08 }}
    >
      <div className="flex items-stretch gap-4 lg:gap-6">
        <div className="hidden lg:flex flex-col items-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: step.color, color: '#FFFFFF' }}
          >
            <Icon className="w-7 h-7" />
          </div>
        </div>
        <div
          className="flex-1 rounded-2xl border border-slate-200 p-5 lg:p-6 hover:shadow-lg transition-all duration-300"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center lg:hidden flex-shrink-0"
              style={{ backgroundColor: `${step.color}15`, color: step.color }}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold" style={{ backgroundColor: step.color, color: '#FFFFFF' }}>
                  Step {step.num}
                </span>
                <h3 className="text-base font-bold" style={{ color: '#0F172A' }}>{step.title}</h3>
              </div>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: '#64748B' }}>{step.desc}</p>
              <button
                onClick={() => navigate(step.path)}
                className="flex items-center gap-1.5 mt-3 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:shadow-sm"
                style={{
                  backgroundColor: `${step.color}10`,
                  color: step.color,
                  border: `1px solid ${step.color}20`
                }}
              >
                <span>{buttonLabel}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineSteps = ({ steps, navigate, buttonLabel }) => (
  <div className="relative">
    <div className="absolute left-8 top-0 bottom-0 w-0.5 hidden lg:block" style={{ backgroundColor: '#E2E8F0' }} />
    <div className="space-y-6">
      {steps.map((step, i) => <TimelineStep key={step.num} step={step} i={i} navigate={navigate} buttonLabel={buttonLabel} />)}
    </div>
  </div>
);

const DemoFlowLayout = ({
  accentColor,
  title,
  subtitle,
  steps,
  showStepGrid = false,
  gridCols = 5,
  variant = 'card',
  buttonLabel = 'Open',
  footer
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <DemoBadge />
            <DemoDataBadge />
          </div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-7 rounded-full" style={{ backgroundColor: accentColor }} />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: '#0F172A' }}>{title}</h1>
          </div>
          <p className="text-sm ml-4" style={{ color: '#64748B' }}>{subtitle}</p>
        </motion.div>

        {showStepGrid && <StepGrid steps={steps} gridCols={gridCols} />}

        {variant === 'card' && <CardSteps steps={steps} navigate={navigate} buttonLabel={buttonLabel} />}
        {variant === 'vertical' && <VerticalSteps steps={steps} navigate={navigate} buttonLabel={buttonLabel} />}
        {variant === 'timeline' && <TimelineSteps steps={steps} navigate={navigate} buttonLabel={buttonLabel} />}

        {footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border p-5"
            style={{
              backgroundColor: footer.bg || '#E6FCF9',
              borderColor: footer.borderColor || 'rgba(20,184,166,0.2)'
            }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" style={{ color: footer.iconColor || '#14B8A6' }} />
              <p className="text-sm font-medium" style={{ color: footer.textColor || '#0F766E' }}>
                {footer.text}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DemoFlowLayout;
