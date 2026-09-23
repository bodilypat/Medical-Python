/* ************************************************************* */
/* File: #src/features/appointments/pages/CreateAppointment.jsx  */
/* ************************************************************* */

import { useNavigate } from "react-router-dom";

import {
    AppointmentForm,
} from "../components";

import {
    useAppointments,
} from "../hooks";

const CreateAppointment = () => {
    const navigate = useNavigate();

    const {
        addAppointment,
    } = useAppointments();

    /* Create a new appointment */
    const handleSubmit = async (formData) => {
        try {
            const response =
                await addAppointment(formData);

            const appointment =
                response?.data ?? response;

            navigate(
                `/appointments/${appointment.id}`,
                {
                    replace: true,
                }
            );
        } catch (error) {
            console.error(
                "Failed to create appointment:",
                error
            );
        }
    };

    /* Cancel appointment creation */
    const handleCancel = () => {
        navigate("/appointments");
    };

    return (
        <div className="create-appointment-page">

            <header className="page-header">

                <div>
                    <h1>
                        Schedule Appointment
                    </h1>

                    <p>
                        Create a new patient appointment.
                    </p>
                </div>

            </header>

            <section className="page-content">

                <AppointmentForm
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />

            </section>

        </div>
    );
};

export default CreateAppointment;
