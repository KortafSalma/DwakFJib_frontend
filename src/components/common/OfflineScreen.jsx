import { motion } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';

const OfflineScreen = ({ onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#0B1220] to-[#0F172A]"
    >
      <div className="relative max-w-sm w-full text-center">
        <div className="absolute inset-0 bg-[#14B8A6]/5 rounded-[32px] blur-3xl" />

        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 mx-auto rounded-[24px] bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl flex items-center justify-center mb-6"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center">
              <WifiOff className="w-6 h-6 text-red-400" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-xl font-bold text-white mb-2"
          >
            Vous êtes actuellement hors ligne
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-sm text-white/50 mb-8 leading-relaxed"
          >
            Vérifiez votre connexion internet pour continuer à utiliser DWAFIJBK.
            Certaines données mises en cache sont toujours disponibles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="space-y-3"
          >
            <button
              onClick={onRetry}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-emerald-500 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              Réessayer
            </button>

            <p className="text-xs text-white/30">
              Les données consultées récemment restent accessibles hors ligne
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OfflineScreen;
