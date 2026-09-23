/* *********************************************************************** */
/* File: #src/features/medical-records/components/MedicalRecordFilters.jsx */ 
/* *********************************************************************** */

import { useEffect, useState } from "react";

const DEFAULT_FILTERS = {
  doctorId: "",
  diagnosis: "",
  dateFrom: "",
  dateTo: "",
  sortBy: "date",
  sortOrder: "desc",
};

const MedicalRecordFilters = ({
  doctors = [],
  initialFilters = {},
  onApply,
  onReset,
  loading = false,
}) => {
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  useEffect(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      ...initialFilters,
    });
  }, [
    initialFilters.doctorId,
    initialFilters.diagnosis,
    initialFilters.dateFrom,
    initialFilters.dateTo,
    initialFilters.sortBy,
    initialFilters.sortOrder,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleApply = (event) => {
    event.preventDefault();

    onApply?.({
      ...filters,
      diagnosis: filters.diagnosis.trim(),
    });
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    onReset?.(DEFAULT_FILTERS);
  };

  const hasActiveFilters =
    filters.doctorId ||
    filters.diagnosis ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.sortBy !== DEFAULT_FILTERS.sortBy ||
    filters.sortOrder !== DEFAULT_FILTERS.sortOrder;

  const getDoctorName = (doctor) => {
    if (doctor.name) {
      return doctor.name.startsWith("Dr.")
        ? doctor.name
        : `Dr. ${doctor.name}`;
    }

    const name = `${doctor.firstName || ""} ${
      doctor.lastName || ""
    }`.trim();

    return name
      ? name.startsWith("Dr.")
        ? name
        : `Dr. ${name}`
      : `Doctor #${doctor.id}`;
  };

  return (
    <div className="medical-record-filters">
      <form onSubmit={handleApply}>
        <div className="filters-header">
          <div>
            <h3>Filters</h3>
            <p>Refine your medical records</p>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-link"
              onClick={handleReset}
              disabled={loading}
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="filters-grid">
          {/* Doctor */}
          <div className="filter-group">
            <label htmlFor="doctorId">
              Doctor
            </label>

            <select
              id="doctorId"
              name="doctorId"
              value={filters.doctorId}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">All Doctors</option>

              {doctors.map((doctor) => (
                <option
                  key={doctor.id}
                  value={doctor.id}
                >
                  {getDoctorName(doctor)}
                </option>
              ))}
            </select>
          </div>

          {/* Diagnosis */}
          <div className="filter-group">
            <label htmlFor="diagnosis">
              Diagnosis
            </label>

            <input
              id="diagnosis"
              name="diagnosis"
              type="text"
              value={filters.diagnosis}
              onChange={handleChange}
              placeholder="Enter diagnosis"
              disabled={loading}
            />
          </div>

          {/* Date From */}
          <div className="filter-group">
            <label htmlFor="dateFrom">
              Date From
            </label>

            <input
              id="dateFrom"
              name="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Date To */}
          <div className="filter-group">
            <label htmlFor="dateTo">
              Date To
            </label>

            <input
              id="dateTo"
              name="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={handleChange}
              min={filters.dateFrom || undefined}
              disabled={loading}
            />
          </div>

          {/* Sort By */}
          <div className="filter-group">
            <label htmlFor="sortBy">
              Sort By
            </label>

            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="date">
                Record Date
              </option>

              <option value="createdAt">
                Created Date
              </option>

              <option value="patient">
                Patient Name
              </option>

              <option value="doctor">
                Doctor Name
              </option>

              <option value="diagnosis">
                Diagnosis
              </option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="filter-group">
            <label htmlFor="sortOrder">
              Order
            </label>

            <select
              id="sortOrder"
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="desc">
                Descending
              </option>

              <option value="asc">
                Ascending
              </option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="filters-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Applying..." : "Apply Filters"}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleReset}
              disabled={loading}
            >
              Clear All
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MedicalRecordFilters;
