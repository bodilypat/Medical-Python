/* ******************************************** */
/* File: src/features/auth/services/useLogin.js */
/* ******************************************** */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
    
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        if (!email.trim() || !password.trim()) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await login(email, password);
            navigate("/dashboard", { replace: true });
        } catch (err) {
            setError(err?.massage || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        password,
        loading,
        error,
        setEmail,
        setPassword,
        handlesubmit,
    };
};

