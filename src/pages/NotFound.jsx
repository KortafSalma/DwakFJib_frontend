import ErrorState from '../components/ui/ErrorState';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <ErrorState
        status={404}
        onBack
        actionLabel="Go Home"
        onRetry={() => window.location.href = '/'}
      />
    </div>
  );
};

export default NotFound;
