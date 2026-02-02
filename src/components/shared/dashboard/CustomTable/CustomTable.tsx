import { ITableProps } from "@/types/custom-table.types";

const CustomTable = <T extends object>({ columns, data }: ITableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-md bg-white shadow-xs">
      <table className="min-w-full divide-y divide-[#f2f2f3]">
        <thead className="bg-[#fafafa]">
          <tr>
            {columns?.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold tracking-wider text-nowrap text-[#181D27]"
              >
                {column?.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f2f2f3]">
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm whitespace-nowrap"
                >
                  {"accessor" in column && column.accessor
                    ? String(row[column.accessor] ?? "")
                    : column.cell?.(row)}
                </td>
              ))} */}
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm whitespace-nowrap"
                >
                  {column.cell
                    ? column.cell(row)
                    : "accessor" in column && column.accessor
                      ? String(row[column.accessor] ?? "")
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
