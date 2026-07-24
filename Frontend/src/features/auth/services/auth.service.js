/* ************************************************ */
/* File: src/features/auth/services/auth.service.js */ 
/* ************************************************ */

import api from "../../../services/api";

class AuthService {
    
    /* Login User */
    async login(credential) {
        const { data } = await api.post(
            "/auth/login",
            credential
        );

        return data;
    }

    /* Register new user */
    async register(userData) {
        const { data } = await api.post(
            "/auth/register",
            userData 
        );

        return data;
    }

    /* Logout current user */
    async logout() {
        const { data } = await api.post(
            "/auth/logout"
        );
        
        return data;
    }

    /* Refresh access toekn */
    async refreshToken(refreshToken) {
        const { data } = await api.post(
            "/auth/refresh-token",
            {
                refressh_token: refreshToken,
            }
        );

        return data;
    }

    /* Get current authenticated user */
    async getCurrentUser() {
        const { data } = await api.get(
            "/auth/me"
        );

        return data;
    }

    /* Forgot password request */
    async forgotPassword(payload) {
        const { data } = await api.post(
            "/auth/forgot-password",
            payload
        );

        return data;
    }

    /* Reset password */
    async resetPassword(payload) {
        const { data } = await api.post(
            "/auth/reset-password",
            payload
        );

        return data;
    }

    /* Verify email address */
    async verifyEmail(token) {
        const { data } = await api.get(
            `/auth/verify-email/${token}`
        );

        return data;
    }

    /* Resend verification email */
    async resendVerification(email) {
        const { data } = await api.post(
            "/auth/resend-verification",
            {
                email,
            }
        );

        return data;
    }

    /* Get user profile */
    async getProfile() {
        const { data } = await api.get(
            "/auth/profile"
        );

        return data;
    }

    /* Update profile */
    async updateProfile(payload) {
        const { data } = await api.put(
            "/auth/profile",
            payload 
        );

        return data;
    }

    /* Change password */
    async changePassword(payload) {
        const { data } = await api.put(
            "/auth/change-password",
            payload
        );

        return data;
    }

    /* Check current session */
    async checkSession() {
        const { data } = await api.get(
            "/auth/session"
        );

        return data;
    }
}
export default new AuthService();
