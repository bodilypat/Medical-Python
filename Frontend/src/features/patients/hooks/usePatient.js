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

    /* Fetch patient by ID */
    const fetchPatient = useCallback(async () => {
        if(!patientId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await getPatientById(patientId);

            const data = response?.data ?? response;

            setPatient(data);
        } catch (err) {
            console.error("Failed to fetch patient: ", err);
            setError(err);
            setPatient(null);
        } finally {
            setLoading(false);
        }
    }, [patientId]);

    /* Update patient */
    const editPatient = async (patientData) => {
        setService(true);
        setError(null);

        try {
            const response = await updatePatient(patientId, patientData);

            /* Refresh latest data */
            await fetchPatient();

            return response;
        } catch (err) {
            console.error("Failed to update patient: ", err);
            setError(err);
            throw err;
        } finally {
            setService(false);
        }
    };

    /* Delete patient */
    const removePatient = async () => {
        const confirmed = window.confirmed(
            "Are you sure you want to delete this patient?"
        );

        if (!confirmed) return false;

        setDeleting(true);
        setError(null);

        try {
            await deletePatient(patientId);

            setPatient(null);
            
            return true;
        } catch (err) {
            console.error("Failed to delete patient: ", err);
            setError(err);
            throw err;
        } finally {
            setDeleting(false);
        }
    };

    /* Reload patient */
    const refreshPatient = async () => {
        await fetchPatient();
    };

    useEffect(() => {
        fetchPatient();
    }, [fetchPatient]);

    return {
        /* State */
        patient,
        loading,
        saving,
        deleting,
        error,
        /* Actions */
        refreshPatient,
        editPatient,
        removePatient,
    };
};


