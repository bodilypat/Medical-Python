/* ************************************************************* */
/* File: #src/features/appointments/pages/AppointmentDetails.jsx */
/* ************************************************************* */

import { useNavigate, useParams } from "react-router-dom";

import {
    AppointmentProfile,
    AppointmentStatus,
} from "../components";

import {
    useAppointment,
} from "../hooks";

const AppointmentDetails = () => {
    const navigate = useNavigate();

    const { appointmentId } = useParams();

    const {
        appointment,
        loading,
        deleting,
        error,
        refreshAppointment,
        editAppointment,
        removeAppointment,
    } = useAppointment(appointmentId);

    /* Navigate to edit page */
    const handleEdit = () => {
        navigate(
            `/appointments/${appointmentId}/edit`
        );
    };

    /* Delete appointment */
    const handleDelete = async () => {
        const deleted =
            await removeAppointment();

        if (deleted) {
            navigate("/appointments");
        }
    };

    /* Back to appointment list */
    const handleBack = () => {
        navigate("/appointments");
    };

    /* Refresh appointment */
    const handleRefresh = () => {
        refreshAppointment();
    };

    if (loading) {
        return (
            <div className="appointment-details">
                <p>Loading appointment...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="appointment-details">

                <div className="page-header">
                    <button
                        type="button"
                        onClick={handleBack}
                    >
                        ← Back
                    </button>
                </div>

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
                        onClick={handleRefresh}
                    >
                        Retry
                    </button>
                </div>

            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="appointment-details">

                <div className="page-header">
                    <button
                        type="button"
                        onClick={handleBack}
                    >
                        ← Back
                    </button>
                </div>

                <div className="empty-state">
                    <h3>
                        Appointment not found
                    </h3>

                    <p>
                        The requested appointment
                        does not exist.
                    </p>
                </div>

            </div>
        );
    }

    return (
        <div className="appointment-details">

            <header className="page-header">

                <div>

                    <button
                        type="button"
                        onClick={handleBack}
                    >
                        ← Back
                    </button>

                    <h1>
                        Appointment Details
                    </h1>

                    <p>
                        Appointment #
                        {appointment.id}
                    </p>

                </div>

                <div className="page-actions">

                    <AppointmentStatus
                        status={
                            appointment.status
                        }
                    />

                    <button
                        type="button"
                        onClick={handleRefresh}
                    >
                        Refresh
                    </button>

                    <button
                        type="button"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        className="btn-danger"
                        disabled={deleting}
                        onClick={handleDelete}
                    >
                        {deleting
                            ? "Deleting..."
                            : "Delete"}
                    </button>

                </div>

            </header>

            <AppointmentProfile
                appointment={appointment}
            />

        </div>
    );
};

export default AppointmentDetails;
