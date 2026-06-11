import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, FileText, Package, Users, ShoppingCart, Pill } from 'lucide-react';

const commands = [
  { id: 'medications', label: 'Browse Medications', icon: Pill, path: '/medications', category: 'Public' },
  { id: 'pharmacies', label: 'Find Pharmacies', icon: Package, path: '/pharmacies', category: 'Public' },
  { id: 'reservations', label: 'My Reservations', icon: ShoppingCart, path: '/user/reservations', category: 'User' },
  { id: 'certificates', label: 'Medical Certificates', icon: FileText, path: '/user/certificates', category: 'User' },
  { id: 'admin-users', label: 'Manage Users', icon: Users, path: '/admin/users', category: 'Admin' },
  { id: 'admin-pharmacies', label: 'Manage Pharmacies', icon: Package, path: '/admin/pharmacies', category: 'Admin' },
];

const SearchCommandBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setQuery('');
    setSelectedIndex(0);
  }, [isOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        window.location.href = filtered[selectedIndex].path;
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl"
          >
            <div className="bg-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <Search className="w-5 h-5 text-contrast-secondary flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, features..."
                  className="flex-1 bg-transparent text-sm text-contrast-primary placeholder:text-contrast-muted focus:outline-none"
                />
                <button
                  onClick={onClose}
                  className="p-1 rounded text-contrast-muted hover:text-contrast-primary hover:bg-elevated transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-contrast-muted text-sm">
                    No results found
                  </div>
                ) : (
                  filtered.map((cmd, i) => (
                    <motion.a
                      key={cmd.id}
                      href={cmd.path}
                      onClick={onClose}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                        i === selectedIndex
                          ? 'bg-primary/10 text-primary'
                          : 'text-contrast-secondary hover:text-contrast-primary hover:bg-elevated'
                      }`}
                    >
                      <cmd.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm flex-1">{cmd.label}</span>
                      <span className="text-[10px] text-contrast-muted">{cmd.category}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    </motion.a>
                  ))
                )}
              </div>

              <div className="flex items-center gap-4 px-4 py-2 border-t border-white/10 text-[10px] text-contrast-muted">
                <span>&uarr;&darr; Navigate</span>
                <span>&crarr; Open</span>
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchCommandBar;
