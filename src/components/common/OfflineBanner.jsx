import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

const OfflineBanner = ({ isOnline, wasOffline }) => {
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-red-500/90 backdrop-blur-md text-white text-center py-2.5 px-4"
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <WifiOff className="w-4 h-4" />
            <span>Aucune connexion internet. Certaines fonctionnalités peuvent être limitées.</span>
          </div>
        </motion.div>
      )}
      {isOnline && wasOffline && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-emerald-500/90 backdrop-blur-md text-white text-center py-2.5 px-4"
        >
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Wifi className="w-4 h-4" />
            <span>Connexion rétablie. Vous êtes de nouveau en ligne.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;
