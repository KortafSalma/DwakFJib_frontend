import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Clock, Award, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LogoutModal from './LogoutModal';

const UserDropdown = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const getMenuItems = () => {
    const base = [];
    if (user?.role === 'USER') {
      base.push(
        { icon: User, label: 'Mon profil', path: '/user/profile' },
        { icon: Clock, label: 'Mon historique', path: '/user' },
        { icon: Award, label: 'Programme fidélité', path: '/user#fidelite' },
      );
    } else if (user?.role === 'PHARMACY') {
      base.push(
        { icon: User, label: 'Mon profil', path: '/pharmacy/profile' },
        { icon: Clock, label: 'Mon historique', path: '/pharmacy' },
      );
    } else if (user?.role === 'DISTRIBUTOR') {
      base.push(
        { icon: User, label: 'Mon profil', path: '/distributor/profile' },
        { icon: Clock, label: 'Mon historique', path: '/distributor' },
      );
    } else {
      base.push(
        { icon: User, label: 'Mon profil', path: '/admin/profile' },
      );
    }
    base.push({ icon: Settings, label: 'Paramètres', path: `/${user?.role?.toLowerCase()}/settings` });
    return base;
  };

  const menuItems = getMenuItems();

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-contrast-primary leading-tight">{user?.name}</p>
            <p className="text-[10px] text-contrast-muted uppercase tracking-wider">
              {user?.role === 'USER' ? 'Patient' : user?.role === 'PHARMACY' ? 'Pharmacien' : user?.role === 'DISTRIBUTOR' ? 'Distributeur' : user?.role}
            </p>
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className="absolute right-0 top-full mt-2 w-64 bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-contrast-primary truncate">{user?.name}</p>
                      <p className="text-xs text-contrast-muted truncate">{user?.email}</p>
                    </div>
                  </div>
                  <span className="inline-block mt-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary rounded-full">
                    {user?.role === 'USER' ? 'Patient' : user?.role === 'PHARMACY' ? 'Pharmacien' : user?.role === 'DISTRIBUTOR' ? 'Distributeur' : user?.role}
                  </span>
                </div>

                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { navigate(item.path); setOpen(false); }}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-contrast-secondary hover:text-contrast-primary hover:bg-white/5 transition-all"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="p-2 border-t border-white/10">
                  <button
                    onClick={() => { setOpen(false); setShowLogout(true); }}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
    </>
  );
};

export default UserDropdown;
