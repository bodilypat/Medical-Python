/* ******************************************************** */
/* File: src/features/prescriptions/pages/Prescriptions.jsx */
/* ******************************************************** */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    PrescriptionTable,
    PrescriptionSearch,
    PrescriptionFilter,
    PrescriptionModal,
    PrescriptionForm,
} from "../components";

import {
    usePrescriptions,
} from "../hooks";

const Prescriptions = () => {

    const navigate = useNavigate();
    
    const {
        prescriptions,
        loading,
        error,
        fetchPrescriptions,
        createPrescription,
        editPrescription,
        removePrescription,
    } = usePrescriptions();

    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({
        status: "",
        doctor_id: "",
        patient_id: "",
    });

    const [selectedPrescription, setSelectedPrescription] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    /* ---------------------------------- */
    /* Filter prescription                */
    /* ---------------------------------- */
    const filteredPrescriptions = useMemo(() => {
        let results = [...prescriptions];

        if (search.trim()) {

            const keyword = search.toLowerCase();

            results = results.filter(
                (prescription) => 
                    prescription.patient_name 
                        ?.toLowerCase()
                        .includes(keyword) || 

                    prescription.doctor_name 
                        ?.toLowerCase() 
                        .includes(keyword) || 
                    prescription.presccription_no 
                        ?.toLowerCase()
                        .includes(keyword)
            );
        }

        if (filters.status) {
            results = results.filter(
                (prescription) => 
                    prescription.status ===
                    filters.status 
            );
        }

        if (filters.doctor_id) {
            results = results.filter(
                (prescriptin) =>
                    String(prescription.doctor_id) === String(filters.doctor_id)
            );
        }

        if (filters.patient_id) {
            results = results.filter(
                (prescription) => 
                    String(prescription.patient_id) === String(filters.patient_id)
            );
        }

        return results;
    }, [prescriptions, search, filters]);

    /* ---------------------------------- */
    /* Open create dialog                 */
    /* ---------------------------------- */
    const handleCreate = () => {
        setSelectedPrescription(null);
        setIsModalOpen(true);
    };

    /* ---------------------------------- */
    /* Open edit dialog                   */
    /* ---------------------------------- */
    const handleEdit = (
        prescription 
    ) => {
        setSelectedPrescription(
            prescription 
        );

        setIsModalOpen(true);
    }

    /* ---------------------------------- */
    /* View prescription                  */
    /* ---------------------------------- */
    const handleDelete = async (
        prescription 
    ) => {
        try {
            await removePrescription(
                prescription.id
            );
        } catch (error) {
            console.error(
                "Failed to delete prescription:", error
            );
        }
    };

    /* ---------------------------------- */
    /* Save prescription                  */
    /* ---------------------------------- */
    const handleSubmit = async (
        formData 
    ) => {
        try {
            if (selectedPrescription) {
                await editPrescription(
                    selectedPrescription.id,
                    formData 
                );
            } else {
                await createPrescription(
                    formData 
                ); 
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error(
                "Failed to save prescription:",
                error 
            );
        }
    };

    /* ---------------------------------- */
    /* Close Modal                        */
    /* ---------------------------------- */
    const handleClose = () => {
        setSelectedPrescription9null;
        setIsModalOpen(false);
    };

    return (
        <div className="prescription-page">

            <header className="page-header">
                <div>
                    <h1>Prescriptions</h1>

                    <p>
                        Manage patient
                        Prescriptions.
                    </p>
                </div>

                <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreate}
                >
                    +New Prescription
                </button>
            </header>
            <section className="page-toolbar">

                <PrescriptionSearch 
                    value={search}
                    onChange={setSearch}
                    onClear={() => 
                        setSearch("")
                    }
                />

                <PrescriptionFilter 
                    filters={filters}
                    onChange={setFilters}
                />

            </section>

            {loading && (
                <div className="loading-state">
                    Loading prescriptions... 
                </div>
            )}

            {error && (
                <div className="error-state">

                    <p>{error.message ?? "Unable to load prescriptions."}</p>

                        <button 
                            type="button"
                            onClick={
                                fetchPrescriptions
                            }
                        >
                            Retry 
                        </button>
                    </div>
                )}

            {!loading && !error && (
                    
                <PrescriptionTable
                    prescriptions={filteredPrescriptions}

                    onView={handleView}

                    onEdit={handleEdit}

                    onDelete={handleDelete}
                />
            )}

            <PrescriptionModal
                open={isModalopen}
                title={
                    selectedPrescription
                        ? "Edit Prescription"
                        : "New Prescription"
                }
                onClose={handleClose}
            >
                <PrecriptionForm 
                    prescription={selectedPrescription}

                    onSubmit={handleSubmit}

                    onCancel={handleClose}
                />

                </PrescriptionModal>
        </div>
    );
};

export default Prescriptions;