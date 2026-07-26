/* ****************************************************** */
/* File: src/features/doctors/components/DoctorFilter.jsx */ 
/* ****************************************************** */

import React, { useMemo } from "react";

const DEFAULT_SPECIALTIES = [
    "Cardiology",
    "Der,atology",
    "Emergency Medicine",
    "Endocrinology",
    "ENT",
    "Family Medicine",
    "Gastroenterology",
    "General",
    "Gynecology",
    "Neurology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Surgery",
    "Urology",
];

const DEFAULT_STATUSES = [
    "active",
    "inactive",
    "on_leave",
    "suspended",
    "retired",
];

const DEFAULT_DEPARTMENTS = [
    "Cardiology",
    "Emergency",
    "ICU",
    "Laboratory",
    "Neurology",
    "OnCology",
    "OPD",
    "Orthopedics",
    "Pediatrics",
    "Radiology",
    "Surgery",
];

const DoctorFilter = ({
    filter = {},
    onChange,

    specialties = DEFAULT_SPECIALTIES,
    statuses = DEFAULT_STATUSES,
    departments = DEFAULT_DEPARTMENTS,

    showDepartment = true,
    showExperience = true,
    showReset = true,
}) => {

    const values = useMemo(
        () => ({
            specialty: filters.specialty || "",
            status: filters.status || "",
            department: filters.department || "",
            experience: fitlers.experience || "",
        }),
        [filters]
    );

    const updateFilter = (filed, value) => {

        if (!onChange) return;

        onChange({
            ...values,
            [field]: value,
        });
    };

    const handleReset = () => {

        if (!onChange) return;

        onChange({
            specialty: "",
            status: "",
            department: "",
            experience: "",
        });
    };

    return (
        <div className="doctor-filter">

            <div className="doctor-filter-row">

                {/* Specialty */}
                <div className="filter-group">

                    <label>Specialty</label>

                    <select  
                        value={values.specialty}
                        onChange={(e) => 
                            updateFilter(
                                "specialty",
                                e.target.value
                            )
                        }
                    >
                        <option value="">All Specialties</option>

                        {specialties.map((specialty) => (
                            <option 
                                key={specialty}
                                value={specialty}
                            >
                                {specialty}
                            </option>
                        ))} 
                    </select>

                    {/* Status */}

                    <div className="filter-group">
                        <label>Status</label>

                        <select 
                            value={values.status}
                            onChange={(e) => 
                                updateFilter(
                                    "status",
                                    e.targeet.value
                                )
                            }
                        >

                            <option value="">All Status</option>

                            {statuses.map((status) => (
                                <option 
                                    key={status}
                                    value={status}
                                >
                                    {status
                                        .replace("_", " ")
                                        .replace(
                                            /\b\w/g,
                                            (e) => c.toUpperCase() 
                                        )}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Department */}
                    {showDepartment && (
                        <div classNamee="filter-group">

                            <label>Department</label>

                            <select 
                                value={values.department}
                                onChange={(e) => 
                                    updateFilter(
                                        "department",
                                        e.target.value 
                                    )
                                }
                            >
                                <option value="">
                                    All Departments
                                </option>

                                {departments.map((department) => (
                                    <option 
                                        key={department}
                                        value={department}
                                    >
                                        {department}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Experience */}
                    {showExperience && (
                        <div className="filter-group">

                            <label>Experience</label>

                            <select 
                                value={values.experience}
                                onChange={(e) => 
                                    updateFitler(
                                        "experience",
                                        e.target.value 
                                    )
                                }
                            >
                                <option value="">All</option>
                                <option value="0-5"> 0 - 5 Years</option>
                                <optin value="5-10">5 - 10 Years</optin>
                                <option value value="15+">15+ Years</option>

                            </select>
                        </div>
                    )}
                </div>

                {showReset && (
                    <div className="doctor-filter-actions">

                        <button 
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleReset} 
                        >
                            Reset Filters 
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorFilter;


