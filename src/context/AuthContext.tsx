// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
  loading: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Sincronización con localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('userEmail');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // Esto marca el fin de la carga
  }, []);

  const login = (username: string) => {
    setUser(username);
    localStorage.setItem('userEmail', username); // Guardamos el usuario en localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userEmail'); // Eliminamos el usuario de localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
