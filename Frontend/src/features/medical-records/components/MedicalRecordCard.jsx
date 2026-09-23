/* *************************************************** */
/* File: #src/features/medical-records/MedicalRecordCard.jsx */
/* *************************************************** */

import { Link } from "react-router-dom";

const MedicalRecordCard = ({
  record,
  onDelete,
  showActions = true,
}) => {
  if (!record) {
    return null;
  }

  const getPatientName = () => {
    if (record.patient?.name) {
      return record.patient.name;
    }

    if (record.patientName) {
      return record.patientName;
    }

    const name = `${record.patient?.firstName || ""} ${
      record.patient?.lastName || ""
    }`.trim();

    return name || "Unknown Patient";
  };

  const getDoctorName = () => {
    if (record.doctor?.name) {
      return record.doctor.name.startsWith("Dr.")
        ? record.doctor.name
        : `Dr. ${record.doctor.name}`;
    }

    if (record.doctorName) {
      return record.doctorName.startsWith("Dr.")
        ? record.doctorName
        : `Dr. ${record.doctorName}`;
    }

    const name = `${record.doctor?.firstName || ""} ${
      record.doctor?.lastName || ""
    }`.trim();

    return name
      ? name.startsWith("Dr.")
        ? name
        : `Dr. ${name}`
      : "Unknown Doctor";
  };

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

  const recordDate =
    record.date ||
    record.recordDate ||
    record.createdAt;

  const patientName = getPatientName();
  const doctorName = getDoctorName();

  const handleDelete = () => {
    if (!onDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete medical record #${record.id}?`
    );

    if (confirmed) {
      onDelete(record);
    }
  };

  return (
    <article className="medical-record-card">
      {/* Card Header */}
      <div className="medical-record-card-header">
        <div className="record-icon">
          📋
        </div>

        <div className="record-header-content">
          <div className="record-title-row">
            <h3>Medical Record</h3>

            <span className="record-id">
              #{record.id}
            </span>
          </div>

          <span className="record-date">
            {formatDate(recordDate)}
          </span>
        </div>
      </div>

      {/* Patient */}
      <div className="record-patient">
        <div className="patient-avatar">
          {patientName.charAt(0).toUpperCase()}
        </div>

        <div className="patient-info">
          <span className="label">Patient</span>

          <span className="value">
            {patientName}
          </span>

          {record.patient?.email && (
            <span className="secondary-value">
              {record.patient.email}
            </span>
          )}
        </div>
      </div>

      {/* Doctor */}
      <div className="record-doctor">
        <div className="doctor-icon">
          👨‍⚕️
        </div>

        <div className="doctor-info">
          <span className="label">Doctor</span>

          <span className="value">
            {doctorName}
          </span>

          {record.doctor?.specialization && (
            <span className="secondary-value">
              {record.doctor.specialization}
            </span>
          )}
        </div>
      </div>

      {/* Diagnosis */}
      <div className="record-section">
        <span className="section-label">
          Diagnosis
        </span>

        <p className="diagnosis">
          {record.diagnosis || "No diagnosis provided."}
        </p>
      </div>

      {/* Treatment */}
      {record.treatment && (
        <div className="record-section">
          <span className="section-label">
            Treatment
          </span>

          <p className="treatment">
            {record.treatment}
          </p>
        </div>
      )}

      {/* Notes */}
      {record.notes && (
        <div className="record-section">
          <span className="section-label">
            Clinical Notes
          </span>

          <p className="notes">
            {record.notes}
          </p>
        </div>
      )}

      {/* Footer */}
      {showActions && (
        <div className="medical-record-card-footer">
          <Link
            to={`/medical-records/${record.id}`}
            className="btn btn-sm btn-secondary"
          >
            View Details
          </Link>

          <Link
            to={`/medical-records/${record.id}/edit`}
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

export default MedicalRecordCard;
