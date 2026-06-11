import { motion } from 'framer-motion';
import { Plus, Minus, Crosshair, Layers } from 'lucide-react';

const FloatingMapControls = ({ onZoomIn, onZoomOut, onLocate, onLayers }) => {
  const controls = [
    { icon: Plus, label: 'Zoom In', action: onZoomIn },
    { icon: Minus, label: 'Zoom Out', action: onZoomOut },
    { icon: Crosshair, label: 'My Location', action: onLocate },
    { icon: Layers, label: 'Layers', action: onLayers },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 right-4 z-[1000] flex flex-col gap-2"
    >
      {controls.map((control) => (
        <motion.button
          key={control.label}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={control.action}
          className="w-10 h-10 rounded-xl bg-card/95 backdrop-blur-md border border-primary/10 flex items-center justify-center text-contrast-secondary hover:text-contrast-primary hover:border-primary/20 transition-all shadow-lg"
          title={control.label}
        >
          <control.icon className="w-4 h-4" />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default FloatingMapControls;
