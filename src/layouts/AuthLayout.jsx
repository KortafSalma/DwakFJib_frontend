import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill, LogOut, User, Menu, X, Search, MapPin, Map,
  Heart, Bell, LayoutDashboard, ShoppingCart,
  Info, LogIn, UserPlus, ChevronDown, LifeBuoy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useGuest } from '../context/GuestContext';
import ThemeToggle from '../components/layout/ThemeToggle';
import AuthRequiredModal from '../components/guest/AuthRequiredModal';
import GuestNavigationBanner from '../components/guest/GuestNavigationBanner';
import ChatbotFloating from '../components/chatbot/ChatbotFloating';
import OfflineBanner from '../components/common/OfflineBanner';
import useOffline from '../hooks/useOffline';

const publicLinks = [
  { label: 'Search Medicines', path: '/search', icon: Search },
  { label: 'Nearby Pharmacies', path: '/pharmacies', icon: MapPin },
  { label: 'Explore Map', path: '/maps', icon: Map },
  { label: 'About', path: '/about', icon: Info },
  { label: 'Support', path: '/support', icon: LifeBuoy },
];

const authUserLinks = [
  { label: 'Dashboard', path: '/user', icon: LayoutDashboard },
  { label: 'Reservations', path: '/user/reservations', icon: ShoppingCart },
  { label: 'Favorites', path: '/user/favorites', icon: Heart },
  { label: 'Notifications', path: '/user/notifications', icon: Bell },
];

const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const AuthLayout = () => {
  const { user, logout } = useAuth();
  const { pendingReservation } = useGuest();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { isOnline, wasOffline } = useOffline();

  const navLinks = user ? authUserLinks : publicLinks;
  const rolePrefix = user?.role ? `/${user.role.toLowerCase()}` : '';

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <OfflineBanner isOnline={isOnline} wasOffline={wasOffline} />

      {!user && showBanner && (
        <GuestNavigationBanner
          onDismiss={() => setShowBanner(false)}
          onSignIn={() => setShowAuthModal(true)}
        />
      )}

      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0F766E] flex items-center justify-center shadow-sm">
                <Pill className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800">
                DwakFJib
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                      ? 'text-[#14B8A6] bg-[#14B8A6]/10'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <div className="hidden md:flex items-center gap-2">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-sm font-medium text-[#14B8A6] hover:bg-[#14B8A6]/20 transition-all"
                    >
                      <User className="w-4 h-4" />
                      <span className="max-w-[100px] truncate">{user.name}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl z-50"
                        >
                          <Link
                            to={rolePrefix}
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <Link
                            to={`${rolePrefix}/profile`}
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </Link>
                          <Link
                            to={`${rolePrefix}/notifications`}
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                          >
                            <Bell className="w-4 h-4" />
                            Notifications
                          </Link>
                          <hr className="border-slate-100" />
                          <button
                            onClick={() => { logout(); setShowUserMenu(false); }}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-1.5 px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors font-medium"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all"
                    >
                      <UserPlus className="w-4 h-4" />
                      Get Started
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-slate-400 hover:text-slate-600 p-2"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-200 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      location.pathname === link.path
                        ? 'text-[#14B8A6] bg-[#14B8A6]/10'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-slate-100 px-4 py-3">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to={`/${user.role.toLowerCase()}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#14B8A6] bg-[#14B8A6]/10"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#14B8A6]/20 text-[#14B8A6] text-sm font-medium hover:bg-[#14B8A6]/5 transition-all"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-semibold shadow-sm"
                    >
                      <UserPlus className="w-4 h-4" />
                      Get Started
                    </Link>
                    {pendingReservation && (
                      <button
                        onClick={() => { setShowAuthModal(true); setMobileOpen(false); }}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-amber-600"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Complete pending reservation
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className={`${!user && showBanner ? 'pt-24' : 'pt-16'} pb-20 lg:pb-0`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        action="reservation"
      />

      <ChatbotFloating />
    </div>
  );
};

export default AuthLayout;
