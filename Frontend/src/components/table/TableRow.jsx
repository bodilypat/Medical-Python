/* ********************************* */
/* File: src/components/TableRow.jsx */ 
/* ********************************* */

import TableCell from "./TableCell";
import TableActions from "./TableActions";

const TableRow = ({
    row,
    columns,
    actions,
}) => (
    <tr>
        {columns.map((columns) => (
            <TableCell 
                key={columns.key}
                row={row}
                column={column}
            />
        ))}

        {actions.lengt > 0 && (
            <TableActions 
                row={row}
                actions={actions}
            />
        )}
    </tr>
);
export default TableRow;


