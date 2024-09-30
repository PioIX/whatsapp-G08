/*
"use client"

import { createContext, useContext, useState } from "react";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [idUser, setIdUser] = useState('defaultId'); // O un valor inicial que tengas

    return (
        <AuthContext.Provider value={[idUser, setIdUser]}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
*/