import { motion } from 'framer-motion';

const InventoryHeatmap = ({ data = [] }) => {
  const categories = data.length > 0 ? data : [
    { category: 'Antibiotics', inStock: 45, lowStock: 8, outOfStock: 2 },
    { category: 'Pain Relief', inStock: 38, lowStock: 5, outOfStock: 1 },
    { category: 'Cardiology', inStock: 22, lowStock: 3, outOfStock: 0 },
    { category: 'Diabetes', inStock: 30, lowStock: 6, outOfStock: 1 },
    { category: 'Vitamins', inStock: 52, lowStock: 4, outOfStock: 0 },
    { category: 'Respiratory', inStock: 18, lowStock: 7, outOfStock: 3 },
    { category: 'Dermatology', inStock: 25, lowStock: 2, outOfStock: 0 },
    { category: 'Neurology', inStock: 15, lowStock: 4, outOfStock: 2 },
  ];

  const maxTotal = Math.max(...categories.map((c) => c.inStock + c.lowStock + c.outOfStock));

  return (
    <div className="space-y-3">
      {categories.map((cat, i) => {
        const total = cat.inStock + cat.lowStock + cat.outOfStock;
        return (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{cat.category}</span>
              <span className="text-contrast-muted">{total} items</span>
            </div>
            <div className="flex gap-0.5 h-3 rounded-full overflow-hidden bg-dark/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(cat.inStock / maxTotal) * 100}%` }}
                transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                className="bg-primary/60"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(cat.lowStock / maxTotal) * 100}%` }}
                transition={{ delay: i * 0.05 + 0.3, duration: 0.5 }}
                className="bg-yellow-400/60"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(cat.outOfStock / maxTotal) * 100}%` }}
                transition={{ delay: i * 0.05 + 0.4, duration: 0.5 }}
                className="bg-red-400/60"
              />
            </div>
          </motion.div>
        );
      })}
      <div className="flex items-center gap-4 pt-2 text-[10px] text-contrast-muted">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary/60" /> In Stock</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400/60" /> Low Stock</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400/60" /> Out of Stock</span>
      </div>
    </div>
  );
};

export default InventoryHeatmap;
