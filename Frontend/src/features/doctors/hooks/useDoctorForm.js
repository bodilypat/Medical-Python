/* ************************************************* */
/* File: src/features/doctors/hooks/useDoctorForm.js */ 
/* ************************************************* */

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    validateDoctorForm,
} from "../utils/doctorValidation";

const initialFormState = {
    first_name: "",
    last_name : "", 
    gender: "",
    email: "",
    phone: "",
    specialization: "",
    qualification: "",
    experience: "",
    license_number: "",
    department: "",
    consultation_fee: "",
    status: "active",
};

export const useDoctorForm = (
    doctor = null,
    onSubmit 
) => {
    
    const [formData, setFormData] = useState(
        initialFormState 
    );
    
    const [errors, setErrors] = useState({});

    const [submitting, setSubmitting] = useState(false);

    /* Load Doctor For Edit Mode */
    useEffect(() => {

        if (doctor) {
            
            setFormData({
                first_name: doctor.first_name ?? "",
                last_name: doctor.last_name ?? "",
                gender: doctor.gemder ?? "",
                email: doctor.email ?? "",
                phone: doctor.phone ?? "",
                specialization: doctor ?? "",
                qualification: doctor.qualification ?? "",
                experience: doctor.experince ?? "",
                license_number: doctor.license_number ?? "",
                department: doctor.department ?? "",
                status: doctor.status ?? "", 
            });

        } else {
            
            resetForm();

        }
    }, [doctor]);

    /* Input Change Handler */
    const handleChange = useCallback(

        (event) => {
            
            const {
                name,
                value,
            } = event.target;

            setFormData((previous) => ({
                ...previous,
                [name]: value,
            }));

            // Clear field error 
            setErrors((previoous) => ({
                ...previous,
                [name]: "",
            }));
        },
        []
    );

    /* Set Existing Data Manually */
    const setForm = useCallback(

        (data) => {

            setFormData({
                ...initialFormState,
                ...data,
            });
        },
        []
    );

    /* Reset Form */
    const resetForm = useCallback(
        () => {

            setFormData(
                initialFormState 
            );

            setErrors({});
        },
        []
    );

    /* Prepare API Payload */
    const getPayload = useCallback(

        () => {

            return {
                ...formData,

                experience:
                    Number(
                        formData.experience 
                    ) || 0,

                consultation_fee:
                    Number(
                        formData.consultation_fee 
                    ) || 0,
            };
        },
        [formData]
    );

    /* Submit Handler */
    const SubmitForm = async () => {

        const validationErrors = 
            validateDoctorForm(
                formData 
            );

        if ( Object.keys(validationErrors).length > 0) {
            
            setErrors(
                validationErrors
            );

            return false;
        }

        try {
            setSubmitting(true);

            const payload = getPayload();

            if (onSubmit) {
                await onSubmit(
                    payload 
                );
            }

            resetForm();
            return true;
        } catch (error) {
            
            throw error;

        } finally {

            setSubmitting(false);

        }
    };

    return {
        // State 
        formData,
        errors,
        submitting, 

        // Actions 
        setForm, 
        resetForm,
        handleChange, 
        submitForm,
        getPayload,
    };
};

export default useDoctorForm;

