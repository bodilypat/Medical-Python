/* *********************************************************** */
/* File: src/features/prescriptions/pages/EditPrescription.jsx */
/* *********************************************************** */
import { useNavigate, useParams } from "react-router-dom";

import {
    PrescriptionForm,
} from "../components";

import {
    usePrescription,
} from "../hooks";

const EditPrescription = () => {
    const navigate = useNavigate();

    const {
        PrescriptionId,
    } = useParams();

    const {
        prescription,
        loading,
        saving, 
        error,
        refreshPrescription,
        editPrescription, 
    } = usePrescription(
        prescriptionId 
    );

    /* ---------------------------------- */
    /* Update prescription                */
    const handleSubmit = async (
        formData 
    ) => {

        try {
            await editPrescription(
                formData 
            );

            navigage( 
                `/prescriptions/${prescriptionId}`,
                {
                    replace: true,
                }
            );

        } catch (error) {
            console.error(
                "Failed to update prescription:",
                error 
            );
        }
    };

    /* ---------------------------------- */
    /* Cancel editing                     */
    /* ---------------------------------- */
    const handleCancel = () => {

        navigate(
            `/prescriptions/${prescriptionId}`
        );
    };

    /* ---------------------------------- */
    /* Loading State                      */
    /* ---------------------------------- */
    if (loading) {
        return (
            <div className="edit-prescription-page">

                <div className="loading-state">
                    Loading prescription...
                </div>

            </div>
        );
    }

    /* ---------------------------------- */
    /* Error State                        */
    /* ---------------------------------- */
    if (error) {
        return (

            <div className="edit-prescription-page">
                <div className="error-state">

                    <h3>Unable to load prescription</h3>

                    <p>
                        {
                            error.message ?? "Something went wrong."
                        }
                    </p>

                    <button 
                        type="button"
                        onClick={
                            refreshPrescription 
                        }
                    >
                        Retry 
                    </button>
                </div>
            </div>
        );
    };

    /* ---------------------------------- */
    /* Not found state                    */
    /* ---------------------------------- */
    if (!prescription) {
        
        return (
            <div className="edit-prescription-page">
                <div className="empty-state">

                    <h3>Prescription not found</h3>

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

        <div className="edit-prescription-page">

            <header className="page-hader">
                <div>
                    <h1>Edit Prescription</h1>

                    <p>Update medicine details, dosage and instructions.</p>
                </div>
            </header>

            <section className="page-content">

                <PrescriptionForm 
                    prescription={prescription}

                    onSubmit={handleSubmit}

                    onCancel={handleCancel}

                    loading={saving}
                />

            </section>
        </div>
    );
};

export default EditPrescription;

