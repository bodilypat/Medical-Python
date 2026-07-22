/* ****************************************************** */
/* File: src/features/patients/components/PatientForm.jsx */ 
/* ****************************************************** */
import React, { useEffect, useState } from "react";
const initialForm = {
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    phone: "",
    blood_group: "",
    address: "",
};

const PatientForm = ({
    patient = null,
    onSubmit,
    onCancel,
}) => {
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (patient) {
            setFormData({
                first_name: patient.first_name || "",
                last_name: patient.last_name || "",
                gender: patient.gender || "",
                date_of_birth: patient.date_of_birth || "",
                email: patient.email || "",
                phone: patient.phone || "",
                blood_group: patient.blood_group || "",
                address: patient.address || "",
            });
        } else {
            setFormDate(initialForm);
        }
    }, [patient]);

    const handleChange = (event) => {
        const {name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form className="patient-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>First Name</label>
                <input 
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input 
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChnage={handleChange}
                    required
                />
            </div>

            <div class="form-group">
                <label>Gender</label>
                <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required 
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="form-group">
                <label>Date of Birth</label>
                <input 
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
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
                />
            </div>

            <div className="form-group">
                <label>Blood Group</label>
                <select
                    name="blood_grop"
                    value={formData.blood_group}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Blood Group</option>

                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="RH+">RH+</option>
                    <option value="RH-">AH-</option>
                </select>
            </div>

            <div className="form-group">
                <label>Address</label>
                <textarea 
                    name="address"
                    rows="4"
                    value={formData.address}
                    onChange={handlechange}
                    required
                />
            </div>

            <div className="form-actions">
                <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button 
                    type="submit"
                    className="btn bth-primary"
                >
                    {patient ? "Update Patient" : "Add Patient"}
                </button>
            </div>
        </form>
    );
};

export default PientForm;


