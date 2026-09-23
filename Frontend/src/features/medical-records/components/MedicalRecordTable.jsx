/* ********************************************************************* */
/* File: #src/features/medical-records/components/MedicalRecordTable.jsx */
/* ********************************************************************* */

import { Link } from "react-router-dom";

const MedicalRecordTable = ({
  records = [],
  loading = false,
  onDelete,
}) => {
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

  const getPatientName = (record) => {
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

  const getDoctorName = (record) => {
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

  const getRecordDate = (record) => {
    return (
      record.date ||
      record.recordDate ||
      record.createdAt
    );
  };

  const handleDelete = (record) => {
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

  if (loading) {
    return (
      <div className="table-container">
        <div className="table-loading">
          <div className="loading-spinner" />
          <p>Loading medical records...</p>
        </div>
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>

        <h3>No Medical Records</h3>

        <p>
          There are currently no medical records to
          display.
        </p>

        <Link
          to="/medical-records/create"
          className="btn btn-primary"
        >
          + Create Medical Record
        </Link>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="medical-record-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Date</th>
              <th>Created</th>
              <th className="actions-column">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                {/* ID */}
                <td>
                  <span className="record-id">
                    #{record.id}
                  </span>
                </td>

                {/* Patient */}
                <td>
                  <div className="patient-cell">
                    <div className="patient-avatar">
                      {getPatientName(record)
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <Link
                        to={`/medical-records/${record.id}`}
                        className="patient-name"
                      >
                        {getPatientName(record)}
                      </Link>

                      {record.patient?.email && (
                        <span className="patient-email">
                          {record.patient.email}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Doctor */}
                <td>
                  <div className="doctor-cell">
                    <span className="doctor-name">
                      {getDoctorName(record)}
                    </span>

                    {record.doctor?.specialization && (
                      <span className="doctor-specialization">
                        {record.doctor.specialization}
                      </span>
                    )}
                  </div>
                </td>

                {/* Diagnosis */}
                <td>
                  <span
                    className="diagnosis-text"
                    title={record.diagnosis || ""}
                  >
                    {record.diagnosis || "No diagnosis"}
                  </span>
                </td>

                {/* Record Date */}
                <td>
                  {formatDate(getRecordDate(record))}
                </td>

                {/* Created */}
                <td>
                  {formatDate(record.createdAt)}
                </td>

                {/* Actions */}
                <td>
                  <div className="table-actions">
                    <Link
                      to={`/medical-records/${record.id}`}
                      className="btn btn-sm btn-secondary"
                      title="View medical record"
                    >
                      View
                    </Link>

                    <Link
                      to={`/medical-records/${record.id}/edit`}
                      className="btn btn-sm btn-outline"
                      title="Edit medical record"
                    >
                      Edit
                    </Link>

                    {onDelete && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleDelete(record)
                        }
                        title="Delete medical record"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Showing {records.length}{" "}
          {records.length === 1
            ? "medical record"
            : "medical records"}
        </span>
      </div>
    </div>
  );
};

export default MedicalRecordTable;
