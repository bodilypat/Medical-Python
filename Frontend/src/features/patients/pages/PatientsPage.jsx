//src/features/patients/pages/PatientsPage.jsx 
import { Link } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';

import PatientTable from '../coponents/tables/PatientTable';
import PatientSearchBar from '../components/shared/PatientSearchBar';
import PatientFilter from '../components/shared/PatientFilter';
import PatientTableToolbar from '../components/shared/PatientTableToolbar';

import PatientHeader from  '../components/shared/PatientHeader';
import PatientLoadingState from '../components/shared/PatientLoadingState';
import PatientErrorState from '../components/shared/PatientErrorState';
import PatientEmptyState from '../components/shared/PatientEmptyState';

function PatientsPage() {
    const {
        patients,
        isLoading,
        isError,
        error,
        totalPatients,
        searchTerm,
        setSearchTerm,
    } = usePatients();

    if (isLoading) {
        return ( 
            <PatientLoadingState
                title="Unable to load patients"
                message={error?.message}
            />
        )
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <PatientHeader
                title="Patients"
                subtitle={`Total Patients: ${totalPatients}`}
            />

            <PatientTableToolbar>
                <PatientSearchBar />
                <PatientFilter />

                <Link 
                    to="/patients/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    New Patient
                </Link>
            </PatientTableToolbar>

            {patients?.length === 0 ? (
                <PatientEmptyState
                    title="No patients found"
                    message="Try adjusting your search or filter to find patients."
                />
            ) : (
                <PatientTable 
                    patients={patients}
                    total={totalPatients}
                 />
            )}
        </div>
    );
}
export default PatientsPage;

