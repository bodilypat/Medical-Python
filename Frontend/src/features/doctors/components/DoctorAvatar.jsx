/* ***************************************************** */
/* File: src/featues/doctors/components/DoctorAvatar.jsx */ 
/* ***************************************************** */

import React from "react";

const DEFAULT_AVATAR = "";

const DoctorAvatar = ({
    doctor,
    size = 96,
    className = "",
}) => {

    if (!doctor) {
        return null;
    }

    const fullName = [
        doctor.first_name,
        doctor.last_name,
    ]

    .filter(Boolean)
    .join(" ");

    const initials = [
        doctor.first_name?.charAt(0),
        doctor.last_name?.charAt(0),
    ]

    .filter(Boolean)
    .join("")
    .toUpperCase();

    const imageUrl = 
        doctor.avatar || 
        doctor.avatar_url || 
        doctor.profile_image || 
        doctor.image ||
            `${DEFAULT_AVATAR}&name=${encodeURIComponent(fullName)}`;

    const handleImageError = (event) => {
        event.target.onerror = null;

        event.target.src = `${DEFAULT_AVATAR}&name=${encodeURIComponent(
            fullName
        )}`;
    };

    return (
        <div 
            
            className={`doctor-avatar ${className}`}
            style={{ 
                width: size,
                height: size,
            }}
        >
            <img 
                src={imageUrl}
                alt={fullName}
                width={size}
                height={size}
                onError={handleImageError}
                loading="lazy"
                className="doctor-avatar-image"
            />

            {!imageUrl && (
                <div 
                    className="doctor-avatar-placeholder"
                    style={{ 
                        width: size,
                        height: size,
                        lineHeight: `${sise}px`,
                        fontSize: size / 2.5,
                    }}
                >
                    {initials || "DR"}
                </div>
            )}
        </div>
    );
};

export default DoctorAvatar;



