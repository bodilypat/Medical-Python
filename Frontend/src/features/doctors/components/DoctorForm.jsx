/* **************************************************** */
/* File: src/features/doctors/components/DoctorForm.jsx */
/* **************************************************** */

import React, { useEffect, useState } from "react";

const initialFormStatus = {
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone: "",

    specialization: "",
    quanlification: "",

    experience: "",
    license_number: "",

    department: "",

    consultation_fee: "",

    status: "active"
};

const DoctorForm = ({
    doctor = null,
    onSubmit,
    onCancel,
    loading = false,
}) => {

    const [formData, setFormData] = useState(
        initialFormStatus
    );

    /* ---------------------------------------- */
    /*     Load Doctor Data for Edit Mode      */
    /* ---------------------------------------- */

    useEffect(() => {

        if (doctor) {

            setFormData({

                first_name: doctor.first_name ?? "",
                last_name: doctor.last_name ?? "",
                gender: doctor.gender ?? "",
                email: doctor.email ?? "",
                phone: doctor.phone ?? "",
                specialization: doctor.specialization ?? "",
                quanlification: doctor.quanlification ?? "",
                experience: doctor.experience ?? "",
                license_number: doctor.license_number ?? "", 
                department: doctor.department ?? "",
                consultation_fee: doctor.consultation_fee ?? "",
                status: doctor.status ?? "active",
            });

        } else {
            
            setFormData( initialFormState );
        }
    }, [doctor]);

    /* ---------------------------------------- */
    /*          Handle Input Change             */
    /* ---------------------------------------- */

    const handleChange = (event) => {
        const {
            name,
            value,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    /* ---------------------------------------- */
    /*                Submit Form               */
    /* ---------------------------------------- */

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!onSubmit) {
            return;
        }

        onSubmit({

            ...formData,
            experience: Number(formData.experience) || 0,
            consultation_fee: Number(formData.consultation_fee) || 0,

        });
    };

    /* ---------------------------------------- */
    /*         Reusable Input Components        */
    /* ---------------------------------------- */
    const renderInput = (
        label,
        name,
        type = "text",
        required = false 
    ) => (

        <div className="form-group">

            <label htmlFor={name}>{label}</label>

            <input 
                id={name}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
            />
        </div>
    );

    return (
        <form className="doctor-form" onSubmit={handleSubmit}>
            {renderInput(
                "first_name",
                "first_name",
                "text",
                true 
            )}

            {renderInput(
                "Last Name",
                "last_name",
                "text",
                true 
            )}

            <div className="form-group">

                <label htmlFor="gender">Gender</label>
                
                <select 
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>

                </select>
            </div>

            {renderInput(
                "Email",
                "email",
                "email",
                true
            )}

            {renderInput(
                "Phone",
                "phone",
                "phone",
                true 
            )}

            {renderInput(
                "Specialiizatin",
                "specialization",
                "specialization"
            )}

            {renderInput(
                "Department",
                "department"
            )}

            {renderInput(
                "Experience (Years)",
                "experience",
                "number"
            )}

            {renderInput(
                "Consulation Fee",
                "consultation_fee",
                "number"
            )}

            <div className="form-group">

                <label htmlFor="status">Status</label>

                <select 
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="leave">On Leave</option>
                </select>

            </div>

            <div className="form-actions">

                <button 
                    type="button"
                    className="cancel-btn"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>

                <button 
                    type="Submit"
                    className="submit-btn"
                    disabled={loading}
                >
                    {
                        loading 
                            ? "Saving..."
                            : doctor 
                                ? "Update Doctor"
                                : "Add Doctor"
                    }

                </button>
            </div>

        </form>
    );
};

export default DoctorForm;

