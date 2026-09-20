// src/features/laboratory/pages/LabTests.jsx

import React from "react";
import { Link } from "react-router-dom";

import { useLabTests } from "../hooks";

import {
  LabTestTable,
  LabFilter,
} from "../components";

import "./../styles/tests.css";

const LabTests = () => {
  const {
    tests,
    loading,
    error,
    pagination,

    filters,

    handleSearch,
    handleStatusChange,
    handleCategoryChange,
    handlePageChange,

    refresh,
    deleteTest,
  } = useLabTests();

  return (
    <section className="lab-tests-page">

      {/* ==============================
            Page Header
      ============================== */}

      <header className="page-header">

        <div>
          <h1>Laboratory Tests</h1>

          <p>
            Manage laboratory test catalog, pricing, turnaround time,
            and availability.
          </p>

        </div>

        <div className="page-actions">

          <button
            className="btn btn-outline"
            onClick={refresh}
          >
            Refresh
          </button>

          <Link
            to="/laboratory/tests/new"
            className="btn btn-primary"
          >
            + New Test
          </Link>

        </div>

      </header>

      {/* ==============================
            Filters
      ============================== */}

      <LabFilter
        search={filters.search}
        status={filters.status}
        category={filters.category}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onCategoryChange={handleCategoryChange}
      />

      {/* ==============================
            Error
      ============================== */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* ==============================
            Table
      ============================== */}

      <LabTestTable
        data={tests}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onDelete={deleteTest}
      />

    </section>
  );
};

export default LabTests;