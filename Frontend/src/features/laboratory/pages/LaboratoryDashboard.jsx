// src/features/laboratory/pages/LaboratoryDashboard.jsx

import React from "react";
import { Link } from "react-router-dom";

import { useLaboratoryDashboard } from "../hooks";

import {
  DashboardCard,
  StatisticsCard,
  RecentOrders,
  PendingResults,
  StatusChart,
} from "../components/dashboard";

import "./../styles/dashboard.css";

const LaboratoryDashboard = () => {
  const {
    loading,
    error,
    statistics,
    recentOrders,
    pendingResults,
    statusChart,
  } = useLaboratoryDashboard();

  if (loading) {
    return (
      <div className="laboratory-dashboard">
        <p>Loading laboratory dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="laboratory-dashboard">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <section className="laboratory-dashboard">
      {/* Page Header */}
      <header className="dashboard-header">
        <div>
          <h1>Laboratory Dashboard</h1>
          <p>Monitor laboratory operations and test processing.</p>
        </div>

        <div className="dashboard-actions">
          <Link to="/laboratory/orders/new" className="btn btn-primary">
            + New Lab Order
          </Link>

          <Link to="/laboratory/tests/new" className="btn btn-secondary">
            + Add Test
          </Link>
        </div>
      </header>

      {/* Statistics */}
      <section className="dashboard-grid statistics-grid">
        <StatisticsCard
          title="Today's Orders"
          value={statistics.todayOrders}
          color="primary"
        />

        <StatisticsCard
          title="Pending Results"
          value={statistics.pendingResults}
          color="warning"
        />

        <StatisticsCard
          title="Completed Tests"
          value={statistics.completedTests}
          color="success"
        />

        <StatisticsCard
          title="Rejected Samples"
          value={statistics.rejectedSamples}
          color="danger"
        />
      </section>

      {/* Overview */}
      <section className="dashboard-grid overview-grid">
        <DashboardCard title="Laboratory Status">
          <StatusChart data={statusChart} />
        </DashboardCard>

        <DashboardCard title="Pending Result Entry">
          <PendingResults data={pendingResults} />
        </DashboardCard>
      </section>

      {/* Recent Orders */}
      <section className="dashboard-grid">
        <DashboardCard title="Recent Laboratory Orders">
          <RecentOrders data={recentOrders} />
        </DashboardCard>
      </section>
    </section>
  );
};

export default LaboratoryDashboard;