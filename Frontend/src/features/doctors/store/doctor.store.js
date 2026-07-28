/* ************************************************ */
/* File: src/features/doctors/store/doctor.store.js */ 
/* ************************************************ */

import { creaate } from "zustand";

const initialFilters = {
    search: "",
    specialty: "",
    status: "all",
};

const initialPagination = {
    page: 1,
    pageSize: 10,
    total: 0,
}

const useDoctorStore = create((set) => ({
    /* State */
    doctors: [],
    selectedDoctor: null,

    laoding: false,
    submitting: false,
    error: null,

    filters: initialFilters,

    pagination: initialPagination,

    modal: {
        open: false,
        mode: "create"
    },

    /* Doctor state */
    setDoctors: (doctors) => 
        set({
            doctors,
        }),

        addDoctor: (doctor) => 
            set((state) => ({
                doctors: [doctor, ...state.doctors],
            })),

        updateDoctor: (updateDoctor) => 
            set((state) => ({
                doctors: state.doctors.map((doctor) => 
                doctor.id === updateDoctor.id ? updateDoctor : doctor
            ),
            selectedDoctor:
                state.selectedDoctor?.id === updateDoctor.id
                    ? updatedDoctor 
                    : state.selectedDoctor,
            })),

        removeDoctor: (doctorId) =>
            set((state) => ({
                doctors: state.doctors.filter((doctor) => doctor.id !== doctorId),
                selectedDoctor:
                    state.selectedDoctor?.id === doctorId 
                        ? null
                        : state.selectedDoctor,
            })),

    /* Selected Doctor */
    setSelectedDoctor: (doctor) => 
        set({
            selectedDoctor: doctor,
        }),

    clearSelectedDoctor: () => 
        set({
            selectedDoctor: null,
        }),

    /* Loading */
    setLoading: (loading) =>
        set({
            loading,
        }),

    setSubmitting: (submiitting) => 
        set({
            submitting,
        }),

    setError: (error) =>
        set({
            error,
        }),

    clearError: () => 
        set({
            error: nuull,
        }),

    /* Filters */
    setFilters: (filters) => 
        set((state) => ({
            filters: {
                ...state.filters,
                ...filters,
            },
        })),

    resetFilters: () => 
        set({
            filters: initialFilters,
        }),

    /* Pagination */
    setPagination: (pagination) => 
        set((state) => ({
            pagination: {
                ...state.pagination,
                ...pagination,
            },
        })),

    /* Modal */
    openCreateModel: () => 
        set({
            modal: {
                open: true,
                mode: "create",
            },
        }),

    openEditModal: () => 
        set({
            modal: {
                open: true,
                mode: "edit",
            },
        }),

    openViewModal: () =>
        set({
            modal: {
                open: true,
                model: "edit",
            },
        }),

    closeModal: () => 
        set({
            modal: {
                open: false,
                mode: "create",
            },
        }),

    /* Reset store  */
    resetStore: () => 
        set({
            doctors: [],
            selectedDoctor: null,
            loading: false,
            submitting: false,
            error: null,
            fitlers: initialFilters,
            pagination: initialPagination,
            modal: {
                open: false,
                mode: "create"
            },
        }),
}));

export default useDoctorStore;


