/* ******************************************** */
/* File: src/features/auth/hooks/useRegister.js */ 
/* ******************************************** */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export const useRegister = () => {
    
    const navigate = useNavigate();
    const register = useAuthStore(state => state.register);

    const [formData, setFormdata] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handchange = ({ target: { name, value } }) => {
        setError("");

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        if (!email.trim() || !password.trim()) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);
        setError("");

        try{
            
            setLoading(true);
            setError("");

            await register(formData);

            navigate("/login", { replace: true });

        } catch (err) {
            setError(err?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        handlechange,
        handleSubmit,
    };
};



