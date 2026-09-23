/* ************************************************************** */
/* File: #src/features/appointments/components/TimeSlotPicker.jsx */
/* ************************************************************** */

import { useMemo } from "react";

const TimeSlotPicker = ({
  slots = [],
  value = "",
  onChange,
  disabled = false,
  loading = false,
  emptyMessage = "No time slots available.",
  showEndTime = false,
  className = "",
}) => {
  const normalizedSlots = useMemo(() => {
    return slots
      .map((slot, index) => {
        if (typeof slot === "string") {
          return {
            id: slot,
            time: slot,
            endTime: "",
            label: slot,
            available: true,
            disabled: false,
          };
        }

        const time =
          slot.time ||
          slot.startTime ||
          slot.start_time ||
          "";

        const endTime =
          slot.endTime ||
          slot.end_time ||
          "";

        const isAvailable =
          slot.available !== false &&
          slot.isAvailable !== false;

        return {
          id:
            slot.id ||
            time ||
            `slot-${index}`,
          time,
          endTime,
          label:
            slot.label ||
            time,
          available: isAvailable,
          disabled:
            slot.disabled === true ||
            !isAvailable,
          ...slot,
        };
      })
      .filter((slot) => slot.time);
  }, [slots]);

  const availableSlots = normalizedSlots.filter(
    (slot) => !slot.disabled
  );

  const formatTime = (time) => {
    if (!time) {
      return "";
    }

    // Already formatted, e.g. "9:30 AM"
    if (
      /am|pm/i.test(time)
    ) {
      return time;
    }

    const parts = time.split(":");

    if (parts.length < 2) {
      return time;
    }

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

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

  const handleSelect = (slot) => {
    if (
      disabled ||
      loading ||
      slot.disabled
    ) {
      return;
    }

    onChange?.(slot.time, slot);
  };

  const handleKeyDown = (
    event,
    slot
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleSelect(slot);
    }
  };

  if (loading) {
    return (
      <div
        className={[
          "time-slot-picker",
          "time-slot-picker-loading",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="time-slot-loading">
          <span className="time-slot-spinner" />

          <span>
            Loading available times...
          </span>
        </div>
      </div>
    );
  }

  if (normalizedSlots.length === 0) {
    return (
      <div
        className={[
          "time-slot-picker",
          "time-slot-picker-empty",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="time-slot-empty">
          <span
            className="time-slot-empty-icon"
            aria-hidden="true"
          >
            🕐
          </span>

          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "time-slot-picker",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="time-slot-picker-header">
        <span className="time-slot-picker-title">
          Select a time
        </span>

        <span className="time-slot-picker-count">
          {availableSlots.length}{" "}
          {availableSlots.length === 1
            ? "slot"
            : "slots"}{" "}
          available
        </span>
      </div>

      <div
        className="time-slot-grid"
        role="radiogroup"
        aria-label="Available appointment times"
      >
        {normalizedSlots.map(
          (slot) => {
            const isSelected =
              String(value) ===
              String(slot.time);

            const isDisabled =
              disabled ||
              slot.disabled;

            return (
              <button
                key={slot.id}
                type="button"
                role="radio"
                aria-checked={
                  isSelected
                }
                aria-disabled={
                  isDisabled
                }
                disabled={isDisabled}
                className={[
                  "time-slot",
                  isSelected &&
                    "time-slot-selected",
                  slot.disabled &&
                    "time-slot-unavailable",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  handleSelect(slot)
                }
                onKeyDown={(event) =>
                  handleKeyDown(
                    event,
                    slot
                  )
                }
                title={
                  slot.disabled
                    ? "This time slot is unavailable"
                    : `Select ${formatTime(
                        slot.time
                      )}`
                }
              >
                <span className="time-slot-time">
                  {formatTime(
                    slot.time
                  )}
                </span>

                {showEndTime &&
                  slot.endTime && (
                    <span className="time-slot-end">
                      -{" "}
                      {formatTime(
                        slot.endTime
                      )}
                    </span>
                  )}

                {isSelected && (
                  <span
                    className="time-slot-check"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}

                {slot.disabled && (
                  <span className="time-slot-unavailable-label">
                    Unavailable
                  </span>
                )}
              </button>
            );
          }
        )}
      </div>

      <div className="time-slot-legend">
        <div className="time-slot-legend-item">
          <span className="legend-box available" />
          <span>Available</span>
        </div>

        <div className="time-slot-legend-item">
          <span className="legend-box selected" />
          <span>Selected</span>
        </div>

        <div className="time-slot-legend-item">
          <span className="legend-box unavailable" />
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotPicker;
