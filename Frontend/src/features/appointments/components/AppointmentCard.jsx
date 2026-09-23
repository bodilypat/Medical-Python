/* ************************************************************** */
/* File: src/features/appointments/components/AppointmentCard.jsx */ 
/* ************************************************************** */

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

const AppointmentCard = ({
  appointment,
  onDelete,
  onStatusChange,
  showActions = true,
}) => {
  if (!appointment) {
    return null;
  }

  const getPatientName = () => {
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

  const getDoctorName = () => {
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

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
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

  const getAppointmentType = () => {
    const type =
      appointment.appointmentType ||
      appointment.type;

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

  const getStatus = () => {
    return (
      STATUS_CONFIG[appointment.status] || {
        label: appointment.status || "Unknown",
        className: "status-default",
      }
    );
  };

  const handleDelete = () => {
    if (!onDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete the appointment for ${getPatientName()}?`
    );

    if (confirmed) {
      onDelete(appointment);
    }
  };

  const handleStatusChange = (event) => {
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

  const status = getStatus();
  const patientName = getPatientName();
  const doctorName = getDoctorName();

  const appointmentDate =
    appointment.appointmentDate ||
    appointment.date;

  const startTime =
    appointment.startTime ||
    appointment.start_time;

  const endTime =
    appointment.endTime ||
    appointment.end_time;

  return (
    <article className="appointment-card">
      {/* Header */}
      <div className="appointment-card-header">
        <div className="appointment-card-date">
          <span className="calendar-icon">
            📅
          </span>

          <div>
            <span className="appointment-date">
              {formatDate(appointmentDate)}
            </span>

            <span className="appointment-time">
              {formatTime(startTime)}
              {" - "}
              {formatTime(endTime)}
            </span>
          </div>
        </div>

        {onStatusChange ? (
          <select
            className={`status-select ${status.className}`}
            value={
              appointment.status ||
              "scheduled"
            }
            onChange={handleStatusChange}
            aria-label="Appointment status"
          >
            {Object.entries(
              STATUS_CONFIG
            ).map(([value, config]) => (
              <option
                key={value}
                value={value}
              >
                {config.label}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={`status-badge ${status.className}`}
          >
            {status.label}
          </span>
        )}
      </div>

      {/* People */}
      <div className="appointment-card-people">
        {/* Patient */}
        <div className="person-item">
          <div className="person-avatar patient-avatar">
            {patientName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="person-info">
            <span className="person-label">
              Patient
            </span>

            {appointment.patient?.id ? (
              <Link
                to={`/patients/${appointment.patient.id}`}
                className="person-name"
              >
                {patientName}
              </Link>
            ) : (
              <span className="person-name">
                {patientName}
              </span>
            )}

            {appointment.patient?.email && (
              <span className="person-secondary">
                {appointment.patient.email}
              </span>
            )}
          </div>
        </div>

        {/* Doctor */}
        <div className="person-item">
          <div className="person-avatar doctor-avatar">
            {doctorName
              .replace(/^Dr\.\s*/, "")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="person-info">
            <span className="person-label">
              Doctor
            </span>

            {appointment.doctor?.id ? (
              <Link
                to={`/doctors/${appointment.doctor.id}`}
                className="person-name"
              >
                {doctorName}
              </Link>
            ) : (
              <span className="person-name">
                {doctorName}
              </span>
            )}

            {appointment.doctor
              ?.specialization && (
              <span className="person-secondary">
                {
                  appointment.doctor
                    .specialization
                }
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Information */}
      <div className="appointment-card-body">
        <div className="appointment-info-grid">
          <div className="info-item">
            <span className="info-label">
              Appointment Type
            </span>

            <span className="info-value">
              {getAppointmentType()}
            </span>
          </div>

          <div className="info-item">
            <span className="info-label">
              Reason
            </span>

            <span className="info-value">
              {appointment.reason ||
                "No reason provided"}
            </span>
          </div>
        </div>

        {appointment.notes && (
          <div className="appointment-notes">
            <span className="info-label">
              Notes
            </span>

            <p>{appointment.notes}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="appointment-card-footer">
          <Link
            to={`/appointments/${appointment.id}`}
            className="btn btn-sm btn-secondary"
          >
            View Details
          </Link>

          <Link
            to={`/appointments/${appointment.id}/edit`}
            className="btn btn-sm btn-outline"
          >
            Edit
          </Link>

          {onDelete && (
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </article>
  );
};

export default AppointmentCard;
