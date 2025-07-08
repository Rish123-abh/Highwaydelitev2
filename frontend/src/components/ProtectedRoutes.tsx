import {jwtDecode} from 'jwt-decode';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" replace />;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      // Token expired
      localStorage.clear();
      return <Navigate to="/" replace />;
    }
  } catch (e) {
    // Invalid token
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute; 