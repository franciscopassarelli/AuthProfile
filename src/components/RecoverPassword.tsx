// src/components/RecoverPassword.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const RecoverPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes simular la lógica para enviar un correo de recuperación.
    setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6">Recuperar Contraseña</Typography>
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
        <Button type="submit" variant="contained" fullWidth>
          Enviar enlace de recuperación
        </Button>
      </form>
      {message && <Typography color="success.main">{message}</Typography>}
    </Box>
  );
};

export default RecoverPassword;
