/* **************************************************** */
/* File: src/features/pharmacy/pages/CreateMedicine.jsx */ 
/* **************************************************** */
import { useNavigate } from "react-router-dom";

import {
    MedicineForm,
} from "../components";

import {
    useMedicines,
} from "../hooks";

const CreateMediicine = () => {
    const navigate = useNavigate();

    const {
        addMedicine,
        loading,
    } = useMedicines();

    /* ---------------------------------- */
    /* Create medicine                    */
    /* ---------------------------------- */
    const handleSubmit = async (formData) => {

        setError(null);

        try {
            
            await addMedicine(formData);

            navigate(
                "/pharmacy",
                {
                    replace: true,
                }
            );
        } catch (error) {
            console.error(
                "Failed to create medicine:",
                error 
            );

            setError( 
                error.message ?? "Unable to create medicine."
            )
        }
    };

    /* ---------------------------------- */
    /* Cancel creation                    */
    /* ---------------------------------- */
    const handleCancel = () => {
        navigate("/pharmacy");
    };

    return (
        <div className="create-medicine-page">

            <header className="page-header">
                <div>
                    <h1>Add New Medicine</h1>

                    <p>Register a new medicine in the pharmacy inventory.</p>
                </div>
            </header>

            <section className="page-content">

                <MedicineForm 
                    onsubmit={handleSubmit}
                    onCancel={handleCancel}
                    loading={loading}
                />
            </section>
        </div>
    );
};

export default CreateMedicine;

