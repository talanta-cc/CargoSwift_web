import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, element: Component, ...rest }) => {
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
