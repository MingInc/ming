import { useAuth } from '@/hooks';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?:ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login', children }) => {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
