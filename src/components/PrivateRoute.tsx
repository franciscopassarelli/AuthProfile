// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth(); // Ahora accedemos también a `loading`

  // Mientras se carga el estado de autenticación, mostramos un loading (puedes personalizar esto)
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si el usuario está autenticado, renderizamos los hijos (la página protegida)
  if (user) {
    return <>{children}</>;
  }

  // Si el usuario no está autenticado, redirigimos al login
  return <Navigate to="/login" />;
};

export default PrivateRoute;
