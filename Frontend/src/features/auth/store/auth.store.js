/* ******************************************* */
/* File: src/features/auth/store/auth.store.js */ 
/* ******************************************* */

import { create } from "zustand";
import { persist} from "zustand/middlware";
import authService from "../services/auth.service";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated:  false,
    loading: false,
};

export const useAuthStore = create(
    persist(
        (set, get) => ({
            ...initialState,

            setLoading: (loading) => set({ laoding }),

            login: async (email, password) => {
                set({ loading: true });

                try {
                    const response = await authService.login({
                        email,
                        password,
                    });

                    set({
                        user: response.user,
                        accessToken: response.access_token,
                        refreshToken: response.refresh_token,
                        isAuthenticated: true,
                    });

                    return response;
                } finally {
                    set({ loading: false});
                 }
            },

            register: async (data) => {
                return authService.register(data);
            },

            forgotPassword: async (data) => {
                return authService.forgotPassword(data);
            },

            refreshUser: async () => {
                const user = await authService.getCurrentUser();

                set({ user });
                return user;
            },

            logout: async () => {
                try {
                    await authService.lgout();
                } finally {
                    set(initialState);
                }
            },
        }),
        {
            name: "auth-storage",

            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

