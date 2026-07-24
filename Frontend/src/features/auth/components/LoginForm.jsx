/* ************************************************ */
/* File: src/features/auth/components/LoginForm.jsx */
/* ************************************************ */

import React from "react";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
    const {
        email,
        password,
        loading,
        error,
        setEmail,
        setPassword,
        handleSubmit,
    } = useLogin();

    return (
        <form onSubmit={handleSubmit} className="login-form">

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <input 
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button 
                type="submit"
                disabled={loading}
            >
                {loading ? "Signing In..." : "Login"}
            </button>
        </form>
    );
};
export default LoginForm;

