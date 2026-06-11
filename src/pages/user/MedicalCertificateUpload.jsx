import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardSection from '../../components/ui/DashboardSection';
import Card from '../../components/ui/Card';
import UploadZone from '../../components/user/UploadZone';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import { useMedicalCertificates, useUploadMedicalCertificate } from '../../hooks';

const MedicalCertificateUpload = () => {
  const [uploading, setUploading] = useState(false);

  const { data: certificatesData, loading, refetch } = useMedicalCertificates({ page: 1, per_page: 50 });
  const { mutate: uploadCertificate } = useUploadMedicalCertificate({
    successMessage: 'Certificate uploaded successfully',
    onSuccess: () => refetch(),
  });
  const certificates = certificatesData?.data || certificatesData || [];

  const statusConfig = {
    VERIFIED: { color: 'text-primary', bg: 'bg-primary/10', icon: CheckCircle, label: 'Verified' },
    PENDING: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: Clock, label: 'Pending' },
    REJECTED: { color: 'text-red-400', bg: 'bg-red-400/10', icon: Trash2, label: 'Rejected' },
  };

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('issue_date', new Date().toISOString().split('T')[0]);
        await uploadCertificate(formData);
      }
    } catch (err) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Medical Certificates</h1>
          <p className="text-sm text-contrast-secondary">Upload and manage your medical documents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <DashboardSection title="Upload Documents" subtitle="PDF, JPG, PNG up to 5MB">
            <Card>
              <UploadZone onUpload={handleUpload} loading={uploading} />
            </Card>
          </DashboardSection>
        </div>
        <div>
          <DashboardSection title="Uploaded Documents" subtitle={`${certificates.length} files`}>
            <Card>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
                </div>
              ) : certificates.length === 0 ? (
                <EmptyState icon={FileText} title="No documents" description="Upload your medical certificates" />
              ) : (
                <div className="space-y-3">
                  {certificates.map((doc, i) => {
                    const config = statusConfig[doc.status] || statusConfig.PENDING;
                    const StatusIcon = config.icon;
                    return (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-dark/30 border border-primary/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{doc.file_name || 'Document'}</p>
                            <p className="text-[10px] text-contrast-muted">
                              {doc.issue_date ? new Date(doc.issue_date).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${config.bg} ${config.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </Card>
          </DashboardSection>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicalCertificateUpload;
