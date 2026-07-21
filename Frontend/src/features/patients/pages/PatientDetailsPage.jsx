//src/features/patients/pages/PatientDetailsPage.jsx 
import { useParams } from 'react-router-dom';

import { usePatient } from '../hooks/usePatient';

import PatientHeader from '../components/shared/PatientHeader';
import PatientProfile from '../components/profile/PatientProfile';
import PatientTabs from '../components/tabs/PatientTabs';
import PatientTimeline from '../components/profile/PatientTimeline';

import PatientLoadingState from '../components/shared/PatientLoadingState';
import PatientErrorState from '../components/shared/PatientErrorState';

function PatientDetailsPage() {
    const { patientId } = useParams();

    const {
        patient,
        isLoading,
        isError,
        error,
    } = usePatient(patientId);

    if (isLoading) {
        return (
            <PatientLoadingState
                title="Loading patient details..."
            />
        )
    }

    if (isError) {
        return (
            <PatientErrorState
                title="Unable to load patient details"
                message={error?.message}
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <PatientHeader
                title={patient.name}
                subtitle={`Patient ID: ${patient.id}`}
            />

            <PatientProfile patient={patient} />
            <PatientTabs patientId={patient.id} />
            <PatientTimeline patientId={patient.id} />
        </div>
    );
}

export default PatientDetailsPage;

