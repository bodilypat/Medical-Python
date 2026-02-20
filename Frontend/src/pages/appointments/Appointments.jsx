//src/pages/appointments/Appointments.jsx 

import React, { useState, useEffect } from 'react';
import Table from '../../components/table';
import Modal from '../../components/modal';
import {
    getAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
} from '../../services/appointmentsService';
import './Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editAppointment, setEditAppointment] = useState(null);

    // Fetch all appointments 
    const fetchAppointments = async () => {
        try {
            const reponse = await getAppointments();
            setAppointments(reponse.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Add or Update Appointment 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const appointmentData = {
            patientName: form.patientName.value,
            doctorName: form.doctorName.value,
            date: form.date.value,
            time: form.time.value,
        };

        try {
            if (editAppointment) {
                await updateAppointment(editAppointment.id, appointmentData);
            } else {
                await addAppointment(appointmentData);
            }
            setShowModal(false);
            setEditAppointment(null);
            fetchAppointments();
        } catch (error) {
            console.error('Error saving appointment:', error);
        }
    };

    const handleEdit = (appointment) => {
        setEditAppointment(appointment);
        setShowModal(true);
    };

    const handleDelete = async (appointment) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) {
            return;
        }
        try {
            await deleteAppointment(appointment.id);
            fetchAppointments();
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const columns = [
        "Patient Name",
        "Doctor Name",
        "Appointment Date",
        "Appointment Time",
        "status",
        "Actions",
    ];

    const actions = [
        {label: 'Edit', onClick: handleEdit
        },
        {
            label: 'Delete', onClick: handleDelete
        }   
    ];

    return (
        <div className="appointments-container">
            <h1>Appointments</h1>
            <button 
                className="add-btn"
                onClick={() => {
                    setEditAppointment(null);
                    setShowModal(true);
                }}
            >
                Add Appointment
            </button>
            <Table columns={columns} data={appointments} actions={actions} />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h2>{editAppointment ? 'Edit Appointment' : 'Add Appointment'}</h2>
                    <form onSubmit={handleSubmit} className="appointment-form">
                        <label>
                            Patient Name:
                            <input
                                type="text"
                                name="patientName"
                                defaultValue={editAppointment ? editAppointment.patientName : ''}
                                required
                            />
                        </label>
                        <label>
                            Doctor Name:
                            <input
                                type="text"
                                name="doctorName"
                                defaultValue={editAppointment ? editAppointment.doctorName : ''}
                                required
                            />
                        </label>
                        <label>
                            Date:
                            <input
                                type="date"
                                name="date"
                                defaultValue={editAppointment ? editAppointment.date : ''}
                                required
                            />
                        </label>
                        <label>
                            Time:
                            <input
                                type="time"
                                name="time"
                                defaultValue={editAppointment ? editAppointment.time : ''}
                                required
                            />
                        </label>
                        <button type="submit" className="save-btn">
                            {editAppointment ? 'Update' : 'Add'}
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Appointments;


