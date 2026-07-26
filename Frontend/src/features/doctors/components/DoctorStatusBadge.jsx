/* *********************************************************** */
/* File: src/features/doctors/components/DoctorStatusBadge.jsx */
/* *********************************************************** */

import React from "react";

const STATUS_CONFIG = {
    active: {
        label: "",
        color: "",
        backgroune: "",
        icon: "",
    },

    inactive: {
        label: "",
        color: "",
        background: "",
        icon: "",
    },

    on_leave: {
        label: "",
        color: "",
        background: "",
        icon: "",
    },

    suspended: {
        label: "",
        color: "",
        background: "",
        icon: "",
    },

    pending: {
        label: "",
        color: "",
        background: "",
        icon: "",
    },
};

const DoctorstatusBadge = ({
    status = "inactive",
    size = "medium",
    outlined = false,
    showIcon = true,
    className = "",
}) => {

    const key = status.toLowerCase().replace(/\s+/g, "_");

    const config = 
        STATUS_CONFIG[key] ||
        STATUS_CONFIG.iinactive;

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
            className={`doctor-status-badge doctor-${size} ${className}`}
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


