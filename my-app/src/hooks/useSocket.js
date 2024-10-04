// useSocket.js (Cliente de React para Socket.io)
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (options = { withCredentials: false }, serverUrl = "http://localhost:4000") => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Crear una conexión con el backend usando Socket.IO
    const socketIo = io(serverUrl, options);

    // Actualizar el estado de la conexión
    socketIo.on('connect', () => {
      setIsConnected(true);
      console.log('WebSocket conectado.');
    });

    socketIo.on('disconnect', () => {
      setIsConnected(false);
      console.log('WebSocket desconectado');
    });

    // Guardar la instancia del socket en el estado
    setSocket(socketIo);

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl, JSON.stringify(options)]);

  // Función para unirse a un grupo
  const joinGroup = (groupId) => {
    if (socket) {
      socket.emit('join_group', groupId);
      console.log(`Unido al grupo con ID: ${groupId}`);
    }
  };

  // Función para enviar mensajes a un grupo
  const sendMessageToGroup = (groupId, message) => {
    if (socket) {
      socket.emit('send_group_message', { groupId, message });
      console.log(`Mensaje enviado al grupo ${groupId}: ${message}`);
    }
  };

  // Escuchar los mensajes grupales entrantes
  const onReceiveGroupMessage = (callback) => {
    if (socket) {
      socket.on('receive_group_message', (message) => {
        callback(message);
      });
    }
  };

  return { socket, isConnected, joinGroup, sendMessageToGroup, onReceiveGroupMessage };
};

export { useSocket };
