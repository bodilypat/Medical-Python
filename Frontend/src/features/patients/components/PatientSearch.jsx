/* ******************************************************** */
/* File: src/features/patients/components/PatientSearch.jsx */
/* ******************************************************** */

import { useCallback } from "react";

const PatientSearch = ({
    value = "",
    onChange,
    onClear,
    placeholder = "Search patients...",
}) => {
    const handleChange = useCallback(
        (event) => {
            onChange?.(event.target.value);
        },
        [onChange]
    );

    const handleClear = useCallback(() => {
        onClear?.();
    }, [onClear]);

    return (
        <div className="patient-search">
            <div className="patient-search__input-wrapper">
                <input
                    type="search"
                    className="patient-search__input"
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    aria-label="Search patients"
                />

                {value && (
                    <button
                        type="button"
                        className="patient-search__clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default PatientSearch;
