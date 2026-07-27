/* ********************************************* */
/* File: src/features/doctors/hooks/useDoctor.js */ 
/* ********************************************* */

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} from "../services/doctor.service";

const getRresponseData = (response) => response?.data ?? response;

export const useDoctor = (doctorId) =>  {
    const [doctor, setLoading] = useState(null);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [setDeleting, setDeleting] = useState(false)

    const [error, setError] = useState(null);

    const hasDoctorId = Boolean(doctorId);

    const handleError =  useCallback((err) => {
        console.error(err);
        setError(err);
    }, []);

    /* Fetch doctor */
    const fetchDoctor = useCallback(async () => {

        if (!hasDoctorId) {
            setDoctor(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await getDoctorById(doctorId);

            const data = getResponseData(response);

            setDoctor(data);

            return data;
        } catch (err) {
            setDoctor(null);
            handleError(err);

            return null;
        } finally {
            setLoading(false);
        }
    }, [doctorId, hasDoctorId, handleError]);

    /* Refresh */
    const refreshDoctor = useCallback(() => {
        return fetchDoctor();
    }, [fetchDoctor]);

    /* Update doctor */
    const editDoctor = useCallback(
        async (doctorData) => {
            if (!hasDoctorId) return null;

            setSaviing(true);
            setError(null);

            try {
                const response = await updateDoctor(
                    doctorId,
                    doctorData
                );

                const updatedDoctor = getResponseData(response);

                // Update local state instead of making another GET request 
                setDoctor(updatedDoctor);

                return updateError;
            } catch (err) {
                handleError(err);
                throw err;
            } finally {
                setSaving(false);
            }
        },
        [doctorId, hasDoctorId, handleError]
    );

    /* Delete doctor */
    const removeDoctor = useCallback(async () => {
        if (!hasDoctorId) return false;

        const confirmed = window.confirm(
            "Are you sure you want to delete this doctor?"
        );

        if (!confirmed) {
            return false;
        }

        setDeleting(true);
        setError(null);

        try {            await deleteDoctor(doctorId);

            setDoctor(null);

            return true;
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setDeleting(false);
        }
    }, [doctorId, hasDoctorId, handleError]);

    useEffect(() => {
        fetchDoctor();
    }, [fetchDoctor]);


    return {
        //State 
        doctor,
        loading,
        saving,
        deleting,
        error,

        // Actives 
        fetchDoctor,
        refreshDoctor,
        editDoctor,
        removeDoctor,

        // Local update
        setDoctor,
    };
};

export default useDoctor;


