import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: RootState) => state.loginReducer.isLoggedIn);

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
