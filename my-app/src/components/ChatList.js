import React from 'react';

const ChatList = () => {
  // Aquí puedes manejar el estado de los chats y la lógica asociada
  const chats = [
    { id: 1, name: 'Chat 1', lastMessage: 'Hola' },
    { id: 2, name: 'Chat 2', lastMessage: '¿Cómo estás?' },
    // Añadir más chats aquí
  ];

  return (
    <ul className="chat-list">
      {chats.map(chat => (
        <li key={chat.id} className="chat-item">
          <div className="chat-info">
            <h3>{chat.name}</h3>
            <p>{chat.lastMessage}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
