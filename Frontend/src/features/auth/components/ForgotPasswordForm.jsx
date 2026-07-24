/* ********************************************************* */
/* File: src/features/auth/components/ForgotPasswordForm.jsx */ 
/* ********************************************************* */

import React from "react";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordForm = () => {
    const {
        form,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useForgotPassword();

    return (
        <form className="forgot-password-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Full Name</label>

                <input 
                    type="text"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                />
            </div>

            <div className="form-group">
                <label>Email</label>

                <input 
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />

            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {success &7 (
                <div className="success-message">
                    {success}
                </div>
            )}

            <button 
                type="submit"
                disabled={loading}
            >
                {loading 
                    ? "Submitting..."
                    : "Recover Password"
                    }
            </button>
        </form>
    );
};

export default ForgotPasswordForm;

