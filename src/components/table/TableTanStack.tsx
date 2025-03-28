import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";

type TableTanStackProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

const TableTanStack = <T,>({ data, columns }: TableTanStackProps<T>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
      <div className="overflow-auto h-[550px] shadow-md">
        <table className="w-full rounded-lg overflow-hidden font-medium">
          <thead className="bg-gray-300 text-black sticky top-0">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} >
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id} colSpan={header.colSpan}
                    className="px-5 py-4 font-medium whitespace-nowrap"
                    style={{ minWidth: header.column.columnDef.size }}
                  >
                    <div
                      className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {
              table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    Không có dữ liệu để hiển thị.
                  </td>
                </tr>
              ) :
                table.getRowModel().rows.map((row, rowIndex) => (
                  <tr key={row.id} className={`${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-4 py-4">
                        <div className="line-clamp-2">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
  );
};

export default TableTanStack;
