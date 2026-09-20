// src/features/laboratory/pages/PatientLabHistory.jsx

import React from "react";
import { Link, useParams } from "react-router-dom";

import { usePatientLabHistory } from "../hooks";

import {
  PatientLabSummary,
  LabHistoryTable,
  LabResultCard,
  LabTimeline,
} from "../components/history";

import {
  LabFilter,
} from "../components/filters";

import "../styles/history.css";

const PatientLabHistory = () => {
  const { patientId } = useParams();

  const {
    patient,
    history,
    selectedResult,

    loading,
    error,

    pagination,
    filters,

    handleSearch,
    handleStatusChange,
    handleTestChange,
    handleDateRangeChange,
    handlePageChange,

    viewResult,
    refresh,
  } = usePatientLabHistory(patientId);

  if (loading) {
    return (
      <section className="patient-lab-history-page">
        <div className="page-loading">
          Loading patient laboratory history...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="patient-lab-history-page">

        <div className="alert alert-danger">
          {error}
        </div>

        <Link
          to="/patients"
          className="btn btn-secondary"
        >
          Back to Patients
        </Link>

      </section>
    );
  }

  return (
    <section className="patient-lab-history-page">

      {/* =====================================
          Page Header
      ===================================== */}

      <header className="page-header">

        <div className="page-title">

          <h1>
            Patient Laboratory History
          </h1>

          <p>
            View previous laboratory tests, results,
            reports, and clinical history.
          </p>

        </div>


        <div className="page-actions">

          <Link
            to={`/patients/${patientId}`}
            className="btn btn-outline"
          >
            Patient Profile
          </Link>


          <button
            type="button"
            className="btn btn-outline"
            onClick={refresh}
          >
            Refresh
          </button>

        </div>

      </header>


      {/* =====================================
          Patient Summary
      ===================================== */}

      {patient && (
        <PatientLabSummary
          patient={patient}
        />
      )}


      {/* =====================================
          Filters
      ===================================== */}

      <LabFilter
        filters={filters}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onTestChange={handleTestChange}
        onDateRangeChange={handleDateRangeChange}
      />


      {/* =====================================
          Laboratory History Table
      ===================================== */}

      <LabHistoryTable
        data={history}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onView={viewResult}
      />


      {/* =====================================
          Selected Result Details
      ===================================== */}

      {selectedResult && (

        <section className="selected-result-section">

          <LabResultCard
            result={selectedResult}
          />


          <LabTimeline
            timeline={
              selectedResult.timeline || []
            }
          />

        </section>

      )}

    </section>
  );
};

export default PatientLabHistory;