// src/features/laboratory/pages/LabTestDetails.jsx

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useLabTest } from "../hooks";

import {
  LabTestDetailsCard,
} from "../components/tests";

import "./../styles/tests.css";

const LabTestDetails = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const {
    test,
    loading,
    error,
    deleteTest,
  } = useLabTest(testId);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this laboratory test?"
    );

    if (!confirmed) return;

    const success = await deleteTest(testId);

    if (success) {
      navigate("/laboratory/tests");
    }
  };

  if (loading) {
    return (
      <section className="lab-test-details-page">
        <div className="page-loading">
          Loading laboratory test...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="lab-test-details-page">
        <div className="alert alert-danger">
          {error}
        </div>

        <Link
          to="/laboratory/tests"
          className="btn btn-secondary"
        >
          Back to Tests
        </Link>
      </section>
    );
  }

  if (!test) {
    return (
      <section className="lab-test-details-page">
        <div className="alert alert-warning">
          Laboratory test not found.
        </div>

        <Link
          to="/laboratory/tests"
          className="btn btn-secondary"
        >
          Back to Tests
        </Link>
      </section>
    );
  }

  return (
    <section className="lab-test-details-page">

      {/* ==========================
          Page Header
      ========================== */}

      <header className="page-header">

        <div>
          <h1>{test.name}</h1>

          <p>
            View laboratory test information and configuration.
          </p>
        </div>

        <div className="page-actions">

          <Link
            to="/laboratory/tests"
            className="btn btn-outline"
          >
            Back
          </Link>

          <Link
            to={`/laboratory/tests/${test.id}/edit`}
            className="btn btn-primary"
          >
            Edit
          </Link>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </header>

      {/* ==========================
          Test Information
      ========================== */}

      <LabTestDetailsCard test={test} />

    </section>
  );
};

export default LabTestDetails;