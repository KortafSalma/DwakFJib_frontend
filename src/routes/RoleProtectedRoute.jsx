import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, hasRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen text="Checking permissions..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!hasRole(allowedRoles)) {
    const role = (user.role || 'user').toLowerCase();
    const redirectPath = `/${role}`;
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default RoleProtectedRoute;
