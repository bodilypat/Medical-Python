/* ************************************************** */
/* File: src/features/pharmacy/pages/EditMedicine.jsx */
/* ************************************************** */
import { useNavigate, useParams } from "react-rotuer-dom";

import {
    MedicineForm,
} from "../components";

import {
    useMedicine,
} from "../hooks";

const EditMedicine = () => {

    const navigate = useNavigate();

    const {
        medicineId,
    } = useParams();

    const {
        medicine,
        loading,
        error,
        refreshMedicine,
        updateMedicine,
    } = useMedicine(medicineId);

    /* ---------------------------------- */
    /* Update medicine                    */
    /* ---------------------------------- */
    const handlesubmit = async (
        formData 
    ) => {
        try {
            await updateMedicine(
                formData 
            );

            navigate(
                `/pharmacy/${medicineId}`,
                {
                    replace: true,
                }
            );
        } catch (error) {
            console.error(
                "Failed to update medicine:",
                error 
            );
        }
    };

    /* ---------------------------------- */
    /* Cancel editing                     */
    /* ---------------------------------- */
    const handleCancel = () => {
        navigate(
            `/pharmacy/${medicineId}`
        );
    };

    /* ---------------------------------- */
    /* Loading                            */
    /* ---------------------------------- */
    if (loading) {
        return (
            <div className="edit-medicine-page">
                <div className="loading-state">
                    Loading medicine...
                </div>
            </div>
        );
    }

    /* ---------------------------------- */
    /* Error                              */
    /* ---------------------------------- */
    if (error) {
        return (
            <div className="edit-medicine-page">

                <div className="error-state">
                    <h3>Unable to load medicine</h3>

                    <p>{ error.message ?? "Something went wrong." }</p>

                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={refreshMedicine}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    /* ---------------------------------- */
    /* Medicine Not Found                 */
    /* ---------------------------------- */
    if (!medicine) {

        return (
            <div className="edit-medicine-page">
                <div className="empty-state">
                    <h3>Medicine not found</h3>

                    <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/pharmacy")}
                    >
                        Back to Pharmacy 
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-medicine-page">

            <header className="page-header">

                <div>
                    <h1>Edit Medicine</h1>

                    <p>Update medicine information,
                       Inventory, pricing, and 
                       dispensing details
                    </p>
                </div>

            </header>

            <section className="page-content">

                <MedicineForm 
                    initialValues={ medicine }

                    onSubmit={ handleSubmit }

                    onCancel= { handleCancel }

                    loading={ loading }
                />
            </section>
        </div>
    );
};

export default EditMedicine;



