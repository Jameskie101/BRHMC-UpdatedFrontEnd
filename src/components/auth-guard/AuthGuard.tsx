import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { type RootState } from '@/core/redux/store';

interface AuthGuardProps {
  requiredRoleLevel?: number; // minimum role level required (0 = highest privilege)
  redirectTo?: string;
}

const AuthGuard = ({ requiredRoleLevel = 0, redirectTo = '/login' }: AuthGuardProps) => {
  const { isAuthenticated, roleLevel } = useSelector((state: RootState) => state.auth);
  console.log('AuthGuard - isAuthenticated:', isAuthenticated, 'roleLevel:', roleLevel);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // roleLevel lower or equal to requiredRoleLevel means access granted up for modification before production
  if (requiredRoleLevel !== undefined && roleLevel !== null && roleLevel > requiredRoleLevel) {
    return <Navigate to="/unauthorized" replace />;
  }
  

  return <Outlet />;
};

export default AuthGuard;