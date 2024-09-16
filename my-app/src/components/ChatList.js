"use client"

import React from 'react'; 
import ChatMessage from './ChatMessage'; 

function ChatList({ messages }) {
  return ( 
    <div> {messages.map((message) => ( <ChatMessage key={message.id} message={message} />))} </div> 
  ); 
} 

export default ChatList;
