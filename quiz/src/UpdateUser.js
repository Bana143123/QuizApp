import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        try {
            const response = await axios.put('http://127.0.0.1:8081/update', {
                username,
                new_password: newPassword,
            });
            if (response.status === 200) {
                setMessage('Password updated successfully!');
            }
        } catch (error) {
            setMessage('Error updating password: ' + error.response.data.message);
        }
    };

    return (
        <div className="update-container">
            <h2>Update Password</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleUpdate}>Update Password</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default UpdateUser;
