// src/features/laboratory/pages/ResultEntry.jsx

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useLabResult } from "../hooks";

import {
  ResultForm,
  ResultPreview,
  ResultHistory,
} from "../components/results";

import "../styles/results.css";

const ResultEntry = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const {
    order,
    result,
    loading,
    saving,
    error,

    saveResult,
    submitResult,
  } = useLabResult(orderId);

  const handleSave = async (formData) => {
    const success = await saveResult(formData);

    if (success) {
      navigate(`/laboratory/orders/${orderId}`);
    }
  };

  const handleSubmit = async (formData) => {
    const confirmed = window.confirm(
      "Submit this laboratory result? It will be available for review."
    );

    if (!confirmed) return;

    const success = await submitResult(formData);

    if (success) {
      navigate(`/laboratory/orders/${orderId}`);
    }
  };

  if (loading) {
    return (
      <section className="result-entry-page">
        <div className="page-loading">
          Loading laboratory result...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="result-entry-page">
        <div className="alert alert-danger">
          {error}
        </div>

        <Link
          to="/laboratory/orders"
          className="btn btn-secondary"
        >
          Back to Orders
        </Link>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="result-entry-page">
        <div className="alert alert-warning">
          Laboratory order not found.
        </div>

        <Link
          to="/laboratory/orders"
          className="btn btn-secondary"
        >
          Back to Orders
        </Link>
      </section>
    );
  }

  return (
    <section className="result-entry-page">

      {/* ==========================================
          Page Header
      ========================================== */}

      <header className="page-header">

        <div>
          <h1>Result Entry</h1>

          <p>
            Enter laboratory findings, reference ranges,
            interpretation, and clinical comments.
          </p>
        </div>

        <div className="page-actions">

          <Link
            to={`/laboratory/orders/${order.id}`}
            className="btn btn-outline"
          >
            Back to Order
          </Link>

        </div>

      </header>

      {/* ==========================================
          Patient & Order Summary
      ========================================== */}

      <section className="result-summary card">

        <div className="card-header">
          <h2>Order Information</h2>
        </div>

        <div className="card-body">

          <div className="summary-grid">

            <div>
              <strong>Order No.</strong>
              <p>{order.orderNumber}</p>
            </div>

            <div>
              <strong>Patient</strong>
              <p>{order.patient?.fullName}</p>
            </div>

            <div>
              <strong>Doctor</strong>
              <p>{order.doctor?.fullName}</p>
            </div>

            <div>
              <strong>Requested Test</strong>
              <p>{order.test?.name}</p>
            </div>

            <div>
              <strong>Priority</strong>
              <p>{order.priority}</p>
            </div>

            <div>
              <strong>Status</strong>
              <p>{order.status}</p>
            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          Result Form
      ========================================== */}

      <ResultForm
        initialValues={result}
        loading={saving}
        onSave={handleSave}
        onSubmit={handleSubmit}
      />

      {/* ==========================================
          Preview
      ========================================== */}

      <ResultPreview
        result={result}
      />

      {/* ==========================================
          Previous Results
      ========================================== */}

      <ResultHistory
        patientId={order.patient?.id}
        testId={order.test?.id}
      />

    </section>
  );
};

export default ResultEntry;