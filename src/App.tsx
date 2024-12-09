// src/App.tsx
import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage'; // Importa la nueva página de presentación
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Aplicamos el tema correspondiente dependiendo del estado de darkMode
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode((prevMode) => !prevMode); // Cambiar entre modo oscuro y claro
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Aplica el fondo y el tema global */}
        
        <Router>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
              AuthProfile
              </Typography>
              
              {/* Interruptor de modo oscuro */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="dark mode toggle"
                onClick={handleThemeToggle}
                sx={{ ml: 1 }}
              >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Toolbar>
          </AppBar>

          <Box sx={{ padding: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* Ruta protegida para ProfilePage */}
              <Route path="/profile" 
                     element={
                       <PrivateRoute>
                         <ProfilePage /> {/* Nueva página de presentación */}
                       </PrivateRoute>
                     }
              />
              {/* Ruta protegida para Dashboard */}
              <Route path="/dashboard" 
                     element={
                       <PrivateRoute>
                         <Dashboard />
                       </PrivateRoute>
                     } 
              />
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
