//src/features/patients/pages/CreatePatientPage.jsx
import { useNavagate } from "react-router-dom";
import { userCreatePatient } from '../hooks/userCreatePatient';

import PatientHeader from "../components/shared/PatientHeader";

import PatientRegistrationForm from "../componenst/forms/EmergencyContactForm";
import EmergencyContactForm from "../components/forms/EmergencyContactForm";
import InsuranceForm  from "../commponents/forms/InsuranceForm";

function CreatePatientPage() {
    const navigate = useNavigate();

    const { createPatient, isPending } = userCreatePatient({
        onSuccess: (patient) =>{
            navigate(`/patients/${patient.id}`);
        }
    });
    
    const handleSubmit = async (data) => {
        await createPatient(data);
    };

    return (
        <div className="space-y-6 p-6">
            <PatientHeader
                title="Patient Registration"
                subtitle="Register a new patient in the medical system."
            />

            <div className="rounded-xl borde bg-white p-6 shadow-sm">
                <PatientRegisterForm 
                    onSubmit={handleSubmit}
                    isSubmitting={isPending}
                />

                <EmergencyContactForm />

                <InsuranceForm />
            </div>
        </div>
    );
}
export default CreatePatientPage;

