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
} from "../service/doctor.service";

export const useDoctors = () => {
    const [doctors, setDoctorss] = useState([]);
    const [loading, setLoadiNG] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    /* Fetch all doctors */
    const fetchDoctors = useCallback(async () => {
        setLoadiNG(true);
        setError(null);

        try {
            const response = await getDoctors();
            const data = response?.data ?? response;
            
            setDoctorss(data);
        } catch (err) {
            console.error(
                "Failed to fetch doctors:", err
            );
            setError(err);
            setDoctorss([]);
        } finally {
            setLoadiNG(false);
        }
    }, []);

    /* Add new doctor */
    const addDoctor = async (doctorData) => {
        setSaving(true);
        setError(null);

        try {
            const response = await createDoctor(doctorData);
            await fetchDoctors();
            return response;
        } catch (err) {
            console.error(
                "Failed to created doctor:", err
            );

            setError(er);

            throw err;
        } finally {
            setSaving(false);
        }
    };

    /* Update doctor */
    const editDoctor = async (
        doctorId,
        doctorData
    ) => {
        setSaving(true);
        setError(null);
        try {
            const response = await updateDoctor(
                doctorId,
                doctorData,
            );
            
            await fetchDoctors();
            return response;

        } catch (err) {
            console.error( 
                "Failed to update doctor:",
                err 
            );

            setError(err);
            throw err;

        } finally {
            setSaving(false);
        }
    };

    /* Delete Doctor */
    const removeDoctor = async (
        doctorId 
    ) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this doctor?"
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
            console.error(
                "Failed to delete doctor:", err 
            );

            setError(err);
            throw err;

        } finally {
            setDeleting(false);
        }
    };

    /* Refresh doctor list */
    const refreshDoctors =  async () => {
        await fetchDoctors();
    };

    /* Initial loading */
    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    return {
        // Data 
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

