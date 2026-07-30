/* ************************************************************ */
/* File: src/features/prescriptions/components/PrescriptionSearch.jsx */
/* ************************************************************ */

import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const PrescriptionSearch = ({
    value = "",
    onChange,
    onClear,
    placeholder = "Search by prescription no., patient, or doctor...",
    delay = 300,
}) => {

    const [keyword, setKeyword] = useState(value);

    /* ---------------------------------- */
    /* Sync external value                */
    /* ---------------------------------- */
    useEffect(() => {
        setKeyword(value);
    }, [value]);

    /* ---------------------------------- */
    /* Debounced search                   */
    /* ---------------------------------- */
    useEffect(() => {

        const timer = setTimeout(() => {

            if (onChange) {
                onChange(keyword);
            }

        }, delay);

        return () => clearTimeout(timer);

    }, [keyword, delay, onChange]);

    /* ---------------------------------- */
    /* Clear search                       */
    /* ---------------------------------- */
    const handleClear = () => {

        setKeyword("");

        onChange?.("");

        onClear?.();

    };

    return (
        <div className="prescription-search">

            <div className="search-input-group">

                <span className="search-icon">
                    🔍
                </span>

                <input
                    type="search"
                    className="search-input"
                    placeholder={placeholder}
                    value={keyword}
                    onChange={(event) =>
                        setKeyword(event.target.value)
                    }
                />

                {keyword && (
                    <button
                        type="button"
                        className="search-clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}

            </div>

        </div>
    );
};

PrescriptionSearch.propTypes = {

    value: PropTypes.string,

    onChange: PropTypes.func,

    onClear: PropTypes.func,

    placeholder: PropTypes.string,

    delay: PropTypes.number,

};

export default PrescriptionSearch;