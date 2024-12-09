// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

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
    <Container sx={{ textAlign: 'center', paddingTop: 4 }}>
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido, {user}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          ¡Aquí tienes acceso a tu dashboard!
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleLogout} 
          sx={{ padding: '10px 20px', fontSize: '1rem' }}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
