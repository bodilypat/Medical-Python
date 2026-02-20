//src/pages/doctors/Doctors.jsx 

import React, { useEffect, useState } from 'react';
import Table from '../../components/table';
import Modal from '../../components/modal';
import {
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor
} from '../../services/doctorsService';
import './Doctors.css';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);

    // Fetch doctors from API 
    const fetchDoctors = async () => {
        try {
            const response = await getDoctors();
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // Add or update doctor
    const handleSubmit = async (e) =>  {
        e.preventDefault();
        const form = e.target;

        const doctorData = {
            first_name: form.firstName.value,
            last_name: form.lastName.value,
            specialty: form.specialty.value,
            email: form.email.value,
            phone: form.phone.value
        };

        try {
            if (editingDoctor) {
                await updateDoctor(editingDoctor.id, doctorData);
            } else {
                await addDoctor(doctorData);
            }
            setIsModalOpen(false);
            setEditingDoctor(null);
            fetchDoctors(); // Refresh the list of doctors
        } catch (error) {   
            console.error('Error submitting doctor:', error);
        }
    };

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleDelete = async (doctorId) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                await deleteDoctor(doctorId);
                fetchDoctors(); // Refresh the list of doctors
            } catch (error) {
                console.error('Error deleting doctor:', error);
            }
        }
    };

    const columns = [
        { first_name: 'First Name', accessor: 'first_name' },
        { last_name: 'Last Name', accessor: 'last_name' },
        { specialty: 'Specialty', accessor: 'specialty' },
        { email: 'Email', accessor: 'email' },
        { phone: 'Phone', accessor: 'phone' },
    ];

    const actions = [
        { label: 'Edit', onClick: handleEdit },
        { label: 'Delete', onClick: handleDelete }
    ];

    return (
        <div className="doctors-container">
            <h1>Doctors</h1>
            <button 
                className="add-btn"
                onClick={() => {
                    setEditingDoctor(null);
                    setIsModalOpen(true);
                }}
            >
                Add Doctor
            </button>
            <Table data={doctors} columns={columns} actions={actions} />

            <Modal 
                show={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingDoctor(null);
                }}
                title={editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
            >
                <form onSubmit={handleSubmit} className="doctor-form">
                    <label>
                        First Name:
                        <input 
                            type="text"
                            name="firstName"
                            defaultValue={editingDoctor ? editingDoctor.first_name : ''}
                            required
                        />
                    </label>
                    <label>
                        Last Name:
                        <input 
                            type="text"
                            name="lastName"
                            defaultValue={editingDoctor ? editingDoctor.last_name : ''}
                            required
                        />
                    </label>
                    <label>
                        Specialty:
                        <input 
                            type="text"
                            name="specialty"
                            defaultValue={editingDoctor ? editingDoctor.specialty : ''}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input 
                            type="email"
                            name="email"
                            defaultValue={editingDoctor ? editingDoctor.email : ''}
                            required
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            defaultValue={editingDoctor ? editingDoctor.phone : ''}
                            required
                        />
                    </label>
                    <button type="submit" className="submit-btn">
                        {editingDoctor ? 'Update' : 'Add'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};
export default Doctors;
