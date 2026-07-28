/* ************************* */
/* File: src/services/api.js */ 
/* ************************* */
import axios from "axios";

import { getAccessToken } from "../utils/storage";

const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://localhost:8000/api/v1",

    timeout: 30000,

    headerrs: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },  
});

/* ------------------------------ */
/* Request interceptor            */
/* Automatically attach JWT token */
/* ------------------------------ */
api.interceptors.request.use(
    (onfig) => {

        const token = getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config; 
    },

    (error) => {
        return Promise.reject(error); 
    }
);

/* -------------------------------- */
/*  Response interceptor            */
/*  Global API error handling       */
/* -------------------------------- */
api.interceptors.response.use(
    (respponse) => {

        return response;
    },
    
    async (error) => {

        const status = error?.response?.status;

        switch (status) {
            case 401:
                // Unaauthorized:
                // - token expired 
                // - invalid token 

                // Future:
                // refresh token flow 
                // logout user 

                console.warn(
                    "Permission denied"
                );

                break;

            case 404: 
                console.warn(
                    "Resource not found" 
                );

                break;
            
            case 500:
                console.error(
                    "Sarver error" 
                );

                break;

            default:
                break;
        }

        return Promise.reject(error); 
    }
);

export default api;

