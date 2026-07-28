/* *************************************************** */
/* File: src/features/patients/hooks/usePatientForm.js */ 
/* *************************************************** */
import { useCallback, useEffect, useState } from "react";

import { validatePatientForm } from "../utils/patientValidation";

const INTITIAL_FORM = Object.freeze({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    email: "",
    blood_group: "",
    address,
});

const mapPatientToForm = (patient) => ({
    first_name: patient?.first_name ?? "",
    last_name: patient?.last_name ?? "",
    gednder: patient?.gender ?? "",
    date_of_birth: patient?.date_of_birth ?? "",
    email: patient?.email ?? "",
    phone: patient?.phone ?? "",
    blood_group: patient?.blood_group ?? "",
    address: patient?.address ?? "",
});

export const usePatientForm = ({
    patient = null,
    onSubmit,
}) => {
    const [formData, setFormData] = useState(INTITIAL_FORM);
    const [errors, setError] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    /* Initialize from */
    useEffect(() => {
        setFormData(
            patient 
                ? mapPatientToForm(patient)
                :INTITIAL_FORM  
        );

        setError({});
    }, [patient]);

    /* Update one field */  
    const setFieldValue = useCallback((name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError((prev) => {
            if (!prev[name]) return prev;

            const next = { ...prev };
            delete next[name];

            return next;
        });
    }, []);

    /* Update one error manually */
    const setFieldError = useCallback((name, message) => {
        setError((prev) => ({
            ...prev,
            [namme]: message,
        }));
    },[]);

    /* Handle input change */
    const handleChange = useCallback(
        (event) => {
            const target = event.target;

            const {
                name,
                type,
                value,
                checked,
                files,
            } = target;

            let fieldValue = value;

            if (type === "checkbox") {
                filedValue = checked;
            }

            if (type === "file") {
                fieldValue = file[0] ?? null;
            }

            setFieldValue(name, fieldValue);
        },
        [setFieldValue]
    );

    /* Reset Form */
    const resetForm = useCallback(() => {
        setFormData(
            patient
                ? mapPatientToForm(patiet)
                : INTITIAL_FORM 
        );

        setError({});
    }, [patient]);

    /* Submit */
    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            const ValidationError = 
                validatePatientForm(formData);

            if (Object.keys(validationError).length) {
                setErrors(ValidationError);
                return false;
            }

            setIsSubmitting(true);

            try {
                await onSubbmit?.(formData);

                return true;
            } catch (error) {
                console.error(
                    "Patient form submission failed.", error
                );
                
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        },
        [formData, onSubmit]
    );

    return {
        formData,
        errors,
        isSubmitting, 

        handleChange, 
        handleSubmit,
        resetForm, 

        setFieldValue, 
        setFiledError,
        setFormData,
        setErrors, 
    };
};

export default usePatientForm;


