import { useState, useEffect } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatList from '../components/ChatList';
import ChatMessage from '../components/ChatMessage';
function ChatPage() { 
    const [messages, setMessages] = useState([]); 
    const [newMessage, setNewMessage] = useState(''); 
    const [ws, setWs] = useState(null);
    useEffect(() => { const wsUrl = 'ws://localhost:8080';
        const wsOptions = {};
        const socket = new WebSocket(wsUrl, wsOptions); 
        setWs(socket); 
        socket.onmessage = (event) => { 
            console.log(`Received message => ${event.data}`); 
            setMessages((prevMessages) => [...prevMessages, event.data]); 
        } 
        socket.onclose = () => { console.log('WebSocket connection closed')}; 
        socket.onerror = (event) => { console.log('WebSocket error:', event)}; 
    }, []); 
    const handleSendMessage = () => { if (ws) { ws.send(newMessage); setNewMessage('');} }; 
    return ( 
        <div> 
            <ChatHeader /> 
            <ChatList messages={messages} /> 
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." /> 
            <button onClick={handleSendMessage}>Send</button> 
            </div> ); 
} 
export default ChatPage;
