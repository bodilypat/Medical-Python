/* **************************************************************** */
/* File: src/features/appointments/components/AppointmentSearch.jsx */
/* **************************************************************** */

import { useEffect, useState } from "react";

const AppointmentSearch = ({
  value = "",
  onChange,
  placeholder = "Search appointments...",
  debounceMs = 300,
  loading = false,
  disabled = false,
  autoFocus = false,
  className = "",
}) => {
  const [inputValue, setInputValue] =
    useState(value);

  /* Keep the input synchronized when the
  ** parent changes the search value. 
  */
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  /* Debounce search requests so the parent
  ** is not called on every keystroke. 
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== value) {
        onChange?.(inputValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [
    inputValue,
    value,
    debounceMs,
    onChange,
  ]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    onChange?.("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onChange?.(inputValue.trim());
  };

  return (
    <form
      className={[
        "appointment-search",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onSubmit={handleSubmit}
      role="search"
    >
      <div className="appointment-search-input-wrapper">
        <span
          className="appointment-search-icon"
          aria-hidden="true"
        >
          🔍
        </span>

        <input
          type="search"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-label="Search appointments"
          className="appointment-search-input"
        />

        {loading && (
          <span
            className="appointment-search-loading"
            aria-label="Searching"
          >
            <span className="search-spinner" />
          </span>
        )}

        {!loading && inputValue && (
          <button
            type="button"
            className="appointment-search-clear"
            onClick={handleClear}
            disabled={disabled}
            aria-label="Clear search"
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <button
        type="submit"
        className="appointment-search-button"
        disabled={disabled || loading}
      >
        Search
      </button>
    </form>
  );
};

export default AppointmentSearch;
