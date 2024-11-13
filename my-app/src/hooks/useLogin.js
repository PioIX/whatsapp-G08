/*
función llamada `useLogin` facilita el acceso y la
actualización del ID del usuario en toda la aplicación.

- permite obtener y actualizar el ID del usuario de forma fácil en varios componentes
  de la aplicación.
- utiliza un contexto de autenticación (`AuthContext`) que guarda
  el ID del usuario en una parte central de la aplicación. De esta forma, el
  ID del usuario está disponible y sincronizado en toda la app.

*/

import { useAuth } from "@/app/context/AuthContext"; // Importa el contexto de autenticación

const useLogin = () => {
    // Obtiene el ID del usuario y la función para cambiarlo desde el contexto de autenticación
    const [idUser, setIdUser] = useAuth();

    // Devuelve el ID del usuario y la función para cambiarlo
    return [idUser, setIdUser];
}

export { useLogin }; // Exporta para que pueda ser usado en otros archivos
