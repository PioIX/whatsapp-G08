/*
Whatsapp -> chat en tiempo real que permite enviar y recibir mensajes a través de WebSockets. 
- El código utiliza `socket.io-client` para conectar el cliente al servidor de chat.
- hay una lista de chats x los contactos de cada usuario.
- enviar mensajes en tiempo real. Solo se muestran los mensajes donde el receptor coincide con el ID de usuario en el cliente.
*/
"use client";

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLogin } from "@/hooks/useLogin"; // Importa el hook de autenticación si es necesario

// Conectar al servidor Socket.io
const socket = io('http://localhost:4000');

export default function Home() {
  const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes en pantalla
  const [inputMessage, setInputMessage] = useState(''); // Estado para el mensaje escrito por el usuario
  const [chatList, setChatList] = useState([]); // Estado para la lista de chats o contactos del usuario
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para el ID del usuario seleccionado en la lista
  const userIdFromCookie = document.cookie.match(/idUser=([^;]*)/)[1]; // Obtiene el ID de usuario desde la cookie

  useEffect(() => {
    console.log(`ID de usuario en Home: ${userIdFromCookie}`); //depuración

    if (!userIdFromCookie) {
      console.error("El ID del usuario no está definido.");
      return;
    }

    //Obtener lista de chats desde el servidor
    fetch(`http://localhost:4000/get-chats/${userIdFromCookie}`)
      .then(response => response.json())
      .then(data => {
        setChatList(data); //Guarda la lista de chats en el estado
        console.log('Lista de chats:', data); //depuración
      })
      .catch(error => console.error('Error al obtener la lista de chats:', error));

    //Escuchar mensajes entrantes del servidor
    socket.on('receive_message', (data) => {
      console.log('Mensaje recibido en el cliente: ', data); //depuración
    
      //Convierte IDs a números para asegurar la comparación correcta
      const currentUserId = parseInt(userIdFromCookie, 10);
      const messageReceiverId = parseInt(data.receiverId, 10);
    
      //Solo agrega el mensaje si el receiverId coincide con el userId
      if (messageReceiverId === currentUserId) {
        const receivedMessage = {
          ...data,
          sent: false 
        };
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      } else {
        console.log('No se dibuja el mensaje: el receiverId no coincide.');
      }
    });

    return () => {
      socket.off('receive_message'); //Limpia el listener al desmontar
    };
  }, [userIdFromCookie, selectedUserId]); //Ejecuta solo cuando cambian `userIdFromCookie` o `selectedUserId`

  const sendMessage = () => {
    console.log(`Intentando enviar mensaje con ID de usuario: ${userIdFromCookie}`); //depuración
    if (inputMessage && userIdFromCookie && selectedUserId) {
      const messageData = {
        avatar: 'ava1-bg.webp',
        message: inputMessage,
        time: new Date().toLocaleTimeString(),
        sent: true,
        userID: userIdFromCookie, //ID del usuario que envía el mensaje
        receiverId: selectedUserId //ID del usuario que recibe el mensaje
      };
      socket.emit('send_message', messageData); //Envía el mensaje al servidor
      setMessages((prevMessages) => [...prevMessages, messageData]); //Agrega el mensaje al estado
      setInputMessage(''); //Limpia el campo de entrada

      //Envia el mensaje al servidor para guardarlo en la base de datos
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
      console.error("El ID del usuario o el mensaje de entrada son inválidos."); //depuración
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
                      {/* Input para buscar en la lista de chats */}
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
                                  setSelectedUserId(chat.ID_Usuario); // Cambia el usuario seleccionado
                                  setMessages([]); // Limpia los mensajes al cambiar de chat
                                  console.log(`Clicked on ${chat.Nombre}`); //depuración
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
                    {/* Ventana de mensajes */}
                    <div className="pt-3 pe-3" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
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

                    {/* Input para escribir mensajes */}
                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHTQ4hE8DvEq00WWWeHZJxs9IOKteXl60-w&s"
                        alt="avatar"
                        style={{ width: '45px', height: '100%' }}
                      />
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Escriba un mensaje"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') sendMessage();
                        }}
                      />
                      <a className="ms-3" onClick={sendMessage}><i className="fas fa-paper-plane"></i></a>
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