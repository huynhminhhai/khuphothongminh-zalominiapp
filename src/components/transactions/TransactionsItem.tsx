import { Icon } from "@iconify/react"
import images from "assets/images"
import { taskPriority, taskStatus } from "constants/mock"
import { transactionsType } from "constants/utinities"
import React from "react"
import { getLabelOptions } from "utils/options"
import { Box, useNavigate } from "zmp-ui"

type TransactionsItemProps = {
    data: transactionsType
}

const TransactionsItem: React.FC<TransactionsItemProps> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Box
            onClick={() => navigate(`/task-detail?id=${data.id}`)}
        >
            <Box py={4} className="border-b-[1px]" flex alignItems="center" justifyContent="space-between">
                <Box flex alignItems="center" className="gap-3 w-[100%]">
                    <Box>
                        <div className="w-[60px] h-[60px] bg-gray-100 rounded-full flex items-center justify-center">
                            {
                                data.transaction_type === 1 ?
                                <Icon icon='mingcute:arrow-right-line' fontSize={25} className="text-green-600"/> :
                                <Icon icon='mingcute:arrow-left-line' fontSize={25} className="text-red-600"/>
                            }
                        </div>
                    </Box>
                    <Box className="flex-1 w-[100%]">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-[16px] leading-[20px] font-semibold line-clamp-2">{data.category}</h3>
                            </div>

                            <div className="flex items-center justify-between w-[100%]">
                                <h4 className="flex items-center gap-1 text-[14px] font-normal text-[#7c7c7c]"><Icon fontSize={18} icon='uiw:date' /> {data.transaction_date}</h4>
                                <div className="text-[18px] font-medium" style={{color: data.transaction_type === 1 ? '#16a34a' : '#dc2626'}}>{data.transaction_type === 1 ? '+' : '-'}{data.amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                            </div>
                            
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default TransactionsItem