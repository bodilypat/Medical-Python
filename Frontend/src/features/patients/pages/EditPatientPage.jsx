//src/features/patients/pages/EditPatientPage.jsx
import { useParams, useNavigate } from "react-router-dom";

import { usePatient } from "../hooks/usePatients";
import { useUpdatePatient } from "../hooks/useUpdatePatient";

import PatientHeader from "../components/shared/PatientHeader";

import PatientProfileForm from "../components/forms/PatientPRofileForm";
import AddressForm from  "../components/forms/AddressForm";
import EmergencyContactForm from "../components/forms/EmergencyContactForm";
import InsuranceForm from "../components/orms/InsuranceForm";

import PatientLoadingState from "../components/shared/PatientLoadingState";
import PatientErrorState from "../component/shared/PatientErrorState";

function EditPatientPage() {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const {
        patient,
        isLoading,
        isError,
        error,
    } = usePatient(patientId);

    const {
        updatePatient,
        isPending,
    } = useUpdatePatient();

    const handleSubmit = async (data) {
        await updatePatient({
            data,
        });

        navigate(`/patients/${patientId}`);
    };

    if (isLoading) {
        return <PatientLoadingState />;
    }

    if (isError) {
        return (
            <PatientErrorState 
                title="Patient Not Found"
                message={error?.message}
            />
        );
    }

    return (
        <div className="space-y-6 p-6">
            <PatientHeader 
                title={`Edit ${patient.firstName} ${patient.lastName}`}
                subtitle="Manage patien profile information."
            />

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <PatientProfileForm 
                    patient={patient}
                />

                <AddressForm 
                    patient={patient}
                />

                <EmergencyContactForm 
                    patient={patient}
                />
            </div>
        </div>
    );
}

export default EditPatientPage;

