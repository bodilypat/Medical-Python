/* ********************************************************* */
/*  File: src/features/patients/components/PatientTable.jsx  */
/* ********************************************************* */

import { useMemo } from "react";

import Table from "../../../components/table";
import { patientColumns } from "../utils/patientColumns";

const PatientTable = ({
    patients = [],
    loading = false,
    onEdit,
    onDelete,
}) => {
    const actions = useMemo(
        () => [
            {
                label: "Edit",
                className: "edit",
                onClick: onEdit,
            },
            {
                label: "Delete",
                className: "delete",
                onClick: onDelete,
            },
        ],
        [onEdit, onDelete]
    );

    return (
        <Table
            data={patients}
            columns={patientColumns}
            actions={actions}
            loading={loading}
            emptyMessage="No patients found."
        />
    );
};

export default PatientTable;
