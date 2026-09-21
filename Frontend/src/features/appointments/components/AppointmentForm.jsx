/* ********************************************************* */
/* #src/features/appointments/components/AppointmentForm.jsx */
/* ********************************************************* */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_FORM = {
  patientId: "",
  doctorId: "",
  appointmentDate: "",
  startTime: "",
  endTime: "",
  appointmentType: "consultation",
  reason: "",
  notes: "",
  status: "scheduled",
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

const APPOINTMENT_STATUSES = [
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

const AppointmentForm = ({
  appointment = null,
  patients = [],
  doctors = [],
  onSubmit,
  onCancel,
  loading = false,
  mode = "create",
}) => {
  const navigate = useNavigate();

  const isEditMode =
    mode === "edit" || Boolean(appointment);

  const [formData, setFormData] = useState(
    DEFAULT_FORM
  );

  const [errors, setErrors] = useState({});

  const [submitError, setSubmitError] =
    useState("");

  useEffect(() => {
    if (!appointment) {
      setFormData(DEFAULT_FORM);
      return;
    }

    setFormData({
      patientId:
        appointment.patientId ||
        appointment.patient?.id ||
        "",
      doctorId:
        appointment.doctorId ||
        appointment.doctor?.id ||
        "",
      appointmentDate:
        appointment.appointmentDate ||
        appointment.date ||
        "",
      startTime:
        appointment.startTime ||
        appointment.start_time ||
        "",
      endTime:
        appointment.endTime ||
        appointment.end_time ||
        "",
      appointmentType:
        appointment.appointmentType ||
        appointment.type ||
        "consultation",
      reason: appointment.reason || "",
      notes: appointment.notes || "",
      status:
        appointment.status || "scheduled",
    });
  }, [appointment]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.patientId) {
      validationErrors.patientId =
        "Please select a patient.";
    }

    if (!formData.doctorId) {
      validationErrors.doctorId =
        "Please select a doctor.";
    }

    if (!formData.appointmentDate) {
      validationErrors.appointmentDate =
        "Please select an appointment date.";
    }

    if (!formData.startTime) {
      validationErrors.startTime =
        "Please select a start time.";
    }

    if (!formData.endTime) {
      validationErrors.endTime =
        "Please select an end time.";
    }

    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    ) {
      validationErrors.endTime =
        "End time must be later than start time.";
    }

    if (!formData.appointmentType) {
      validationErrors.appointmentType =
        "Please select an appointment type.";
    }

    if (!formData.reason.trim()) {
      validationErrors.reason =
        "Please provide the reason for the appointment.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");

    if (!validate()) {
      return;
    }

    const payload = {
      patientId: formData.patientId,
      doctorId: formData.doctorId,
      appointmentDate:
        formData.appointmentDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      appointmentType:
        formData.appointmentType,
      reason: formData.reason.trim(),
      notes: formData.notes.trim(),
      status: formData.status,
    };

    try {
      await onSubmit?.(payload);
    } catch (error) {
      console.error(
        "Failed to save appointment:",
        error
      );

      setSubmitError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to save the appointment. Please try again."
      );
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    navigate("/appointments");
  };

  const getPatientName = (patient) => {
    if (patient.name) {
      return patient.name;
    }

    const name = `${patient.firstName || ""} ${
      patient.lastName || ""
    }`.trim();

    return name || `Patient #${patient.id}`;
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

    return name
      ? name.startsWith("Dr.")
        ? name
        : `Dr. ${name}`
      : `Doctor #${doctor.id}`;
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

  return (
    <form
      className="appointment-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Form Header */}
      <div className="form-header">
        <div>
          <h2>
            {isEditMode
              ? "Edit Appointment"
              : "Book Appointment"}
          </h2>

          <p>
            {isEditMode
              ? "Update the appointment information below."
              : "Enter the appointment details below."}
          </p>
        </div>
      </div>

      {/* Submit Error */}
      {submitError && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {submitError}
        </div>
      )}

      {/* Patient & Doctor */}
      <div className="form-section">
        <div className="form-section-header">
          <h3>People</h3>
          <p>
            Select the patient and healthcare
            provider.
          </p>
        </div>

        <div className="form-grid">
          {/* Patient */}
          <div className="form-group">
            <label htmlFor="patientId">
              Patient <span className="required">*</span>
            </label>

            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              disabled={loading}
              className={
                errors.patientId ? "input-error" : ""
              }
            >
              <option value="">
                Select patient
              </option>

              {patients.map((patient) => (
                <option
                  key={patient.id}
                  value={patient.id}
                >
                  {getPatientName(patient)}
                </option>
              ))}
            </select>

            {errors.patientId && (
              <span className="field-error">
                {errors.patientId}
              </span>
            )}
          </div>

          {/* Doctor */}
          <div className="form-group">
            <label htmlFor="doctorId">
              Doctor <span className="required">*</span>
            </label>

            <select
              id="doctorId"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              disabled={loading}
              className={
                errors.doctorId ? "input-error" : ""
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

            {errors.doctorId && (
              <span className="field-error">
                {errors.doctorId}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Schedule */}
      <div className="form-section">
        <div className="form-section-header">
          <h3>Schedule</h3>
          <p>
            Choose the date and appointment time.
          </p>
        </div>

        <div className="form-grid form-grid-3">
          {/* Date */}
          <div className="form-group">
            <label htmlFor="appointmentDate">
              Date <span className="required">*</span>
            </label>

            <input
              id="appointmentDate"
              name="appointmentDate"
              type="date"
              min={isEditMode ? undefined : getToday()}
              value={formData.appointmentDate}
              onChange={handleChange}
              disabled={loading}
              className={
                errors.appointmentDate
                  ? "input-error"
                  : ""
              }
            />

            {errors.appointmentDate && (
              <span className="field-error">
                {errors.appointmentDate}
              </span>
            )}
          </div>

          {/* Start Time */}
          <div className="form-group">
            <label htmlFor="startTime">
              Start Time{" "}
              <span className="required">*</span>
            </label>

            <input
              id="startTime"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              disabled={loading}
              className={
                errors.startTime
                  ? "input-error"
                  : ""
              }
            />

            {errors.startTime && (
              <span className="field-error">
                {errors.startTime}
              </span>
            )}
          </div>

          {/* End Time */}
          <div className="form-group">
            <label htmlFor="endTime">
              End Time{" "}
              <span className="required">*</span>
            </label>

            <input
              id="endTime"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleChange}
              disabled={loading}
              className={
                errors.endTime
                  ? "input-error"
                  : ""
              }
            />

            {errors.endTime && (
              <span className="field-error">
                {errors.endTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="form-section">
        <div className="form-section-header">
          <h3>Appointment Details</h3>
          <p>
            Provide information about the visit.
          </p>
        </div>

        <div className="form-grid">
          {/* Type */}
          <div className="form-group">
            <label htmlFor="appointmentType">
              Appointment Type{" "}
              <span className="required">*</span>
            </label>

            <select
              id="appointmentType"
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              disabled={loading}
              className={
                errors.appointmentType
                  ? "input-error"
                  : ""
              }
            >
              {APPOINTMENT_TYPES.map((type) => (
                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </option>
              ))}
            </select>

            {errors.appointmentType && (
              <span className="field-error">
                {errors.appointmentType}
              </span>
            )}
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
            >
              {APPOINTMENT_STATUSES.map(
                (status) => (
                  <option
                    key={status.value}
                    value={status.value}
                  >
                    {status.label}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Reason */}
        <div className="form-group">
          <label htmlFor="reason">
            Reason for Visit{" "}
            <span className="required">*</span>
          </label>

          <input
            id="reason"
            name="reason"
            type="text"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter the reason for the appointment"
            maxLength={255}
            disabled={loading}
            className={
              errors.reason ? "input-error" : ""
            }
          />

          <div className="input-meta">
            <span>
              {errors.reason ? (
                <span className="field-error">
                  {errors.reason}
                </span>
              ) : (
                "Briefly describe the reason for the visit."
              )}
            </span>

            <span>
              {formData.reason.length}/255
            </span>
          </div>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label htmlFor="notes">
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional notes or instructions..."
            maxLength={2000}
            disabled={loading}
          />

          <div className="input-meta">
            <span>
              Optional additional information.
            </span>

            <span>
              {formData.notes.length}/2000
            </span>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading
            ? isEditMode
              ? "Updating..."
              : "Booking..."
            : isEditMode
            ? "Update Appointment"
            : "Book Appointment"}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
