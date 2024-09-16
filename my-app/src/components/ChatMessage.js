"use client"

import React from 'react'; 
function ChatMessage({ message }) {
    return ( 
        <div> 
            <span>{message.sender}: </span> 
            <span>{message.text}</span> 
        </div> 
    ); 
} 

export default ChatMessage;