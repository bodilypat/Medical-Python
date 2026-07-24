/* *************************************************** */
/* File: src/features/auth/components/RegisterForm.jsx */ 
/* *************************************************** */

import React from "react";
import { useRegister } from "../hook/useRegister";

const RegisterForm = () => {
    const {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit,
    } = useRegister();

    return (
        <form className="register-form" onsubmit={handd}>
            
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <input 
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />

            <input 
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />

            <input 
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input 
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <input
                name="confirmPassword"
                type="password"
                placeholder="Conform Password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <select 
                name="role"
                value={formData.role}
                onchange={handleChange}
            >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                <option value="pharmacist">Pharmacist</option>
            </select>

            <button 
                type="submit"
                disabled={loading}
            >
                {loading ? "Creating Account..." : "Register"}
            </button>
        </form>
    );
};

export default RegisterForm;


