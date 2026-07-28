/* ******************************************************* */
/* File: src/features/patients/components/PatientForm.jsx  */
/* ******************************************************* */

import { usePatientForm } from "../hooks/usePatientForm";

const GENDERS = ["Male", "Female", "Other"];

const BLOOD_GROUPS = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
];

const PatientForm = ({
    patient = null,
    onSubmit,
    onCancel,
}) => {
    const {
        formData,
        handleChange,
        handleSubmit,
        isSubmitting,
    } = usePatientForm({
        patient,
        onSubmit,
    });

    return (
        <form
            className="patient-form"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="form-group">
                <label htmlFor="first_name">
                    First Name
                </label>

                <input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="last_name">
                    Last Name
                </label>

                <input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="gender">
                    Gender
                </label>

                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Gender
                    </option>

                    {GENDERS.map((gender) => (
                        <option
                            key={gender}
                            value={gender}
                        >
                            {gender}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="date_of_birth">
                    Date of Birth
                </label>

                <input
                    id="date_of_birth"
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">
                    Phone
                </label>

                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="blood_group">
                    Blood Group
                </label>

                <select
                    id="blood_group"
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Blood Group
                    </option>

                    {BLOOD_GROUPS.map((group) => (
                        <option
                            key={group}
                            value={group}
                        >
                            {group}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="address">
                    Address
                </label>

                <textarea
                    id="address"
                    name="address"
                    rows={4}
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-actions">
                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Saving..."
                        : patient
                        ? "Update Patient"
                        : "Add Patient"}
                </button>
            </div>
        </form>
    );
};

export default PatientForm;
