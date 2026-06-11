import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Users, Building2, Truck, Shield,
  ChevronRight, X, BarChart3, FileText, Monitor,
  Code2, GitBranch, Library
} from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/demo', icon: Home },
  { label: 'Patient Flow', path: '/demo/patient-flow', icon: Users },
  { label: 'Pharmacy Flow', path: '/demo/pharmacy-flow', icon: Building2 },
  { label: 'Distributor Flow', path: '/demo/distributor-flow', icon: Truck },
  { label: 'Admin Flow', path: '/demo/admin-flow', icon: Shield },
  { label: 'Tech Stack', path: '/demo/tech-stack', icon: Code2 },
  { label: 'UML Diagrams', path: '/demo/uml', icon: GitBranch },
  { label: 'Demo Script', path: '/demo/script', icon: Library },
  { label: 'Platform Overview', path: '/demo/platform-overview', icon: FileText },
  { label: 'Architecture', path: '/demo/architecture', icon: BarChart3 },
];

const DemoNavigationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isDemoRoute = location.pathname.startsWith('/demo');

  if (!isDemoRoute) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border transition-all hover:scale-105"
        style={{
          backgroundColor: '#14B8A6',
          borderColor: '#0F766E',
          color: '#FFFFFF'
        }}
        title="Demo Navigation"
      >
        <Monitor className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: 320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-72 z-50 shadow-2xl overflow-y-auto"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <div className="p-4 border-b border-slate-200" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#0F766E] flex items-center justify-center">
                      <Monitor className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-bold" style={{ color: '#0F172A' }}>Demo Navigation</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
                    style={{ color: '#64748B' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'text-white'
                          : 'hover:bg-slate-50'
                      }`}
                      style={isActive ? { backgroundColor: '#14B8A6', color: '#FFFFFF' } : { color: '#475569' }}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-white/20' : 'bg-slate-100'
                      }`}>
                        <Icon className="w-4 h-4" style={isActive ? { color: '#FFFFFF' } : { color: '#14B8A6' }} />
                      </div>
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'opacity-70' : 'opacity-0'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="p-4 border-t border-slate-100">
                <div
                  className="p-3 rounded-xl text-xs"
                  style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                >
                  <p className="font-semibold mb-0.5">Presentation Mode</p>
                  <p className="opacity-80">Navigate through demo flows to present the platform.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DemoNavigationPanel;
