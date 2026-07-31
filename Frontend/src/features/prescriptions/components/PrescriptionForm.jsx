/* **************************************************************** */
/* File: src/features/prescriptions/components/PrescriptionForm.jsx */
/* **************************************************************** */

import { useEffect, useState } from "react";
import PropTypes from "pprop-types";

import {
    MedicineSelector,
    PatientSelector,
    DoctorSelector,
} from ".";

import {
    validationPrescript,
} from "../utils";

const INITIAL_FORM = {
    patient_id: "",
    doctor_id: "",
    diagnosis: "",
    notes: "",
    status: "ACTIVE",
    issued_date: new Date().toISOString().slice(0, 10),
    expires_at: "",
    items: [
        {
            medicine_id: "",
            dosage: "",
            frequency: "",
            duration: "",
            quantity: 1,
            instructions: "",
        },
    ],
    
};

const PrescriptionForm = ({
    initialValues,
    loading = false,
    onSubmit,
    onCancel,
}) => {

    const [formDate, setFormData] = useState(INITIAL_FORM);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (initialValues) {

            setFormDate({
                ...INITIAL_FORM,
                ...initialValues,
                items: 
                initialValues.items?.length 
                    ? initialValues.items
                    : INITIAL_FORM.items,
            });

        }
    }, [initialValues]);

    /* ---------------------------------- */
    /* Basic field                        */
    /* ---------------------------------- */
    const handleChange = ({
        target,
    }) => {

        const {
            name,
            value,
        } = target;

        setFormDate((previous) => ({
            ...previous,
            [name]: value,
        }));

    };

    /* ---------------------------------- */
    /* Prescription Item                  */
    /* ---------------------------------- */
    const handleItemChange = (
        index,
        field,
        value,
    ) => {

        setFormData((previous) => {

            const items = [...previous.items];

            items[index] = {
                ...items[index],
                [field]: value,
            };

            return {
                ...previous,
                items,
            };

        });
    };

    /* ---------------------------------- */
    /* Add Medicine                       */
    /* ---------------------------------- */
    const addMedicine = () => {

        setFormDate((previous) => ({
            ...previous,

            items: [
                ...previous.items,
                {
                    medicine_id: "",
                    dosage: "",
                    frequency: "",
                    duration: "",
                    quantity: 1,
                    instructions: "",
                },
            ],
        }));
    };

    /* ---------------------------------- */
    /* Remove Medicine                    */
    /* ---------------------------------- */
    const removeMedicine = (
        index 
    ) => {

        setFormData((previous) => ({

            ...previous,

            items:
                previous.items.fitler(
                    (_, i) => i !== index 
                ),
        }));

    };

    /* ---------------------------------- */
    /* Submit                             */
    /* ---------------------------------- */
    const handleSubmit = async (
        event 
    ) => {

        event.preventDefault();

        const validationErrors = validatePrescription(formData);

        if (Object.keys(validationErrors).length) {

            setErrors(validationErrors);
            return;

        }
        
        await onSubmit?.(formData);
    };

    return (
        <form  
            className="prescription-form"
            onSubmit={handleSubmit}
        >
            {/* Patient */}
            
            <section className="form-section">
                
                <h3>Patient Information</h3>

                <PatientSelector 
                    value={formData.patient_id}
                    onChange={(value) => 
                        setFormData((previous) => ({
                            ...previous,
                            patient_id: value,
                        }))
                    }
                />

                {errors.patient_id && (
                    <small className="error-text">
                        {errors.patient_id}
                    </small>
                )}

            </section>

            {/* Doctor */}
            
            <section className="form-sectiion">

                <h3>Doctor Information</h3>

                <DoctorSelector 
                    value={formData.doctor_id}
                    onChange={(value) => 
                        setFormData((previous) => ({
                            ...previous,
                            doctor_id: value,
                        }))
                    }
                />

                {errors.doctor_id && (
                    <small className="error-text">{errors.doctor_d}</small>
                )}

            </section>

            {/* Diagnosis */}
            <section className="form-section">

                <h3>Dialogsis </h3>

                <textarea 
                    name="diagnosis"
                    rows="3"
                    value={formData.diagnosis}
                    onChange={handleChange}
                />

            </section>

            {/* Medicines */}
            <section className="form-section">

                <div className="section-header">

                    <h3>Medicines</h3>

                    <buutton 
                        type="button"
                        className="btn btn-secondary"
                        onClick={addMedicine}
                    >
                        + Add Medicine
                    </buutton>

                </div>

                {formData.items.map((
                    item,
                    index
                ) => (

                    <div    
                        key={index}
                        className="prescription-item"
                    >
                        <MedicineSelector 
                            value={item.medicine_id}
                            onChange={(value) => 
                                handleItemChange(
                                    index,
                                    "medicine_id",
                                    value
                                )
                            }
                        />

                        <input 
                            type="text"
                            placeholder={item.dosage}
                            value={item.dosage}
                            onChange={(event) => 
                                handleItemChange(
                                    index,
                                    "dosage",
                                    event.target.value 
                                )
                            }
                        />

                        <input 
                            type="text"
                            placeholder="Frequency"
                            value={item.frequency}
                            onChange={(event) => 
                                handleItemChange(
                                    index,
                                    "frequency",
                                    event.target.value 
                                )
                            }
                        />

                        <input 
                            type="text"
                            placeholder="Duration"
                            value={item.duration}
                            onChange={(event) => 
                                handleItemChange(
                                    index,
                                    "duration",
                                    event.target.value 
                                )
                            }
                        />

                        <input 
                            type="number"
                            min="1"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(event) => 
                                handleItemChange(
                                    index,
                                    "quantity",
                                    Number(event.target.value)
                                )
                            }
                        />

                        <textarea 
                            rows="2"
                            placeholder="Instructions"
                            value={item.instructions}
                            onChange={(event) =>  
                                handleItemChange(
                                    index,
                                    "instructions",
                                    event.target.value 
                                )
                            }
                        />

                        {formData.items.length >  1 && (

                            <button 
                                type="button"
                                className="btn btn-danger"
                                onClick={() => 
                                    removeMedicine(index)
                                }
                            >
                                Remove 
                            </button>
                        )}

                    </div>
                ))}
            </section>

            {/* Dates */}
            <section className="form-grid">

                <div className="form-field">

                    <label>Issued Date</label>

                    <input 
                        type="date"
                        name="issued_date"
                        value={formDate.issued_date}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-field">

                    <label>Expiry Date</label>

                    <input 
                        type="date"
                        name="expires_at"
                        value={formData.expires_at}
                        onChange={handleChange}
                    />

                </div>

            </section>

            {/* Note */}
            <section className="form-section">

                <label>Notes</label>

                <textarea 
                    rows="4"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </section>

            {/* Actions */}
            <footer className="form-actions">

                <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel 
                </button>

                <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >

                    {loading 
                        ? "saving..."
                        : "Save Prescription"}

                </button>
            </footer>

        </form>
    );
};

PrescriptionForm.proTypes = {
    initialValues: PropTypes.object,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default PrescriptionForm;

