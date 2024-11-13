/*
back --> npm install express socket.io
front --> npm install socket.io-client


*/



/*
componente de React que permite a los usuarios interactuar con un servidor en tiempo real 
a través de WebSockets, mostrando la ruta '/ranking/users'.

- Conexión en tiempo real: usa WebSockets (con ayuda del hook `useSocket`) 
   para recibir y enviar mensajes al servidor.
- El usuario puede escribir y enviar mensajes que se envían
   directamente al servidor.
- Un botón permite al usuario unirse o crear una sala de 
   chat en el servidor.

*/

"use client";
import Button from "@/components/button"; //importa el componente de botón 
import { useSocket } from "@/hooks/useSocket"; // Hook personalizado para la conexión WebSocket
import { useEffect, useState } from "react"; // Hooks de React para manejar efectos y estado

export default function UsersRanking() {
    // Usa el hook `useSocket` para obtener el socket y saber si está conectado
    const { socket, isConected } = useSocket();
    const [message, setMassege] = useState(""); // Estado para almacenar el mensaje que el usuario escribe

    useEffect(() => {
        // Verifica si el socket está disponible antes de establecer los eventos para evitar errores
        if (!socket) return;

        // Configura un listener para recibir el evento 'pingAll' desde el servidor
        socket.on('pingAll', (data) => {
            console.log("Mensaje recibido", data); // Muestra el mensaje recibido en la consola
        });

        // Configura un listener para recibir el evento 'newMessage' desde el servidor
        socket.on('newMessage', (data) => {
            console.log("Mensaje de la sala", data); // Muestra el mensaje recibido en la consola
        });

    }, [socket, isConected]); // Solo ejecuta cuando `socket` o `isConected` cambian

    // Función para enviar un mensaje de "ping" al servidor
    function handleClick() {
        socket.emit('pingAll', { message: "holaa" }); // Envía el mensaje "holaa" a todos los usuarios
    }

    // Función para enviar el mensaje que el usuario escribió en el input
    function handleSendMessage() {
        socket.emit('sendMessage', { message: message }); // Envía el mensaje del estado al servidor
    }

    // Función para actualizar el estado del mensaje mientras el usuario escribe
    function handleChangeInput(event) {
        setMassege(event.target.value); // Actualiza el estado `message` con el texto del input
    }

    // Renderiza la interfaz con botones e inputs para interactuar
    return (
        <>
            <h1>soy la ruta /ranking/users</h1>
            <Button onClick={handleClick} text="enviar pingall"></Button>
            <Button onClick={() => socket.emit('joinRoom', { room: "pepito" })} text="Conectar / Unirse a la sala"></Button>
            <input onChange={handleChangeInput} placeholder="Type a message..."></input>
            <Button onClick={handleSendMessage} text="Enviar Mensaje"></Button>
        </>
    );
}
