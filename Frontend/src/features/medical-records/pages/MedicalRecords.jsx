/* *********************************************************** */
/* #src/file/features/medical-records/pages/MedicalRecords.jsx */ 
/* *********************************************************** */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMedicalRecords } from "../services/medicalRecordsApi";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        setError("");

        // If your API requires a patient ID, pass it here.
        const data = await getMedicalRecords();

        setRecords(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching medical records:", err);
        setError("Unable to load medical records.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="medical-records-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Medical Records</h1>
          <p>View and manage patient medical records.</p>
        </div>

        <Link to="/medical-records/create" className="btn btn-primary">
          + Add Medical Record
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="loading-state">
          <p>Loading medical records...</p>
        </div>
      ) : records.length === 0 ? (
        <div className="empty-state">
          <h3>No medical records found</h3>
          <p>There are currently no medical records to display.</p>

          <Link
            to="/medical-records/create"
            className="btn btn-primary"
          >
            Create First Record
          </Link>
        </div>
      ) : (
        /* Records table */
        <div className="table-container">
          <table className="medical-records-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Diagnosis</th>
                <th>Treatment</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>
                    {record.patient?.name ||
                      record.patientName ||
                      "N/A"}
                  </td>

                  <td>{record.diagnosis || "N/A"}</td>

                  <td>{record.treatment || "N/A"}</td>

                  <td>
                    {record.doctor?.name ||
                      record.doctorName ||
                      "N/A"}
                  </td>

                  <td>
                    {record.createdAt
                      ? new Date(record.createdAt).toLocaleDateString()
                      : record.date || "N/A"}
                  </td>

                  <td>
                    <Link
                      to={`/medical-records/${record.id}`}
                      className="btn btn-sm btn-secondary"
                    >
                      View
                    </Link>

                    <Link
                      to={`/medical-records/${record.id}/edit`}
                      className="btn btn-sm btn-outline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
