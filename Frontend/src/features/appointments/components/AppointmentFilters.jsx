/* ***************************************************************** */
/* File: src/features/appointments/components/AppointmentFilters.jsx */
/* ***************************************************************** */

import { useMemo } from "react";

const STATUS_OPTIONS = [
  {
    value: "scheduled",
    label: "Scheduled",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "no_show",
    label: "No Show",
  },
];

const TYPE_OPTIONS = [
  {
    value: "consultation",
    label: "Consultation",
  },
  {
    value: "follow_up",
    label: "Follow-up",
  },
  {
    value: "checkup",
    label: "General Checkup",
  },
  {
    value: "emergency",
    label: "Emergency",
  },
  {
    value: "procedure",
    label: "Procedure",
  },
];

const DEFAULT_FILTERS = {
  status: "",
  appointmentType: "",
  doctorId: "",
  dateFrom: "",
  dateTo: "",
};

const AppointmentFilters = ({
  filters = DEFAULT_FILTERS,
  doctors = [],
  onChange,
  onReset,
  showDoctor = true,
  showDateRange = true,
  showStatus = true,
  showAppointmentType = true,
  loading = false,
  className = "",
}) => {
  const currentFilters = useMemo(
    () => ({
      ...DEFAULT_FILTERS,
      ...filters,
    }),
    [filters]
  );

  const hasActiveFilters = Object.values(
    currentFilters
  ).some(
    (value) =>
      value !== "" &&
      value !== null &&
      value !== undefined
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    onChange?.({
      ...currentFilters,
      [name]: value,
    });
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
      return;
    }

    onChange?.({
      ...DEFAULT_FILTERS,
    });
  };

  const handleDateFromChange = (event) => {
    const value = event.target.value;

    const nextFilters = {
      ...currentFilters,
      dateFrom: value,
    };

    /* Keep date range valid when the
    ** start date moves beyond the end date. 
    */
    if (
      value &&
      currentFilters.dateTo &&
      value > currentFilters.dateTo
    ) {
      nextFilters.dateTo = value;
    }

    onChange?.(nextFilters);
  };

  const handleDateToChange = (event) => {
    const value = event.target.value;

    const nextFilters = {
      ...currentFilters,
      dateTo: value,
    };

    /* Keep date range valid. */
    if (
      value &&
      currentFilters.dateFrom &&
      value < currentFilters.dateFrom
    ) {
      nextFilters.dateFrom = value;
    }

    onChange?.(nextFilters);
  };

  const getDoctorName = (doctor) => {
    if (doctor.name) {
      return doctor.name.startsWith("Dr.")
        ? doctor.name
        : `Dr. ${doctor.name}`;
    }

    const name = `${doctor.firstName || ""} ${
      doctor.lastName || ""
    }`.trim();

    if (!name) {
      return `Doctor #${doctor.id}`;
    }

    return name.startsWith("Dr.")
      ? name
      : `Dr. ${name}`;
  };

  return (
    <div
      className={[
        "appointment-filters",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="appointment-filters-header">
        <div>
          <h3>Filters</h3>

          {hasActiveFilters && (
            <span className="active-filter-count">
              {Object.values(currentFilters).filter(
                Boolean
              ).length}{" "}
              active
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn btn-link"
            onClick={handleReset}
            disabled={loading}
          >
            Clear all
          </button>
        )}
      </div>

      <div className="appointment-filters-grid">
        {/* Status */}
        {showStatus && (
          <div className="filter-group">
            <label htmlFor="appointment-status-filter">
              Status
            </label>

            <select
              id="appointment-status-filter"
              name="status"
              value={currentFilters.status}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">
                All statuses
              </option>

              {STATUS_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {/* Appointment Type */}
        {showAppointmentType && (
          <div className="filter-group">
            <label htmlFor="appointment-type-filter">
              Appointment Type
            </label>

            <select
              id="appointment-type-filter"
              name="appointmentType"
              value={
                currentFilters.appointmentType
              }
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">
                All types
              </option>

              {TYPE_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {/* Doctor */}
        {showDoctor && (
          <div className="filter-group">
            <label htmlFor="appointment-doctor-filter">
              Doctor
            </label>

            <select
              id="appointment-doctor-filter"
              name="doctorId"
              value={currentFilters.doctorId}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">
                All doctors
              </option>

              {doctors.map((doctor) => (
                <option
                  key={doctor.id}
                  value={doctor.id}
                >
                  {getDoctorName(doctor)}
                  {doctor.specialization
                    ? ` — ${doctor.specialization}`
                    : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date From */}
        {showDateRange && (
          <div className="filter-group">
            <label htmlFor="appointment-date-from">
              From Date
            </label>

            <input
              id="appointment-date-from"
              name="dateFrom"
              type="date"
              value={currentFilters.dateFrom}
              max={currentFilters.dateTo || undefined}
              onChange={handleDateFromChange}
              disabled={loading}
            />
          </div>
        )}

        {/* Date To */}
        {showDateRange && (
          <div className="filter-group">
            <label htmlFor="appointment-date-to">
              To Date
            </label>

            <input
              id="appointment-date-to"
              name="dateTo"
              type="date"
              value={currentFilters.dateTo}
              min={
                currentFilters.dateFrom ||
                undefined
              }
              onChange={handleDateToChange}
              disabled={loading}
            />
          </div>
        )}
      </div>

      {/* Active Filter Summary */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-filters-label">
            Active filters:
          </span>

          {currentFilters.status && (
            <span className="filter-chip">
              Status:{" "}
              {
                STATUS_OPTIONS.find(
                  (option) =>
                    option.value ===
                    currentFilters.status
                )?.label
              }

              <button
                type="button"
                onClick={() =>
                  onChange?.({
                    ...currentFilters,
                    status: "",
                  })
                }
                aria-label="Remove status filter"
              >
                ×
              </button>
            </span>
          )}

          {currentFilters.appointmentType && (
            <span className="filter-chip">
              Type:{" "}
              {
                TYPE_OPTIONS.find(
                  (option) =>
                    option.value ===
                    currentFilters.appointmentType
                )?.label
              }

              <button
                type="button"
                onClick={() =>
                  onChange?.({
                    ...currentFilters,
                    appointmentType: "",
                  })
                }
                aria-label="Remove appointment type filter"
              >
                ×
              </button>
            </span>
          )}

          {currentFilters.doctorId && (
            <span className="filter-chip">
              Doctor:{" "}
              {getDoctorName(
                doctors.find(
                  (doctor) =>
                    String(doctor.id) ===
                    String(
                      currentFilters.doctorId
                    )
                ) || {
                  id: currentFilters.doctorId,
                }
              )}

              <button
                type="button"
                onClick={() =>
                  onChange?.({
                    ...currentFilters,
                    doctorId: "",
                  })
                }
                aria-label="Remove doctor filter"
              >
                ×
              </button>
            </span>
          )}

          {currentFilters.dateFrom && (
            <span className="filter-chip">
              From: {currentFilters.dateFrom}

              <button
                type="button"
                onClick={() =>
                  onChange?.({
                    ...currentFilters,
                    dateFrom: "",
                  })
                }
                aria-label="Remove start date filter"
              >
                ×
              </button>
            </span>
          )}

          {currentFilters.dateTo && (
            <span className="filter-chip">
              To: {currentFilters.dateTo}

              <button
                type="button"
                onClick={() =>
                  onChange?.({
                    ...currentFilters,
                    dateTo: "",
                  })
                }
                aria-label="Remove end date filter"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export {
  DEFAULT_FILTERS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
};

export default AppointmentFilters;
