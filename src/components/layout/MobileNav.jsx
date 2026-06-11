import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  MapPin,
  ShoppingCart,
  Bell,
  User,
  Pill,
  Package,
  Home,
  Settings,
  Heart,
  Truck,
  BarChart3,
  ClipboardList,
  AlertTriangle,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MobileNav = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const getTabs = () => {
    if (!user) {
      return [
        { icon: Home, label: 'Accueil', path: '/' },
        { icon: Search, label: 'Recherche', path: '/search' },
        { icon: MapPin, label: 'Pharmacies', path: '/pharmacies' },
        { icon: Pill, label: 'Médicaments', path: '/medications' },
        { icon: User, label: 'Compte', path: '/login' },
      ];
    }

    const role = user.role?.toLowerCase();

    switch (role) {
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
          { icon: Package, label: 'Pharmacies', path: '/admin/pharmacies' },
          { icon: Truck, label: 'Distributeurs', path: '/admin/distributors' },
          { icon: Bell, label: 'Alertes', path: '/notifications/alerts' },
          { icon: User, label: 'Profil', path: '/admin/profile' },
        ];
      case 'pharmacy':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/pharmacy' },
          { icon: Package, label: 'Stock', path: '/pharmacy/inventory' },
          { icon: ShoppingCart, label: 'Réservations', path: '/pharmacy/reservations' },
          { icon: Bell, label: 'Alertes', path: '/pharmacy/alerts' },
          { icon: User, label: 'Profil', path: '/pharmacy/profile' },
        ];
      case 'distributor':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/distributor' },
          { icon: Truck, label: 'Livraisons', path: '/distributor/shipments' },
          { icon: ClipboardList, label: 'Commandes', path: '/distributor/orders' },
          { icon: BarChart3, label: 'Revenus', path: '/distributor/revenue' },
          { icon: User, label: 'Profil', path: '/distributor/profile' },
        ];
      default:
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/user' },
          { icon: Search, label: 'Recherche', path: '/user/search' },
          { icon: ShoppingCart, label: 'Réservations', path: '/user/reservations' },
          { icon: Heart, label: 'Favoris', path: '/user/favorites' },
          { icon: User, label: 'Profil', path: '/user/profile' },
        ];
    }
  };

  const tabs = getTabs();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="bg-white/90 dark:bg-[#1E293B]/95 backdrop-blur-2xl border-t border-slate-200 dark:border-white/[0.06]">
          <div className="flex items-center justify-around h-16 px-2">
            {tabs.map((tab) => {
              const active = isActive(tab.path);
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className="relative flex flex-col items-center justify-center gap-0.5 min-w-[48px] min-h-[44px] px-2 py-1 rounded-xl transition-all duration-200"
                >
                  {active && (
                    <motion.div
                      layoutId="mobileTabIndicator"
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[#14B8A6]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className={`relative flex items-center justify-center w-6 h-6 transition-colors duration-200 ${
                    active ? 'text-[#14B8A6]' : 'text-slate-400 dark:text-white/40'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-medium leading-tight transition-colors duration-200 ${
                    active ? 'text-[#14B8A6]' : 'text-slate-400 dark:text-white/40'
                  }`}>
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {showMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setShowMenu(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1E293B] rounded-t-3xl border-t border-slate-200 dark:border-white/[0.06] pb-[env(safe-area-inset-bottom)]"
              >
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-white/[0.12]" />
                </div>
                <div className="px-4 pb-6">
                  {user && (
                    <div className="flex items-center gap-3 p-3 mb-2 rounded-2xl bg-slate-50 dark:bg-white/[0.04]">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14B8A6]/20 to-emerald-500/20 border border-[#14B8A6]/30 flex items-center justify-center">
                        <span className="text-sm font-bold text-[#14B8A6]">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 dark:text-white/40 truncate">{user.email}</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <Link
                      to={user ? `/${user.role?.toLowerCase()}/settings` : '/login'}
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all"
                    >
                      <Settings className="w-5 h-5" />
                      Paramètres
                    </Link>
                    <Link
                      to="/support"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all"
                    >
                      <AlertTriangle className="w-5 h-5" />
                      Aide & Support
                    </Link>
                    {user && (
                      <button
                        onClick={() => { logout(); setShowMenu(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        Déconnexion
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <button
        onClick={() => setShowMenu(true)}
        className="lg:hidden fixed right-4 bottom-20 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-[#14B8A6] to-emerald-500 text-white shadow-lg shadow-[#14B8A6]/20 flex items-center justify-center hover:shadow-xl hover:shadow-[#14B8A6]/30 transition-all duration-300 active:scale-95"
        aria-label="More options"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
    </>
  );
};

export default MobileNav;
