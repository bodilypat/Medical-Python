/* ********************************** */
/* File: src/services/interceptors.js */ 
/* ********************************** */

import api from "'/api";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

/* Request interceptor */
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    
    (error) => Promise.reject(error)
);

/* Response Interceptor */
api.interceptors.response.use(

    (response) => response.data,

    async (error) => {
        const origanalRequest = error.config;

        if ( error.response?.status === 401 && !originalRequest._retry ){

            if (isRefreshing) {
                
                return new Promise((resolve, reject) => {
                    
                    failedQueue.push({
                        resoolve,
                        reject,
                    });
                }).then((token) => {

                    originalRequest.headers.Authorization = `Bearer ${token}`;

                    return api(originalRequest);

                });
            }

            origanalRequest._retry = true;
            isRefreshing = true;

            try {

                const refreshToken = localStorage.getItem("refresh_token");

                const response = await api.post(
                    "/auth/refresh",
                    {
                        refresh_token: refreshToken,
                    }
                );

                const newToken = response.access_token;

                localStorage.setItem( 
                    "access_token",
                    newToken 
                );

                api.defaults.headers.Authorization = `Bearer ${newToken}`;

                processQueue(null, newToken);

                return api(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError);

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                window.location.href = "/login";

                return Promise.reject(refreshError);
            } finally {
                
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;



