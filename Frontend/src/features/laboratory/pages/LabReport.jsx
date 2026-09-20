// src/features/laboratory/pages/LabReports.jsx

import React from "react";
import { Link } from "react-router-dom";

import { useLabReports } from "../hooks";

import {
  ReportViewer,
  ReportPrint,
  ReportDownload,
  ReportShare,
} from "../components/reports";

import {
  ReportFilter,
} from "../components/filters";

import "../styles/reports.css";

const LabReports = () => {
  const {
    reports,
    selectedReport,

    loading,
    error,

    pagination,
    filters,

    handleSearch,
    handleStatusChange,
    handlePatientChange,
    handleDoctorChange,
    handleDateRangeChange,
    handlePageChange,

    viewReport,
    printReport,
    downloadReport,
    shareReport,
    refresh,
  } = useLabReports();

  return (
    <section className="lab-reports-page">

      {/* =========================================
          Page Header
      ========================================= */}

      <header className="page-header">

        <div className="page-title">
          <h1>Laboratory Reports</h1>

          <p>
            View, print, download, and share completed laboratory reports.
          </p>
        </div>

        <div className="page-actions">

          <button
            type="button"
            className="btn btn-outline"
            onClick={refresh}
          >
            Refresh
          </button>

          <Link
            to="/laboratory/orders"
            className="btn btn-primary"
          >
            View Orders
          </Link>

        </div>

      </header>

      {/* =========================================
          Report Filters
      ========================================= */}

      <ReportFilter
        filters={filters}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onPatientChange={handlePatientChange}
        onDoctorChange={handleDoctorChange}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* =========================================
          Error
      ========================================= */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* =========================================
          Reports List
      ========================================= */}

      <ReportViewer
        reports={reports}
        selectedReport={selectedReport}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onView={viewReport}
      />

      {/* =========================================
          Report Actions
      ========================================= */}

      {selectedReport && (
        <section className="report-actions">

          <ReportPrint
            report={selectedReport}
            onPrint={printReport}
          />

          <ReportDownload
            report={selectedReport}
            onDownload={downloadReport}
          />

          <ReportShare
            report={selectedReport}
            onShare={shareReport}
          />

        </section>
      )}

    </section>
  );
};

export default LabReports;