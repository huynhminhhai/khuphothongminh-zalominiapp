import { Icon } from "@iconify/react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";

type TableTanStackProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

const TableTanStack = <T,>({ data, columns }: TableTanStackProps<T>) => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto rounded-t-lg overflow-hidden font-medium">
          <thead className="bg-[#36304a] text-white">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id} colSpan={header.colSpan}
                    className="px-5 py-4 font-medium border-[1px] whitespace-nowrap"
                    style={{ minWidth: header.column.columnDef.size }}
                  >
                    <div
                      className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {/* {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : null} */}
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
                  <tr key={row.id} className={`hover:bg-gray-50 ${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-4 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center gap-3 mt-5">
        <div className="flex gap-2 justify-between w-full">
          <span className="flex items-center gap-1">
            <div>Trang</div>
            <div className="font-medium">
              {table.getState().pagination.pageIndex + 1} trên{' '}
              {table.getPageCount().toLocaleString()}
            </div>
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="border p-2 font-medium"
          >
            {[10, 20, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Hiển thị {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center gap-3 w-full">
          <button
            className="border rounded p-2"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon icon='fluent:previous-16-filled' fontSize={16} />
          </button>
          <button
            className="border rounded p-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon icon='bxs:left-arrow' fontSize={16} />
          </button>
          <button
            className="border rounded p-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon icon='bxs:right-arrow' fontSize={16} />
          </button>
          <button
            className="border rounded p-2"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <Icon icon='fluent:next-16-filled' fontSize={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableTanStack;
