
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  redirectTo?: string;
}

export default function PrivateRoute({ 
  redirectTo = '/login' 
}: PrivateRouteProps) {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to={redirectTo} />;
}
