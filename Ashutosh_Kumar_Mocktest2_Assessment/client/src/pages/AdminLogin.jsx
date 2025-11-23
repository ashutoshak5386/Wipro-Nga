import React, { useState, useRef } from 'react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const passwordRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = passwordRef.current.value;
        console.log('Login Submitted:', { username, password });
        alert(`Username: ${username}\nPassword: ${password}`);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '300px' }}>
            <h2>ShopNow Admin Portal</h2>
            <p>Staff Login</p>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username (Controlled):</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password (Uncontrolled):</label>
                    <input
                        type="password"
                        ref={passwordRef}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '8px 16px' }}>Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
