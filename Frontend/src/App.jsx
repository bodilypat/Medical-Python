// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/dashbord/Dashboard';
import Login from './pages/auth/Login';
import Patients from './pages/patients/Patients';
import Appointments from './pages/appointmenets/Appointments';
import Doctors from './pages/doctors/Doctors';
import Billing from './pages/billing/Billing';
import Pharmacy from './pages/pharmacy/Pharmacy';
import Sidebar from './components/Sidebar';

import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <div className="app-container">                                    
                                    <Sidebar />
                                    <div className="main-content">
                                        <routes>
                                            <Route path="/" element={<Navigate to="/dashboard" />} />
                                            <Route path="/dashboard" element={<Dashboard />} />
                                            <Route path="/patients" element={<Patients />} />
                                            <Route path="/appointments" element={<Appointments />} />
                                            <Route path="/doctors" element={<Doctors />} />
                                            <Route path="/billing" element={<Billing />} />
                                            <Route path="/pharmacy" element={<Pharmacy />} />
                                        </routes>
                                    </div>
                                </div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

