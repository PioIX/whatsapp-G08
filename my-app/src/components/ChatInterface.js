"use client"

import React from 'react';
import { useState, useEffect } from 'react';

const ChatInterface = () => { 
    /*
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessage] = useState(''); 
    const [ws, setWs] = useState(null); useEffect(() => { 
        const wsUrl = 'ws://localhost:8080'; const wsOptions = {}; 
        const socket = new WebSocket(wsUrl, wsOptions); 
        setWs(socket); 
        socket.onmessage = (event) => { console.log(`Received message => ${event.data}`); 
        setMessages((prevMessages) => [...prevMessages, event.data]); }; 
        socket.onclose = () => { console.log('WebSocket connection closed');}; 
        socket.onerror = (event) => { console.log('WebSocket error:', event); }; 
    }); 
    const handleSendMessage = () => { if (ws) { ws.send(newMessage); setNewMessage(''); } }; 

    <ul>
    {messages.map((message, index) => ( 
                            <li key={index} className="chat-list-item">
                                {message} </li> ))}
    </ul>

    <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />

    <button onClick={handleSendMessage} />

    */
    return ( 
        <div className="chat-interface"> 
            <header className="chat-header"> 
                <div className="chat-header-left"> 
                <img src="" alt="WhatsApp Logo" className="app-logo" /> 
                </div> 
                <div className="chat-header-right"> 
                <button className="chat-header-button">Menu</button> 
                </div> 
            </header> 
            <main className="chat-main"> 
                <div className="chat-list-container"> 
                    <ul className="chat-list"> 
                    </ul> 
                </div> 
                <div className="chat-input-container"> 
                    <input type="text" className="chat-input" placeholder="Type a message..." /> 
                    <button className="chat-send-button"> Send </button> 
                </div> 
            </main> 
        </div> 
    ); 
}; 

export default ChatInterface;