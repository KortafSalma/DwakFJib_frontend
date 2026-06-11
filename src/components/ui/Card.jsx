import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = true,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={`bg-card rounded-2xl border border-subtle shadow-card transition-all ${
        hover ? 'hover:shadow-card-hover hover:border-subtle hover:shadow-[#14B8A6]/5 cursor-pointer' : ''
      } ${padding ? 'p-5' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
