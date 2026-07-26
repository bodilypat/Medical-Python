/* ******************************************************* */
/* File: src/features/doctors/components/DoctorProfile.jsx */ 
/* ******************************************************* */

import React from "react";
import DoctorAvatar from "./DoctorAvatar";
import DoctorSpecial from "./DoctorSpecialtyBadge";

const DoctorProfile = ({
    doctor,
}) => {
    
    if (!doctor) {
        return null;
    }

    const fullName = [
        doctor.first_name,
        doctor.last_name,
    ]
    .filter(Boolean)
    join(" ");

    const formatCurrency = (value) => {

        if ( 
            value === null,
            value === undefined || 
            value === ""
        ) {
            return "-";
        }

        return new Intl.NumberFormat(
            "en-US",
            {
                style: "currency",
                currency: "USD", 
            }
        )
        .fromat(value);
    };

    const formatDate = (date) => {

        if(!date) {
            return "-";
        }

        return new Date(date)
        .toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric", 
            } 
        ); 
    }; 

    const InfoItem = ({
        label, 
        value, 
    }) => (

        <div className="profile-item">
            
            <label>{label}</label>

            <p>{value || "-"}</p>
        </div>
    );

    return (

        <div className="doctor-profile">

            {/* Header */}
            <div className="profile-header">

                <DoctorAvatar 
                    doctor={doctor}
                />

                <div className="doctor-header-info">

                    <h2>{fullName}</h2>

                    <DoctorSpecialtyBadge
                        specialty={ doctor.specialization }
                    />

                    <span className={` doctor-status ${doctor.status}`}>
                            { doctor.status || "Unknown" }
                    </span>

                    <span className="doctor-id">
                        Doctor ID: {" "} {doctor.id}
                    </span>
                </div>
            </div>

            {/* Personal Information */}
            <section className="profile-section">
                
                <h3>Personal Information</h3>

                <div className="profile-grid">
                    <InfoItem 
                        label="First name"
                        value={doctor.first_name}
                    />

                    <InfoItem 
                        label="Last Name"
                        value={doctor.last_name}
                    />

                    <InfoItem 
                        label="Gender"
                        value={doctor.gender}
                    />

                    <InfoItem 
                        label="Email"
                        value={doctor.email}
                    />

                    <InfoItem 
                        label="Phone"
                        value={doctor.phone}
                    />

                </div>

            </section>

            {/* Professional Information */}
            <sectiion className="profile-section">

                <h3>Professional Information</h3>

                <div className="profile-grid">
                    
                    <InfoItem 
                        label="Specialization"
                        value={doctor.specialization}
                    />
                    <InfoITem 
                        label="Quanlification"
                        value={doctor.quanlification}
                    />
                    
                    <InfoItem 
                        label="Experience"
                        value={
                            doctor.experience 
                                ? `${doctor.experiece} Years`   
                                : "-"
                        }
                    />

                    <InfoITem 
                        label="Lincense Number"
                        value={doctor.license_number}
                    />

                    <InfoItem 
                        label="Depertment"
                        value={doctor.department}
                    />

                </div>
            </sectiion>

            {/* Hospital Information */}
            <section className="profile-section">

                <h3>Consultation Information</h3>

                <div className="profile-grid">

                    <InfoItem 
                        label="Consultation Fee"
                        value={ formatCurrency ( doctor.consultation_fee)}
                    />

                    <InfoItem 
                        label="Status"
                        value={doctor.status}
                    />

                </div>
            </section>

            {/* Schedule Summary */}
            {
                doctor.schedule && (
                    <section className="profile-section">

                        <h3>Availability</h3>

                        <div className="doctor-schedule-summary">
                            {
                                doctor.schedule.map(
                                    (item, index) => (
                                        <div 
                                            key={index}
                                            className="schedurle-item"
                                        >
                                            <strong>
                                                {item.day}
                                            </strong>

                                            <span>
                                                {item.start}
                                                { " - "}
                                                {item.end}
                                            </span>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </section>
                )
            }

            {/* System Information */}
            <section className="profile-section">

                <h3>System Information</h3>

                <div className="profile-grid">

                    <InfoItem 
                        label="Created At"
                        value={formatDate(doctor.created_at)}
                    />

                    <InfoItem 
                        label="Updated At" 
                        value={formatDate(doctor.updated_at)}
                    />

                </div>
            </section>
        </div>
    );
};
export default DoctorProfile.jsx 
