/* **************************************************************** */
/* File: #src/features/medical-records/components/MedicalRecordSearch.jsx */
/* **************************************************************** */

import { useEffect, useState } from "react";

const MedicalRecordSearch = ({
  onSearch,
  initialFilters = {},
  loading = false,
}) => {
  const [filters, setFilters] = useState({
    search: initialFilters.search || "",
    diagnosis: initialFilters.diagnosis || "",
    dateFrom: initialFilters.dateFrom || "",
    dateTo: initialFilters.dateTo || "",
  });

  useEffect(() => {
    setFilters({
      search: initialFilters.search || "",
      diagnosis: initialFilters.diagnosis || "",
      dateFrom: initialFilters.dateFrom || "",
      dateTo: initialFilters.dateTo || "",
    });
  }, [
    initialFilters.search,
    initialFilters.diagnosis,
    initialFilters.dateFrom,
    initialFilters.dateTo,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch?.({
      search: filters.search.trim(),
      diagnosis: filters.diagnosis.trim(),
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
    });
  };

  const handleClear = () => {
    const emptyFilters = {
      search: "",
      diagnosis: "",
      dateFrom: "",
      dateTo: "",
    };

    setFilters(emptyFilters);
    onSearch?.(emptyFilters);
  };

  const hasFilters =
    filters.search ||
    filters.diagnosis ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="medical-record-search">
      <form onSubmit={handleSubmit}>
        <div className="search-row">
          {/* Search */}
          <div className="search-field search-field-main">
            <label htmlFor="medical-record-search">
              Search
            </label>

            <div className="search-input-wrapper">
              <span className="search-icon" aria-hidden="true">
                🔍
              </span>

              <input
                id="medical-record-search"
                name="search"
                type="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Search patient, doctor, diagnosis..."
                disabled={loading}
              />
            </div>
          </div>

          {/* Diagnosis */}
          <div className="search-field">
            <label htmlFor="medical-record-diagnosis">
              Diagnosis
            </label>

            <input
              id="medical-record-diagnosis"
              name="diagnosis"
              type="text"
              value={filters.diagnosis}
              onChange={handleChange}
              placeholder="e.g. Diabetes"
              disabled={loading}
            />
          </div>

          {/* Date From */}
          <div className="search-field">
            <label htmlFor="medical-record-date-from">
              From
            </label>

            <input
              id="medical-record-date-from"
              name="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Date To */}
          <div className="search-field">
            <label htmlFor="medical-record-date-to">
              To
            </label>

            <input
              id="medical-record-date-to"
              name="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="search-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>

            {hasFilters && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleClear}
                disabled={loading}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MedicalRecordSearch;
