"use client"
import Button from "@/components/button";
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";


export default function UsersRanking() {
    const { socket, isConected } = useSocket();
    const [message, setMassege] = useState("")

    useEffect(() => {
        //evistar errores si no hay socket
        if(!socket) return;

        socket.on('pingAll', (data) => {
            console.log("Mensaje recibido", data);
        });

        socket.on('newMessage', (data) => {
            console.log("Mensaje de la sala", data);
        });

    }, [socket, isConected]);

    function handleClick() {
        socket.emit('pingAll', {message: "Putooooo"})
    }

    function handleSendMessage() {
        socket.emit('sendMessage', {message: message});
    }

    function handleChangeInput(event) {
        setMassege(event.target.value);
    }
    //
    return(
        <>
        <h1>soy la ruta /ranking/users</h1>
        <Button onClick={handleClick} text="enviar pingall"></Button>        
        <Button onClick={() => socket.emit('joinRoom', {room: "pepito"})} text="Conectar / Unirse a la sala"></Button>
        <input onChange={handleChangeInput} placeholder="Type a message..."></input>
        <Button onClick={handleSendMessage} text="Enviar Mensaje"></Button>
        </>
        
    )

}