/* ************************************* */
/* File: src/compoenents/TableHeader.jsx */
/* ************************************* */

const TableHeader = ({ columns, hasActions }) => (
    <thead>
        <tr>
            {columns.map((column) => (
                <th 
                    key={column.key}
                    style={{ width: column.width}}
                >
                    {column.title}
                </th>
            ))}

            {hasActions && <th>Actions</th>}
        </tr>
    </thead>
);
export default TableHeader;


