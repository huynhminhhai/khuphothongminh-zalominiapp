import { useGetTransactionDetail, useGetTransactionType } from "apiRequest/transaction"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton"
import { TransactionColor } from "constants/utinities"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { formatDate } from "utils/date"
import { Box, Page, useNavigate, useSnackbar } from "zmp-ui"

const TransactionDetailPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const transactionsId = searchParams.get("id");

    const { data: detailData, isLoading } = useGetTransactionDetail(Number(transactionsId));
    const { data: transactionType } = useGetTransactionType();

    const type = transactionType?.find(item => item.loaiGiaoDichTaiChinhId === detailData?.loaiGiaoDichTaiChinhId);
    const typeColor = TransactionColor[type?.tenLoaiGiaoDichTaiChinh] || "var(--gray-color)";

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Chi tiết khoản thu/chi" />
                <Box pt={4}>
                    {
                        isLoading ?
                            <NewsDetailSkeleton count={1} /> :
                            detailData ?
                                <Box>
                                    <Box px={4} pb={4}>
                                        <div className="title-page" style={{ color: typeColor }}>{type?.tenLoaiGiaoDichTaiChinh === "Thu" ? '+' : '-'}{detailData.soTien.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                                    </Box>
                                    <hr />
                                    <Box px={4} pb={4} pt={2} className="text-[16px] font-medium">
                                        <div className="flex items-center justify-between w-full py-3">
                                            <div>Loại thu/chi</div>
                                            {
                                                type.tenLoaiGiaoDichTaiChinh === "Thu" ?
                                                    <div className="bg-green-600 text-white px-2 py-1 rounded-lg">
                                                        {type?.tenLoaiGiaoDichTaiChinh}
                                                    </div> :
                                                    <div className="bg-red-600 text-white px-2 py-1 rounded-lg">
                                                        {type?.tenLoaiGiaoDichTaiChinh}
                                                    </div>

                                            }
                                        </div>
                                        <div className="flex items-center justify-between w-full py-3">
                                            <div>Ngày thu/chi</div>
                                            <div>
                                                {
                                                    formatDate(detailData.ngayGiaoDich)
                                                }
                                            </div>
                                        </div>
                                    </Box>
                                    <hr />
                                    <Box p={4}>
                                        <div className="text-[16px] font-medium mb-2">Nội dung thu/chi</div>
                                        <div className="text-[16px] leading-[22px]">
                                            {detailData.noiDung}
                                        </div>
                                    </Box>
                                </Box>
                                :
                                <EmptyData title="Không tìm thấy khoản thu/chi" />
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default TransactionDetailPage