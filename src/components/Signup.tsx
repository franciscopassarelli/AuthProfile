import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Expresiones regulares para validaciones
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // Al menos una mayúscula, una minúscula y un número, 6 caracteres mínimo

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!passwordRegex.test(password)) {
      setError('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Verificar si el usuario ya está registrado (en este caso guardamos solo el email y la contraseña)
    const storedUser = localStorage.getItem(email);

    if (storedUser) {
      setError('El usuario ya está registrado.');
      return;
    }

    // Crear el objeto de usuario
    const newUser = { email, password };

    // Guardar el usuario en el localStorage usando el email como clave
    localStorage.setItem(email, JSON.stringify(newUser));

    // Redirigir al login
    navigate('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para navegar al inicio
  const handleGoBack = () => {
    navigate('/'); // Redirigir al home o página principal
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      {/* Botón para volver al inicio */}
      <Button variant="text" onClick={handleGoBack} sx={{ marginBottom: 2 }}>
        Volver al inicio
      </Button>

      <Typography variant="h6">Registrarse</Typography>
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
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Confirmar Contraseña"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {error && <Typography color="error">{error}</Typography>}

        {/* Botón para mostrar/ocultar la contraseña */}
        <Button variant="text" onClick={togglePasswordVisibility} sx={{ marginBottom: 2 }}>
          {showPassword ? 'Ocultar Contraseña' : 'Mostrar Contraseña'}
        </Button>

        <Button type="submit" variant="contained" fullWidth>
          Registrarse
        </Button>
      </form>

      {/* Enlace para recuperación de contraseña */}
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        <Link href="/forgot-password" underline="hover">
          ¿Olvidaste tu contraseña?
        </Link>
      </Typography>
    </Box>
  );
};

export default Signup;
