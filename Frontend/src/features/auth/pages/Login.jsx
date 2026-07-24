/* *************************************** */
/* File: src/features/auth/pages/Login.jsx */
/* *************************************** */

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../compponents/LoginForm";
import "../styles/Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed: ' + error.message);
        }
    };

    return (

        <div className="login-container">
            <from onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>

                <Input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="suubmit">Login</button>
            </from>
        </div>
    );
};

export default Login;


