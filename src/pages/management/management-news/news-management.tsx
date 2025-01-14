import { Icon } from "@iconify/react"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { HeaderSub } from "components/header-sub"
import { TableTanStack } from "components/table"
import { News, NEWSDATA } from "constants/utinities"
import React from "react"
import { Box, Page, useNavigate } from "zmp-ui"

const NewsManagementPage: React.FC = () => {

    const navigate = useNavigate()

    const columns: ColumnDef<News>[] = [
        {
            accessorKey: 'title',
            header: 'Title',
            size: 300
        },
        {
            accessorKey: 'publishedDate',
            header: 'Published Date',
        },
        {
            accessorKey: 'views',
            header: 'Views',
            size: 100
        },
        {
            id: 'actions', // Custom column for actions
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center justify-center space-x-2 whitespace-nowrap">
                    <button
                        onClick={() => navigate(`/news-detail?id=${row.original.id}`)}
                        className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                        <Icon icon='mdi:eye' fontSize={18}/>
                    </button>
                    <button
                        onClick={() => console.log(row.original.id)}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        <Icon icon='ri:edit-line' fontSize={18}/>
                    </button>
                    <button
                        onClick={() => console.log(row.original.id)}
                        className="px-3 py-1 bg-red-700 text-white rounded"
                    >
                        <Icon icon='material-symbols:delete' fontSize={18}/>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Quản lý tin tức" />
                <Box p={4}>
                    <TableTanStack data={NEWSDATA} columns={columns} />
                </Box>
            </Box>
        </Page>
    )
}

export default NewsManagementPage