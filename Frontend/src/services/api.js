//src/services/api.js 
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // URL de votre backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional : Add token automatically if using authentication later
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
