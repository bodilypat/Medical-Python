//src/features/patients/pages/PatientAppointmentsPage.jsx
import { usePage } from "react-router-dom";

import { usePatient } from "../hooks/usePatient";
import { usePatientAppointments }from "../hooks/usePatientAppointments";

import PatientHeader from "../components/shared/PatientHeader";

import AppointmentList from "../../appointments/components/pages/AppointmentList";
import AppointmentFilters from "../../appointments/components/filters/AppointmentFilters";
import AppointmentStats from "../../appointments/components/state/ApointmentState";

import PatientLoadState from "../components/shared/PatientLoadingState";
import PatientErrorState from "../components/PatientErrorState";

function PatientAppointmentPage() {
    const { patientId } = useParams();

    const {
        appointments,
        stats,
    } = usePatientAppointments(patientId);

    if (isLoading) {
        return <PatientHeader patient={patient} />
    }

    return (
        <div className="space-y-6 p-6">
            <PatientHeader patient={patient} />

            <AppointmentStats 
                stats={stats}
            />

            <AppointmentTimeline    
                appointments={appointments}
            />

            <AppointmentTable 
                appointments={appointments}
            />
        </div>
    );
}

export default PatientAppointmentsPage;


