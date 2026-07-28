/* ******************************************************** */
/*  File: src/features/patients/components/PatientModal.jsx */
/* ******************************************************** */

import Modal from "../../../components/modal";
import PatientForm from "./PatientForm";

const PatientModal = ({
    open = false,
    patient = null,
    onClose,
    onSubmit,
}) => {
    return (
        <Modal
            open={open}
            title={patient ? "Edit Patient" : "Add Patient"}
            size="lg"
            onClose={onClose}
        >
            <PatientForm
                patient={patient}
                onSubmit={onSubmit}
                onCancel={onClose}
            />
        </Modal>
    );
};

export default PatientModal;
