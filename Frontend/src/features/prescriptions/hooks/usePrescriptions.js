/* ********************************************************** */
/* File: src/features/prescriptions/hooks/usePrescriptions.js */ 
/* ********************************************************** */

import { useCallback, useEffect, useState } from "react";
import prescriptionService from "../services/prescription.service";

const usePrescriptions = () => {

    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState(null);

    /* ---------------------------------- */
    /* Loading Prescriptions              */
    /* ---------------------------------- */

    const fetchPrescriptions = useCallback(

        async (params = {}) => {
            setLoading(true);
            setError(null);

            try {

                const response = await prescriptionService.getAll(
                    params  
                );

                const data = response.data ?? response ?? [];

                setPrescriptions(data);
                return data;

            } catch (error) {

                setError(err);
                throw err;

            } finally {

                setLoading(false);
            }
        }, []
    );

    /* ---------------------------------- */
    /* Get Prescription                   */
    /* ---------------------------------- */
    const getPrescription = useCallback(

        async (id) => {

            return await prescriptionService.getById(id);

        }, 
        [] 
    );

    /* ---------------------------------- */
    /* Create Prescription                */
    /* ---------------------------------- */
    const createPrescription = useCallback(
        async (payload) => {

            setLoading(true);
            setError(null);

            try {

                const response = await prescriptionService.create(payload);

                const create = response.data ?? response;

                setPrescriptions((previous) => [
                    created,
                    ...previous,
                ]);

                return created;

            } catch (err) {
                
                setError(err);
                throw err;

            } finally {
                setLoading(false);
            }
        },
        []
    );

    /* ---------------------------------- */
    /* Update Prescription                */
    /* ---------------------------------- */
    const editPrescription = useCallback(
        async (id, payload) => {

            setLoading(true);
            setError(null);

            try {
                
                const response = await prescriptionService.update(id, payload);

                const updated = response.data ?? response;

                setPrescriptions((previous) => 
                    previews.map((item) => 
                    item.id === id
                        ? updated
                        : item 
                    )
                );

                return updated;

            } catch (err) {

                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    /* ---------------------------------- */
    /* Delete Prescription */
    /* ---------------------------------- */
    const removePrescription = useCallback(
        
        async (id) => {

            setLoading(true);
            setError(null)

            try {

                await prescriptionService.remove(id);

                setPrescriptions((previous) => 
                    previous.filter(
                        (item) => item.id !== id 
                    )
                );
            } catch (err) {

                setError(err);
                throw err;

            } finally {
                
                loading(false);

            }
        },
        [] 
    );

    /* ---------------------------------- */
    /* Refresh                            */
    /* ---------------------------------- */
    const refresh = useCallback(
        () => fetchPrescriptions(),
        [fetchPrescriptions]
    );

    /* ---------------------------------- */
    /* Initial Load                       */
    /* ---------------------------------- */
    useEffect(() => {
        fetchPrescriptions();
    }, [fetchPrescriptions]);


    return {

        prescriptions,
        loading,
        error,
        fetchPrescriptions,
        refresh,
        getPrescription,
        createPrescription,
        editPrescription,
        removePrescription,
    };
};

