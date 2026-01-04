import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await register({ name, email, password });
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="container auth-wrapper">
            <h1>Register</h1>
            <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
                {error && <p style={{ color: '#ff4757', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="todo-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="todo-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="todo-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="add-btn" style={{ width: '100%', borderRadius: '8px' }}>
                        Register
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '15px', color: '#b3b3b3' }}>
                    Already have an account? <Link to="/login" style={{ color: '#00d2ff' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
