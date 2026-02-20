//src/pages/partients/Patients.jsx

import React, { useEffect, useState } from 'react';
import Table from '../../components/table';
import Modal from '../../components/modal';
import { getPatients, addPatient, updatePatient, deletePatient } from '../../services/patientService';
import "./Patient.css";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    // Fetch patients from API
    const fetchPatients = async () => {
        try {
            const response = await getPatients();
            setPatients(response.data); 
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    // Add or update patient
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const patientData = {
            first_name: form.firstName.value,
            last_name: form.lastName.value,
            gender: form.gender.value,
            date_of_birth: form.dateOfBirth.value,
            email: form.email.value,
            phone: form.phone.value,
            blood_group: form.bloodGroup.value,
            address: form.address.value,
        };

        try {
            if (editingPatient) {
                await updatePatient(editingPatient.id, patientData);
            } else {
                await addPatient(patientData);
            }
            setShowModal(false);
            setEditingPatient(null);
            fetchPatients();
        } catch (error) {
            console.error("Error saving patient:", error);
        }
    };

    const handleEdit = (patient) => {
        setEditingPatient(patient);
        setShowModal(true);
    };

    const handleDelete = async (patientId) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            try {
                await deletePatient(patientId);
                fetchPatients();
            } catch (error) {
                console.error("Error deleting patient:", error);
            }
        }
    };

    const columns = ["first_name", "last_name", "gender", "date_of_birth", "email", "phone", "blood_group", "address"];

    const actions = [
        { label: "Edit", className: "edit", onClick: handleEdit },
        { label: "Delete", className: "delete",onClick: handleDelete }
    ];

    return (
        <div className="patients-page">
            <h1>Patient Management</h1>
            <button onClick={() => setShowModal(true)}>Add Patient</button>
            <Table data={patients} columns={columns} actions={actions} />

            {/* Modal for Add/Edit Patient */}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            First Name:
                            <input type="text" name="firstName" defaultValue={editingPatient?.first_name || ''} required />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" name="lastName" defaultValue={editingPatient?.last_name || ''} required />
                        </label>
                        <label>
                            Gender:
                            <select name="gender" defaultValue={editingPatient?.gender || ''} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>
                        <label>
                            Date of Birth:
                            <input type="date" name="dateOfBirth" defaultValue={editingPatient?.date_of_birth || ''} required />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" defaultValue={editingPatient?.email || ''} required />
                        </label>
                        <label>
                            Phone:
                            <input type="tel" name="phone" defaultValue={editingPatient?.phone || ''} required />
                        </label>
                        <label>
                            Blood Group:
                            <select name="bloodGroup" defaultValue={editingPatient?.blood_group || ''} required>
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </label>
                        <label>
                            Address:
                            <textarea name="address" defaultValue={editingPatient?.address || ''} required />
                        </label>
                        <button type="submit">{editingPatient ? 'Update' : 'Add'} Patient</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Patients;
