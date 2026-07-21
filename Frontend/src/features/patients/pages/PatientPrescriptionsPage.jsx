//src/features/patients/pages/PatientPrescriptionsPage.jsx
import { useParams } from "react-router-dom";

import { usePatient } from "../hooks/usePatient";
import { usePatientPrescriptions } from "../hooks/usePatientPrescriptions";

import PatientHeader from "../components/shared/PatientHeder";

import PrescriptionList from "../../prescriptions/components/pages/PrescriptionList";
import PrescriptionFilter from "../../prescriptions/components/filters/PrescriptionFilters";
import PrescriptionSummary from "../../prescriptions/components/PrescriptionSummary";

import PatientLoadingState from "../components/shared/PatientLodingState";
import PatientErrorState from "../components/shared/PatientErrorState";

function PatientPrescriptionsPage() {
    const { patientId } = useParams();

    const {
        patient,
        isLoading: patientLoading,
    } = usePatient(patientId);

    const {
        prescriptionns,
        summary,
        isLoading,
        isError,
    } = usePatientPrescriptions(patientId);

    if (patientLoading || isLoading) {
        return <PatientLoadngState />;
    }

    if (isError) {
        return (
            <PatientErrorState 
                title="Unable to load prescriptions"
                message={error?.message}
            />
        );
    }

    return (
        <div className="space-y-6 p-6">
            <PatientHeader patient={patient} />

            <PrescriptionSummary 
                summary={summary}
            />

            <PrescriptionFilter />

            <prescriptionList 
                prescriptions={prescriptions}
            />
        </div>
    );
}
export default PatientPrescriptionPage;