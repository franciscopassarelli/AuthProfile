// src/components/Login.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa useAuth

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtén la función login del contexto

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      setError('El correo electrónico no está registrado.');
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password !== password) {
      setError('Contraseña incorrecta.');
      return;
    }

    // Si la autenticación es exitosa, actualiza el estado global del usuario
    login(email); // Actualiza el contexto de autenticación

    // Guarda el email en localStorage para persistir la sesión
    localStorage.setItem('userEmail', email);

    // Redirige a la página de perfil
    navigate('/profile');
  };

  // Función para navegar al inicio
  const handleGoBack = () => {
    navigate('/'); // Redirige a la página principal (Home)
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      {/* Botón para volver al inicio */}
      <Button variant="text" onClick={handleGoBack} sx={{ marginBottom: 2 }}>
        Volver al inicio
      </Button>

      <Typography variant="h6">Iniciar sesión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Correo Electrónico"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button type="submit" variant="contained" fullWidth>
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
};

export default Login;
