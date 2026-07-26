/* ************************************ */
/* File: src/components/table/Table.jsx */
/* ************************************ */

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableLoading from "./TableLoading";
import TableEmpty from "./TableEmpty";

const Table = ({
    columns = [],
    data = [],
    actions = [],
    loading = false,
    rowKey = "id",
    emptyMessage = "No data found.",
}) => {

    if (loading) {
        return <TableLoading />
    }

    if  (!data.length) {
        return <TableEmpty message={emptyMessage} />
    }

    return (

        <div className="table-container">
            <table className="table">
                <TableHeader 
                    columns={columns}
                    hasActions={actions.length > 0}
                />

                <TableBody 
                    columns={columns}
                    data={data}
                    actions={actions}
                    rowKey={rowKey}
                />
            </table>
        </div>
    );
};
export default Table;

