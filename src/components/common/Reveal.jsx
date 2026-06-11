import { motion } from 'framer-motion';

const Reveal = ({ children, className, delay = 0, y = 20, duration = 0.5, once = true }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: '-60px' }}
    transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;
