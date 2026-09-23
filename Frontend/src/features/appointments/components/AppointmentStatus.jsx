/* ***************************************************************** */
/* File: #src/features/appointments/components/AppointmentStatus.jsx */
/* ***************************************************************** */

import { useState } from "react";

const STATUS_CONFIG = {
  scheduled: {
    label: "Scheduled",
    color: "blue",
    description:
      "The appointment has been scheduled.",
  },
  confirmed: {
    label: "Confirmed",
    color: "green",
    description:
      "The appointment has been confirmed.",
  },
  completed: {
    label: "Completed",
    color: "gray",
    description:
      "The appointment has been completed.",
  },
  cancelled: {
    label: "Cancelled",
    color: "red",
    description:
      "The appointment has been cancelled.",
  },
  no_show: {
    label: "No Show",
    color: "orange",
    description:
      "The patient did not attend the appointment.",
  },
};

const DEFAULT_STATUS = {
  label: "Unknown",
  color: "gray",
  description: "Unknown appointment status.",
};

const STATUS_ORDER = [
  "scheduled",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
];

const AppointmentStatus = ({
  status = "scheduled",
  editable = false,
  onChange,
  disabled = false,
  size = "medium",
  showIcon = true,
  showDescription = false,
  className = "",
  statuses = STATUS_ORDER,
}) => {
  const [updating, setUpdating] =
    useState(false);

  const normalizedStatus = String(
    status || "scheduled"
  ).toLowerCase();

  const config =
    STATUS_CONFIG[normalizedStatus] ||
    DEFAULT_STATUS;

  const handleChange = async (event) => {
    const newStatus = event.target.value;

    if (
      !newStatus ||
      newStatus === normalizedStatus ||
      !onChange
    ) {
      return;
    }

    try {
      setUpdating(true);

      await onChange(newStatus);
    } catch (error) {
      console.error(
        "Failed to change appointment status:",
        error
      );
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIcon = () => {
    switch (normalizedStatus) {
      case "scheduled":
        return "○";

      case "confirmed":
        return "✓";

      case "completed":
        return "✓";

      case "cancelled":
        return "×";

      case "no_show":
        return "!";

      default:
        return "?";
    }
  };

  if (editable) {
    return (
      <div
        className={`appointment-status-control ${className}`}
      >
        <select
          value={normalizedStatus}
          onChange={handleChange}
          disabled={
            disabled || updating
          }
          aria-label="Appointment status"
          className={[
            "appointment-status-select",
            `status-${config.color}`,
            `status-size-${size}`,
          ].join(" ")}
        >
          {statuses.map((statusValue) => {
            const statusConfig =
              STATUS_CONFIG[statusValue];

            if (!statusConfig) {
              return null;
            }

            return (
              <option
                key={statusValue}
                value={statusValue}
              >
                {statusConfig.label}
              </option>
            );
          })}
        </select>

        {updating && (
          <span
            className="appointment-status-loading"
            aria-label="Updating status"
          >
            Updating...
          </span>
        )}
      </div>
    );
  }

  return (
    <span
      className={[
        "appointment-status",
        `status-${config.color}`,
        `status-size-${size}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      title={
        showDescription
          ? config.description
          : config.label
      }
    >
      {showIcon && (
        <span
          className="appointment-status-icon"
          aria-hidden="true"
        >
          {getStatusIcon()}
        </span>
      )}

      <span className="appointment-status-label">
        {config.label}
      </span>
    </span>
  );
};

export {
  STATUS_CONFIG,
  STATUS_ORDER,
};

export default AppointmentStatus;
