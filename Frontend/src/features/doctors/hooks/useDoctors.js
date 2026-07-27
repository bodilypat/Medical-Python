/* ********************************************** */
/* File: src/features/doctors/hooks/useDoctors.js */ 
/* ********************************************** */

import {
    useState,
    useEffect,
    useCallback,
} from "react";

import {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
} from "../services/doctor.service";

export const useDoctors = () => {

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    /* Fetch all Doctors */
    const fetchDoctors = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {
            const response = await getDoctors();
            const data = response?.data ?? response;

            setDoctors(data);
        } catch (err) {
            console.error(
                "Failed to fetch doctors:",
                err 
            );

            setError(err);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    }, []);

    /* Add New doct */

    const addDoctor = async (doctorData) => {
        setSaving(true);
        setError(null);

        try {

            const response = await createDoctor( 
                doctorData 
            );

            await fetchDoctors();
            return response;
        } catch (err) {
            console.error(
                "Failed to create doctor.",
                err 
            ); 
            
            setError(err);
            
            throw err;
        } finally {
            setSaving(false);
        }
    };

    /* Update doctor */
    const editDoctor = async (
        doctorId,
        doctorData,
    ) => {

        setSaving(true);
        setError(null);

        try {
            const response = await updateDoctor(
                doctorId,
                doctorData 
            );

            await fetchDoctors();
            return response;
        } catch (err) {
            console.error(
                "Failed to update doctor:",
                err 
            );
        } finally {
            setSaving(false);
        }
    };

    /* Delete doctor */

    const removeDoctor = async (
        doctorId 
    ) => {
        const confirmed = 
        window.confirm(
            "Are your sure you want to delete this doctors",
            err 
        );

        if (!confirmed) {
            return false;
        }

        setDeleting(true);
        setError(null);

        try {
            await deleteDoctor(
                doctorId 
            );

            await fetchDoctors();
            return true;
        } catch (err) {
            console.error (
                "Failed to delete doctor.",
                err 
            );

            setError(err);
            throw err;

        } finally {
            setDeleting(false);
        }
    };

    /* Refresh doctor list */
    const refreshDoctors = async () => {
        await fetchDocots();
    };

    /* Initial loading */
    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors])

    return {
        // Date 
        doctors,
        // Status 
        loading,
        saving, 
        deleting, 
        error, 
        // Actions 
        fetchDoctors,
        refreshDoctors,
        addDoctor,
        editDoctor, 
        removeDoctor,
    };
};

export default useDoctors;


