"use client";

import styles from "@/app/page.module.css";
import Sidebar from "@/components/Sidebar"; 
import Title from "@/components/Title"; 
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLogin } from "@/hooks/useLogin";

// Conectar al servidor Socket.io
const socket = io('http://localhost:4000');

export default function Home() {
  const [messages, setMessages] = useState([]); // Estado para almacenar mensajes
  const [inputMessage, setInputMessage] = useState(''); // Estado para el mensaje de entrada
  //const [idUser, setIdUser] = useLogin(); // Obtener idUser desde el hook useLogin
  const idUser = document.cookie.match(/idUser=([^;]*)/)[1];

  useEffect(() => {
    console.log(`ID de usuario en Home: ${idUser}`); // Para depuración

    if (!idUser) {
      console.error("El ID del usuario no está definido.");
      return; // Puedes retornar un mensaje de carga o redirigir
    }

    // Escuchar el evento de recibir mensaje
    socket.on('receive_message', (data) => {
      console.log('Mensaje recibido en el cliente: ', data); // Para depuración
      const receivedMessage = {
        ...data,
        sent: data.userID === idUser // Marcar como enviado si es del usuario actual
      };
      if (!receivedMessage.sent) { // Check if sent is false
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    });

    return () => {
      socket.off('receive_message'); // Limpiar el listener al desmontar
    };
  }, [idUser]);

  const sendMessage = () => {
    console.log(`Intentando enviar mensaje con ID de usuario: ${idUser}`); // Para depuración
    if (inputMessage && idUser) { // Asegúrate de que idUser esté definido
      const messageData = {
        avatar: 'ava1-bg.webp',
        message: inputMessage,
        time: new Date().toLocaleTimeString(),
        sent: true,
        userID: idUser // Esto debería ser un valor válido
      };
      socket.emit('send_message', messageData); // Envía el mensaje al servidor
      setMessages((prevMessages) => [...prevMessages, messageData]); // Agrega el mensaje al estado
      setInputMessage(''); // Limpia el campo de entrada
  
      // Envía una solicitud al servidor para guardar el mensaje en la base de datos
      fetch('http://localhost:4000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mensaje: inputMessage
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    } else {
      console.error("El ID del usuario o el mensaje de entrada son inválidos."); // Para depuración
    }
  };

  return (
    <section style={{ backgroundColor: '#075E54' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card" id="chat3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                    <div className="p-3">
                      <div className="input-group rounded mb-3">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                        <span className="input-group-text border-0" id="search-addon">
                          <i className="fas fa-search"></i>
                        </span>
                      </div>
                      <div style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                        <ul className="list-unstyled mb-0">
                          {/* Lista de chats aquí... */}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-7 col-xl-8">
                    <div className="pt-3 pe-3" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                      {/* Muestra los mensajes */}
                      {messages.map((msg, index) => (
                        <div className={`d-flex flex-row justify-content-${msg.sent ? 'end' : 'start'}`} key={index}>
                          {!msg.sent && (
                            <img
                              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbLmNIT4bdP5jJ9WCOGGAXFtFXH2uXKzedyQ&s`}
                              alt="avatar"
                              style={{ width: '45px', height: '100%' }}
                            />
                          )}
                          <div>
                            <p className={`small p-2 ${msg.sent ? 'me-3' : 'ms-3'} mb-1 rounded-3`}
                              style={{ backgroundColor: msg.sent ? '#25D366' : '#F1F0F0', color: msg.sent ? 'white' : 'black' }}
                            >
                              {msg.message}
                            </p>
                            <p className={`small ${msg.sent ? 'me-3' : 'ms-3'} mb-3 rounded-3 text-muted`}>{msg.time}</p>
                          </div>
                          {msg.sent && (
                            <img
                              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHTQ4hE8DvEq00WWWeHZJxs9IOKteXl60-w&s`}
                              alt="avatar"
                              style={{ width: '45px', height: '100%' }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHTQ4hE8DvEq00WWWeHZJxs9IOKteXl60-w&s"
                        alt="avatar"
                        style={{ width: '45px', height: '100%' }}
                      />
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Escribe un mensaje..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      />
                      <button className="btn btn-primary" onClick={sendMessage}>
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}