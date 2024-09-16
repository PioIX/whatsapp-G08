"use client"

import { useState } from "react"; 

function LoginPage() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const handleSubmit = (e) => { e.preventDefault(); 
    // Simulate login API call console.log('Login successful!'); // Redirect to chat page window.location.href = '/chat';
    }; 
    return ( 
        <div> 
            <h1>Login</h1> 
            <form onSubmit={handleSubmit}> 
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br /> 
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br /> 
            <button type="submit">Login</button> 
            </form> 
            </div> 
        ); 
    } export default LoginPage;