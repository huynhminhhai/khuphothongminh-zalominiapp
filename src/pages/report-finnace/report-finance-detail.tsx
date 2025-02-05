import { Icon } from "@iconify/react"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { REPORTFINANCEDATA, reportFinanceType } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Box, Page, useNavigate, useSnackbar } from "zmp-ui"
import { convertNumberVND } from "utils/number"

const ReportFinanceDetailPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<reportFinanceType>()

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const transactionsId = searchParams.get("id");

    useEffect(() => {
        // Hàm gọi API để lấy thông tin thành viên
        const fetchTransactionsData = async () => {
            setLoading(true);
            try {

                const data = REPORTFINANCEDATA.find(resident => resident.id === Number(transactionsId))

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
                <HeaderSub title="Chi tiết báo cáo" />
                <Box>
                    {
                        detailData ?
                            <Box>
                                <Box p={4}>
                                    <h3 className="text-[20px] font-medium">{detailData.title}</h3>
                                </Box>
                                <Box p={4} flex className="gap-3">
                                    <div className="border-[1px] rounded-xl p-3 w-full">
                                        <div className="text-[16px] font-medium mb-2">Ngày bắt đầu</div>
                                        <div className="flex items-center gap-2">
                                            <Icon icon='fluent-mdl2:date-time' fontSize={22} className="text-[#c46574]" />
                                            <div className="text-[16px] font-medium">{detailData?.startDate}</div>
                                        </div>
                                    </div>
                                    <div className="border-[1px] rounded-xl p-3 w-full">
                                        <div className="text-[16px] font-medium mb-2">Ngày kết thúc</div>
                                        <div className="flex items-center gap-2">
                                            <Icon icon='fluent-mdl2:date-time' fontSize={22} className="text-[#c46574]" />
                                            <div className="text-[16px] font-medium">{detailData?.endDate}</div>
                                        </div>
                                    </div>
                                </Box>
                                <hr />
                                <Box px={4} pb={4} pt={2} className="text-[16px] font-medium">
                                    <div className="flex items-center justify-between w-full py-3">
                                        <div>Tông thu</div>
                                        <div className="text-green-600">+
                                            {
                                                convertNumberVND(detailData.totalIncome)
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full py-3">
                                        <div>Tông chi</div>
                                        <div className="text-red-600">-
                                            {
                                                convertNumberVND(detailData.totalExpense)
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full py-3">
                                        <div>Tông quỹ còn lại</div>
                                        <div className="text-blue-600">
                                            {
                                                convertNumberVND(detailData.remainingBalance)
                                            }
                                        </div>
                                    </div>
                                </Box>
                                <hr />
                                <Box p={4}>
                                    <div className="text-[16px] font-medium mb-1">Nội dung báo cáo</div>
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

export default ReportFinanceDetailPage