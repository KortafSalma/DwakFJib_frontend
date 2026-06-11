import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import TopNavbar from '../components/layout/TopNavbar';
import MobileNav from '../components/layout/MobileNav';
import ChatbotFloating from '../components/chatbot/ChatbotFloating';
import OfflineBanner from '../components/common/OfflineBanner';
import useOffline from '../hooks/useOffline';

const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { isOnline, wasOffline } = useOffline();

  return (
    <div className="min-h-screen bg-body">
      <OfflineBanner isOnline={isOnline} wasOffline={wasOffline} />

      <div className="hidden lg:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      <MobileNav />

      <TopNavbar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} sidebarCollapsed={sidebarCollapsed} />

      <main
        className="pt-16 pb-20 lg:pb-0 min-h-screen transition-all duration-300"
        style={{ paddingLeft: sidebarCollapsed ? 72 : 256 }}
      >
        <div className="p-4 lg:p-6">
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
        </div>
      </main>

      <ChatbotFloating />
    </div>
  );
};

export default DashboardLayout;
