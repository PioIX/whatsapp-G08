"use client"; // Asegura que este componente se ejecute en el cliente (útil en entornos como Next.js)

// Importación de React y los hooks necesarios
import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

/* 
  El componente `AuthProvider` sirve para envolver toda la aplicación o secciones que necesitan
  acceder a la información de autenticación (como el ID de usuario). Aquí es donde se define el estado del usuario
  y la lógica para obtener su ID desde una API.
*/
export const AuthProvider = ({ children }) => {
  const [idUser, setIdUser] = useState(null); // Creamos un estado para almacenar el ID de usuario

  useEffect(() => {
    // Esta función `fetchUserId` se ejecuta solo una vez al cargar la página
    // y obtiene el ID del usuario desde un endpoint en el servidor
    const fetchUserId = async () => {
      try {
        // Llama a la API para obtener el ID de usuario
        const res = await fetch('http://localhost:4000/UserIdGet');
        const data = await res.json();
        setIdUser(data.id); // Guarda el ID de usuario en el estado
      } catch (error) {
        console.error("Error al obtener el ID de usuario", error); // Muestra errores en la consola si falla
      }
    };
    
    fetchUserId(); // Llamada a la función de obtención de ID al cargar el componente
  }, []); // El array vacío asegura que solo se ejecuta al inicio

  return (
    // Aquí envolvemos `children` (es decir, otros componentes) en el contexto de autenticación.
    // `value` contiene el ID del usuario y la función para actualizarlo, y estará disponible para los componentes hijos.
    <AuthContext.Provider value={[idUser, setIdUser]}>
      {children}
    </AuthContext.Provider>
  );
};

/* 
  `useAuth` es un hook personalizado que facilita el uso del contexto de autenticación.
  En lugar de acceder directamente al contexto, los componentes pueden usar este hook para
  obtener el ID de usuario (`idUser`) y la función para actualizarlo (`setIdUser`) más fácilmente.
*/
export const useAuth = () => useContext(AuthContext);
