/* ************************************************** */
/* File: src/features/auth/hooks/useForgotPassword.js */
/* ************************************************** */

import { useState } from "react";
import { useAuthStore } from "../store/auth.store";

const INITIAL_FORM = {
    fullname: "",
    email: "",
};

export const useForgotPassword = () => {
    const forgotPassword = useAuthStore(
        (state) => state.forgotPassword
    );

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = ({ target: {name, value } }) => {
        setError("");
        setSuccess("");

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        setError("");
        setSuccess("");

        const { fullName, email } = formData;

        if (!fullname.trim() || !email.trim()) {
            setError("Please fill in all required fileds.");
            return;
        }

        setLoading(true);

        try {
            const response = await forgotPassword(formData);

            setSuccess(
                response?.message || "Password reset instructios have been sent to your email."
            );

            setFormData(INITIAL_FORM);
        } catch (err) {
            setError ( err?.message || "Unable to process your resquest. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
};

