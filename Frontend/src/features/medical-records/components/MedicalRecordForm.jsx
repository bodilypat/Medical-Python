/* ************************************************************** */
/* File: #src/features/medical-records/components/MedicalRecordForm.jsx */
/* ************************************************************** */

import { useEffect, useState } from "react";

const initialForm = {
  patientId: "",
  doctorId: "",
  diagnosis: "",
  treatment: "",
  notes: "",
  date: "",
};

const MedicalRecordForm = ({
  initialData = {},
  patients = [],
  doctors = [],
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = "Save Medical Record",
}) => {
  const [formData, setFormData] = useState({
    ...initialForm,
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      ...initialForm,
      ...initialData,
    });
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.patientId) {
      validationErrors.patientId = "Please select a patient.";
    }

    if (!formData.doctorId) {
      validationErrors.doctorId = "Please select a doctor.";
    }

    if (!formData.diagnosis.trim()) {
      validationErrors.diagnosis = "Diagnosis is required.";
    }

    if (formData.diagnosis.length > 500) {
      validationErrors.diagnosis =
        "Diagnosis cannot exceed 500 characters.";
    }

    if (formData.treatment.length > 2000) {
      validationErrors.treatment =
        "Treatment cannot exceed 2000 characters.";
    }

    if (formData.notes.length > 3000) {
      validationErrors.notes =
        "Clinical notes cannot exceed 3000 characters.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      patientId: formData.patientId,
      doctorId: formData.doctorId,
      diagnosis: formData.diagnosis.trim(),
      treatment: formData.treatment.trim(),
      notes: formData.notes.trim(),
      date: formData.date || null,
    };

    await onSubmit(payload);
  };

  const handleReset = () => {
    setFormData({
      ...initialForm,
      ...initialData,
    });

    setErrors({});
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

  return (
    <form className="medical-record-form" onSubmit={handleSubmit}>
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
            className={errors.patientId ? "input-error" : ""}
          >
            <option value="">Select patient</option>

            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
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
            className={errors.doctorId ? "input-error" : ""}
          >
            <option value="">Select doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {getDoctorName(doctor)}
              </option>
            ))}
          </select>

          {errors.doctorId && (
            <span className="field-error">
              {errors.doctorId}
            </span>
          )}
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="date">Record Date</label>

          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Diagnosis */}
        <div className="form-group form-group-full">
          <label htmlFor="diagnosis">
            Diagnosis <span className="required">*</span>
          </label>

          <input
            id="diagnosis"
            name="diagnosis"
            type="text"
            value={formData.diagnosis}
            onChange={handleChange}
            placeholder="Enter patient diagnosis"
            maxLength={500}
            disabled={loading}
            className={errors.diagnosis ? "input-error" : ""}
          />

          <div className="input-footer">
            {errors.diagnosis ? (
              <span className="field-error">
                {errors.diagnosis}
              </span>
            ) : (
              <span />
            )}

            <span className="character-count">
              {formData.diagnosis.length}/500
            </span>
          </div>
        </div>

        {/* Treatment */}
        <div className="form-group form-group-full">
          <label htmlFor="treatment">Treatment</label>

          <textarea
            id="treatment"
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            placeholder="Enter treatment details"
            rows={5}
            maxLength={2000}
            disabled={loading}
            className={errors.treatment ? "input-error" : ""}
          />

          <div className="input-footer">
            {errors.treatment ? (
              <span className="field-error">
                {errors.treatment}
              </span>
            ) : (
              <span />
            )}

            <span className="character-count">
              {formData.treatment.length}/2000
            </span>
          </div>
        </div>

        {/* Clinical Notes */}
        <div className="form-group form-group-full">
          <label htmlFor="notes">Clinical Notes</label>

          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter additional clinical notes"
            rows={6}
            maxLength={3000}
            disabled={loading}
            className={errors.notes ? "input-error" : ""}
          />

          <div className="input-footer">
            {errors.notes ? (
              <span className="field-error">
                {errors.notes}
              </span>
            ) : (
              <span />
            )}

            <span className="character-count">
              {formData.notes.length}/3000
            </span>
          </div>
        </div>
      </div>

      {/* Form actions */}
      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}

        <button
          type="button"
          className="btn btn-outline"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default MedicalRecordForm;
