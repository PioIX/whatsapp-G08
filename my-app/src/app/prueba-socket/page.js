//si es un vector no se usa map, se usa array
"use client";

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSocket } from '@/hooks/useSocket';

export default function Home() {
    const [docente, setDocente] = useState({ nombre: '', apellido: '', materia: '' });
    const [docentesList, setDocentesList] = useState([]); // Lista de docentes recibidos
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if (!socket)
            return;

        socket.on('receive_docente', (data) => {
            console.log('Objeto recibido en el cliente: ', data); // Para depuración
            console.log("Obtuve docentes: ", data);
            setDocentesList(data)
        });
    }, [socket, isConnected])


    // Función para enviar el objeto `docente` al servidor
    const sendDocente = () => {
        if (docente.nombre && docente.apellido && docente.materia) {
            //socket.emit('send_docente', [{nombre: docente.nombre, apellido: docente.apellido, materia: docente.materia}]); // Envía el objeto `docente` al servidor
            socket.emit('send_docente', docente); // Envía el objeto `docente` al servidor
            setDocente({ nombre: '', apellido: '', materia: '' }); // Limpia el formulario después de enviar
        } else {
            console.error("Todos los campos del docente deben estar completos.");
        }
    };


    return (
        <section style={{ backgroundColor: '#075E54' }}>
            <div className="container py-5">
                <h2 className="text-white mb-3">Enviar Datos del Docente</h2>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={docente.nombre}
                        onChange={(e) => setDocente({ ...docente, nombre: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        value={docente.apellido}
                        onChange={(e) => setDocente({ ...docente, apellido: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Materia"
                        value={docente.materia}
                        onChange={(e) => setDocente({ ...docente, materia: e.target.value })}
                        className="form-control mb-2"
                    />
                    <button className="btn btn-primary" onClick={sendDocente}>
                        Enviar Docente
                    </button>
                </div>

                <div className="mt-4">
                    <h3 className="text-white">Lista de Docentes Recibidos</h3>
                    {/* {docentesList.map((docente, index) => ( // el map es como un for y el doc seria el docente y el index es como la i
                        <div key={index} className="text-white">
                            <p>Nombre: {docente.nombre}</p>
                            <p>Apellido: {docente.apellido}</p>
                            <p>Materia: {docente.materia}</p>
                            <hr />
                        </div>
                    ))} */}
                    <div className="text-white">
                        <p>Nombre: {docentesList.nombre}</p>
                        <p>Apellido: {docentesList.apellido}</p>
                        <p>Materia: {docentesList.materia}</p>
                        <hr />
                    </div>
                </div>
            </div>
        </section>
    );
}
