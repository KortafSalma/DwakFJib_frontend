import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, MonitorSmartphone } from 'lucide-react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const dismissedBefore = localStorage.getItem('pwa-install-dismissed');
    if (dismissedBefore) {
      setDismissed(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => {
        if (!dismissed) {
          setShowBanner(true);
        }
      }, 15000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setDismissed(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [dismissed]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') {
      setShowPrompt(false);
      setShowBanner(false);
      setDismissed(true);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
  }, []);

  const handleShowModal = useCallback(() => {
    setShowPrompt(true);
  }, []);

  if (dismissed) return null;

  return (
    <>
      <AnimatePresence>
        {showBanner && !showPrompt && (
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto"
          >
            <div className="bg-[#1E293B]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14B8A6] to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#14B8A6]/20">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">Installer DWAFIJBK</p>
                  <p className="text-xs text-white/50">Ajoutez à votre écran d'accueil</p>
                </div>
                <button
                  onClick={handleDismiss}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleDismiss}
                  className="flex-1 h-9 rounded-xl border border-white/[0.08] text-white/60 text-xs font-medium hover:bg-white/[0.04] transition-all"
                >
                  Plus tard
                </button>
                <button
                  onClick={handleShowModal}
                  className="flex-1 h-9 rounded-xl bg-gradient-to-r from-[#14B8A6] to-emerald-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all"
                >
                  Installer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPrompt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={handleDismiss}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="w-full max-w-sm bg-[#1E293B]/95 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl shadow-black/40">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#14B8A6] to-emerald-500 flex items-center justify-center shadow-lg shadow-[#14B8A6]/20 mb-5">
                    <MonitorSmartphone className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    Installer l'application
                  </h3>
                  <p className="text-sm text-white/50 mb-6 leading-relaxed">
                    Accédez à DWAFIJBK plus rapidement et utilisez-le même hors ligne.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={handleInstall}
                      className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-emerald-500 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Installer
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="w-full h-10 text-sm text-white/40 hover:text-white/60 transition-colors"
                    >
                      Pas maintenant
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InstallPWA;
