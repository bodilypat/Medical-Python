/* *********************************************************** */
/* File: src/features/doctors/components/DoctorStatusBadge.jsx */
/* *********************************************************** */

import React from "react";

const STATUS_CONFIG = {
    active: {
        label: "Active",
        color: "#16a34a",
        background: "#dcfce7",
        icon: "🟢",
    },

    inactive: {
        label: "Inactive",
        color: "#6b7280",
        background: "#f3f4f6",
        icon: "⚪",
    },

    on_leave: {
        label: "On Leave",
        color: "#d97706",
        background: "#fef3c7",
        icon: "🟡",
    },

    suspended: {
        label: "Suspended",
        color: "#dc2626",
        background: "#fee2e2",
        icon: "🔴",
    },

    retired: {
        label: "Retired",
        color: "#4b5563",
        background: "#e5e7eb",
        icon: "⚫",
    },

    pending: {
        label: "Pending",
        color: "#2563eb",
        background: "#dbeafe",
        icon: "🔵",
    },
};

const DoctorStatusBadge = ({
    status = "inactive",
    size = "medium",
    outlined = false,
    showIcon = true,
    className = "",
}) => {
    const key = status.toLowerCase().replace(/\s+/g, "_");

    const config =
        STATUS_CONFIG[key] ||
        STATUS_CONFIG.inactive;

    const style = outlined
        ? {
              color: config.color,
              border: `1px solid ${config.color}`,
              backgroundColor: "#ffffff",
          }
        : {
              color: config.color,
              backgroundColor: config.background,
          };

    return (
        <span
            className={`doctor-status-badge doctor-status-${size} ${className}`}
            style={style}
        >
            {showIcon && (
                <span className="doctor-status-icon">
                    {config.icon}
                </span>
            )}

            <span className="doctor-status-text">
                {config.label}
            </span>
        </span>
    );
};

export default DoctorStatusBadge;
