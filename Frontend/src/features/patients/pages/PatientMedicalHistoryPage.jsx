//src/features/patients/pages/PatientMedicalHistoryPage.jsx
import { useParams } from "react-router-dom"

import { usePatient } from "../hooks/usePatient";
import { usePatientMedicalHistory } from "../hooks/usePatientMedicalHistory";

import PatientHeader from "../components/shared/PatientHeader";

import MedicalHistoryList from "../components/medical-history/pages/MedicalHistoryList"
import DiagnosisList from "../components/medical-history/DiagnosisList";
import AllergyList from "../components/medical-history/AllergyList";
import MedicalHistory from "../components/medical-history/MedicationHistory";
import SurgicalHistory from '../components/medical-history/SurgicalHistory';

import PatientLoadingState from "../components/shared/PatientLoadingState";
import PatientErrorState from "../components/shared/PatientErrorState";

function PatientMedicalHistoryPage() {
    const { patientId } = useParams();

    const { patient, isLoading: patientLoading } = 
        usePatient(patientId);

    const {
        medicalHistory,
        diagnoses,
        allergies,
        medications,
        surgeries,
        isLoading,
        isError,
        error,
    } = usePatientMedicalHistory(patientId);

    if (patientLoading || isLoading) {
        return <PatientLoadingState />;
    }

    if (isError) {
        return (
            <PatientErrorState 
                title="Unable to load  medical history"
                message={error?.message}
            />
        );
    }

    return (
        <div className="space-y-6 p-6">
            <PatientHeader patient={patient} />

            <MedicalHistoryList 
                history={diagnoses}
            />

            <DiagnosisList 
                diagnoses={diagnoses}
            />

            <AllergyList 
                allergies={allergies}
            />

            <MedicationHistory 
                medications={medications}
            />

            <SurgicalHistory 
                surgeries={surgeries}
            />

        </div>
    );
}

export default PatientMedicalHistoryPage;

