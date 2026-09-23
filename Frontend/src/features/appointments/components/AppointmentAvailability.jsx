/* ********************************************************************** */
/* File: #src/features/appointments/components/AppointmentAvailability.jsx */
/* ********************************************************************** */

import { useEffect, useMemo, useState } from "react";
import TimeSlotPicker from "./TimeSlotPicker";

const AppointmentAvailability = ({
  doctorId = "",
  selectedDate = "",
  selectedTime = "",
  doctors = [],
  availableSlots = [],
  loading = false,
  error = "",
  onDoctorChange,
  onDateChange,
  onTimeChange,
  onLoadAvailability,
  minDate,
  maxDate,
  disabled = false,
  showDoctor = true,
  showDate = true,
  autoLoad = true,
  className = "",
}) => {
  const [internalDoctorId, setInternalDoctorId] =
    useState(doctorId);

  const [internalDate, setInternalDate] =
    useState(selectedDate);

  const [internalTime, setInternalTime] =
    useState(selectedTime);

  useEffect(() => {
    setInternalDoctorId(doctorId || "");
  }, [doctorId]);

  useEffect(() => {
    setInternalDate(selectedDate || "");
  }, [selectedDate]);

  useEffect(() => {
    setInternalTime(selectedTime || "");
  }, [selectedTime]);

  const effectiveDoctorId =
    doctorId || internalDoctorId;

  const effectiveDate =
    selectedDate || internalDate;

  const effectiveTime =
    selectedTime || internalTime;

  const normalizedSlots = useMemo(() => {
    return availableSlots.map(
      (slot, index) => {
        if (typeof slot === "string") {
          return {
            id: slot,
            time: slot,
            available: true,
          };
        }

        return {
          id:
            slot.id ||
            slot.time ||
            `slot-${index}`,
          time:
            slot.time ||
            slot.startTime ||
            slot.start_time ||
            "",
          endTime:
            slot.endTime ||
            slot.end_time ||
            "",
          available:
            slot.available !== false &&
            slot.isAvailable !== false,
          disabled:
            slot.disabled === true ||
            slot.available === false ||
            slot.isAvailable === false,
          label: slot.label,
          ...slot,
        };
      }
    );
  }, [availableSlots]);

  const handleDoctorChange = (event) => {
    const value = event.target.value;

    setInternalDoctorId(value);

    // Reset the selected time whenever
    // the doctor changes.
    setInternalTime("");

    onDoctorChange?.(value);

    if (
      autoLoad &&
      value &&
      effectiveDate
    ) {
      onLoadAvailability?.({
        doctorId: value,
        date: effectiveDate,
      });
    }
  };

  const handleDateChange = (event) => {
    const value = event.target.value;

    setInternalDate(value);

   /* A new date invalidates the previously
   ** selected time slot. 
   */
    setInternalTime("");

    onDateChange?.(value);

    if (
      autoLoad &&
      effectiveDoctorId &&
      value
    ) {
      onLoadAvailability?.({
        doctorId: effectiveDoctorId,
        date: value,
      });
    }
  };

  const handleTimeChange = (time) => {
    setInternalTime(time);

    onTimeChange?.(time);
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

  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const hasSelection =
    Boolean(effectiveDoctorId) &&
    Boolean(effectiveDate);

  const hasAvailableSlots =
    normalizedSlots.some(
      (slot) => !slot.disabled
    );

  return (
    <section
      className={[
        "appointment-availability",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="availability-header">
        <div>
          <h3>Check Availability</h3>

          <p>
            Select a doctor and date to view
            available appointment times.
          </p>
        </div>
      </div>

      {/* Selection */}
      <div className="availability-selection">
        {/* Doctor */}
        {showDoctor && (
          <div className="availability-field">
            <label htmlFor="availability-doctor">
              Doctor
              <span className="required">
                *
              </span>
            </label>

            <select
              id="availability-doctor"
              value={effectiveDoctorId}
              onChange={handleDoctorChange}
              disabled={
                disabled || loading
              }
            >
              <option value="">
                Select doctor
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

        {/* Date */}
        {showDate && (
          <div className="availability-field">
            <label htmlFor="availability-date">
              Date
              <span className="required">
                *
              </span>
            </label>

            <input
              id="availability-date"
              type="date"
              value={effectiveDate}
              min={
                minDate || getToday()
              }
              max={maxDate}
              onChange={handleDateChange}
              disabled={
                disabled || loading
              }
            />
          </div>
        )}

        {/* Manual Load */}
        {!autoLoad && (
          <button
            type="button"
            className="btn btn-primary availability-check-button"
            disabled={
              disabled ||
              loading ||
              !hasSelection
            }
            onClick={() =>
              onLoadAvailability?.({
                doctorId:
                  effectiveDoctorId,
                date: effectiveDate,
              })
            }
          >
            {loading
              ? "Checking..."
              : "Check Availability"}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          className="availability-error"
          role="alert"
        >
          <span
            className="availability-error-icon"
            aria-hidden="true"
          >
            !
          </span>

          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div
          className="availability-loading"
          aria-live="polite"
        >
          <span className="loading-spinner" />

          <span>
            Checking available appointment
            times...
          </span>
        </div>
      )}

      {/* Time Slots */}
      {!loading &&
        hasSelection &&
        !error && (
          <div className="availability-slots">
            <div className="availability-slots-header">
              <div>
                <h4>
                  Available Time Slots
                </h4>

                {effectiveDate && (
                  <p>
                    {new Date(
                      `${effectiveDate}T00:00:00`
                    ).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>
                )}
              </div>

              {hasAvailableSlots && (
                <span className="availability-count">
                  {
                    normalizedSlots.filter(
                      (slot) =>
                        !slot.disabled
                    ).length
                  }{" "}
                  available
                </span>
              )}
            </div>

            {normalizedSlots.length > 0 ? (
              <TimeSlotPicker
                slots={normalizedSlots}
                value={effectiveTime}
                onChange={
                  handleTimeChange
                }
                disabled={disabled}
              />
            ) : (
              <div className="no-availability">
                <div className="no-availability-icon">
                  🕐
                </div>

                <h4>
                  No Available Times
                </h4>

                <p>
                  There are no available
                  appointment slots for
                  the selected doctor and
                  date.
                </p>
              </div>
            )}
          </div>
        )}

      {/* Initial State */}
      {!loading &&
        !error &&
        !hasSelection && (
          <div className="availability-placeholder">
            <div className="placeholder-icon">
              📅
            </div>

            <h4>
              Select a doctor and date
            </h4>

            <p>
              Available appointment times
              will appear here.
            </p>
          </div>
        )}
    </section>
  );
};

export default AppointmentAvailability;
