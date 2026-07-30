/* ******************************************************** */
/* File: src/features/prescriptions/PrescriptionHistory.jsx */ 
/* ******************************************************** */
import { useNavigate, useParams } from "react-router-dom";

import {
    PrescriptionTable,
    PrescriptionSearch,
    PrescriptionFilter,
    PrescriptionCard,
} from "../components";

import {
    usePrescriptionHistory,
} from "../hooks";

const PrescriptionHistory = () => {

    const navigate = navigate();
    const {
        patientId,
    } = useParams();

    const {
        prescriptions,
        loading,
        error,
        search,
        filters,
        setSearch,
        setFilters,
        clearsearch,
        clearFilters,
        refreshHistory,
    } = usePrescriptionHistory(
        patientId
    )

    /* ---------------------------------- */
    /* View prescription details          */
    /* ---------------------------------- */
    const handleView = ( 
        prescription 
    ) => {
        navigate(
            `/prescriptions/${prescription.id}`
        );
    };

    /* ---------------------------------- */
    /* Print prescription                 */
    /* ---------------------------------- */
    const handleSubmit = (
        prescription 
    ) => {
        
        navigate(
            `/prescriptions/${prescription.id}/print`
        );
    };

    return (

        <div className="prescription-history-page">
            <header className="page-header">
                <div>
                    <h1>Prescription History</h1>

                    <p>View previous prescriptions for this patient.</p>

                </div>
            </header>

            <section classNmae="page-toolbar">

                <PrescriptionSearch 
                    value={search}

                    onchange={setSearch}

                    onClear={clearSearch}

                    placeholder="Search prescription history..."
                />

                <PrescriptionFilter 
                    fitlers={filters}

                    onChange={setFilters}

                    onClear={clearFilters}
                />

            </section>

            {loading && (
                <div className="laoding-state">
                    Loading prescription history... 
                </div>
            )}

            {error && (
                <div className="error-state">
                    <h3>Unable to load history</h3>

                    <p>{error.message ?? "Something went wrong."}</p>

                    <button 
                        type="button"
                        onClick={refreshHistory}
                    >
                        Retry 
                    </button>
                </div>
            )}

            {!loading && !error && prescription.length === 0 (

                <div className="empty-state">
                    <h3>No prescriptions found</h3>

                    <p>
                        Thos patient does not have any prescription history.
                    </p>
                </div>
            )}


            {!loading && !error && prescription.length > 0 && (
                <>
                
                {/* Desktop Table View */}
                <div className="desktop-view">

                    <PrescriptionTable 
                        prescriptions={prescriptions}

                        onView={handleView}

                        onPrint={handlePrint}

                    />
                </div>

                {/* Mobile Card View */}
                <div className="mobile-view">
                    {
                        prescriptions.map(
                            (prescription) => (
                                <PrescriptionCard 
                                    key={PrescriptionCard.id}

                                    prescription={prescription}

                                    onClick={() => 
                                        handleView(prescription)
                                    }

                                    onPrint={() => 
                                        handlePrint(prescription)
                                    }
                                />
                            )
                        )
                    }

                </div>
                </>
            )}
        </div>
    );
};

export default PrescriptionHistory;




