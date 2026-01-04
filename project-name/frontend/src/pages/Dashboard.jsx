import React, { useContext } from 'react';
import TodoList from '../components/TodoList';
import AuthContext from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="container auth-wrapper">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <p style={{ color: '#b3b3b3' }}>Welcome, <span style={{ color: '#00d2ff', fontWeight: 'bold' }}>{user?.name}</span></p>
                <button
                    onClick={logout}
                    className="filter-btn"
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', borderColor: '#ff4757', color: '#ff4757' }}
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>
            <TodoList />
        </div>
    );
};

export default Dashboard;
