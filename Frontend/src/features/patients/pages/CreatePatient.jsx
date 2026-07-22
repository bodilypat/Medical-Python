/* *************************************************** */
/* File: src/features/patients/pages/CreatePatient.jsx */
/* *************************************************** */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PatientForm from "../components/PatientForm";
import { usePatients } from "../hooks/usePatients";

const CreatePatient = () => {

    const navigate = useNavigate();

    const {
        addPatient,
        loading,
        error,
    } = usePatients();

    const [submitError, setSubmitError] = useState(null);
    
    const handleSubmit = async (patientData) => {

        try {
            setSubmitError(null);

            const response = await addPatient(patientData);

            const createPatient = response?.data ?? response;

            navigate( `/patients/${createPatient.id}`);
        } catch (err) {
            console.error(
                "Create patient failed:",
                err 
            );

            setSubmitError(err);
        }
    };

    const handleCancel = () => {
        navigate("/patients");
    };

    return (

        <div className="create-patient-page">

            <div className="page-header">

                <button 
                    type="button"
                    onClick={handleCancel}
                >
                    Back
                </button>
                <h1>Create New Patient</h1>

            </div>

            {
                (error || submitError) && (
                    <div className="error-message">
                        {
                            submitError?.message ||
                            error?.message || 
                            "Unable to create patient."
                        }
                    </div>
                )
            }

            <PatientForm 
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />

            {
                loading && (
                    <div className="loading-message">
                        Saving patient... 
                    </div>
                )
            }
        </div>
    );
};

export default CreatePatient;

