"use client"; // Asegura que este componente se ejecute en el cliente

import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación para envolver la aplicación
export const AuthProvider = ({ children }) => {
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    // Aquí puedes hacer cualquier lógica para obtener el ID de usuario, como llamando a una API.
    const fetchUserId = async () => {
      try {
        const res = await fetch('http://localhost:4000/UserIdGet');
        const data = await res.json();
        setIdUser(data.id);
      } catch (error) {
        console.error("Error al obtener el ID de usuario", error);
      }
    };
    
    fetchUserId();
  }, []);

  return (
    <AuthContext.Provider value={[idUser, setIdUser]}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
