// src/components/Sidebar.jsx 
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Components.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/patients">Patients</Link></li>
                    <li><Link to="/doctors">Doctors</Link></li>
                    <li><Link to="/appointments">Appointments</Link></li>
                    <li><Link to="/billing">Billing</Link></li>
                    <li><Link to="/pharmacy">Pharmacy</Link></li>
                </ul>
            </nav>
        </aside>
    );
};
