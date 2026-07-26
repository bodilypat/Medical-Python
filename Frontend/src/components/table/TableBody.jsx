/* **************************************** */
/* File: src/components/table/TableBody.jsx */
/* **************************************** */

import TableRow from "./TableRow";

const TableBody = ({
    columns,
    data,
    actions,
    rowKey,
}) => (
    <tbody>
        {data.map((row) => {
            <TableRow 
                key={row[rowKey]}
                row={row}
                columns={columns}
                actions={columns}
            />
        })}
    </tbody>
);

export default TableBody;

