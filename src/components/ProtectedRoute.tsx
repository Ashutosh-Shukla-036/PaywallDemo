import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../store/authAtom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const auth = useRecoilValue(authAtom);
  const location = useLocation();

  if (requireAuth && !auth.isAuthenticated) {
    // Redirect to sign in page with return URL
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};