//src/features/patients/pages/PatientBillingPage.jsx
import { useParams } from "react-router-dom";

import { usePatient } from "../hooks/usePatient";
import { usePatientBilling } from "../hooks/usePatientBilling";

import PatientHeader from "../component/shared/PatientHeader";

import BillingSummary from "../../billing/components/pages/BillingSummary";
import InvoiceTable from "../../billing/components/tables/InvocieTable";
import PaymentHistory from "../../billing/components/payments/PaymentHitory";
import BillingFilters from "../../billing/components/filters/BillingFilters";

import PatientLoadingState from "components/shared/PatientLoadingState";
import PatientErrorState from "../components/shared/PatientErrorState";

function PatientBillingPage() {
    const { patientId } = useParams();

    const {
        patient,
        isLoading: patientLoading,
    } = usePatient(patientId);

    const {
        invoice,
        payments,
        summary,
        isLoading,
        isError,
        error 
    } = usePatientBilling(patientId);

    if (patientLoading|| isLoading) {
        return <PatientLoadingState />
    }

    if (isError) {
        return (
            <PatientErrorState 
                title="Unable to load billing information"
                message={error?.message}
            />
        );
    }

    return (
        <div className="space-y-6 p-6">
            <PatientHeader patient={patient} />

            <BillingSummary summary={summary} />

            <BillingFilters />

            <InvoiceTable invoice={invoice} />

            <PaymentHistory payments={payments} />
        </div>
    );
}

export default PatientBillingPage;



