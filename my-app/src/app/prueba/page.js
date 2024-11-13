"use client"
import React, { useEffect, useState } from "react";
import Docente from "@/components/Docente";
import Clase from "@/components/Clase";
import { useSocket } from "@/hooks/useSocket";

export default function Prueba() {
    const [docentes, setDocentes] = useState([]); // Cambié el nombre a "docentes" para mayor claridad
    const [horario, setHorario] = useState([]); // Solo un horario, ya que solo queremos el primero
    const [apellidoDocente, setApellidoDocente] = useState(""); // Estado para el input
    const {socket, isConnected} = useSocket();

    // Función para obtener el listado de docentes
    useEffect(() => {
        const obtenerListado = async () => {
            try {
                const response = await fetch(`http://localhost:4000/docentes`);
                if (!response.ok) throw new Error("Error en la respuesta del servidor");
                const data = await response.json();
                setDocentes(data); 
                console.log('Lista de docentes:', data); // Para depuración
            } catch (error) {
                console.error('Error al obtener la lista de docentes:', error);
            }
        };
        obtenerListado();
    }, []);

    useEffect(() => {
        if (!socket)
            return;

        socket.on('receive_docente', (data) => {
            console.log('Objeto recibido en el cliente: ', data); // Para depuración
            // Convertir IDs a números para asegurar la comparación correcta
            const nombrerecive = data.nombre;
            const apellidorecive = data.apellido;   
            const materiarecive = data.materia;
        });
    }, [socket, isConnected])

    // Función para buscar el horario del docente
    const buscarHorario = () => {
        fetch(`http://localhost:4000/cursos?docente=${apellidoDocente}`)
            .then(response => {
                if (!response.ok) throw new Error("Error en la respuesta del servidor");
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    setHorario(data[0]); // Solo muestra el primer horario
                } else {
                    console.log("No se encontraron horarios para el docente:", apellidoDocente);
                    setHorario(null); // Si no hay horario, establece null
                }
            })
            .catch(error => console.error('Error al buscar el horario del docente:', error));
    };
    function ponerApellido(event){
        const valor = event.target.value;
        setApellidoDocente(valor); // Actualiza el valor localmente.
      }
      
      
        // Solo agregar el mensaje si el receiverId coincide con el userId
        /*if (messageReceiverId === currentUserId) {
          const receivedMessage = {
            ...data,
            sent: false 
          };
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        } else {
          console.log('No se dibuja el mensaje: el receiverId no coincide.');
        }*/
  
    return (
        <>
            <h1>Prueba</h1>

            {
        docentes.map(docente => (
            <Docente id={docente.id} nombre={docente.nombre} apellido={docente.apellido} materia={docente.materia}/>
          ))
    }

            <input type="text" placeholder="Apellido" onChange={ponerApellido}></input>
            <button onClick={buscarHorario}>Buscar Horarios de: {apellidoDocente}</button>
            <p>Apellido del Docente: {apellidoDocente}</p>

    { 
        horario.length > 0 &&
          <Clase id={horario[0].id} inicio={horario[0].inicio} fin={horario[0].fin} aula={horario[0].aula}/>
          
    }

        </>
    );
}
