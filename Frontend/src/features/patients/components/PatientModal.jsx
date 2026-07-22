/* ******************************************************* */
/* File: src/features/patients/components/PatientModel.jsx */
/* ******************************************************* */
import React from "react";
import Modal from "../../../components/modal";
import PatientForm from "./PatientForm";

const PatientModal = ({
    open,
    patient = null,
    onClose,
    onSubmit,
}) => {
    if (!open) return null;

    return (
        <Modal onClose={onClose}>
            <div className="patient-modal">

                <div className="patient-modal-header">
                    <h2>{patient ? "Edit Patient" : "Add Patient"}</h2>
                </div>
            
                <div className="patient-modall-body">
                    <PatientForm
                        patient={patient}
                        onSubmit={onSubmit}
                        onCancel={onClose}
                    />
                </div>

            </div>
        </Modal>
    );
};

export default PatientModal;

 