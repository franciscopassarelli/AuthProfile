// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    // Verificar si el token está presente y tiene el formato adecuado (un JWT tiene 3 partes separadas por puntos)
    if (!token || token.split('.').length !== 3) {
      navigate('/login'); // Redirigir al login si el token no es válido
      return;
    }

    try {
      // Decodificar el payload (segunda parte del token) usando atob() y parsear el JSON
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser(decodedToken.username); // Asumir que el token tiene un campo "username"
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      navigate('/login'); // Redirigir al login si hay un error al decodificar
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div>
      <h1>Bienvenido, {user}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
