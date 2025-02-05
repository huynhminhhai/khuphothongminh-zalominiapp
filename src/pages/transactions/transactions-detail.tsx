import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { transactionsOptions } from "constants/mock"
import { TRANSACTIONSDATA, transactionsType } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getLabelOptions } from "utils/options"
import { Box, Page, useNavigate, useSnackbar } from "zmp-ui"

const TransactionDetailPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<transactionsType>()

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const transactionsId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchTransactionsData = async () => {
            setLoading(true);
            try {

                const data = TRANSACTIONSDATA.find(resident => resident.id === Number(transactionsId))

                setDetailData(data)

            } catch (error) {
                console.error("Failed to fetch resident data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionsData();
    }, [transactionsId]);

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Chi tiết khoản thu/chi" />
                <Box>
                    {
                        detailData ?
                            <Box>
                                <Box p={4}>
                                    <h3 className="text-[20px] font-medium">{detailData.category}</h3>
                                </Box>
                                <Box px={4} pb={4}>
                                    <div className="text-[22px] font-semibold" style={{ color: detailData.transaction_type === 1 ? '#16a34a' : '#dc2626' }}>{detailData.transaction_type === 1 ? '+' : '-'}{detailData.amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</div>
                                </Box>
                                <hr />
                                <Box px={4} pb={4} pt={2} className="text-[16px] font-medium">
                                    <div className="flex items-center justify-between w-full py-3">
                                        <div>Loại thu/chi</div>
                                        {
                                            detailData.transaction_type === 1 ?
                                                <div className="bg-green-600 text-white px-2 py-1 rounded-lg">
                                                    {getLabelOptions(detailData.transaction_type, transactionsOptions)}
                                                </div> :
                                                <div className="bg-red-600 text-white px-2 py-1 rounded-lg">
                                                    {getLabelOptions(detailData.transaction_type, transactionsOptions)}
                                                </div>

                                        }
                                    </div>
                                    <div className="flex items-center justify-between w-full py-3">
                                        <div>Ngày thu/chi</div>
                                        <div>
                                            {
                                                detailData.transaction_date
                                            }
                                        </div>
                                    </div>
                                </Box>
                                <hr />
                                <Box p={4}>
                                    <div className="text-[16px] font-medium mb-1">Nội dung nhiệm vụ</div>
                                    <div className="text-[16px] leading-[22px]">
                                        {detailData.description}
                                    </div>
                                </Box>
                            </Box>
                            :
                            <EmptyData />
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default TransactionDetailPage