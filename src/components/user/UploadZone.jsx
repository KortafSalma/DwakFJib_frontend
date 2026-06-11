import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

const UploadZone = ({ acceptedTypes = ['.pdf', '.jpg', '.png'], maxSize = 5 }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter((f) => {
      const ext = '.' + f.name.split('.').pop().toLowerCase();
      return acceptedTypes.includes(ext) && f.size <= maxSize * 1024 * 1024;
    });
    setFiles((prev) => [...prev, ...validFiles.map((f) => ({ file: f, name: f.name, size: (f.size / 1024 / 1024).toFixed(2), status: 'uploading' }))]);
    setTimeout(() => {
      setFiles((prev) => prev.map((f) => ({ ...f, status: 'complete' })));
    }, 1500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging ? 'border-primary bg-primary/5' : 'border-primary/20 hover:border-primary/30'
        }`}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => handleFiles(Array.from(e.target.files))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <motion.div animate={{ scale: isDragging ? 1.1 : 1 }} className="pointer-events-none">
          <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-medium mb-1">Drop your files here or click to browse</p>
          <p className="text-[10px] text-contrast-muted">PDF, JPG, PNG up to {maxSize}MB</p>
        </motion.div>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
            {files.map((file, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-between p-3 rounded-lg bg-dark/30 border border-primary/5"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    file.status === 'complete' ? 'bg-primary/10' : 'bg-yellow-400/10'
                  }`}>
                    {file.status === 'complete' ? (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    ) : (
                      <FileText className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-[10px] text-contrast-muted">{file.size}MB</p>
                  </div>
                </div>
                <button onClick={() => removeFile(i)} className="p-1 rounded hover:bg-white/5">
                  <X className="w-4 h-4 text-contrast-muted" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadZone;
