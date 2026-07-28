/* *********************************************** */
/* File: src/features/patients/hooks/usePatient.js */
/* *********************************************** */ 
import { useState, useEffect, useCallback } from "react";

import {
    getPatientById,
    updatePatient,
    deletePatient,
} from "../services/patient.service";

export const usePatient = (patientId) => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    const getErrorMessage  = (err) =>
        err?.response?.data?.message || 
        err?.message || 
        "Something wet wrong.";

    /* FETCH PATEINT */
    const fetchPatient = useCallback(
        async () => {
            if (!patientId) {
                setPatient(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await getPatientById(patientId);
                const data = response?.data ?? response;

                setPatient(data);

                return data;
            } catch (err) {
                console.error("Failed to fetch patient:", err);

                setPatient(null);
                setError(getErrorMessage(err));

                throw err;
            } finally {
                setLoading(false);
            }
        }, [patientId]);

    /* UPDATE PATIENT */
    const editPatient = useCallback(
        async (patientData) => {
            if (!patientId) return null;

            setSaving(true);
            setError(null);

            try {
                const response = await updatePatient(patientId, patientData);

                const updated =
                    response?.data ?? response (await fetchPatient());
                
                setPatient(update);

                return updated;
            } catch (err) {
                console.error("Failed to update patient:", err);

                setError(getErrorMessage(err));

                throw err;
            } finally {
                setSaving(false);
            }
        },
        [patientId, fetchpatient]
    );

    /* DELETE PATIENT */
    const removePatient = useCallback(
        async () => {
            if (!patientId) return false;
            
            setDeleting(true);
            setError(null);

            try {

                await deletePatient(patientId);

                setPatient(null);
                
                return true;
            } catch (err) {
                console.error("Failed to delete patient:" , err);

                setError(getErrorMessage(err));

                throw err;
            } finally{
                setDeleting(false);
            }
        },
        [patientId]
    );

    /* REFRESH */
    const refreshPatient = useCallback(() => {
        return fetchPatient();
    }, [fetchPatient]);

    return {
        // State 
        patient,
        loading,
        saving,
        deleting,
        error,

        // Actions 
        fetchPatient,
        refreshPatient,
        editPatient,
        removePatient,
    };
};

