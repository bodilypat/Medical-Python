/* src/features/patients/pages/PatientDocumentsPage.jsx */
import { useParams } from "react-router-dom";

import { usePatient } from "../hooks/usePatient";
import { usePatientDocuments } from "../hooks/usePatientDocument";

import PatientHeader from "../components/shared/PatientHeader";

import DocumentUploader from "../compoments/documents/DocumentUploader";
import DocumentList from "../components/documents/DocumentList";
import DocumentFilter from "../components/documents/DocumentFilters";

import PatientLoadingState from "../components/shared/PatientLoadingState";
import PatientErrorState from "../components/shared/PatientErrorState";

function PatientDocumentsPage() {
    const { patientId } = useParams();

    const {
        documents,
        isLoading,
        isError,
        error,
    } = usePatientDocument(patientId);

    if (patientLoading || isLoading) {
        return <PatientLoadingState />;
    }

    if (isError) {
        return (
            <PatientErrorState 
                title="Unable to load documents"
                message={error?.message}
            />
        );
    }

    return (
        <div className="space-y-6 p-6">
            <PatientHeader patient={patient} />

            <DocumentFilters />

            <DocumentList   
                documents={Document}
            />
        </div>
    );
}

export default PatientDocumentsPage;

