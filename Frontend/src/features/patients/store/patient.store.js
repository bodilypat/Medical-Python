/* ******************************************** */
/* File: src/features/patients/patient.store.js */ 
/* ******************************************** */

import { create } from "zustand";

const initialState = {
    patients: [],
    patient: null,

    loading: false,
    saving: false,
    deleting: false,

    error: null,

    total: 0,
    page: 1,
    limit: 10,
};

export const usePatientStore = create((set) => ({
    ...initialState,

    /* Patients */
    setPatients: (patients) =>
        set({
            patients,
        }),

    addPatient: (patient) => 
        set((state) => ({
            patients: [patient, ...state.patients],
        })),

    updatePatient: (updatePatient) => 
        set((state) => ({
            patients: state.patients.map((patient) => 
                patient.id === updatePatient.id
                    ? updatePatient
                    : patient
            ) ,

            patient:
                state.patient?.id === updatePatient.id 
                    ? updatePatient
                    : state.patient,
        })),

    removePatient: (patientId) => 
        set((state) => ({
            patients: state.patients.filter(
                (patient) => patient.id !== patientId  
            ),

            patient:
                state.patient?.id === patientId 
                    ? null 
                    : state.patient, 
        })),

    clearPatients: () => 
        set({
            patientss: [],
        }),
    
    /* Selected Patient */
    setPatient: (patient) => 
        set({
            patient,
        }),

    clearPatient: () => 
        set({
            patient: null,
        }),

    /* Pagination */
    setPagination: ({ page, limmit, total }) => 
        set({
            page,
            limit,
            total,
        }),

    /* Status */
    setLoading: (loading) => 
        set({
            loading,
        }),

    setSaving: (saving) =>
        set({
            saving,
        }),

    setDeleting: (deleting) => 
        set({
            deleting,
        }),
    
    setError: (error) => 
        set({
            error,
        }),

    clearError: () => 
        set({
            error: null,
        }),

    /* Reset Store */
    reset: () => 
        set(initialState),
}));

