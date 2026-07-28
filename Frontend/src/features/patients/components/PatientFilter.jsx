/* ******************************************************** */
/* File: src/features/patients/components/PatientFilter.jsx */
/* ******************************************************** */

import { useCallback } from "react";

const GENDER_OPTIONS = [
    {
        label: "All Genders",
        value: "",
    },
    {
        label: "Male",
        value: "Male",
    },
    {
        label: "Female",
        value: "Female",
    },
    {
        label: "Other",
        value: "Other",
    },
];

const BLOOD_GROUP_OPTIONS = [
    {
        label: "All Blood Groups",
        value: "",
    },
    {
        label: "A+",
        value: "A+",
    },
    {
        label: "A-",
        value: "A-",
    },
    {
        label: "B+",
        value: "B+",
    },
    {
        label: "B-",
        value: "B-",
    },
    {
        label: "AB+",
        value: "AB+",
    },
    {
        label: "AB-",
        value: "AB-",
    },
    {
        label: "O+",
        value: "O+",
    },
    {
        label: "O-",
        value: "O-",
    },
];

const PatientFilter = ({
    filters = {},
    onChange,
    onReset,
}) => {
    const handleChange = useCallback(
        (event) => {
            const {
                name,
                value,
            } = event.target;

            onChange?.({
                ...filters,
                [name]: value,
            });
        },
        [filters, onChange]
    );

    return (
        <div className="patient-filter">

            <div className="patient-filter__field">
                <label htmlFor="gender">
                    Gender
                </label>

                <select
                    id="gender"
                    name="gender"
                    value={filters.gender || ""}
                    onChange={handleChange}
                >
                    {GENDER_OPTIONS.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>


            <div className="patient-filter__field">
                <label htmlFor="blood_group">
                    Blood Group
                </label>

                <select
                    id="blood_group"
                    name="blood_group"
                    value={filters.blood_group || ""}
                    onChange={handleChange}
                >
                    {BLOOD_GROUP_OPTIONS.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>


            <div className="patient-filter__actions">

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onReset}
                >
                    Reset
                </button>

            </div>

        </div>
    );
};

export default PatientFilter;
