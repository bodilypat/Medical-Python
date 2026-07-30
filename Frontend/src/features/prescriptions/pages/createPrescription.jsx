/* ************************************************************ */
/* File:src/features/prescriptions/pages/createPrescription.jsx */
/* ************************************************************ */
import { useNavigate } from "react-router-dom";
import {
    PrescriptionForm,
}from "../components";

import { 
    usePrescriptions,
} from "../hooks";

const CreatePrescription = () => {
    const navigate = useNavigate();

    const {
        addPrescription,
        loading,
        error,
    } = usePrescriptions();

    /* ---------------------------------- */
    /* Create new prescription            */
    /* ---------------------------------- */
    const handleSubmit = async (
        formData 
    ) => {

        try {
            const response = await addPrescription(
                formData
            );

            const prescription = response?.data ?? response;

            navigate(
                `/prescriptions/${prescription.id}`,
                {
                    replace: true,
                }
            );
        } catch (error){
            console.error(
                "Failed to create prescription:",
                error
            );
        }
    };

    /* ---------------------------------- */
    /* Cancel creation                    */
    /* ---------------------------------- */
    const handleCancel = () => {
        navigate(
            "/prescriptions"
        );
    };

    return (
        <div className="create-prescription-page">

            <header className="page-header">
                <div>
                    <h1>Create Prescription</h1>

                    <p>
                        Create a new patient
                        prescription with medicines 
                        dosage, and instructions.
                    </p>
                </div>
            </header>

            {error && (
                <div className="error-state">
                    <p>
                        {
                            error.message ?? "Unable to create prescription."
                        }
                    </p>
                </div>
            )}

            <select className="page-content">

                <PrescriptionForm 
                    onSubmit={ 
                        handleSubmit
                    }

                    onCancel={
                        handleCancel
                    }

                    loading={
                        loading
                    }
                />
            </select>
        </div>
    );
};

export default CreatePrescription;

