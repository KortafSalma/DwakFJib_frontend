import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill,
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  Truck,
  BarChart3,
  ScrollText,
  Shield,
  AlertTriangle,
  Pill as MedicationIcon,
  TrendingUp,
  ClipboardList,
  MapPin,
  DollarSign,
  Search,
  Heart,
  User,
  Upload,
  Globe,
  Navigation,
  AlertCircle,
  Activity,
  Zap,
  LifeBuoy,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ collapsed }) => {
  const { user, hasRole } = useAuth();
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState({});

  const getNavItems = () => {
    const groups = [];

    if (hasRole('ADMIN')) {
      groups.push({
        label: 'Overview',
        items: [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        ],
      });
      groups.push({
        label: 'Management',
        items: [
          { icon: Users, label: 'Users', path: '/admin/users' },
          { icon: Package, label: 'Pharmacies', path: '/admin/pharmacies' },
          { icon: Truck, label: 'Distributors', path: '/admin/distributors' },
        ],
      });
      groups.push({
        label: 'Security',
        items: [
          { icon: Shield, label: 'Security & Monitoring', path: '/admin/logs' },
        ],
      });
      groups.push({
        label: 'Analytics',
        items: [
          { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
        ],
      });
      groups.push({
        label: 'Monitoring',
        items: [
          { icon: Activity, label: 'Activity Feed', path: '/notifications/activity' },
          { icon: AlertTriangle, label: 'Alerts', path: '/notifications/alerts' },
          { icon: Zap, label: 'Realtime', path: '/notifications/realtime' },
        ],
      });
      groups.push({
        label: 'Communication',
        items: [
          { icon: MessageSquare, label: 'Messages', path: '/messages' },
        ],
      });
      groups.push({
        label: 'System',
        items: [
          { icon: Settings, label: 'Settings', path: '/admin/settings' },
          { icon: LifeBuoy, label: 'Help Center', path: '/support' },
        ],
      });
    }

    if (hasRole('PHARMACY')) {
      groups.push({
        label: 'Overview',
        items: [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/pharmacy' },
        ],
      });
      groups.push({
        label: 'Inventory',
        items: [
          { icon: Package, label: 'Inventory', path: '/pharmacy/inventory' },
          { icon: MedicationIcon, label: 'Medications', path: '/pharmacy/inventory/details' },
          { icon: BarChart3, label: 'Advanced', path: '/pharmacy/inventory/advanced' },
          { icon: AlertTriangle, label: 'Stock Alerts', path: '/pharmacy/alerts' },
        ],
      });
      groups.push({
        label: 'Operations',
        items: [
          { icon: ShoppingCart, label: 'Reservations', path: '/pharmacy/reservations' },
          { icon: ClipboardList, label: 'Orders', path: '/pharmacy/orders' },
          { icon: Heart, label: 'Loyal Patients', path: '/pharmacy/loyal-patients' },
        ],
      });
      groups.push({
        label: 'Analytics',
        items: [
          { icon: TrendingUp, label: 'Sales', path: '/pharmacy/analytics' },
        ],
      });
      groups.push({
        label: 'Communication',
        items: [
          { icon: MessageSquare, label: 'Messages', path: '/messages' },
        ],
      });
      groups.push({
        label: 'System',
        items: [
          { icon: Settings, label: 'Settings', path: '/pharmacy/settings' },
          { icon: LifeBuoy, label: 'Help Center', path: '/support' },
        ],
      });
    }

    if (hasRole('DISTRIBUTOR')) {
      groups.push({
        label: 'Overview',
        items: [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/distributor' },
        ],
      });
      groups.push({
        label: 'Logistics',
        items: [
          { icon: Truck, label: 'Shipments', path: '/distributor/shipments' },
          { icon: MapPin, label: 'Tracking', path: '/distributor/tracking' },
          { icon: ShoppingCart, label: 'Orders', path: '/distributor/orders' },
          { icon: ClipboardList, label: 'Reservations', path: '/distributor/reservations' },
        ],
      });
      groups.push({
        label: 'Planning',
        items: [
          { icon: MapPin, label: 'Routes', path: '/distributor/routes' },
        ],
      });
      groups.push({
        label: 'Analytics',
        items: [
          { icon: DollarSign, label: 'Revenue', path: '/distributor/revenue' },
          { icon: BarChart3, label: 'Analytics', path: '/distributor/analytics' },
        ],
      });
      groups.push({
        label: 'Communication',
        items: [
          { icon: MessageSquare, label: 'Messages', path: '/messages' },
        ],
      });
      groups.push({
        label: 'System',
        items: [
          { icon: Settings, label: 'Settings', path: '/distributor/settings' },
          { icon: LifeBuoy, label: 'Help Center', path: '/support' },
        ],
      });
    }

    if (hasRole('USER')) {
      groups.push({
        label: 'Overview',
        items: [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/user' },
        ],
      });
      groups.push({
        label: 'Discover',
        items: [
          { icon: Search, label: 'Search Meds', path: '/user/search' },
          { icon: MapPin, label: 'Pharmacies', path: '/user/pharmacies' },
          { icon: Heart, label: 'Favorites', path: '/user/favorites' },
        ],
      });
      groups.push({
        label: 'Maps',
        items: [
          { icon: Globe, label: 'Nearby', path: '/maps/nearby' },
          { icon: Navigation, label: 'Delivery Tracking', path: '/maps/tracking' },
          { icon: Navigation, label: 'Locator', path: '/maps/locator' },
          { icon: AlertCircle, label: 'Emergency', path: '/maps/emergency' },
        ],
      });
      groups.push({
        label: 'My Health',
        items: [
          { icon: ShoppingCart, label: 'Reservations', path: '/user/reservations' },
          { icon: Upload, label: 'Certificates', path: '/user/certificates' },
        ],
      });
      groups.push({
        label: 'Communication',
        items: [
          { icon: MessageSquare, label: 'Messages', path: '/messages' },
        ],
      });
      groups.push({
        label: 'Account',
        items: [
          { icon: Bell, label: 'Notifications', path: '/user/notifications' },
          { icon: User, label: 'Profile', path: '/user/profile' },
          { icon: LifeBuoy, label: 'Help Center', path: '/support' },
        ],
      });
    }

    return groups;
  };

  const navGroups = useMemo(() => getNavItems(), [user]);

  const toggleGroup = (label) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  useEffect(() => {
    let changed = false;
    const next = { ...expandedGroups };
    navGroups.forEach((group) => {
      const hasActive = group.items.some((item) => location.pathname === item.path);
      if (hasActive && !next[group.label]) {
        next[group.label] = true;
        changed = true;
      }
    });
    if (changed) {
      setExpandedGroups(next);
    }
  }, [location.pathname, navGroups]);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-card/80 backdrop-blur-xl border-r border-subtle z-40 flex flex-col"
    >
      <div className="flex items-center gap-3 p-4 border-b border-subtle">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0"
        >
          <Pill className="w-5 h-5 text-white" />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap"
            >
              DwakFJib
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-2">
            {!collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-contrast-muted hover:text-contrast-secondary transition-colors"
              >
                {group.label}
                {group.items.length > 1 && (
                  expandedGroups[group.label] ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )
                )}
              </button>
            )}

            <AnimatePresence>
              {(!collapsed || expandedGroups[group.label] || group.items.length === 1) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-0.5 overflow-hidden"
                >
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                          isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-contrast-secondary hover:text-contrast-primary hover:bg-elevated'
                        }`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-sm font-medium whitespace-nowrap"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-r-full"
                          />
                        )}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-subtle">
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-primary">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-medium text-contrast-primary truncate">{user?.name}</p>
                <p className="text-[10px] text-contrast-muted uppercase tracking-wider">{user?.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
