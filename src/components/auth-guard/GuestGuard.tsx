import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { type RootState } from '@/core/redux/store';
import { all_routes } from '@/routes/all_routes';

const GuestGuard = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (isAuthenticated) {
    return <Navigate to={all_routes.doctorDashboard} replace />;
  }
  return <Outlet />;
};

export default GuestGuard;