/* **************************************************** */
/* File: src/features/doctors/components/DoctorForm.jsx */
/* **************************************************** */

import React, { useEffect, useState } from "react";

const initialFormState = {
    first_name: "",
    last_name: "",
    specialty: "",
    email: "",
    phone: "",
    license_number: "",
    department: "",
    expirience_years: "",
};

const DoctorForm = ({
    doctor = null,
    onSubmit,
    onCancel,
}) => {
    const [formData, setFormData] = useState(initialFormState);

    /* Load existing doctor data for edit mode */
    useEffect(() => {

        if (doctor) {
            setFormData({
                first_name: doctor.first_name || "",
                last_name: doctor.last_name || "",
                specialty: doctor.specialty || "",
                email: doctor.email || "",
                phone: doctor.phone || "",
                license_number: doctor.lincese_number || "",
                department: doctor.department || "",
                expirience_years:
                    doctor.expirience_years || "",
            });
        } else {
            setFormData(initialFormState);
        }
    }, [doctor]);

    const handleChange = (event) => {

        const  {
            name,
            value,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        onSubmit(formData);
    };

    return (
        <form 
            className="doctor-form"
            onSubmit={handleSubmit}
        >
            <div className="form-group">

                <label>First Name</label>
                
                <input 
                    type="text"
                    name="first-name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required 
                />

            </div>

            <div className="form-group">

                <lable>Last Name</lable>

                <input  
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="form-group">

                <label>Specialty</label>

                <input 
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    required 
                />

            </div>

            <div className="form-group">

                <label>Department</label>

                <input 
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                />

            </div>

            <div className="form-group">
                
                <label>License Number</label>

                <input 
                    type="text"
                    name="license_number"
                    value={formData.license_number}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="fform-group">

                <label>Experience (Years)</label>

                <input 
                    type="number"
                    name="experience_years"
                    value={formData.expirience_years}
                    onChange={handleChange}
                    min="0"
                />

            </div>

            <div className="form-group">

                <label>Email</label>

                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="form-group">
                
                <label>Phone</label>

                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

            </div>

            <div className="form-actions">

                <button 
                    type="button"
                    className="cancel-btn"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button 
                    type="submit"
                    className="submit-btn"
                >
                    {
                        doctor
                            ? "Update Doctor"
                            : "Add Doctor"
                    }
                </button>
            </div>
        </form>
    );
};

export default DoctorForm;