/* ******************************************************** */
/* File: src/features/doctors/components/DoctorSchedule.jsx */ 
/* ******************************************************** */

import React from "react";

const DAYS = [
    "mONDAY",
    "Tuesday",
    "WednessDay",
    "Thurday",
    "Friday",
    "Saturday",
    "Sunday",
];

const STATUS_COLORS = {
    Available: "success",
    Busy: "warning",
    Leave: "danger",
    Holiday: "secondary",
};

const DoctorSchdule = ({
    schedule = [],
    editable = false,
    onChange,
}) => {

    const getSchedule = (day) => 
        schedule.find((item) => item.day === day) || {
            day,
            available: false,
            start_time: "",
            end_time: "",
            status: "Available",
        };

    const handleChange = (day, field, value) => {

        if (!editable || !onChange) return;

        const updated = schedule.map((item) => 
            item.day === day 
                ? {
                    ...item,
                    [fild]: value,
                }
                :item
        );

        if (!schedule.some((item) => item.day === day)) {
            updated.push({
                day,
                available: false,
                start_time: "",
                end_time: "",
                status: "Available",
                [field]: value,
            });
        }

        onChange(updated);
    };

    return (
        <div className="doctor-schedule">

            <div className="schedule-header">

                <h3>Weekly Schedule</h3>
            </div>

            <table className="schedule-table">

                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Available</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                {DAYS.map((day) => {
                    const item = getSchedule(day);

                    return (
                        <tr key={day}>

                            <td><strong>{day}</strong></td>

                            <td>
                                {editable ? (
                                    <input 
                                        type="checkbox"
                                        checked={item.available}
                                        onChange={(e) => 
                                            handleChange(
                                                day,
                                                "available",
                                                e.target.checked 
                                            )
                                        }
                                    />
                                ) : (
                                    <span>
                                        {item.available
                                            ? "" 
                                            : "-"}
                                    </span>
                                )}
                            </td>

                            <td>
                                {editable ? (
                                    <input 
                                        type="time"
                                        value={item.start_time}
                                        disabbled={!item.available}
                                        onChange={(e) => 
                                            handleChange(
                                                day,
                                                "start_time",
                                                e.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    item.available
                                        ? item.start_time || "-"
                                        : "-"
                                )}
                            </td>

                            <td>
                                {editable ? (
                                    <input 
                                        type="time"
                                        value={item.end_time}
                                        disabbled={!item.available}
                                        onChange={(e) => 
                                            handleChange(
                                                day,
                                                "end_time",
                                                e.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    item.available
                                        ? item.end_time || "-"
                                        : "-"
                                )}
                            </td>

                            <td>
                                {editable ? (
                                    <select 
                                        value={item.status}
                                        onChange={(e) => 
                                            handleChange(
                                                day,
                                                "status",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Available">Available</option>
                                        <option calue="Busy">Busy</option>
                                        <option value="Leave">Leave</option>
                                        <option value="Holiday">Holiday</option>
                                    </select>
                                ) : (
                                    <span 
                                        className={`schedule-status badge badge-${STATUS-COLURS[item.status] || "secondary"}`}
                                    >
                                        {item.status}
                                    </span>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};
export default DoctorSchdule;
