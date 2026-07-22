/* ************************************************  */
/*  File: src/features/patients/pages/Patients.jsx    */
/* ************************************************* */

import {useState} from "../components/PatientTable";
import PatientModal from "../components/PatientModal";
import { usePatients } from "../hooks/usePatients";

const Patients = () => {
    const {
        patients,
        loading,
        createPatient,
        editPatient,
        removePatient,
    } = usePatients();

    const [open, setOpen] = useState(false);
    const [selectedPatient,, setSelectedPatient] = useState(null);

    const handleAdd = () => {
        setSelectedPatient(null);
        setOpen(true);
    };

    const handleEdit = (patient) => {
        setSelectedPatient(patient);
        setOpen(true);
    };

    const handleSubmit = async (data) => {
        if (selectedPatient) {
            await editPatient(selectedPatient.id, data);
        } else {
            await createPatient(data);
        }

        setOpen(false);
    };

    return (
        <div className="patient-page">
            <h1>Patient Management</h1>

            <button onClick={handleAdd}>Add Patient</button>

            <PatientTable 
                loading={loading}
                patients={pateints}
                onEdit={handleEdit}
                onDelete={removePatient}
            />

            <PatientModal
                open={open}
                patient={selectedPatient}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default Patients;
