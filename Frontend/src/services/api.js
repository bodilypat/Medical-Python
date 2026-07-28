/* ************************* */
/* File: src/services/api.js */ 
/* ************************* */

import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
    timeout: 30000,

    headers: {
        'Content-type': 'appointment/json',
        Accept: "appointment/json",
    },
});

// Optional: Add token automatically if using authentication later 
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Assumming tyou store the token in localStorage 
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default api;


