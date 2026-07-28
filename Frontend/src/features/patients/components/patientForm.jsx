/* ****************************************************** */
/* File: src/features/patients/components/PatientForm.jsx */
/* ****************************************************** */

import { usePatientForm } from "../hooks/usePatientForm";

const GENDERS = ["Male", "Female", "other"];

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
    disabled = false,
}) => {
    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
    } = usePatientForm({
        patient,
        onSubmit,
    });

    const fields = [
        {
            name: "first_name",
            label: "First Name",
            type: "text",
            required: true,
            autoComplete: "given-name",
        },
        {
            name: "last_name",
            label: "Last Name",
            type: "text",
            required: true,
            autoComplete: "family-name",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            autoComplete: "email",
        },
        {
            name: "phone",
            label: "Phone",
            type: "tel",
            required: true,
            autoComplete: "tel",
        },
        {
            name: "date_of_birth",
            label: "Date of Birth",
            type: "date",
            required: true,
        }
    ];

    return (
        <form 
            className="patient-form"
            onSubmit={handleSubmit}
            noValidate 
        >
            {fields.map((field) => (
                <div
                    className="form-group"
                    key={field.name}
                >
                    <label htmlFor={field.name}>
                        {field.label}
                    </label>

                    <input 
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name] ?? ""}
                        onChange={handleChange} 
                        autoComplete={field.autoComplete}
                        disabled={disabled || isSubmitting}
                        required={field.required}
                        aria-invalid={!!errors?.[field.name]}
                        aria-describedby={
                            errors?.[field.name]
                                ? `${field.name}-error`
                                : undefined
                        }
                    />

                    {error?.[field.name] && (
                        <small 
                            id={`${field.name}-error`}
                            className="error-text"
                        >
                            {error[field.name]}
                        </small>
                    )}
                </div>
            ))}

            <div className="form-group">
                <label htmlFor="gender">
                    Gender 
                </label>

                <select 
                    id="gender"
                    name="gender"
                    value={formData.gender ?? ""}
                    onChange={handleChange}
                    disabled={disabled || isSubmitint}
                    required
                >
                    <option value="">
                        Select gender
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

                {error?.gender && (
                    <small className="error-text">
                        {error.gender}
                    </small>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="blood_group">
                    Blood Group
                </label>

                <select 
                    id="blood_group"
                    name="blood_group"
                    value={formData.blood_group ?? ""}
                    onChnage={handleChange} 
                    disabled={disabled || isSubmitting}
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

                {errors?.blood_group && (
                    <small className="error-text">
                        {errors.blood_group}
                    </small>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="address">Address</label>

                <textarea 
                    id="address"
                    name="address"
                    rows={4}
                    value={formData.address ?? ""}
                    onChange={handleChange}
                    disabled={disable || isSubmitting}
                    required 
                />

                {errors?.address && (
                    <small className="error-text">{errors.address}</small>
                )}
            </div>

            <div className="form-actions">
                <button 
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>

                <button 
                    type="submit"
                    disabled={disabled || isSubmitting}
                >
                    {isSubmitting
                        ? "Saving..."
                        : patient 
                        ? "Update Patient"
                        : "Add Patient"
                    }
                </button>
            </div>
        </form>
    );
};

export default PatientForm;
