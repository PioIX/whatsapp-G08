"use client";

import styles from "@/app/page.module.css";
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLogin } from "@/hooks/useLogin"; // Asegúrate de tener esta importación si la necesitas

// Conectar al servidor Socket.io
const socket = io('http://localhost:4000');

export default function Home() {
  const [messages, setMessages] = useState([]); // Estado para almacenar mensajes
  const [inputMessage, setInputMessage] = useState(''); // Estado para el mensaje de entrada
  const [chatList, setChatList] = useState([]); // Estado para la lista de chats
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para el ID del usuario seleccionado
  const [selectedGroupId, setSelectedGroupId] = useState(null); // Estado para el grupo (sala) seleccionado
  const userIdFromCookie = document.cookie.match(/idUser=([^;]*)/)[1]; // ID del usuario logueado

  useEffect(() => {
    console.log(`ID de usuario en Home: ${userIdFromCookie}`); // Para depuración

    if (!userIdFromCookie) {
      console.error("El ID del usuario no está definido.");
      return;
    }

    // Llamar a la API para obtener la lista de chats
    fetch(`http://localhost:4000/get-chats/${userIdFromCookie}`)
      .then(response => response.json())
      .then(data => {
        setChatList(data); // Suponiendo que la respuesta es un array de chats
        console.log('Lista de chats:', data); // Para depuración
      })
      .catch(error => console.error('Error al obtener la lista de chats:', error));

    // Escuchar el evento de recibir mensaje individual
    socket.on('receive_message', (data) => {
      console.log('Mensaje recibido en el cliente: ', data);
      const currentUserId = parseInt(userIdFromCookie, 10);
      const messageReceiverId = parseInt(data.receiverId, 10);
    
      if (messageReceiverId === currentUserId) {
        const receivedMessage = {
          ...data,
          sent: false 
        };
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    });

    // Escuchar mensajes en el grupo seleccionado
    socket.on('receive_group_message', (message) => {
      console.log('Mensaje recibido en el grupo: ', message);
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
      socket.off('receive_group_message');
    };
  }, [userIdFromCookie, selectedUserId, selectedGroupId]);

  // Función para unirse a un grupo (sala)
  const joinGroup = (groupId) => {
    setSelectedGroupId(groupId); // Guardar el ID del grupo seleccionado
    socket.emit('join_group', groupId); // Emitir evento para unirse a la sala del grupo
    setMessages([]); // Limpiar mensajes al cambiar de grupo
  };

  // Función para enviar mensaje a usuario individual
  const sendMessage = () => {
    if (inputMessage && userIdFromCookie && selectedUserId) {
      const messageData = {
        avatar: 'ava1-bg.webp',
        message: inputMessage,
        time: new Date().toLocaleTimeString(),
        sent: true,
        userID: userIdFromCookie,
        receiverId: selectedUserId
      };
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInputMessage('');

      fetch('http://localhost:4000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mensaje: inputMessage,
          Id_usuario: userIdFromCookie,
          idchat: 1, 
          receiverId: selectedUserId
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    } else {
      console.error("El ID del usuario o el mensaje de entrada son inválidos.");
    }
  };

  // Función para enviar mensaje a grupo (sala)
  const sendMessageToGroup = () => {
    if (inputMessage && selectedGroupId) {
      const messageData = {
        groupId: selectedGroupId,
        userId: userIdFromCookie,
        message: inputMessage,
        time: new Date().toLocaleTimeString(),
        sent: true,
      };
      socket.emit('send_group_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInputMessage('');
    } else {
      console.error('El mensaje o el grupo seleccionado son inválidos.');
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
                          {Array.isArray(chatList) && chatList.map((chat) => (
                            <li key={chat.ID_Usuario}>
                              <div
                                className="pt-1"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  if (chat.isGroup == 1) {
                                    joinGroup(chat.ID_Usuario); // Unirse a un grupo si es un chat grupal
                                  } else {
                                    setSelectedUserId(chat.ID_Usuario); // Cambia el usuario seleccionado para chat privado
                                  }
                                  setMessages([]); // Limpia los mensajes al cambiar de chat
                                }}
                              >
                                <p className="fw-bold mb-0">{chat.Nombre}</p>
                              </div>
                            </li>
                          ))}
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
                              style={{ backgroundColor: msg.sent ? '#25D366' : '#F1F0F0', color: msg.sent ? 'white' : 'black' }}>
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
                        onKeyPress={(e) => e.key === 'Enter' && (selectedGroupId ? sendMessageToGroup() : sendMessage())}
                      />
                      <button className="btn btn-primary" onClick={selectedGroupId ? sendMessageToGroup : sendMessage}>
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
