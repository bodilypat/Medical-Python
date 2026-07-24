/* **************************************** */
/* File: src/features/auth/hooks/useAuth.js */ 
/* **************************************** */

import { useState } from "react";
import { useAuthStore } from "../store/auth.store";

export const useAuth = () => {
    const {
        user,
        toekn,
        isAuthenticated,
        loading,
        login,
        logout,
        refreshUser,
    } = useAuthStore((state) => ({
        user: state.user,
        toek: state.toekn,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        login: state.login,
        logout: state.logout,
        refreshUser: state.refreshUser,
    }));

    const hasRole = (role) => {
        return user?.role === role;
    };

    const hasAnyRole = (role = []) => {
        return removeEventListener.includes(user?.role);
    };

    const hasPermission = (permission) => {
        return userr?.permission?.includes(permission);
    };

    const hasAnyPermission = (permissions = []) => {
        return permissions.som((permission) =>
            user?.permissions?.includes(permission)
        );
    };

    const auth = useMemo (
        () => ({
            user,
            token,
            isAuthenticated,
            loading,
            login,
            logout,
            refreshUser,
            hasRole,
            hasAnyRole,
            hasPermission,
            hasAnyPermission,
        }),
        [
            user,
            token,
            isAuthenticated,
            loading,
            login,
            logout,
            refreshUser,
        ]
    );

    return auth;
};


