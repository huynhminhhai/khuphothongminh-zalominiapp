import { Icon } from "@iconify/react"
import { useGetTransactionType } from "apiRequest/transaction"
import { TransactionColor, TransactionsType } from "constants/utinities"
import React from "react"
import { formatDate } from "utils/date"
import { Box, useNavigate } from "zmp-ui"

type InvoiceItemProps = {
    data: TransactionsType
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ data }) => {

    const navigate = useNavigate()

    const { data: transactionType } = useGetTransactionType();

    const type = transactionType?.find(item => item.loaiGiaoDichTaiChinhId === data?.loaiGiaoDichTaiChinhId);
    const typeColor = TransactionColor[type?.tenLoaiGiaoDichTaiChinh] || "var(--gray-color)";

    return (
        <Box
            onClick={() => navigate(`/transactions-detail?id=${data.thuChiId}`)}
        >
            <Box py={4} className="border-b-[1px]" flex alignItems="center" justifyContent="space-between">
                <Box flex alignItems="center" className="gap-3 w-[100%]">
                    <Box>
                        <div className="w-[60px] h-[60px] bg-gray-100 rounded-full flex items-center justify-center">
                            {
                                type?.tenLoaiGiaoDichTaiChinh === "Thu" ?
                                    <Icon icon='mingcute:arrow-right-line' fontSize={25} className="text-green-600" /> :
                                    <Icon icon='mingcute:arrow-left-line' fontSize={25} className="text-red-600" />
                            }
                        </div>
                    </Box>
                    <Box className="flex-1 w-[100%]">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-[16px] leading-[20px] font-semibold line-clamp-2">{data.noiDung}</h3>
                            </div>

                            <div className="flex items-center justify-between w-[100%]">
                                <h4 className="flex items-center gap-2 text-[14px] font-medium text-gray-color"><Icon fontSize={16} icon='uiw:date' /> {formatDate(data.ngayGiaoDich)}</h4>
                                <div className="text-[18px] font-medium" style={{ color: typeColor }}>{type?.tenLoaiGiaoDichTaiChinh === "Thu" ? '+' : '-'}{data.soTien.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                            </div>

                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default InvoiceItem