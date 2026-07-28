/* ******************************************************** */
/* File: src/features/patients/components/PatientSearch.jsx */
/* ******************************************************** */

import {
    forwardRef,
    useCallback,
} from "react";

const PatientSearch = forwardRef(
    (
        {
            value = "",
            onChange,
            onClear,
            onSearch,
            placeholder = "Search patients...",
            disabled = false,
            loading = false,
            autoFocus = false,
            className = "",
        },
        ref
    ) => {
        const handleChange = useCallback(
            (event) => {
                onChange?.(event.target.value);
            },
            [onChange]
        );

        const handleClear = useCallback(() => {
            onClear?.();
        }, [onClear]);

        const handleKeyDown = useCallback(
            (event) => {
                if (event.key === "Enter") {
                    onSearch?.(value);
                }

                if (event.key === "Escape" && value) {
                    onClear?.();
                }
            },
            [value, onSearch, onClear]
        );

        return (
            <div
                className={`patient-search ${className}`}
                role="search"
            >
                <div className="patient-search__input-wrapper">
                    <input
                        ref={ref}
                        type="search"
                        className="patient-search__input"
                        value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        autoComplete="off"
                        spellCheck={false}
                        aria-label="Search patients"
                    />

                    {loading && (
                        <span
                            className="patient-search__loading"
                            aria-hidden="true"
                        >
                            ⏳
                        </span>
                    )}

                    {!loading && value && (
                        <button
                            type="button"
                            className="patient-search__clear"
                            onClick={handleClear}
                            disabled={disabled}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>
        );
    }
);

PatientSearch.displayName = "PatientSearch";

export default PatientSearch;
