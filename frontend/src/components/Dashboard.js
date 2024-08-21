import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';  // Import the CSS file

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login', { state: { message: 'Logged out successfully!' } });
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
