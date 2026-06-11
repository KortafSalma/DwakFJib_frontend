import { Component } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-sm w-full bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 text-center shadow-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 mx-auto rounded-3xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-400/20 flex items-center justify-center mb-4"
            >
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </motion.div>

            <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-2">Une erreur est survenue</h2>
            <p className="text-sm text-slate-400 dark:text-white/50 mb-6 leading-relaxed">
              Une erreur inattendue s'est produite. Veuillez réessayer ou revenir à l'accueil.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/[0.08] text-sm font-medium text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all min-h-[44px]"
              >
                <Home className="w-4 h-4" />
                Accueil
              </button>
              <button
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-emerald-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
