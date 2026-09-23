/* ************************************************************** */
/* File: #src/features/appointments/pages/AppointmentCalendar.jsx */
/* ************************************************************** */

import { useMemo, useState } from "react";

import {
    AppointmentCalendar,
    AppointmentFilter,
    AppointmentSearch,
    AppointmentModal,
    AppointmentForm,
} from "../components";

import {
    useAppointmentCalendar,
} from "../hooks";

const AppointmentCalendarPage = () => {
    const {
        appointments,
        loading,
        error,
        selectedDate,
        selectedAppointment,
        fetchAppointments,
        selectDate,
        selectAppointment,
        createAppointment,
        updateAppointment,
    } = useAppointmentCalendar();

    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        doctor_id: "",
        status: "",
    });

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    /* Filter appointments */
    const calendarEvents = useMemo(() => {
        let events = [...appointments];

        if (search.trim()) {
            const keyword =
                search.toLowerCase();

            events = events.filter(
                (appointment) =>
                    appointment.patient_name
                        ?.toLowerCase()
                        .includes(keyword) ||
                    appointment.doctor_name
                        ?.toLowerCase()
                        .includes(keyword)
            );
        }

        if (filters.doctor_id) {
            events = events.filter(
                (appointment) =>
                    appointment.doctor_id ===
                    filters.doctor_id
            );
        }

        if (filters.status) {
            events = events.filter(
                (appointment) =>
                    appointment.status ===
                    filters.status
            );
        }

        return events;
    }, [
        appointments,
        search,
        filters,
    ]);

    /* Create appointment */
    const handleCreate = () => {
        selectAppointment(null);
        setIsModalOpen(true);
    };

    /* Edit appointment */
    const handleEventClick = (
        appointment
    ) => {
        selectAppointment(
            appointment
        );

        setIsModalOpen(true);
    };

    /* Save appointment */
    const handleSubmit = async (
        formData
    ) => {
        if (selectedAppointment) {
            await updateAppointment(
                selectedAppointment.id,
                formData
            );
        } else {
            await createAppointment(
                formData
            );
        }

        setIsModalOpen(false);

        fetchAppointments();
    };

    /* Close modal */
    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="appointment-calendar-page">

            <header className="page-header">

                <div>
                    <h1>
                        Appointment Calendar
                    </h1>

                    <p>
                        View and manage
                        appointments by
                        calendar.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreate}
                >
                    + Schedule Appointment
                </button>

            </header>

            <section className="page-toolbar">

                <AppointmentSearch
                    value={search}
                    onChange={setSearch}
                    onClear={() =>
                        setSearch("")
                    }
                />

                <AppointmentFilter
                    filters={filters}
                    onChange={setFilters}
                />

            </section>

            {loading && (
                <div className="loading-state">
                    Loading calendar...
                </div>
            )}

            {error && (
                <div className="error-state">
                    <p>
                        {error.message ??
                            "Unable to load calendar."}
                    </p>

                    <button
                        type="button"
                        onClick={
                            fetchAppointments
                        }
                    >
                        Retry
                    </button>
                </div>
            )}

            {!loading && !error && (
                <AppointmentCalendar
                    events={calendarEvents}
                    selectedDate={
                        selectedDate
                    }
                    onDateSelect={
                        selectDate
                    }
                    onEventClick={
                        handleEventClick
                    }
                />
            )}

            <AppointmentModal
                open={isModalOpen}
                title={
                    selectedAppointment
                        ? "Edit Appointment"
                        : "Schedule Appointment"
                }
                onClose={handleClose}
            >
                <AppointmentForm
                    appointment={
                        selectedAppointment
                    }
                    selectedDate={
                        selectedDate
                    }
                    onSubmit={
                        handleSubmit
                    }
                    onCancel={
                        handleClose
                    }
                />
            </AppointmentModal>

        </div>
    );
};

export default AppointmentCalendarPage;
