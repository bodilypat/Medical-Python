/* ************************************************ */
/* File: src/features/patients/hooks/usePatients.js */
/* ************************************************ */
import { useCallback, useEffect, useState } from "react";

import {
    getPatients,
    createPatient,
    updatePatient,
    deletePatient,
} from "../services/patient.service";

export const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /* Fetch all patients */
    const fetchPatients = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getPatients();

            const data = response?.data ?? response;

            setPatients(data);
        } catch (err) {
            console.error("Failed to fetch patients: ", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    /* Create patient */
    const addPatient = async (patientData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await createPatient(patientData);

            /* Refress list after successful creation */
            await fetchPatients();

            return response;
        } catch (err) {
            console.error("Failed to create patient: ", err);
            setError(err);
            throw err;
        } finally {
            setLoading
        }
    };

    /* Update patient */
    const editPatient = async (id, patientData) => {
        setLoading(true);
        setError(null);

        try {

            const response = await updatePatient(id, patientData);

            await fetchPatients();

            return response;
        } catch (err) {
            console.error("Failed to update patient: ", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /* Delete patient */
    const removePatient = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this patient?"
        );

        if (!confirmed) return;

        setLoading(true);
        setError(null);

        try {
            await deletePatient(id);

            /* Remove locally for better UX */
            setPatients((prev) => 
                prev.filter((patient) => patient.id !== id)
            );
        } catch (err) {
            console.error("Failed to delete patient: ", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /* Initial load */
    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    return {
        /* state */
        patients,
        loading,
        error,

        /* actions */
        fetchPatients,
        addPatient,
        editPatient,
        removePatient,
    };
};



