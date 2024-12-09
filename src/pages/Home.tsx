// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container sx={{ textAlign: 'center', paddingTop: 5 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          Bienvenido a AuthProfile
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          ¡Explora nuestras funcionalidades y comienza ahora!
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginRight: 2 }}
          component={Link}
          to="/login"
        >
          Iniciar sesión
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          component={Link}
          to="/signup"
        >
          Registrarse
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
