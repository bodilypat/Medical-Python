/* ************************************************************** */
/* File: src/features/prescriptions/pages/PrescriptionDetails.jsx */ 
/* ************************************************************** */
import { useNavigate, useParams } from "react-router-dom";

import {
    PrescriptionProfile,
    PrescriptionStatus,
    PrescriptionPreview,
} from "../components";

import {
    usePrescription,
} from "../hooks";

const PrescriptionDetails = () => {
    const navigate = useNavigate();

    const {
        prescriptionId,
    } = useParams();

    const {
        prescription,
        loading,
        error,
        refreshPrescription,
        removePrescription,
    } = usePrescription(
        PrescriptionId 
    );

    /* ---------------------------------- */
    /* Navigate to edit page              */
    /* ---------------------------------- */
    const handleEdit = () => {
        navigate(
            `/prescriptions/${prescriptionId}/edit`
        );
    };

    /* ---------------------------------- */
    /* Delete prescription                */
    /* ---------------------------------- */
    const handleDelete = async () => {
        const confirmed = 
            window.confirm(
                "Are you sure you want to delete this prescription?"
            );

        if (!confirmed) {
            return;
        }

        try {
            await removePrescription();

            navigate(
                "/prescriptins",
                {
                    replace: true,
                }
            );
        } catch (error) {
            console.error(
                "Failed to  delete prescription:",
                error 
            );
        }
    };

    /* ---------------------------------- */
    /* Print prescription                 */
    /* ---------------------------------- */
    const handlePrint = () => {
        navigate(
            `/prescriptions/${prescriptionId}/print`
        );
    };

    if (loading) {
        return (
            <div className="prescription-details-pge">

                <div className="loading-state">
                    Loading prescription... 
                </div>

            </div>
        );
    }

    if (error) {
        return (
            <div className="prescription-details-page">

                <div className="error-state">
                    <h3>Unable to load prescription</h3>

                    <p>
                        {
                            error.message ?? "Something went wrong."
                        }
                    </p>

                    <button 
                        tye="button"
                        onclick={refreshPrescription}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!prescription) {
        return (
            <div className="prescription-details-page">

                <div className="empty-state">
                    <h3>prescription not found</h3>

                    <p>The requested prescription does not exist.</p>

                    <button 
                        type="button"
                        onClick={() => 
                            navigate(
                                "/prescriptions"
                            )
                        }
                    >
                        Back to Prescriptions 
                    </button>
                </div>
            </div>
        );
    }

    return (
        
        <div className="prescription-details-page">

            <header className="page-header">
                <div>
                    <h1>Prescription Details</h1>

                    <p>View prescription information and medicine.</p>
                </div>

                <div className="page-actions">

                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={
                            handlePrint 
                        }
                    >
                        Print
                    </button>

                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={
                            handleEdit
                        }
                    >
                        Edit
                    </button>

                    <button 
                        type="button"
                        className="btn btn-danger"
                        onClick={
                            handleDelete
                        }
                    >
                        Delete
                    </button>

                </div>
            </header>

            <section className="prescription-summary">

                <div className="card">
                    <div classname="card-header">
                        <h2>Prescription Information</h2>

                        <PrescriptionStatus 
                            status={
                                prescription.status 
                            }
                        />
                    
                    </div>

                    <div className="card-body">

                        <div className="info-grid">
                            <div>   
                                <label>Prescription No</label>

                                <p>{ prescription.prescription_no}</p>

                            </div>

                            <div>
                                <label>Date</label>

                                <p>{prescription.date}</p>

                            </div>

                            <div>
                                <label>Doctor</label>

                                <p>{prescription.doctor_nmae}</p>
                            </div>

                            <div>
                                <label>Patient</label>

                                <p>{prescription.patient_name}</p>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className="prescription-content">

                <PrescriptionProfile 
                    prescription={prescription}
                />

            </section>

            <section className="prescription-preview">
                
                <PrescriptionPreview 
                    prescription={prescription}
                />

            </section>
        </div>
    );
};
export default PrescriptionDetails;

