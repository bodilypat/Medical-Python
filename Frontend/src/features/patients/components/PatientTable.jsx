/* ******************************************************* */
/* File: src/features/patients/components/PatientTable.jsx */
/* ******************************************************* */
import React from "react";
import Table from "../../../components/table";
import { pateintColumn }from "../utils/PatientColumns";

const PatientTable = ({
    patients = [],
    loading = false,
    onEdit,
    onDelete,
}) => {

    const actions = [
        {
            label: "Edit",
            className: "edit",
            onClick: onEdit,
        },
        {
            label: "Delete",
            className: "delete",
            onClick: (patient) => {
                if (
                    window.confirm(
                        `Are you sure want to delete ${patient.first_name} ${patient.last_name}?`
                    )
                ) {
                    onDelete(patient.id);
                }
            },
        },
    ];

    if (loading) {
        return (
            <div className="patient-table-loading">
                Loading patients...
            </div>
        );
    }

    return (
        <Table 
            data={patients}
            columns = {patientColumns}
            actions={actions}
            emptyMessage="No patients found."
        />
    );
};
export default PatientTable;

