import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

const PagePlaceholder = ({ title, description, actionLabel, actionPath }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <Construction className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">{title}</h2>
        <p className="text-sm text-slate-400 mb-6">{description}</p>
        <button
          onClick={() => navigate(actionPath || -1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#14B8A6] to-[#0F766E] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#14B8A6]/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          {actionLabel || 'Go Back'}
        </button>
      </motion.div>
    </div>
  );
};

export default PagePlaceholder;
