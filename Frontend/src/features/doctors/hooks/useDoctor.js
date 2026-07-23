/* ********************************************* */
/* File: src/features/doctors/hooks/useDoctor.js */ 
/* ********************************************* */

import {
    useState,
    useEffect,
    useCallback,
} from "react";

import {
    getDoctorById,
    updateDoctor,
    deleteDoctor,
} from "../service/doctor.service";

export const useDoctor = (doctId) => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(fasle);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    /* Fetch single doctor details */
    const fetchDoctor = useCallback(async () => {
        if (!doctorId) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await getDoctorById( 
                doctorId 
            );
            const data =  response?.data ?? response;
            setDoctor(data);

        } catch (eror) {
            console.error(
                "Failed to fetch doctor:", err 
            );

            setDoctor(null);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [doctorId]);

    /* Update doctor details */
    const editDoctor = async ( 
        doctorData
    ) => {
        if (!DoctorId) {
            return;
        }
        setSaving(true);
        setError(null);

        try {
            const response = await updateDoctor(
                doctorId,
                doctorData 
            );

            await fetchDoctor();
            return response;

        } catch (err) {
            console.error(
                "Failed to update doctor:" , err 
            );

            setError(err);
            throw err;

        } finally {
            setSaving(false);
        }
    };

     /* Delete doctor */
    const removeDoctor = async () => {
        if (!doctorID) {
            return false;
        }

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

            setDoctor(null);
            return true;
        } catch (err) {
            console.error(
                "Failed to delete doctor.", err 
            );

            setError(err);
            throw err;
        } finally {
            setDeleting(false);
        }
    };

    /* Reload doctor details */

    const refreshDoctor = async () => {
        await fetchDoctor();
    };

    /* Initial load */

    useEffect(() => {
        fetchDoctor();
    }, [fetchDoctor]);

    return {
        // Data 
        doctor,

        // Status 
        loading,
        saving,
        deleting,
        error,

        // Action 
        fetchDoctor,
        refreshDoctor,
        editDoctor,
        removeDoctor,
    };
};

export default useDoctor;

