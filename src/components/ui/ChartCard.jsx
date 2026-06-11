import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ChartCard = ({ title, subtitle, children, footer, collapsible = false, className = '' }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-5 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {collapsible && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </motion.button>
        )}
      </div>

      <motion.div
        animate={{ height: collapsed ? 0 : 'auto', opacity: collapsed ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-5 pt-0">{children}</div>
      </motion.div>

      {footer && (
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 text-slate-500 text-sm">
          {footer}
        </div>
      )}
    </div>
  );
};

export default ChartCard;
