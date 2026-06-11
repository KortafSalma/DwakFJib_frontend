import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Camera, Barcode, Percent, Pill } from 'lucide-react';
import { pharmacyService } from '../../api/pharmacy';
import toast from 'react-hot-toast';

const categories = [
  'Antibiotiques', 'Antalgiques', 'Cardiologie', 'Respiratoire',
  'Diabète', 'Anti-inflammatoires', 'Gastro', 'Dermatologie',
  'Vitamines', 'Pédiatrie', 'Neurologie', 'Autre',
];

const photoLabels = [
  { key: 'photo_front', label: 'Face avant', icon: Camera },
  { key: 'photo_back', label: 'Face arrière', icon: Camera },
  { key: 'photo_left', label: 'Côté gauche', icon: Camera },
  { key: 'photo_right', label: 'Côté droit', icon: Camera },
  { key: 'photo_top', label: 'Dessus', icon: Camera },
];

const AddMedicationModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: '', generic_name: '', description: '', dosage: '',
    stock: 0, price: 0, category: '', is_derma: false,
    discount_percent: 0, barcode: '', batch_number: '',
    expiry_date: '', low_stock_threshold: 10, requires_prescription: false,
  });
  const [photos, setPhotos] = useState({});
  const [previews, setPreviews] = useState({});
  const [loading, setLoading] = useState(false);
  const fileRefs = useRef({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePhoto = (key, file) => {
    if (file) {
      setPhotos(prev => ({ ...prev, [key]: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPreviews(prev => ({ ...prev, [key]: e.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const generateBarcode = () => {
    const prefix = 'DWF';
    const ts = new Date().toISOString().split('T')[0] + new Date().toISOString().split('T')[1].split('.')[0];
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    setForm(prev => ({ ...prev, barcode: prefix + ts + rand }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== '' && value !== null) {
          formData.append(key, value);
        }
      });

      Object.entries(photos).forEach(([key, file]) => {
        formData.append(key, file);
      });

      const res = await pharmacyService.createMedication(formData);
      toast.success('Médicament ajouté avec succès!');
      onSuccess?.(res.data.data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur lors de l\'ajout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            className="bg-card rounded-2xl border border-elevated shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-elevated sticky top-0 bg-card z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <Pill className="w-5 h-5 text-brand-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-contrast-primary">Ajouter un médicament</h2>
                  <p className="text-xs text-contrast-muted">Prix en MAD (Dirhams Marocains)</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-elevated transition-all">
                <X className="w-5 h-5 text-contrast-secondary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Nom du médicament *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required
                    className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Nom générique</label>
                  <input type="text" name="generic_name" value={form.generic_name} onChange={handleChange}
                    className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Dosage</label>
                  <input type="text" name="dosage" value={form.dosage} onChange={handleChange} placeholder="ex: 500mg"
                    className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Catégorie</label>
                  <select name="category" value={form.category} onChange={handleChange}
                    className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10">
                    <option value="">Sélectionner</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Prix (MAD)</label>
                  <input type="number" name="price" value={form.price} onChange={handleChange} min="0" step="0.01" required
                    className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Stock initial</label>
                  <input type="number" name="stock" value={form.stock} onChange={handleChange} min="0" required
                    className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Seuil d'alerte</label>
                  <input type="number" name="low_stock_threshold" value={form.low_stock_threshold} onChange={handleChange} min="0"
                    className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Date d'expiration</label>
                  <input type="date" name="expiry_date" value={form.expiry_date} onChange={handleChange}
                    className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Lot / Batch</label>
                  <input type="text" name="batch_number" value={form.batch_number} onChange={handleChange}
                    className="w-full h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-contrast-muted mb-1.5">Code-barres</label>
                  <div className="flex gap-2">
                    <input type="text" name="barcode" value={form.barcode} onChange={handleChange}
                      className="flex-1 h-10 px-4 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10" />
                    <button type="button" onClick={generateBarcode}
                      className="px-3 h-10 rounded-xl bg-brand-50 border border-brand-200 text-brand-600 text-xs font-medium hover:bg-brand-100 transition-all">
                      <Barcode className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-contrast-muted mb-1.5">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/10 resize-none" />
              </div>

              <div className="flex items-center gap-6 p-4 rounded-xl bg-elevated border border-elevated">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" name="is_derma" checked={form.is_derma} onChange={handleChange}
                    className="w-4 h-4 rounded border-elevated text-brand-500 focus:ring-brand-500" />
                  <span className="text-sm font-medium text-contrast-primary">Produit Derma (Cosmétique)</span>
                </label>
                {form.is_derma && (
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-brand-500" />
                    <input type="number" name="discount_percent" value={form.discount_percent} onChange={handleChange}
                      min="0" max="100" placeholder="Remise %"
                      className="w-24 h-10 px-3 rounded-xl border border-elevated bg-card text-sm text-contrast-primary outline-none focus:border-brand-500/50" />
                    <span className="text-xs text-contrast-muted">% de réduction</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="requires_prescription" checked={form.requires_prescription} onChange={handleChange}
                    className="w-4 h-4 rounded border-elevated text-brand-500 focus:ring-brand-500" />
                  <span className="text-sm font-medium text-contrast-primary">Nécessite une ordonnance</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-medium text-contrast-muted mb-3">Photos du médicament (tous les côtés)</label>
                <div className="grid grid-cols-5 gap-2">
                  {photoLabels.map(({ key, label, icon: Icon }) => (
                    <div key={key}
                      onClick={() => fileRefs.current[key]?.click()}
                      className="relative aspect-square rounded-xl border-2 border-dashed border-elevated hover:border-brand-500/50 cursor-pointer transition-all overflow-hidden group"
                    >
                      {previews[key] ? (
                        <img src={previews[key]} alt={label} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                          <Icon className="w-5 h-5 text-contrast-muted group-hover:text-brand-500 transition-colors" />
                          <span className="text-[9px] text-contrast-muted text-center px-1">{label}</span>
                        </div>
                      )}
                      <input
                        ref={el => fileRefs.current[key] = el}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handlePhoto(key, e.target.files[0])}
                      />
                      {previews[key] && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setPhotos(p => { const n = {...p}; delete n[key]; return n; }); setPreviews(p => { const n = {...p}; delete n[key]; return n; }); }}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-contrast-muted mt-2">Prenez une photo de chaque côté du médicament</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-elevated">
                <button type="button" onClick={onClose}
                  className="flex-1 h-11 rounded-xl border border-elevated text-sm font-medium text-contrast-secondary hover:bg-elevated transition-all">
                  Annuler
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 h-11 rounded-xl bg-brand-500 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Ajouter le médicament
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddMedicationModal;
