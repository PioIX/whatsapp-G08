"use client"
import Button from "@/components/button";
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";


export default function UsersRanking() {
    const { socket, isConected } = useSocket();

    useEffect(() => {
        //evistar errores si no hay socket
        if(!socket) return;

        socket.on('pingAll', (data) => {
            console.log("me llego el evento ping all", data);
        });

    }, [socket, isConected]);

    function handleClick() {
        socket.emit('pingAll', {message: "Hola desde weSockets! Ana y So"})
    }

    return(
        <>
        <h1>soy la ruta /ranking/users</h1>
        <Button onClick={handleClick} text="enviar pingall"></Button>
        </>
        
    )

}