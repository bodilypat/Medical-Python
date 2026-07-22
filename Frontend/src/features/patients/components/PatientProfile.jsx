/* ********************************************************* */
/* File: src/features/patients/components/PatientProfile.jsx */
/* ********************************************************* */

import React from "react";

const PatientProfile = ({ patient }) => {
    if (!patient) {
        return null;
    }

    return (
        <div className="patient-profile">

            <div className="profile-header">
                <h2>{patient.first_name} {patient.last_name}</h2>
            
                <span className="patient-id">Patient ID: {patient.id}</span>
            </div>

            <div className="profile-section">
                <h3>Personal Information</h3>

                <div className="profile-grid">

                    <div className="profile-item">
                        <label>First Name</label>
                        <p>{patient.first_name}</p>
                    </div>

                    <div className="profile-item">
                        <label>Last Name</label>
                        <p>{patient.last_name}</p>
                    </div>

                    <div className="profile-item">
                        <label>Gender</label>
                        <p>{patient.gender}</p>
                    </div>

                    <div className="profile-item">
                        <label>Date of Birth</label>
                        <p>{patient.date_of_birth}</p>
                    </div>

                    <div className="profile-item">
                        <label>Blood Groop</label>
                        <p>{patient.blood_group}</p>
                    </div>

                </div>
            </div>

            <div className="profile-section">
                <h3>Contact Information</h3>

                <div className="profile-grid">

                    <div className="profile-item">
                        <label>Email</label>
                        <p>{patient.email}</p>
                    </div>

                    <div className="profile-item">
                        <label>Phone</label>
                        <p>{patient.phone}</p>
                    </div>

                    <div className="profile-item profile-item-full">
                        <label>Address</label>
                        <p>{patient.address}</p>
                    </div>

                </div>
            </div>

            <div className="profiile-section">
                <h3>Medical Information</h3>
                
                <div className="profile-grid">

                    <div className="profile-item">
                        <label>Medical history</label>
                        <p>{patient.medical_history || "-"}</p>
                    </div>

                    <div className="profile-item">
                        <label>Emergency Contact</label>
                        <p>{patient.emergency_contact || "-"}</p>
                    </div>

                </div>
            </div>

            <div className="profile-section">
                <h3>System Information</h3>

                <div className="profile-grid">
                    
                    <div className="profile-item">
                        <label>Created At</label>
                        <p>{patient.created_at || "-"}</p>
                    </div>

                    <div className="profile-item">
                        <label>Updated At</label>
                        <p>{patient.updated_at || "-"}</p>
                    </div>

                </div>
            </div>
            
        </div>
    );
};
export default PatientProfile;
