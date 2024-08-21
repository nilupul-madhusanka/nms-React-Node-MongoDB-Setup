import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './login.css';  // Import the CSS file

function Login() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!loginData.email || !loginData.password) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login', loginData);
            navigate('/dashboard', { state: { message: 'Login successful!' } });
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {location.state?.message && <p>{location.state.message}</p>}
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            <button className="secondary-button" onClick={navigateToRegister}>Register</button>
        </div>
    );
}

export default Login;
