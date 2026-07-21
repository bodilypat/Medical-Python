//src/features/patients/pages/PatientInsurancePage.jsx
import { useParams } from "react-router-dom";

import { usePatient } from "../hooks/usePatient";
import { usePatientInsurance } from "../hooks/usePatientInsurance";

import PatientHeader from "../components/shared/PatientHeader";

import InsuranceSummary from "../components/insurance/InsuranceSummary";
import InsuranceDetails from "../components/insurance/InsuranceDetails";
import ClaimHistory from "../components/insurance/ClaimHistory";

import PatientLoadingState from "../components/shared/PatientLoadingState";
import PatientErrorState from "../components/shared/PatientErrorState";

function PatientInsurancePage() {
    const { patientId } = useParams();

    const {
        patient,
        isLoading: patientLoading,
    } = usePatient(patientId);

    const {
        insurance,
        claims,
        isLoading,
        isError,
        error,
    } = usePatientInsurance(patientId);

    if (patientLoading || isLoading) {
        return <PatientLoadingState />;
    }
     if (isError) {
        return (
            <PatientErrorState 
                title="Unable to load insurance information"
                message={error?.message}
            />
        );
    }
    
    return (
        <div classNae="space-y-6 p-6">
            <PatientHeader patient={patient} />

            <InsuranceSummary 
                insurance={insurance}
            />

            <InsuranceDetails 
                insurance={insurance}
            />

            <ClaimHistory 
                claims={claims}
            />
        </div>
    );
}
export default PatientInsurancePage;

