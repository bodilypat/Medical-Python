/* ********************************** */
/* File: src/components/TableCell.jsx */ 
/* ********************************** */

const TableCell = ({
    row,
    column,
}) => {
    if (column.render) {
        return (
            <td>
                {column.render(row)}
            </td>
        );
    }

    return (
        <td>
            {row[column.key]}
        </td>
    );
};

export default TableCell;