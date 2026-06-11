import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Search, Pill, MessageSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from '../common/UserDropdown';
import SearchCommandBar from './SearchCommandBar';
import { messagingService } from '../../api';

const TopNavbar = ({ onToggleSidebar, sidebarCollapsed }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const pollRef = useRef(null);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await messagingService.getUnreadCount();
        setUnreadMessages(res.data?.unread_count ?? 0);
      } catch {
        // ignore
      }
    };
    fetchUnread();
    pollRef.current = setInterval(fetchUnread, 15000);
    return () => clearInterval(pollRef.current);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 z-30 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-body/90 backdrop-blur-xl border-subtle'
            : 'bg-body/0 border-transparent'
        }`}
        style={{ left: sidebarCollapsed ? 72 : 256 }}
      >
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <Pill className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-contrast-primary hidden sm:block">DwakFJib</span>
            </Link>
            <button
              onClick={onToggleSidebar}
              className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg text-contrast-secondary hover:text-contrast-primary hover:bg-elevated transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-elevated/50 border border-subtle text-sm text-contrast-secondary hover:text-contrast-primary hover:border-muted/30 transition-all w-64"
            >
              <Search className="w-4 h-4" />
               <span className="hidden sm:inline">Rechercher...</span>
              <div className="ml-auto hidden sm:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-elevated rounded border border-subtle">⌘</kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] bg-elevated rounded border border-subtle">K</kbd>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/messages"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-contrast-secondary hover:text-contrast-primary hover:bg-elevated transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadMessages > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadMessages > 9 ? '9+' : unreadMessages}
                </span>
              )}
            </Link>
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>
      </motion.header>

      <SearchCommandBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default TopNavbar;
