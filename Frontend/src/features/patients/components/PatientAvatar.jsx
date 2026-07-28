/* ********************************************************** */
/* File: src/features/patients/components/PatientAvatar.jsx   */
/* ********************************************************** */

import { useMemo } from "react";

const SIZE_MAP = {
    xs: 32,
    sm: 40,
    md: 56,
    lg: 72,
    xl: 96,
};

const DEFAULT_SIZE = "md";

const getInitials = (firstName = "", lastName = "") => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
        .toUpperCase()
        .trim();
};

const PatientAvatar = ({
    patient,
    src,
    alt,
    size = DEFAULT_SIZE,
    className = "",
}) => {
    if (!patient && !src) return null;

    const dimension = SIZE_MAP[size] || SIZE_MAP[DEFAULT_SIZE];

    const imageSrc = src || patient?.avatar || patient?.profile_image;

    const initials = useMemo(
        () =>
            getInitials(
                patient?.first_name,
                patient?.last_name
            ),
        [patient]
    );

    const imageAlt =
        alt ||
        `${patient?.first_name || ""} ${patient?.last_name || ""}`.trim() ||
        "Patient Avatar";

    if (imageSrc) {
        return (
            <img
                src={imageSrc}
                alt={imageAlt}
                width={dimension}
                height={dimension}
                className={`patient-avatar ${className}`}
                loading="lazy"
            />
        );
    }

    return (
        <div
            className={`patient-avatar patient-avatar--placeholder ${className}`}
            style={{
                width: dimension,
                height: dimension,
            }}
            aria-label={imageAlt}
            title={imageAlt}
        >
            {initials || "P"}
        </div>
    );
};

export default PatientAvatar;
