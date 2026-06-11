import { motion } from 'framer-motion';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col items-center justify-center py-20 px-4 text-center ${className}`}
    >
      {Icon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-3xl bg-elevated flex items-center justify-center mb-5 shadow-inner"
        >
          <Icon className="w-10 h-10 text-contrast-muted" />
        </motion.div>
      )}
      <h3 className="text-xl font-bold text-contrast-primary mb-1.5">{title}</h3>
      <p className="text-sm text-contrast-secondary max-w-sm mb-6 leading-relaxed">{description}</p>
      {action}
    </motion.div>
  );
};

export default EmptyState;
