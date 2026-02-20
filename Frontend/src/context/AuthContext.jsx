//src/context/AuthContext.jsx 

import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService, logout as logoutService } from '../services/authService';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for token on initial load 
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Optionally, you can verify the token with the backend here
            setUser({ token }); // Set user with token (you can also fetch user details)
        }
        setLoading(false);
    }, []);

    // Login function
    const login = async (credentials) => {
        try {
            const response = await loginService(credentials);
            const { token } = response.data;
            localStorage.setItem('token', token);
            setUser({ token });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            const response = await registerService(userData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            setUser({ token });
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

