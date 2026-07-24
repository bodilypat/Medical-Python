/* ************************************************* */
/* File: src/features/auth/hooks/useResetPassword.js */ 
/* ************************************************* */

import { useState } from "react";
import { useNavigate, useParams }  from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const INITIAL_FORM = {
    password: "",
    confirmPassword: "",
};

export const useResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const resetPassword = useAuthStore(
        (state) => state.resetPassword
    );

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = ({ target: {name, value} }) => {
        setError("");
        setError("");

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        setError("");
        setSuccess("") ;

        const { password, confirmPassword } = formData;

        if (!token) {
            setError("Invalid or expired reset link.");
            return;
        }

        if (!password.trim() || !confirmPassword.trim()) {
            setError("Error fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await resetPassword({ 
                token, 
                password,
            });

            setSuccess("Passwrod reset successfully.");

            setFormData(INITIAL_FORM);

            navigate("/login", {
                replace: true,
                state: {
                    message:
                        "Your password has been reset successfully. Please sign in.",
                },
            });
        } catch (err) {
            setError(
                error?.message || 
                "Unable to reset your password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const backToLogin = () => {
        navigate("login", { replace: true });
    };

    return {
        formData,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
        backToLogin,
    };
};


