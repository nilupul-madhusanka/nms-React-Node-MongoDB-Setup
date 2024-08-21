import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './login.css';  // Import the CSS file

function Login() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', loginData);
            navigate('/dashboard', { state: { message: 'Login successful!' } });
        } catch (error) {
            console.error('Invalid email or password!', error);
        }
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {location.state?.message && <p>{location.state.message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            <button onClick={navigateToRegister}>Register</button>
        </div>
    );
}

export default Login;
