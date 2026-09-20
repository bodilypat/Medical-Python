// src/features/laboratory/pages/LabOrderDetails.jsx

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useLabOrder } from "../hooks";

import {
  LabOrderCard,
  OrderTimeline,
} from "../components/orders";

import "../styles/orders.css";

const LabOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const {
    order,
    loading,
    error,
    deleteOrder,
  } = useLabOrder(orderId);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this laboratory order?"
    );

    if (!confirmed) return;

    const success = await deleteOrder(orderId);

    if (success) {
      navigate("/laboratory/orders");
    }
  };

  if (loading) {
    return (
      <section className="lab-order-details-page">
        <div className="page-loading">
          Loading laboratory order...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="lab-order-details-page">

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
      <section className="lab-order-details-page">

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
    <section className="lab-order-details-page">

      {/* =====================================
          Page Header
      ===================================== */}

      <header className="page-header">

        <div className="page-title">

          <h1>Laboratory Order</h1>

          <p>
            View laboratory order details, patient information,
            requested tests, and processing timeline.
          </p>

        </div>

        <div className="page-actions">

          <Link
            to="/laboratory/orders"
            className="btn btn-outline"
          >
            Back
          </Link>

          <Link
            to={`/laboratory/orders/${order.id}/edit`}
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

      {/* =====================================
          Order Information
      ===================================== */}

      <LabOrderCard order={order} />

      {/* =====================================
          Processing Timeline
      ===================================== */}

      <OrderTimeline
        timeline={order.timeline || []}
      />

    </section>
  );
};

export default LabOrderDetails;