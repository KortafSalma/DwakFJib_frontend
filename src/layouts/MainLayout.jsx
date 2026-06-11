import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ChatbotFloating from '../components/chatbot/ChatbotFloating';
import OfflineBanner from '../components/common/OfflineBanner';
import useOffline from '../hooks/useOffline';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const MainLayout = () => {
  const location = useLocation();
  const { isOnline, wasOffline } = useOffline();

  return (
    <div className="min-h-screen bg-elevated pb-16 lg:pb-0">
      <OfflineBanner isOnline={isOnline} wasOffline={wasOffline} />
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

      <ChatbotFloating />
    </div>
  );
};

export default MainLayout;
