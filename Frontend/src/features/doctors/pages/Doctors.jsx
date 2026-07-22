/* ******************************************** */
/* File: src/features/doctors/pages/Doctors.jsx */ 
/* ******************************************** */

import React, { useState } from "react";

import DoctorTable from "../components/DoctorTable";
import DoctorModal from "../components/DoctorModal";

import { useState } from "../hooks/useDoctors";

const Doctors = () => {
    const {
        doctors,
        loading,
        error,
        addDoctor,
        editDoctor,
        removeDoctor,
    } = useDoctors();

    const handleAdd = () => {

        setSelectedDoctor(null);
        setIsModalOpen(true);
    };

    const handleEdit = (doctor) => {

        setSelectedDoctor(doctor);
        setIsModalOpen(true);

    };

    const handleClose = () => {

        setSelectedDoctor(null);
        setIsModalOpen(false);
    };

    const handleSubmit = async (doctorData) => {

        try {
            if (selectedDoctor) {

                await editDoctor(

                    selectedDoctor.id,
                    doctorData
                );
            } else {

                await addDoctor(doctorData);
            }

            handleClose();

        } catch (error) {
            console.error(
                "Doctor save failed:",
                error 
            );
        }
    };

    return (

        <div className="doctoor-page">
            <div className="page-header">
                <h1>Doctor Management</h1>

                <button 
                    className="add-btn"
                    onclick={handleAdd}
                >
                    Add Doctor
                </button>

            </div>

            {
                error && (
                    <div className="error-message">
                        Unable to load doctors.
                    </div>
                )
            }

            <DoctorTable 
                doctor={doctors}
                loading={loading}
                onEdit={handleEdit}
                onDelete={removeDoctor}
            />

            <DoctorModal 
                open={setIsModalOpen}
                doctor={selectedDoctor}
                onClose={handleClose}
                onSubmit={handlesubmit}
            />
        </div>
    );
};

export default Doctors;