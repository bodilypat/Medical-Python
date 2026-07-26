/* ************************************************************** */
/* File: src/features/doctors/components/DoctorSpecialtyBadge.jsx */
/* ************************************************************** */

import React from "react";

const specialtyColors = {
    Cardiology: "#ef4444",
    Neurology: "#8b5cf6",
    Orthopedics: "#2563eb",
    Pediatrics: "#22c55e",
    Dermatology: "#f59e0b",
    Oncology: "#dc2626",
    Radiology: "#0ea5e9",
    Psychiatry: "#7c3aed",
    Gynecology: "#ec4899",
    Urology: "#14b8a6",
    Ophthalmology: "#3b82f6",
    ENT: "#10b981",
    Dentistry: "#f97316",
    Surgery: "#64748b",
    General: "#6b7280",
};

const DoctorSpecialtyBadge = ({
    specialty,
    size = "medium",
    outlined = false,
    showIcon = true,
    className = "",
}) => {
    if (!specialty) {
        return (
            <span
                className={`doctor-specialty-badge doctor-specialty-default doctor-specialty-${size} ${className}`}
            >
                {showIcon && <span>🩺</span>}
                <span>General</span>
            </span>
        );
    }

    const color =
        specialtyColors[specialty] ||
        specialtyColors.General;

    const style = outlined
        ? {
              color,
              border: `1px solid ${color}`,
              backgroundColor: "#ffffff",
          }
        : {
              color: "#ffffff",
              backgroundColor: color,
          };

    const icons = {
        Cardiology: "❤️",
        Neurology: "🧠",
        Orthopedics: "🦴",
        Pediatrics: "👶",
        Dermatology: "🩹",
        Oncology: "🎗️",
        Radiology: "🩻",
        Psychiatry: "💙",
        Gynecology: "🌸",
        Urology: "🩺",
        Ophthalmology: "👁️",
        ENT: "👂",
        Dentistry: "🦷",
        Surgery: "🔬",
        General: "🩺",
    };

    return (
        <span
            className={`doctor-specialty-badge doctor-specialty-${size} ${className}`}
            style={style}
        >
            {showIcon && (
                <span className="doctor-specialty-icon">
                    {icons[specialty] || "🩺"}
                </span>
            )}

            <span className="doctor-specialty-text">
                {specialty}
            </span>
        </span>
    );
};

export default DoctorSpecialtyBadge;
