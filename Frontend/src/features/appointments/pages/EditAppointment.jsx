/* ********************************************************** */
/* File: #src/features/appointments/pages/EditAppointment.jsx */
/* ********************************************************** */

import { useNavigate, useParams } from "react-router-dom";

import {
    AppointmentForm,
} from "../components";

import {
    useAppointment,
} from "../hooks";

const EditAppointment = () => {
    const navigate = useNavigate();

    const { appointmentId } = useParams();

    const {
        appointment,
        loading,
        saving,
        error,
        editAppointment,
    } = useAppointment(appointmentId);

    /* Update appointment */
    const handleSubmit = async (formData) => {
        try {
            await editAppointment(formData);

            navigate(
                `/appointments/${appointmentId}`,
                {
                    replace: true,
                }
            );
        } catch (error) {
            console.error(
                "Failed to update appointment:",
                error
            );
        }
    };

    /* Cancel editing */
    const handleCancel = () => {
        navigate(
            `/appointments/${appointmentId}`
        );
    };

    if (loading) {
        return (
            <div className="edit-appointment-page">
                <p>Loading appointment...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="edit-appointment-page">

                <header className="page-header">
                    <h1>
                        Edit Appointment
                    </h1>
                </header>

                <div className="error-message">
                    <h3>
                        Unable to load appointment
                    </h3>

                    <p>
                        {error.message ??
                            "An unexpected error occurred."}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/appointments")
                        }
                    >
                        Back to Appointments
                    </button>
                </div>

            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="edit-appointment-page">

                <header className="page-header">
                    <h1>
                        Edit Appointment
                    </h1>
                </header>

                <div className="empty-state">
                    <h3>
                        Appointment not found
                    </h3>

                    <p>
                        The requested appointment
                        could not be found.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/appointments")
                        }
                    >
                        Back to Appointments
                    </button>
                </div>

            </div>
        );
    }

    return (
        <div className="edit-appointment-page">

            <header className="page-header">

                <div>
                    <h1>
                        Edit Appointment
                    </h1>

                    <p>
                        Update appointment information.
                    </p>
                </div>

            </header>

            <section className="page-content">

                <AppointmentForm
                    appointment={appointment}
                    loading={saving}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />

            </section>

        </div>
    );
};

export default EditAppointment;
