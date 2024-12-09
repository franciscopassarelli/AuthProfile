// src/theme.ts
import { createTheme } from '@mui/material/styles';

// Definimos los colores para el modo claro y oscuro

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Modo oscuro
    primary: {
      main: '#90caf9', // Color azul claro
    },
    secondary: {
      main: '#f48fb1', // Color rosa claro
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light', // Modo claro
    primary: {
      main: '#3f51b5', // Color azul
    },
    secondary: {
      main: '#f50057', // Color rosa
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
});

export { darkTheme, lightTheme };
