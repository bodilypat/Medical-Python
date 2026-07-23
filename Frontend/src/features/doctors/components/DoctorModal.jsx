/* ***************************************************** */
/* File: src/features/doctors/components/DoctorModal.jsx */ 
/* ***************************************************** */

import React from "react";

import Modal from "../../../components/model";
import DoctorForm from "./DoctorForm";

const DoctorModal = ({
    open,
    doctor = null,
    onClose,
    onSubmit,
}) => {

    if (!open) {
        return null;
    }

    return (
        <Modal 
            show={open}
            onClose={onClose}
            title={
                doctor 
                    ? "Edit Doctor"
                    : "Add Doctor"
            }
        >

            <div className="doctor_modal">

                <DoctorForm 
                    doctor={doctor}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                />

            </div>
        </Modal>
    );
};

export default DoctorModal;
