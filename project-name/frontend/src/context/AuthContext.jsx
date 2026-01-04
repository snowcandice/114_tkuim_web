import React, { createContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false); // Can check token validity here on mount

    useEffect(() => {
        if (token) {
            // Ideally call a /me endpoint here to get user data
            // For now, we trust the token or just set a flag
            // Let's decode or just set a dummy user if we don't have the user object yet
            const storedUser = localStorage.getItem('user');
            if (storedUser) setUser(JSON.parse(storedUser));
        }
    }, [token]);

    const login = async (formData) => {
        setLoading(true);
        try {
            const res = await loginApi(formData);
            if (res.data.success) {
                const { token, ...userData } = res.data.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                setToken(token);
                setUser(userData);
                return { success: true };
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed',
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (formData) => {
        setLoading(true);
        try {
            const res = await registerApi(formData);
            if (res.data.success) {
                const { token, ...userData } = res.data.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                setToken(token);
                setUser(userData);
                return { success: true };
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed',
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
