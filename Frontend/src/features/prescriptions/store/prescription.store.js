/* ************************************************************ */
/* File: src/features/prescriptions/store/prescription.store.js */ 
/* ************************************************************ */
import { create } from "zustand";

export const usePrescriptionStore = create(
    (set) => ({
        prescriptions: [],
        selectedPrescription: null,
        medicines: [],
        loading: false,
        error: null,

        setPrescriptions: (data) => 
            set({
                prescriptions:data 
            }),

        setSelectedPrescription: (data) =>
            set({
                selectedPrescription:data 
            }),

        setMedicines: (data) =>
            set({
                medicines:data 
            })
    })
);

