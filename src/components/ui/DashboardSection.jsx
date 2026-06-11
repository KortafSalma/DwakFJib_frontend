import { motion } from 'framer-motion';

const DashboardSection = ({ title, description, action, children, className = '' }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 rounded-full bg-gradient-to-b from-[#14B8A6] to-[#0F766E]" />
          <div>
            <h2 className="text-lg font-bold text-contrast-primary">{title}</h2>
            {description && <p className="text-sm text-contrast-secondary mt-0.5">{description}</p>}
          </div>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </motion.section>
  );
};

export default DashboardSection;
