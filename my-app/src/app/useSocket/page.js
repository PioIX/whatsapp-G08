"use client"
import { useSocket } from "@/hooks/useSocket";
import { useEffect } from "react";


export default function UsersRanking() {
    const { socket, isConected } = useSocket();

    useEffect(() => {

    }, [socket, isConected]);

    return(
        <h1>soy la ruta /ranking/users</h1>
    )

}