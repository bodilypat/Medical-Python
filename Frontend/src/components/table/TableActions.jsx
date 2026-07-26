/* ******************************************* */
/* File: src/components/table/TableActions.jsx */ 
/* ******************************************* */

const TableActions = ({
    row,
    actions,
}) => (
    <td className="table-actions">
        {actions.map((action) => (
            <Button 
                key={action.label}
                className={action.className}
                onClick={() => actions.onClick(row)}
                type="button"
            >
                {action.label}
            </Button>
        ))}
    </td>
);
export default TableActions;


