// src/features/laboratory/pages/LabOrders.jsx

import React from "react";
import { Link } from "react-router-dom";

import { useLabOrders } from "../hooks";

import {
  LabOrderTable,
} from "../components/orders";

import {
  OrderFilter,
} from "../components/filters";

import "../styles/orders.css";

const LabOrders = () => {
  const {
    orders,
    loading,
    error,

    pagination,

    filters,

    handleSearch,
    handleStatusChange,
    handlePriorityChange,
    handleDoctorChange,
    handlePatientChange,
    handleDateRangeChange,
    handlePageChange,

    refresh,
    deleteOrder,
  } = useLabOrders();

  return (
    <section className="lab-orders-page">

      {/* ======================================
          Page Header
      ====================================== */}

      <header className="page-header">

        <div className="page-title">
          <h1>Laboratory Orders</h1>

          <p>
            Manage laboratory requests, monitor processing status,
            and track patient test orders.
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
            to="/laboratory/orders/new"
            className="btn btn-primary"
          >
            + New Order
          </Link>

        </div>

      </header>

      {/* ======================================
          Filters
      ====================================== */}

      <OrderFilter
        filters={filters}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        onDoctorChange={handleDoctorChange}
        onPatientChange={handlePatientChange}
        onDateRangeChange={handleDateRangeChange}
      />

      {/* ======================================
          Error State
      ====================================== */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* ======================================
          Orders Table
      ====================================== */}

      <LabOrderTable
        data={orders}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onDelete={deleteOrder}
      />

    </section>
  );
};

export default LabOrders;