/* ************************************************************* */
/* File: #src/features/appointments/pages/BookingAppointment.jsx */
/* ************************************************************* */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import AppointmentAvailability from "../components/AppointmentAvailability";
import useAvailability from "../hooks/useAvailability";
import useAppointments from "../hooks/useAppointments";

const INITIAL_FORM = {
  patientId: "",
  doctorId: "",
  appointmentDate: "",
  startTime: "",
  endTime: "",
  appointmentType: "consultation",
  reason: "",
  notes: "",
};

const APPOINTMENT_TYPES = [
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

const BookingAppointment = () => {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const initialDate =
    searchParams.get("date") || "";

  const initialDoctorId =
    searchParams.get("doctorId") || "";

  const [form, setForm] =
    useState({
      ...INITIAL_FORM,
      appointmentDate: initialDate,
      doctorId: initialDoctorId,
    });

  const [patients, setPatients] =
    useState([]);

  const [patientsLoading, setPatientsLoading] =
    useState(false);

  const [patientsError, setPatientsError] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const [submitError, setSubmitError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  /* Availability hook*/
  const {
    doctors = [],
    availableSlots = [],
    loading: availabilityLoading = false,
    error: availabilityError = "",
    checkAvailability,
  } = useAvailability();

  /* Appointment hook */
  const {
    createAppointment,
  } = useAppointments();

  /*
   * Load patients.
   *
   * If your application has a dedicated
   * usePatients hook, replace this function
   * with that hook.
   */
  const loadPatients = useCallback(
    async () => {
      try {
        setPatientsLoading(true);
        setPatientsError("");

        /*
         * Replace this section with your
         * patient API/service.
         *
         * Example:
         *
         * const response =
         *   await patientApi.getPatients();
         *
         * setPatients(response.data);
         */

        const response =
          await fetch("/api/patients");

        if (!response.ok) {
          throw new Error(
            "Failed to load patients."
          );
        }

        const data =
          await response.json();

        setPatients(
          Array.isArray(data)
            ? data
            : data?.patients || data?.data || []
        );
      } catch (error) {
        setPatientsError(
          error?.message ||
            "Unable to load patients."
        );
      } finally {
        setPatientsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  /* Generic form change */
  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = {
        ...current,
      };

      delete next[name];

      return next;
    });

    setSubmitError("");
  };

  /* Patient selection */
  const handlePatientChange = (
    event
  ) => {
    handleChange(event);
  };

  /* Doctor selection */
  const handleDoctorChange = (
    doctorId
  ) => {
    setForm((current) => ({
      ...current,
      doctorId,
      startTime: "",
      endTime: "",
    }));

    setErrors((current) => {
      const next = {
        ...current,
      };

      delete next.doctorId;
      delete next.startTime;

      return next;
    });
  };

  /* Date selection */
  const handleDateChange = (
    date
  ) => {
    setForm((current) => ({
      ...current,
      appointmentDate: date,
      startTime: "",
      endTime: "",
    }));

    setErrors((current) => {
      const next = {
        ...current,
      };

      delete next.appointmentDate;
      delete next.startTime;

      return next;
    });
  };

  /* Time selection */
  const handleTimeChange = (
    time,
    slot
  ) => {
    setForm((current) => ({
      ...current,
      startTime: time,
      endTime:
        slot?.endTime ||
        slot?.end_time ||
        calculateEndTime(time),
    }));

    setErrors((current) => {
      const next = {
        ...current,
      };

      delete next.startTime;

      return next;
    });
  };

  /* Check availability. */
  const handleLoadAvailability =
    async ({
      doctorId,
      date,
    }) => {
      if (
        !doctorId ||
        !date ||
        !checkAvailability
      ) {
        return;
      }

      try {
        await checkAvailability({
          doctorId,
          date,
        });
      } catch (error) {
        setSubmitError(
          error?.message ||
            "Unable to check appointment availability."
        );
      }
    };

  /* Validation */
  const validateForm = () => {
    const nextErrors = {};

    if (!form.patientId) {
      nextErrors.patientId =
        "Please select a patient.";
    }

    if (!form.doctorId) {
      nextErrors.doctorId =
        "Please select a doctor.";
    }

    if (!form.appointmentDate) {
      nextErrors.appointmentDate =
        "Please select an appointment date.";
    }

    if (!form.startTime) {
      nextErrors.startTime =
        "Please select an available time.";
    }

    if (!form.appointmentType) {
      nextErrors.appointmentType =
        "Please select an appointment type.";
    }

    if (!form.reason.trim()) {
      nextErrors.reason =
        "Please enter the reason for the appointment.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  /* Submit booking */
  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    if (!createAppointment) {
      setSubmitError(
        "Appointment creation is not configured."
      );

      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        patientId: form.patientId,
        doctorId: form.doctorId,
        appointmentDate:
          form.appointmentDate,
        startTime: form.startTime,
        endTime: form.endTime,
        appointmentType:
          form.appointmentType,
        reason: form.reason.trim(),
        notes: form.notes.trim(),
      };

      const createdAppointment =
        await createAppointment(
          payload
        );

      const appointmentId =
        createdAppointment?.id ||
        createdAppointment?.appointment?.id ||
        createdAppointment?.data?.id;

      if (appointmentId) {
        navigate(
          `/appointments/${appointmentId}`
        );

        return;
      }

      navigate("/appointments", {
        state: {
          message:
            "Appointment booked successfully.",
        },
      });
    } catch (error) {
      setSubmitError(
        error?.message ||
          "Failed to book appointment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* Cancel booking */
  const handleCancel = () => {
    if (submitting) {
      return;
    }

    navigate("/appointments");
  };

  /* Patient display helpers */
  const getPatientName = (patient) => {
    if (patient.name) {
      return patient.name;
    }

    const name = `${patient.firstName || ""} ${
      patient.lastName || ""
    }`.trim();

    return name || `Patient #${patient.id}`;
  };

  const getPatientDetails = (
    patient
  ) => {
    const details = [];

    if (patient.patientNumber) {
      details.push(
        patient.patientNumber
      );
    }

    if (patient.email) {
      details.push(patient.email);
    }

    if (patient.phone) {
      details.push(patient.phone);
    }

    return details.join(" • ");
  };

  const selectedPatient =
    patients.find(
      (patient) =>
        String(patient.id) ===
        String(form.patientId)
    );

  const selectedDoctor =
    doctors.find(
      (doctor) =>
        String(doctor.id) ===
        String(form.doctorId)
    );

  const selectedAppointmentType =
    APPOINTMENT_TYPES.find(
      (type) =>
        type.value ===
        form.appointmentType
    );

  const isReadyToBook =
    Boolean(
      form.patientId &&
        form.doctorId &&
        form.appointmentDate &&
        form.startTime &&
        form.appointmentType &&
        form.reason.trim()
    );

  return (
    <main className="booking-appointment-page">
      {/* Header */}
      <header className="booking-page-header">
        <div>
          <div className="booking-breadcrumb">
            <Link to="/appointments">
              Appointments
            </Link>

            <span>/</span>

            <span>
              Book Appointment
            </span>
          </div>

          <h1>
            Book Appointment
          </h1>

          <p>
            Schedule a new appointment
            for a patient.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </header>

      {/* Error */}
      {submitError && (
        <div
          className="booking-error"
          role="alert"
        >
          <span
            className="booking-error-icon"
            aria-hidden="true"
          >
            !
          </span>

          <div>
            <strong>
              Unable to book appointment
            </strong>

            <p>{submitError}</p>
          </div>
        </div>
      )}

      <form
        className="booking-appointment-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="booking-form-layout">
          {/* Main Form */}
          <div className="booking-form-main">
            {/* Patient */}
            <section className="booking-section">
              <div className="booking-section-header">
                <div className="section-number">
                  1
                </div>

                <div>
                  <h2>
                    Select Patient
                  </h2>

                  <p>
                    Choose the patient who
                    will attend the
                    appointment.
                  </p>
                </div>
              </div>

              <div className="booking-field">
                <label htmlFor="patientId">
                  Patient
                  <span className="required">
                    *
                  </span>
                </label>

                <select
                  id="patientId"
                  name="patientId"
                  value={form.patientId}
                  onChange={
                    handlePatientChange
                  }
                  disabled={
                    patientsLoading ||
                    submitting
                  }
                  aria-invalid={Boolean(
                    errors.patientId
                  )}
                >
                  <option value="">
                    {patientsLoading
                      ? "Loading patients..."
                      : "Select patient"}
                  </option>

                  {patients.map(
                    (patient) => (
                      <option
                        key={patient.id}
                        value={patient.id}
                      >
                        {getPatientName(
                          patient
                        )}
                        {patient.patientNumber
                          ? ` — ${patient.patientNumber}`
                          : ""}
                      </option>
                    )
                  )}
                </select>

                {errors.patientId && (
                  <span className="field-error">
                    {errors.patientId}
                  </span>
                )}

                {patientsError && (
                  <span className="field-error">
                    {patientsError}
                  </span>
                )}
              </div>

              {selectedPatient && (
                <div className="selected-patient-card">
                  <div className="patient-avatar">
                    {getPatientInitials(
                      selectedPatient
                    )}
                  </div>

                  <div>
                    <strong>
                      {getPatientName(
                        selectedPatient
                      )}
                    </strong>

                    <span>
                      {getPatientDetails(
                        selectedPatient
                      )}
                    </span>
                  </div>
                </div>
              )}
            </section>

            {/* Appointment Details */}
            <section className="booking-section">
              <div className="booking-section-header">
                <div className="section-number">
                  2
                </div>

                <div>
                  <h2>
                    Appointment Details
                  </h2>

                  <p>
                    Enter the purpose and
                    type of appointment.
                  </p>
                </div>
              </div>

              <div className="booking-fields-grid">
                <div className="booking-field">
                  <label htmlFor="appointmentType">
                    Appointment Type
                    <span className="required">
                      *
                    </span>
                  </label>

                  <select
                    id="appointmentType"
                    name="appointmentType"
                    value={
                      form.appointmentType
                    }
                    onChange={handleChange}
                    disabled={submitting}
                    aria-invalid={Boolean(
                      errors.appointmentType
                    )}
                  >
                    <option value="">
                      Select appointment type
                    </option>

                    {APPOINTMENT_TYPES.map(
                      (type) => (
                        <option
                          key={type.value}
                          value={type.value}
                        >
                          {type.label}
                        </option>
                      )
                    )}
                  </select>

                  {errors.appointmentType && (
                    <span className="field-error">
                      {
                        errors.appointmentType
                      }
                    </span>
                  )}
                </div>

                <div className="booking-field">
                  <label htmlFor="reason">
                    Reason
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    id="reason"
                    name="reason"
                    type="text"
                    value={form.reason}
                    onChange={handleChange}
                    placeholder="e.g. Follow-up consultation"
                    disabled={submitting}
                    maxLength={200}
                    aria-invalid={Boolean(
                      errors.reason
                    )}
                  />

                  {errors.reason && (
                    <span className="field-error">
                      {errors.reason}
                    </span>
                  )}
                </div>
              </div>

              <div className="booking-field">
                <label htmlFor="notes">
                  Notes
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Add any additional information..."
                  rows={4}
                  maxLength={1000}
                  disabled={submitting}
                />

                <div className="character-count">
                  {form.notes.length}/1000
                </div>
              </div>
            </section>

            {/* Availability */}
            <section className="booking-section">
              <div className="booking-section-header">
                <div className="section-number">
                  3
                </div>

                <div>
                  <h2>
                    Choose Date & Time
                  </h2>

                  <p>
                    Select an available
                    appointment slot.
                  </p>
                </div>
              </div>

              <AppointmentAvailability
                doctorId={
                  form.doctorId
                }
                selectedDate={
                  form.appointmentDate
                }
                selectedTime={
                  form.startTime
                }
                doctors={doctors}
                availableSlots={
                  availableSlots
                }
                loading={
                  availabilityLoading
                }
                error={
                  availabilityError
                }
                onDoctorChange={
                  handleDoctorChange
                }
                onDateChange={
                  handleDateChange
                }
                onTimeChange={
                  handleTimeChange
                }
                onLoadAvailability={
                  handleLoadAvailability
                }
                disabled={submitting}
              />

              {errors.doctorId && (
                <span className="field-error availability-error-message">
                  {errors.doctorId}
                </span>
              )}

              {errors.appointmentDate && (
                <span className="field-error availability-error-message">
                  {errors.appointmentDate}
                </span>
              )}

              {errors.startTime && (
                <span className="field-error availability-error-message">
                  {errors.startTime}
                </span>
              )}
            </section>
          </div>

          {/* Summary */}
          <aside className="booking-summary">
            <div className="booking-summary-card">
              <div className="booking-summary-header">
                <h2>
                  Appointment Summary
                </h2>

                <span
                  className={
                    isReadyToBook
                      ? "summary-ready"
                      : "summary-incomplete"
                  }
                >
                  {isReadyToBook
                    ? "Ready"
                    : "Incomplete"}
                </span>
              </div>

              <div className="summary-content">
                {/* Patient */}
                <div className="summary-item">
                  <span className="summary-label">
                    Patient
                  </span>

                  <span className="summary-value">
                    {selectedPatient
                      ? getPatientName(
                          selectedPatient
                        )
                      : "Not selected"}
                  </span>
                </div>

                {/* Doctor */}
                <div className="summary-item">
                  <span className="summary-label">
                    Doctor
                  </span>

                  <span className="summary-value">
                    {selectedDoctor
                      ? getDoctorName(
                          selectedDoctor
                        )
                      : "Not selected"}
                  </span>
                </div>

                {/* Type */}
                <div className="summary-item">
                  <span className="summary-label">
                    Type
                  </span>

                  <span className="summary-value">
                    {selectedAppointmentType
                      ?.label ||
                      "Not selected"}
                  </span>
                </div>

                {/* Date */}
                <div className="summary-item">
                  <span className="summary-label">
                    Date
                  </span>

                  <span className="summary-value">
                    {form.appointmentDate
                      ? formatDate(
                          form.appointmentDate
                        )
                      : "Not selected"}
                  </span>
                </div>

                {/* Time */}
                <div className="summary-item">
                  <span className="summary-label">
                    Time
                  </span>

                  <span className="summary-value">
                    {form.startTime
                      ? formatTime(
                          form.startTime
                        )
                      : "Not selected"}
                  </span>
                </div>

                {/* Reason */}
                <div className="summary-item summary-item-reason">
                  <span className="summary-label">
                    Reason
                  </span>

                  <span className="summary-value">
                    {form.reason ||
                      "Not provided"}
                  </span>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  type="submit"
                  className="btn btn-primary booking-submit-button"
                  disabled={
                    submitting ||
                    !isReadyToBook
                  }
                >
                  {submitting ? (
                    <>
                      <span className="button-spinner" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">
                        ✓
                      </span>
                      Book Appointment
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary booking-cancel-button"
                  onClick={
                    handleCancel
                  }
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="booking-help-card">
              <span
                className="help-icon"
                aria-hidden="true"
              >
                ℹ
              </span>

              <div>
                <strong>
                  Before booking
                </strong>

                <p>
                  Make sure the patient,
                  doctor, date, and time
                  are correct before
                  confirming the
                  appointment.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
};

/* Helpers */

const getPatientInitials = (
  patient
) => {
  if (patient?.name) {
    return patient.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  const first =
    patient?.firstName?.[0] || "";

  const last =
    patient?.lastName?.[0] || "";

  return `${first}${last}`.toUpperCase() || "P";
};

const getDoctorName = (doctor) => {
  if (doctor?.name) {
    return doctor.name.startsWith(
      "Dr."
    )
      ? doctor.name
      : `Dr. ${doctor.name}`;
  }

  const name =
    `${doctor?.firstName || ""} ${
      doctor?.lastName || ""
    }`.trim();

  if (!name) {
    return `Doctor #${doctor?.id}`;
  }

  return name.startsWith("Dr.")
    ? name
    : `Dr. ${name}`;
};

const formatDate = (date) => {
  if (!date) {
    return "";
  }

  const parsed = new Date(
    `${date}T00:00:00`
  );

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString(
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
    return "";
  }

  if (/am|pm/i.test(time)) {
    return time;
  }

  const [hours, minutes] =
    time.split(":").map(Number);

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

const calculateEndTime = (
  startTime,
  durationMinutes = 30
) => {
  if (!startTime) {
    return "";
  }

  const [hours, minutes] =
    startTime.split(":").map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return "";
  }

  const date = new Date();

  date.setHours(
    hours,
    minutes + durationMinutes,
    0,
    0
  );

  return `${String(
    date.getHours()
  ).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};

export default BookingAppointment;
