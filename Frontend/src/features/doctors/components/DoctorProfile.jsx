/* ******************************************************* */
/* File: src/features/doctors/components/DoctorProfile.jsx */ 
/* ******************************************************* */

import React from "react";

const DoctorProfile = ({ doctor }) => {

    if (!doctor) {
        return (
            <div className="doctor-profile-empty">
                No doctor information available.
            </div>
        );
    }

    return (
        <div className="doctor-profile">

            {/* Header */}
            <div className="profile-header">
                <div className="doctor-avatar">
                    {
                        doctor.first_name?.charAt(0)
                    }
                    {
                        doctor.last_name?.charAt(0)
                    }
                </div>

                <div>
                    <h2>Dr. {doctor.first_name} {doctor.last_name}</h2>

                    <p className="specialty">{doctor.specialty}</p>
                </div>
            </div>

            {/* Personal Information */}

            <section className="profile-section">
                <h3>Personal Information</h3>

                <div className="profile-grid">
                    <ProfileItem 
                        label="First Name"
                        value={doctor.first_name}
                    />

                    <ProfileItem
                        label="Last Name"
                        value={doctor.last_name}
                    />

                    <ProfileItem 
                        label="Email"
                        value={doctor.email}
                    />

                    <ProfileItem 
                        label="Phone"
                        value={doctor.phone}
                    />

                </div>
            </section>

            {/* Profressional Information  */}
            <section className="profile-section">
                <h3>Profession Information</h3>
                
                <div className="profile-grid">
                    <ProfileItem
                        label="Specialty"
                        value={doctor.specialty}
                    />

                    <ProfileItem 
                        label="Department"
                        value={doctor.department}
                    />

                    <ProfileItem
                        label="License Number"
                        value={doctor.license_number}
                    />

                    <ProfileItem
                        label="Experience"
                        value={
                            doctor.experience_years
                                ? `${doctor.experience_years} years`
                                : "_"
                        }
                    />
                </div>
            </section>

            {/* Schedule information */}
            <section className="profile-sectin">
                <h3>Availability</h3>

                <div className="profile-grid">
                    <ProfileItem
                        label="Working Days"
                        value={
                            doctor.working_days || "-"
                        }
                    />

                    <ProfileItem
                        label="Working Hours"
                        value={
                            doctor.working_hours || "-"
                        }
                    />
                </div>
            </section>

            {/* System Information */}
            <section className="profile-section">
                <h3>System Information</h3>

                <div className="profile-grid">
                    <ProfileItem 
                        label="Doctor ID"
                        value={doctor.id}
                    />

                    <ProfileItem 
                        label="Created At"
                        value={
                            doctor.created_at || "-"
                        }
                    />
                    <ProfileItem
                        label="Updated At"
                        value={
                            doctor.updated_at || "-"
                        }
                    />
                </div>
            </section>
        </div>
    );
};

/* Reusable profile field */
const ProfileItem = ({
    label,
    value,
}) => {
    return (
        <div className="profile-item">
            <label>
                {label}
            </label>
            <p>
                {value || "-"}
            </p>
        </div>
    );
};

export default DoctorProfile;


