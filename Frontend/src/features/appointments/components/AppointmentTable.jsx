/* *************************************************************** */
/* File: src/features/appointments/components/AppointmentTable.jsx */ 
/* *************************************************************** */

import { Link } from "react-router-dom";

const STATUS_CONFIG = {
  scheduled: {
    label: "Scheduled",
    className: "status-scheduled",
  },
  confirmed: {
    label: "Confirmed",
    className: "status-confirmed",
  },
  completed: {
    label: "Completed",
    className: "status-completed",
  },
  cancelled: {
    label: "Cancelled",
    className: "status-cancelled",
  },
  no_show: {
    label: "No Show",
    className: "status-no-show",
  },
};

const TYPE_LABELS = {
  consultation: "Consultation",
  follow_up: "Follow-up",
  checkup: "General Checkup",
  emergency: "Emergency",
  procedure: "Procedure",
};

const AppointmentTable = ({
  appointments = [],
  loading = false,
  onDelete,
  onStatusChange,
}) => {
  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) {
      return "N/A";
    }

    const [hours, minutes] = time
      .split(":")
      .map(Number);

    if (
      Number.isNaN(hours) ||
      Number.isNaN(minutes)
    ) {
      return time;
    }

    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getPatientName = (appointment) => {
    if (appointment.patient?.name) {
      return appointment.patient.name;
    }

    if (appointment.patientName) {
      return appointment.patientName;
    }

    const name = `${appointment.patient?.firstName || ""} ${
      appointment.patient?.lastName || ""
    }`.trim();

    return name || "Unknown Patient";
  };

  const getDoctorName = (appointment) => {
    let name = "";

    if (appointment.doctor?.name) {
      name = appointment.doctor.name;
    } else if (appointment.doctorName) {
      name = appointment.doctorName;
    } else {
      name = `${appointment.doctor?.firstName || ""} ${
        appointment.doctor?.lastName || ""
      }`.trim();
    }

    if (!name) {
      return "Unknown Doctor";
    }

    return name.startsWith("Dr.")
      ? name
      : `Dr. ${name}`;
  };

  const getStatus = (status) => {
    return (
      STATUS_CONFIG[status] || {
        label: status || "Unknown",
        className: "status-default",
      }
    );
  };

  const getAppointmentType = (type) => {
    if (!type) {
      return "N/A";
    }

    return (
      TYPE_LABELS[type] ||
      type
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        )
    );
  };

  const handleDelete = (appointment) => {
    if (!onDelete) {
      return;
    }

    const patientName =
      getPatientName(appointment);

    const confirmed = window.confirm(
      `Are you sure you want to delete the appointment for ${patientName}?`
    );

    if (confirmed) {
      onDelete(appointment);
    }
  };

  const handleStatusChange = (
    appointment,
    event
  ) => {
    const newStatus = event.target.value;

    if (
      newStatus &&
      newStatus !== appointment.status
    ) {
      onStatusChange?.(
        appointment,
        newStatus
      );
    }
  };

  if (loading) {
    return (
      <div className="table-container">
        <div className="table-loading">
          <div className="loading-spinner" />
          <p>Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          📅
        </div>

        <h3>No Appointments</h3>

        <p>
          There are currently no appointments to
          display.
        </p>

        <Link
          to="/appointments/book"
          className="btn btn-primary"
        >
          + Book Appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Reason</th>
              <th>Status</th>
              <th className="actions-column">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => {
              const status = getStatus(
                appointment.status
              );

              return (
                <tr key={appointment.id}>
                  {/* Patient */}
                  <td>
                    <div className="patient-cell">
                      <div className="patient-avatar">
                        {getPatientName(appointment)
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <Link
                          to={`/appointments/${appointment.id}`}
                          className="patient-name"
                        >
                          {getPatientName(
                            appointment
                          )}
                        </Link>

                        {appointment.patient
                          ?.email && (
                          <span className="patient-email">
                            {
                              appointment.patient
                                .email
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td>
                    <div className="doctor-cell">
                      <span className="doctor-name">
                        {getDoctorName(
                          appointment
                        )}
                      </span>

                      {appointment.doctor
                        ?.specialization && (
                        <span className="doctor-specialization">
                          {
                            appointment.doctor
                              .specialization
                          }
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Date */}
                  <td>
                    <span className="appointment-date">
                      {formatDate(
                        appointment.appointmentDate ||
                          appointment.date
                      )}
                    </span>
                  </td>

                  {/* Time */}
                  <td>
                    <div className="appointment-time">
                      <span>
                        {formatTime(
                          appointment.startTime ||
                            appointment.start_time
                        )}
                      </span>

                      <span className="time-separator">
                        -
                      </span>

                      <span>
                        {formatTime(
                          appointment.endTime ||
                            appointment.end_time
                        )}
                      </span>
                    </div>
                  </td>

                  {/* Type */}
                  <td>
                    <span className="appointment-type">
                      {getAppointmentType(
                        appointment.appointmentType ||
                          appointment.type
                      )}
                    </span>
                  </td>

                  {/* Reason */}
                  <td>
                    <span
                      className="appointment-reason"
                      title={
                        appointment.reason || ""
                      }
                    >
                      {appointment.reason ||
                        "No reason provided"}
                    </span>
                  </td>

                  {/* Status */}
                  <td>
                    {onStatusChange ? (
                      <select
                        className={`status-select ${status.className}`}
                        value={
                          appointment.status ||
                          "scheduled"
                        }
                        onChange={(event) =>
                          handleStatusChange(
                            appointment,
                            event
                          )
                        }
                      >
                        {Object.entries(
                          STATUS_CONFIG
                        ).map(
                          ([
                            value,
                            config,
                          ]) => (
                            <option
                              key={value}
                              value={value}
                            >
                              {config.label}
                            </option>
                          )
                        )}
                      </select>
                    ) : (
                      <span
                        className={`status-badge ${status.className}`}
                      >
                        {status.label}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="table-actions">
                      <Link
                        to={`/appointments/${appointment.id}`}
                        className="btn btn-sm btn-secondary"
                        title="View appointment"
                      >
                        View
                      </Link>

                      <Link
                        to={`/appointments/${appointment.id}/edit`}
                        className="btn btn-sm btn-outline"
                        title="Edit appointment"
                      >
                        Edit
                      </Link>

                      {onDelete && (
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDelete(
                              appointment
                            )
                          }
                          title="Delete appointment"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Showing {appointments.length}{" "}
          {appointments.length === 1
            ? "appointment"
            : "appointments"}
        </span>
      </div>
    </div>
  );
};

export default AppointmentTable;
