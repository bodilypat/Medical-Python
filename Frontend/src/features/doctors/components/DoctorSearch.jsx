/* ******************************************************** */
/* File: src/features/doctors/components/DoctorSearch.jsx   */
/* ******************************************************** */

import React, { useEffect, useState } from "react";

const DoctorSearch = ({
    value = "",
    placeholder = "Search by name, email, phone, specialty or license number...",
    delay = 400,
    autoFocus = false,
    showClearButton = true,
    loading = false,
    onSearch,
}) => {
    const [keyword, setKeyword] = useState(value);

    /* Keep local state synchronized */
    useEffect(() => {
        setKeyword(value);
    }, [value]);

    /* Debounced search */
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onSearch) {
                onSearch(keyword.trim());
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [keyword, delay, onSearch]);

    const handleChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (onSearch) {
            onSearch(keyword.trim());
        }
    };

    const handleClear = () => {
        setKeyword("");

        if (onSearch) {
            onSearch("");
        }
    };

    return (
        <form
            className="doctor-search"
            onSubmit={handleSubmit}
        >
            <div className="doctor-search-input">

                <span className="doctor-search-icon">
                    🔍
                </span>

                <input
                    type="search"
                    value={keyword}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    onChange={handleChange}
                />

                {loading && (
                    <span className="doctor-search-loading">
                        Searching...
                    </span>
                )}

                {showClearButton && keyword && (
                    <button
                        type="button"
                        className="doctor-search-clear"
                        onClick={handleClear}
                    >
                        ✕
                    </button>
                )}

            </div>
        </form>
    );
};

export default DoctorSearch;
