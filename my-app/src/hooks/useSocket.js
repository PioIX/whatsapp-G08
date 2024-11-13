/*
Este código crea una conexión en tiempo real entre el usuario y un servidor,
como cuando usamos una aplicación de mensajería instantánea. Esta conexión
permite que el usuario reciba mensajes o datos de inmediato, sin necesidad de
recargar la página o solicitar actualizaciones constantemente.

- `useSocket` es una "función especial" que hace más fácil crear y manejar
  esta conexión en cualquier parte de la aplicación.
- La conexión se activa automáticamente cuando abrimos la aplicación y se
  cierra cuando salimos, para evitar problemas o uso innecesario de la red.
- También incluye una manera de saber si estamos conectados o no, lo que puede
  ayudar a mostrar un aviso si la conexión se pierde.

En resumen, este código permite que la aplicación se comunique con el servidor
en tiempo real para obtener actualizaciones al instante, ideal para funciones
como mensajes instantáneos o notificaciones en vivo.
*/

import { useState, useEffect } from 'react'; // Importa herramientas básicas de React para manejar el estado y efectos
import io from 'socket.io-client'; // Importa la librería que permite conectar con el servidor

const useSocket = (options = { withCredentials: false }, serverUrl = "ws://10.1.5.137:4000/") => {
  const [socket, setSocket] = useState(null); // Estado para guardar la conexión
  const [isConnected, setIsConnected] = useState(false); // Estado para indicar si estamos conectados

  useEffect(() => {
    // Esta sección crea la conexión con el servidor
    const socketIo = io(serverUrl, options); // Inicia la conexión con el servidor usando la URL

    // Este evento se activa cuando logramos conectar exitosamente con el servidor
    socketIo.on('connect', () => {
      setIsConnected(true); // Cambia el estado para decir que estamos conectados
      console.log('WebSocket conectado.'); // Mensaje de confirmación en la consola
    });

    // Este evento se activa cuando la conexión se pierde o el servidor se desconecta
    socketIo.on('disconnect', () => {
      setIsConnected(false); // Cambia el estado para decir que ya no estamos conectados
      console.log('WebSocket desconectado'); // Mensaje en la consola indicando que se desconectó
    });

    // Guardamos la conexión en el estado para poder usarla en otros lugares
    setSocket(socketIo);

    // Esta función cierra la conexión automáticamente cuando dejamos de usar la aplicación
    return () => {
      socketIo.disconnect(); // Cierra la conexión con el servidor
    };
  }, [serverUrl, JSON.stringify(options)]); // Vuelve a ejecutar si cambia el servidor o las opciones

  // Retorna el estado de la conexión y la conexión en sí, para que podamos usarlos en otros lugares
  return { socket, isConnected };
};

export { useSocket }; // Permite que este código pueda ser importado y usado en otros archivos
