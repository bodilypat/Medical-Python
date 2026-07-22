/* **************************************************** */
/* File: src/features/patients/pages/PatientDetails.jsx */ 
/* **************************************************** */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import PatientProfile from "../components/PatientProfile";
import { usePatient } from "../usePatient";

const PatientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        patient,
        loading,
        error,
        refreshPatient,
    } = usePatient(id);

    if (loading) {
        return (
            <div clasName="patient-details">
                <p>Loading patient...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="patient-details">
                <h2>Unable to load patient</h2>

                <p>{error.message || "An unexpected error occurred."}</p>

                <button onClick={refreshPatient}>
                    Retry
                </button>

                <button onclick={() => navigate("/patients")}>
                    Back to Patients
                </button>

            </div>
        );
    }

    if (!patient) {
        return (
            <div clasName="patient-details">
                <h2>Patient Not Found</h2>

                <button onClick={() => navigate("/patients")}>
                    Back to Patients
                </button>

            </div>
        );
    }

    return (
        <div className="patient-details">

            <div className="page-header">
                <button onClick={() => navigate("/patients")}>
                    Back
                </button>
                <h1>Patient Profile</h1>
            </div>

            <PatientProfile patient={patient} />

        </div>
    );
};

export default PatientDetails;


