/* ***************************************************** */
/* File: src/features/doctors/components/DoctorTable.jsx */ 
/* ***************************************************** */

import React from "react";
import Table from "../../../components/table";
import { doctorColumns } from "../utils/doctorColumns";

const DoctorTable = ({
    doctors = [],
    loading = false,
    onEdit,
    onDelete,
}) => {

    const actions = [
        {
            lable: "Edit",
            className: "edit",
            onClick: onEdit,
        },
        {
            label: "Delete",
            className: "delete",

            onClick: (doctor) => {
                const confirmed = window.confirm(
                    `Are you sure you want to delete Dr. ${doctor.first_name} ${doctor.last_name}?`
                );

                if (confirmed) {
                    onDelete(doctor.id);
                }
            },
        },
    ];

    if (loading) {
        return (
            <div className="doctor-table-loading">
                Loading doctors... 
            </div>
        );
    }

    return (

        <div className="doctor-table">
            <Table 

                data={doctors}
                columns={doctorColumns}
                actions={actions}
                emptyMessage="No doctors found."
            />

        </div>
    );
};

export default DoctorTable;

