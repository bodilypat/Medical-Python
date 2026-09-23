/* *********************************************************************** */
/* File: #src/features/medical-records/components/MedicalRecordDetails.jsx */ 
/* *********************************************************************** */

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteMedicalRecord,
  getMedicalRecord,
} from "./services/medicalRecordsApi";

const MedicalRecordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMedicalRecord(id);

        setRecord(response?.data || response);
      } catch (err) {
        console.error("Failed to fetch medical record:", err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load the medical record."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecord();
    }
  }, [id]);

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
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) {
      return "N/A";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getPatientName = () => {
    if (record?.patient?.name) {
      return record.patient.name;
    }

    if (record?.patientName) {
      return record.patientName;
    }

    const name = `${record?.patient?.firstName || ""} ${
      record?.patient?.lastName || ""
    }`.trim();

    return name || "Unknown Patient";
  };

  const getDoctorName = () => {
    let name = "";

    if (record?.doctor?.name) {
      name = record.doctor.name;
    } else if (record?.doctorName) {
      name = record.doctorName;
    } else {
      name = `${record?.doctor?.firstName || ""} ${
        record?.doctor?.lastName || ""
      }`.trim();
    }

    if (!name) {
      return "Unknown Doctor";
    }

    return name.startsWith("Dr.") ? name : `Dr. ${name}`;
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medical record? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteMedicalRecord(id);

      navigate("/medical-records", {
        replace: true,
        state: {
          message: "Medical record deleted successfully.",
        },
      });
    } catch (err) {
      console.error("Failed to delete medical record:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to delete the medical record."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="medical-record-details">
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading medical record...</p>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="medical-record-details">
        <div className="page-header">
          <div>
            <h1>Medical Record</h1>
            <p>Record details</p>
          </div>
        </div>

        <div className="alert alert-danger" role="alert">
          {error || "Medical record not found."}
        </div>

        <Link
          to="/medical-records"
          className="btn btn-secondary"
        >
          ← Back to Medical Records
        </Link>
      </div>
    );
  }

  const recordDate =
    record.date ||
    record.recordDate ||
    record.createdAt;

  return (
    <div className="medical-record-details">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link to="/medical-records">
              Medical Records
            </Link>
            <span>/</span>
            <span>#{record.id}</span>
          </div>

          <h1>Medical Record Details</h1>

          <p>
            Record #{record.id} · {formatDate(recordDate)}
          </p>
        </div>

        <div className="page-header-actions">
          <Link
            to="/medical-records"
            className="btn btn-secondary"
          >
            ← Back
          </Link>

          <Link
            to={`/medical-records/${record.id}/edit`}
            className="btn btn-primary"
          >
            Edit Record
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Patient & Doctor */}
      <div className="details-grid">
        <section className="details-card">
          <div className="details-card-header">
            <h2>Patient Information</h2>
          </div>

          <div className="details-card-body">
            <div className="person-profile">
              <div className="person-avatar patient-avatar">
                {getPatientName()
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <h3>{getPatientName()}</h3>

                {record.patient?.email && (
                  <p>{record.patient.email}</p>
                )}
              </div>
            </div>

            <div className="detail-list">
              {record.patient?.phone && (
                <div className="detail-row">
                  <span className="detail-label">
                    Phone
                  </span>
                  <span className="detail-value">
                    {record.patient.phone}
                  </span>
                </div>
              )}

              {record.patient?.dateOfBirth && (
                <div className="detail-row">
                  <span className="detail-label">
                    Date of Birth
                  </span>
                  <span className="detail-value">
                    {formatDate(
                      record.patient.dateOfBirth
                    )}
                  </span>
                </div>
              )}

              {record.patient?.gender && (
                <div className="detail-row">
                  <span className="detail-label">
                    Gender
                  </span>
                  <span className="detail-value">
                    {record.patient.gender}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="details-card">
          <div className="details-card-header">
            <h2>Doctor Information</h2>
          </div>

          <div className="details-card-body">
            <div className="person-profile">
              <div className="person-avatar doctor-avatar">
                👨‍⚕️
              </div>

              <div>
                <h3>{getDoctorName()}</h3>

                {record.doctor?.specialization && (
                  <p>
                    {record.doctor.specialization}
                  </p>
                )}
              </div>
            </div>

            <div className="detail-list">
              {record.doctor?.email && (
                <div className="detail-row">
                  <span className="detail-label">
                    Email
                  </span>
                  <span className="detail-value">
                    {record.doctor.email}
                  </span>
                </div>
              )}

              {record.doctor?.phone && (
                <div className="detail-row">
                  <span className="detail-label">
                    Phone
                  </span>
                  <span className="detail-value">
                    {record.doctor.phone}
                  </span>
                </div>
              )}

              {record.doctor?.department && (
                <div className="detail-row">
                  <span className="detail-label">
                    Department
                  </span>
                  <span className="detail-value">
                    {record.doctor.department}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Medical Information */}
      <section className="details-card medical-information">
        <div className="details-card-header">
          <div>
            <h2>Medical Information</h2>
            <p>Clinical information for this record</p>
          </div>

          <span className="record-date-badge">
            {formatDate(recordDate)}
          </span>
        </div>

        <div className="details-card-body">
          <div className="medical-section">
            <h3>Diagnosis</h3>

            <div className="medical-content diagnosis-content">
              {record.diagnosis || (
                <span className="muted">
                  No diagnosis provided.
                </span>
              )}
            </div>
          </div>

          <div className="medical-section">
            <h3>Treatment</h3>

            <div className="medical-content">
              {record.treatment || (
                <span className="muted">
                  No treatment information provided.
                </span>
              )}
            </div>
          </div>

          <div className="medical-section">
            <h3>Clinical Notes</h3>

            <div className="medical-content">
              {record.notes || (
                <span className="muted">
                  No clinical notes provided.
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Record Metadata */}
      <section className="details-card">
        <div className="details-card-header">
          <h2>Record Information</h2>
        </div>

        <div className="details-card-body">
          <div className="detail-list">
            <div className="detail-row">
              <span className="detail-label">
                Record ID
              </span>

              <span className="detail-value">
                #{record.id}
              </span>
            </div>

            {record.createdAt && (
              <div className="detail-row">
                <span className="detail-label">
                  Created
                </span>

                <span className="detail-value">
                  {formatDateTime(record.createdAt)}
                </span>
              </div>
            )}

            {record.updatedAt && (
              <div className="detail-row">
                <span className="detail-label">
                  Last Updated
                </span>

                <span className="detail-value">
                  {formatDateTime(record.updatedAt)}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="record-actions">
        <Link
          to={`/medical-records/${record.id}/edit`}
          className="btn btn-primary"
        >
          Edit Medical Record
        </Link>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting
            ? "Deleting..."
            : "Delete Medical Record"}
        </button>
      </div>
    </div>
  );
};

export default MedicalRecordDetails;
