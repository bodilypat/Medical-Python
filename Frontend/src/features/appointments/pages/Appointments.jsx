/* ****************************************************** */
/* File: #src/features/appointments/pages/Appointments.jsx */
/* ****************************************************** */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";

import AppointmentSearch from "../components/AppointmentSearch";
import AppointmentFilters from "../components/AppointmentFilters";
import AppointmentTable from "../components/AppointmentTable";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentCalendar from "../components/AppointmentCalendar";

import useAppointments from "../hooks/useAppointments";

const DEFAULT_FILTERS = {
  status: "",
  appointmentType: "",
  doctorId: "",
  dateFrom: "",
  dateTo: "",
};

const VIEW_MODES = {
  TABLE: "table",
  CARD: "card",
  CALENDAR: "calendar",
};

const Appointments = () => {
  const navigate = useNavigate();

  const [search, setSearch] =
    useState("");

  const [filters, setFilters] =
    useState(DEFAULT_FILTERS);

  const [viewMode, setViewMode] =
    useState(VIEW_MODES.TABLE);

  const [selectedDate, setSelectedDate] =
    useState(null);

  const [page, setPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const [actionError, setActionError] =
    useState("");

  /*
   * The hook is intentionally called with the
   * current search/filter/pagination state.
   *
   * It can support either:
   *   useAppointments(params)
   *
   * or be adapted to your existing hook API.
   */
  const {
    appointments = [],
    doctors = [],
    loading = false,
    error = "",
    pagination = {},
    total = 0,
    fetchAppointments,
    deleteAppointment,
    updateAppointment,
    updateAppointmentStatus,
  } = useAppointments({
    search,
    ...filters,
    page,
    pageSize,
  });

  /*
   * Some implementations expose totalItems,
   * currentPage, or totalPages instead of
   * a pagination object.
   */
  const totalItems =
    pagination.totalItems ??
    pagination.total ??
    total ??
    appointments.length;

  const currentPage =
    pagination.currentPage ??
    pagination.page ??
    page;

  const totalPages =
    pagination.totalPages ??
    Math.max(
      1,
      Math.ceil(
        totalItems / pageSize
      )
    );

  /* Reload appointments after an action. */
  const reloadAppointments =
    useCallback(async () => {
      if (fetchAppointments) {
        await fetchAppointments({
          search,
          ...filters,
          page,
          pageSize,
        });
      }
    }, [
      fetchAppointments,
      search,
      filters,
      page,
      pageSize,
    ]);

  /*
   * Reset to page 1 when search/filter
   * criteria change.
   */
  useEffect(() => {
    setPage(1);
  }, [search, filters]);

  /* Search */
  const handleSearch = useCallback(
    (value) => {
      setSearch(value);
      setPage(1);
    },
    []
  );

  /* Filters */
  const handleFiltersChange =
    useCallback((nextFilters) => {
      setFilters({
        ...DEFAULT_FILTERS,
        ...nextFilters,
      });

      setPage(1);
    }, []);

  const handleFiltersReset =
    useCallback(() => {
      setFilters(DEFAULT_FILTERS);
      setPage(1);
    }, []);

  /* View mode */
  const handleViewChange = (
    mode
  ) => {
    setViewMode(mode);
  };

  /* Appointment details */
  const handleAppointmentClick = (
    appointment
  ) => {
    if (!appointment?.id) {
      return;
    }

    navigate(
      `/appointments/${appointment.id}`
    );
  };

  /* Create appointment */
  const handleCreateAppointment = () => {
    navigate("/appointments/book");
  };

  /* Edit appointment */
  const handleEditAppointment = (
    appointment
  ) => {
    if (!appointment?.id) {
      return;
    }

    navigate(
      `/appointments/${appointment.id}/edit`
    );
  };

  /* Delete appointment */
  const handleDeleteAppointment =
    async (appointment) => {
      if (!appointment?.id) {
        return;
      }

      const patientName =
        getPatientName(appointment);

      const confirmed =
        window.confirm(
          `Are you sure you want to delete the appointment for ${patientName}?`
        );

      if (!confirmed) {
        return;
      }

      try {
        setActionError("");

        if (deleteAppointment) {
          await deleteAppointment(
            appointment.id
          );
        }

        await reloadAppointments();
      } catch (err) {
        setActionError(
          err?.message ||
            "Failed to delete appointment."
        );
      }
    };

  /* Update status */
  const handleStatusChange =
    async (
      appointment,
      newStatus
    ) => {
      if (!appointment?.id) {
        return;
      }

      try {
        setActionError("");

        if (updateAppointmentStatus) {
          await updateAppointmentStatus(
            appointment.id,
            newStatus
          );
        } else if (updateAppointment) {
          await updateAppointment(
            appointment.id,
            {
              status: newStatus,
            }
          );
        }

        await reloadAppointments();
      } catch (err) {
        setActionError(
          err?.message ||
            "Failed to update appointment status."
        );
      }
    };

  /* Calendar date */
  const handleCalendarDateChange =
    (date) => {
      setSelectedDate(date);
    };

  /* Calendar month */
  const handleCalendarMonthChange =
    (date) => {
      setSelectedDate(
        (current) =>
          current || date
      );
    };

  /* Pagination */
  const handlePageChange = (
    nextPage
  ) => {
    if (
      nextPage < 1 ||
      nextPage > totalPages
    ) {
      return;
    }

    setPage(nextPage);
  };

  const handlePageSizeChange = (
    event
  ) => {
    const nextPageSize = Number(
      event.target.value
    );

    setPageSize(nextPageSize);
    setPage(1);
  };

  /* Card view actions */
  const renderCards = useMemo(() => {
    if (!appointments.length) {
      return null;
    }

    return (
      <div className="appointments-card-grid">
        {appointments.map(
          (appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onClick={
                handleAppointmentClick
              }
              onEdit={
                handleEditAppointment
              }
              onDelete={
                handleDeleteAppointment
              }
              onStatusChange={
                handleStatusChange
              }
            />
          )
        )}
      </div>
    );
  }, [
    appointments,
    handleStatusChange,
  ]);

  /* Empty state */
  const hasActiveFilters =
    Boolean(search) ||
    Object.values(filters).some(
      Boolean
    );

  const renderEmptyState = () => (
    <div className="appointments-empty">
      <div
        className="appointments-empty-icon"
        aria-hidden="true"
      >
        📅
      </div>

      <h3>
        No appointments found
      </h3>

      <p>
        {hasActiveFilters
          ? "Try changing your search or filters."
          : "There are no appointments to display yet."}
      </p>

      {hasActiveFilters ? (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setSearch("");
            setFilters(
              DEFAULT_FILTERS
            );
            setPage(1);
          }}
        >
          Clear Search & Filters
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={
            handleCreateAppointment
          }
        >
          + Book Appointment
        </button>
      )}
    </div>
  );

  /* Error state */
  const renderError = () => {
    if (!error && !actionError) {
      return null;
    }

    return (
      <div
        className="appointments-error"
        role="alert"
      >
        <span
          className="appointments-error-icon"
          aria-hidden="true"
        >
          !
        </span>

        <div>
          <strong>
            Unable to load appointments
          </strong>

          <p>
            {actionError ||
              error ||
              "Something went wrong."}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setActionError("");
            reloadAppointments();
          }}
        >
          Retry
        </button>
      </div>
    );
  };

  return (
    <main className="appointments-page">
      {/* Page Header */}
      <header className="appointments-page-header">
        <div>
          <div className="appointments-breadcrumb">
            <Link to="/dashboard">
              Dashboard
            </Link>

            <span>/</span>

            <span>Appointments</span>
          </div>

          <h1>Appointments</h1>

          <p>
            Manage patient appointments,
            schedules, and availability.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={
            handleCreateAppointment
          }
        >
          <span aria-hidden="true">
            +
          </span>
          Book Appointment
        </button>
      </header>

      {renderError()}

      {/* Toolbar */}
      <section className="appointments-toolbar">
        <div className="appointments-search-container">
          <AppointmentSearch
            value={search}
            onChange={handleSearch}
            loading={loading}
            placeholder="Search by patient, doctor, appointment ID..."
          />
        </div>

        <div className="appointments-view-controls">
          <div
            className="view-switcher"
            role="group"
            aria-label="Appointment view"
          >
            <button
              type="button"
              className={
                viewMode ===
                VIEW_MODES.TABLE
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleViewChange(
                  VIEW_MODES.TABLE
                )
              }
              aria-label="Table view"
              aria-pressed={
                viewMode ===
                VIEW_MODES.TABLE
              }
            >
              ☷
              <span>Table</span>
            </button>

            <button
              type="button"
              className={
                viewMode ===
                VIEW_MODES.CARD
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleViewChange(
                  VIEW_MODES.CARD
                )
              }
              aria-label="Card view"
              aria-pressed={
                viewMode ===
                VIEW_MODES.CARD
              }
            >
              ▦
              <span>Cards</span>
            </button>

            <button
              type="button"
              className={
                viewMode ===
                VIEW_MODES.CALENDAR
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleViewChange(
                  VIEW_MODES.CALENDAR
                )
              }
              aria-label="Calendar view"
              aria-pressed={
                viewMode ===
                VIEW_MODES.CALENDAR
              }
            >
              □
              <span>Calendar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      {viewMode !==
        VIEW_MODES.CALENDAR && (
        <section className="appointments-filters-section">
          <AppointmentFilters
            filters={filters}
            doctors={doctors}
            onChange={
              handleFiltersChange
            }
            onReset={
              handleFiltersReset
            }
            loading={loading}
          />
        </section>
      )}

      {/* Results */}
      <section className="appointments-content">
        {/* Result Header */}
        <div className="appointments-results-header">
          <div>
            <h2>
              {viewMode ===
              VIEW_MODES.CALENDAR
                ? "Appointment Calendar"
                : "Appointment List"}
            </h2>

            {!loading &&
              viewMode !==
                VIEW_MODES.CALENDAR && (
                <span>
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "appointment"
                    : "appointments"}
                </span>
              )}
          </div>

          {viewMode !==
            VIEW_MODES.CALENDAR && (
            <div className="appointments-page-size">
              <label htmlFor="page-size">
                Show
              </label>

              <select
                id="page-size"
                value={pageSize}
                onChange={
                  handlePageSizeChange
                }
              >
                <option value="10">
                  10
                </option>
                <option value="25">
                  25
                </option>
                <option value="50">
                  50
                </option>
                <option value="100">
                  100
                </option>
              </select>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="appointments-loading">
            <div className="appointments-spinner" />

            <p>
              Loading appointments...
            </p>
          </div>
        )}

        {/* Calendar */}
        {!loading &&
          viewMode ===
            VIEW_MODES.CALENDAR && (
            <AppointmentCalendar
              appointments={
                appointments
              }
              loading={loading}
              selectedDate={
                selectedDate
              }
              onDateChange={
                handleCalendarDateChange
              }
              onMonthChange={
                handleCalendarMonthChange
              }
              onAppointmentClick={
                handleAppointmentClick
              }
            />
          )}

        {/* Table */}
        {!loading &&
          viewMode ===
            VIEW_MODES.TABLE &&
          (appointments.length > 0 ? (
            <AppointmentTable
              appointments={
                appointments
              }
              loading={loading}
              onClick={
                handleAppointmentClick
              }
              onEdit={
                handleEditAppointment
              }
              onDelete={
                handleDeleteAppointment
              }
              onStatusChange={
                handleStatusChange
              }
            />
          ) : (
            renderEmptyState()
          ))}

        {/* Cards */}
        {!loading &&
          viewMode ===
            VIEW_MODES.CARD &&
          (appointments.length > 0 ? (
            renderCards
          ) : (
            renderEmptyState()
          ))}
      </section>

      {/* Pagination */}
      {!loading &&
        viewMode !==
          VIEW_MODES.CALENDAR &&
        appointments.length > 0 && (
          <footer className="appointments-pagination">
            <div className="pagination-summary">
              Showing{" "}
              <strong>
                {Math.min(
                  (currentPage - 1) *
                    pageSize +
                    1,
                  totalItems
                )}
              </strong>{" "}
              to{" "}
              <strong>
                {Math.min(
                  currentPage *
                    pageSize,
                  totalItems
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {totalItems}
              </strong>
            </div>

            <div className="pagination-controls">
              <button
                type="button"
                disabled={
                  currentPage <= 1
                }
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
                aria-label="Previous page"
              >
                ←
              </button>

              {getPageNumbers(
                currentPage,
                totalPages
              ).map((pageNumber) =>
                pageNumber ===
                "ellipsis" ? (
                  <span
                    key={`ellipsis-${Math.random()}`}
                    className="pagination-ellipsis"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={pageNumber}
                    type="button"
                    className={
                      pageNumber ===
                      currentPage
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handlePageChange(
                        pageNumber
                      )
                    }
                  >
                    {pageNumber}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={
                  currentPage >=
                  totalPages
                }
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
                aria-label="Next page"
              >
                →
              </button>
            </div>
          </footer>
        )}
    </main>
  );
};

/* Helpers */

const getPatientName = (
  appointment
) => {
  if (
    appointment?.patient?.name
  ) {
    return appointment.patient.name;
  }

  if (appointment?.patientName) {
    return appointment.patientName;
  }

  const name = `${appointment?.patient?.firstName || ""} ${
    appointment?.patient?.lastName || ""
  }`.trim();

  return name || "this patient";
};

const getPageNumbers = (
  currentPage,
  totalPages
) => {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  const pages = [];

  pages.push(1);

  if (currentPage > 4) {
    pages.push("ellipsis");
  }

  const start = Math.max(
    2,
    currentPage - 1
  );

  const end = Math.min(
    totalPages - 1,
    currentPage + 1
  );

  for (
    let page = start;
    page <= end;
    page += 1
  ) {
    pages.push(page);
  }

  if (
    currentPage <
    totalPages - 3
  ) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
};

export default Appointments;
