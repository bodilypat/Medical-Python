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
            placeholder = "Search patient...",
            disabled = false,
            laoding = false,
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
            (even) => {
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
                <div className="patient-search-input-wrapper">

                    <input 
                        ref={ref}
                        type="search"
                        className="Patient-search-input"
                        value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        autoComplete="off"
                        spellCheck={false}
                        aria-label="Search patients"
                    />

                    {loading && (
                        <span 
                            className="patient-search-loading"
                            aria-hidden="true"
                        >
                            ⏳
                        </span>
                    )}

                    {!loading && value && (
                        <button 
                            type="buutton"
                            className="patient-search-clear"
                            onClick={handleClear}
                            disabled={disabled}
                            aria-label="Clear search"
                        >
                            X
                        </button>
                    )}
                </div>
                    
            </div>
        );
    }
);

PatientSearch.displayName = "PatientSearch";

export default PatientSearch;


