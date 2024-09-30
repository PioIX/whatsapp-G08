"use client";

// Importar módulos y estilos necesarios
import styles from "@/app/page.module.css";
import Sidebar from "@/components/Sidebar"; // Asegúrate de que el componente Sidebar está definido
import Title from "@/components/Title"; // Asegúrate de que el componente Title está definido
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; // Importa Socket.io client
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Conectar al servidor Socket.io
const socket = io('http://localhost:4000');

export default function Home() {
  const [messages, setMessages] = useState([]); // Estado para almacenar mensajes
  const [inputMessage, setInputMessage] = useState(''); // Estado para el mensaje de entrada

  useEffect(() => {
    // Escuchar el evento de recibir mensaje
    socket.on('receive_message', (data) => {
      const receivedMessage = {
        ...data,
        sent: false, // Este mensaje fue recibido por otro usuario
      };
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    return () => {
      socket.off('receive_message'); // Limpiar el listener al desmontar
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage) {
      const messageData = {
        avatar: 'ava1-bg.webp', // Cambia esto según el usuario
        message: inputMessage,
        time: new Date().toLocaleTimeString(), // Hora actual
        sent: true, // Este mensaje fue enviado por el usuario
      };
      socket.emit('send_message', messageData); // Envía el mensaje al servidor
      setMessages((prevMessages) => [...prevMessages, messageData]); // Agrega el mensaje al estado
      setInputMessage(''); // Limpia el campo de entrada
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
                      {/* Tu código de búsqueda y lista de chats */}
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
