/* ******************************************************************* */
/* File: #src/features/appointments/components/AppointmentCalendar.jsx */ 
/* ******************************************************************* */

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const STATUS_CONFIG = {
  scheduled: {
    label: "Scheduled",
    className: "status-scheduled",
    color: "#3b82f6",
  },
  confirmed: {
    label: "Confirmed",
    className: "status-confirmed",
    color: "#10b981",
  },
  completed: {
    label: "Completed",
    className: "status-completed",
    color: "#6b7280",
  },
  cancelled: {
    label: "Cancelled",
    className: "status-cancelled",
    color: "#ef4444",
  },
  no_show: {
    label: "No Show",
    className: "status-no-show",
    color: "#f59e0b",
  },
};

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const AppointmentCalendar = ({
  appointments = [],
  loading = false,
  selectedDate: controlledSelectedDate = null,
  onDateChange,
  onAppointmentClick,
  onMonthChange,
  initialDate = new Date(),
  showWeekends = true,
}) => {
  const normalizeDate = (date) => {
    if (!date) {
      return null;
    }

    const parsedDate =
      date instanceof Date
        ? new Date(date)
        : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate()
    );
  };

  const formatDateKey = (date) => {
    if (!date) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const parseAppointmentDate = (appointment) => {
    return normalizeDate(
      appointment?.appointmentDate ||
        appointment?.date
    );
  };

  const today = useMemo(
    () => normalizeDate(new Date()),
    []
  );

  const startDate = normalizeDate(initialDate) || today;

  const [currentDate, setCurrentDate] =
    useState(startDate);

  const [internalSelectedDate, setInternalSelectedDate] =
    useState(
      controlledSelectedDate
        ? normalizeDate(controlledSelectedDate)
        : today
    );

  const selectedDate =
    controlledSelectedDate !== null
      ? normalizeDate(controlledSelectedDate)
      : internalSelectedDate;

  const visibleWeekDays = showWeekends
    ? WEEK_DAYS
    : WEEK_DAYS.slice(1, 6);

  const appointmentsByDate = useMemo(() => {
    const grouped = {};

    appointments.forEach((appointment) => {
      const date =
        parseAppointmentDate(appointment);

      if (!date) {
        return;
      }

      const key = formatDateKey(date);

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(appointment);
    });

    Object.values(grouped).forEach((items) => {
      items.sort((a, b) => {
        const timeA =
          a.startTime ||
          a.start_time ||
          "00:00";

        const timeB =
          b.startTime ||
          b.start_time ||
          "00:00";

        return timeA.localeCompare(timeB);
      });
    });

    return grouped;
  }, [appointments]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(
      year,
      month,
      1
    );

    const lastDay = new Date(
      year,
      month + 1,
      0
    );

    const firstWeekday =
      firstDay.getDay();

    const daysInMonth =
      lastDay.getDate();

    const previousMonthDays =
      firstWeekday;

    const totalCells = showWeekends
      ? Math.ceil(
          (previousMonthDays +
            daysInMonth) /
            7
        ) * 7
      : 35;

    const days = [];

    if (showWeekends) {
      for (
        let index = 0;
        index < totalCells;
        index += 1
      ) {
        const dayNumber =
          index - previousMonthDays + 1;

        const date = new Date(
          year,
          month,
          dayNumber
        );

        days.push({
          date,
          key: formatDateKey(date),
          isCurrentMonth:
            date.getMonth() === month,
          isToday:
            formatDateKey(date) ===
            formatDateKey(today),
          isSelected:
            selectedDate &&
            formatDateKey(date) ===
              formatDateKey(selectedDate),
        });
      }
    } else {
      let mondayOffset =
        firstWeekday === 0
          ? 6
          : firstWeekday - 1;

      const start = new Date(
        year,
        month,
        1 - mondayOffset
      );

      for (let index = 0; index < 35; index += 1) {
        const date = new Date(start);

        date.setDate(
          start.getDate() + index
        );

        days.push({
          date,
          key: formatDateKey(date),
          isCurrentMonth:
            date.getMonth() === month,
          isToday:
            formatDateKey(date) ===
            formatDateKey(today),
          isSelected:
            selectedDate &&
            formatDateKey(date) ===
              formatDateKey(selectedDate),
        });
      }
    }

    return days;
  }, [
    currentDate,
    selectedDate,
    showWeekends,
    today,
  ]);

  const selectedAppointments = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    return (
      appointmentsByDate[
        formatDateKey(selectedDate)
      ] || []
    );
  }, [
    appointmentsByDate,
    selectedDate,
  ]);

  const monthLabel = currentDate.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  const formatTime = (time) => {
    if (!time) {
      return "";
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

    date.setHours(
      hours,
      minutes,
      0,
      0
    );

    return date.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  const formatSelectedDate = () => {
    if (!selectedDate) {
      return "";
    }

    return selectedDate.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
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
        color: "#6b7280",
      }
    );
  };

  const getAppointmentTitle = (
    appointment
  ) => {
    return (
      appointment.reason ||
      appointment.appointmentType ||
      appointment.type ||
      "Appointment"
    );
  };

  const handleDateSelect = (date) => {
    const normalizedDate =
      normalizeDate(date);

    if (!normalizedDate) {
      return;
    }

    setInternalSelectedDate(
      normalizedDate
    );

    onDateChange?.(normalizedDate);

    if (
      normalizedDate.getMonth() !==
      currentDate.getMonth()
    ) {
      setCurrentDate(
        new Date(
          normalizedDate.getFullYear(),
          normalizedDate.getMonth(),
          1
        )
      );

      onMonthChange?.(
        new Date(
          normalizedDate.getFullYear(),
          normalizedDate.getMonth(),
          1
        )
      );
    }
  };

  const changeMonth = (offset) => {
    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    );

    setCurrentDate(nextDate);

    onMonthChange?.(nextDate);
  };

  const goToToday = () => {
    const todayMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    setCurrentDate(todayMonth);

    setInternalSelectedDate(today);

    onDateChange?.(today);

    onMonthChange?.(todayMonth);
  };

  if (loading) {
    return (
      <div className="appointment-calendar-loading">
        <div className="loading-spinner" />
        <p>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="appointment-calendar">
      {/* Calendar Header */}
      <div className="calendar-toolbar">
        <div className="calendar-navigation">
          <button
            type="button"
            className="calendar-nav-button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            ‹
          </button>

          <h2>{monthLabel}</h2>

          <button
            type="button"
            className="calendar-nav-button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={goToToday}
        >
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div
        className={`calendar-grid ${
          showWeekends
            ? "calendar-seven-days"
            : "calendar-five-days"
        }`}
      >
        {/* Weekday Headers */}
        {visibleWeekDays.map((day) => (
          <div
            key={day}
            className="calendar-weekday"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day) => {
          const dayAppointments =
            appointmentsByDate[day.key] ||
            [];

          return (
            <button
              key={day.key}
              type="button"
              className={[
                "calendar-day",
                !day.isCurrentMonth &&
                  "calendar-day-outside",
                day.isToday &&
                  "calendar-day-today",
                day.isSelected &&
                  "calendar-day-selected",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                handleDateSelect(day.date)
              }
            >
              <span className="calendar-day-number">
                {day.date.getDate()}
              </span>

              {dayAppointments.length >
                0 && (
                <div className="calendar-day-appointments">
                  {dayAppointments
                    .slice(0, 3)
                    .map(
                      (appointment) => {
                        const status =
                          getStatus(
                            appointment.status
                          );

                        return (
                          <span
                            key={
                              appointment.id
                            }
                            className={`calendar-appointment-dot ${status.className}`}
                            style={{
                              "--status-color":
                                status.color,
                            }}
                            title={`${formatTime(
                              appointment.startTime ||
                                appointment.start_time
                            )} - ${getPatientName(
                              appointment
                            )}`}
                            onClick={(
                              event
                            ) => {
                              event.stopPropagation();

                              onAppointmentClick?.(
                                appointment
                              );
                            }}
                          >
                            <span className="appointment-dot-time">
                              {formatTime(
                                appointment.startTime ||
                                  appointment.start_time
                              )}
                            </span>

                            <span className="appointment-dot-title">
                              {getPatientName(
                                appointment
                              )}
                            </span>
                          </span>
                        );
                      }
                    )}

                  {dayAppointments.length >
                    3 && (
                    <span className="calendar-more">
                      +
                      {dayAppointments.length -
                        3}{" "}
                      more
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Status Legend */}
      <div className="calendar-legend">
        {Object.entries(
          STATUS_CONFIG
        ).map(([status, config]) => (
          <div
            key={status}
            className="legend-item"
          >
            <span
              className={`legend-dot ${config.className}`}
              style={{
                backgroundColor:
                  config.color,
              }}
            />

            <span>{config.label}</span>
          </div>
        ))}
      </div>

      {/* Selected Day */}
      {selectedDate && (
        <section className="selected-day">
          <div className="selected-day-header">
            <div>
              <h3>
                {formatSelectedDate()}
              </h3>

              <p>
                {selectedAppointments.length}{" "}
                {selectedAppointments.length ===
                1
                  ? "appointment"
                  : "appointments"}
              </p>
            </div>

            <Link
              to={`/appointments/book?date=${formatDateKey(
                selectedDate
              )}`}
              className="btn btn-primary"
            >
              + Book Appointment
            </Link>
          </div>

          {selectedAppointments.length ===
          0 ? (
            <div className="selected-day-empty">
              <div className="empty-state-icon">
                📅
              </div>

              <p>
                No appointments scheduled
                for this day.
              </p>
            </div>
          ) : (
            <div className="selected-day-list">
              {selectedAppointments.map(
                (appointment) => {
                  const status =
                    getStatus(
                      appointment.status
                    );

                  return (
                    <button
                      key={
                        appointment.id
                      }
                      type="button"
                      className="selected-appointment"
                      onClick={() =>
                        onAppointmentClick?.(
                          appointment
                        )
                      }
                    >
                      <div className="selected-appointment-time">
                        <span>
                          {formatTime(
                            appointment.startTime ||
                              appointment.start_time
                          )}
                        </span>

                        <span>
                          {formatTime(
                            appointment.endTime ||
                              appointment.end_time
                          )}
                        </span>
                      </div>

                      <div className="selected-appointment-content">
                        <div className="selected-appointment-header">
                          <strong>
                            {getPatientName(
                              appointment
                            )}
                          </strong>

                          <span
                            className={`status-badge ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>

                        <span className="selected-appointment-doctor">
                          {getDoctorName(
                            appointment
                          )}
                        </span>

                        <span className="selected-appointment-reason">
                          {getAppointmentTitle(
                            appointment
                          )}
                        </span>
                      </div>

                      <span className="appointment-arrow">
                        →
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default AppointmentCalendar;
