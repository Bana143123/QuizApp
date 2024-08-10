import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            console.log('Sending login request with:', { username, password }); // Debugging log

            const response = await axios.post('http://localhost:8081/login', { username, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response); // Debugging log
            if (response.status === 200) {
                onLogin();  
                alert("Login Successful"); // Notify successful login
            }
        } catch (error) {
            // Log detailed error information
            console.error('Login error:', error.response ? error.response.data : error.message);
            setError('Invalid credentials'); // Set error message to be displayed
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>} {/* Display error message */}
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
