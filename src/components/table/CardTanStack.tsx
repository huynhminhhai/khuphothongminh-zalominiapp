import { ColumnDef, useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import React from "react";

type CardTanStackProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];
};

const CardTanStack = <T,>({ data, columns }: CardTanStackProps<T>) => {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="grid grid-cols-1 border-t-[1px]">
            {data.length === 0 ? (
                <div className="p-4 text-center">Không có dữ liệu để hiển thị.</div>
            ) : (
                <div>
                    {
                        table.getRowModel().rows.map(row => (
                            <div key={row.id} className="p-4 border-b-[2px] border-dashed">
                                {row.getVisibleCells().map(cell => (
                                    <div key={cell.id} className="flex items-center justify-between gap-8 mb-3">
                                        {/* Hiển thị tiêu đề cột */}
                                        <div className="text-[16px] font-medium text-gray-500 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.header, (cell as any).getContext())}
                                        </div>
                                        {/* Hiển thị nội dung của cell */}
                                        <div className="text-[16px] leading-[20px] text-right font-medium line-clamp-2">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    }


                </div>
            )}
        </div>
    );
};

export default CardTanStack;