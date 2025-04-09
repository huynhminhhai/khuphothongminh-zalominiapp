import { Icon } from "@iconify/react"
import { useGetTransactionDetail, useGetTransactionType } from "apiRequest/transaction"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { NewsDetailSkeleton } from "components/skeleton"
import { TransactionColor } from "constants/utinities"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { formatDate } from "utils/date"
import { Box, Button, Page, useNavigate } from "zmp-ui"

const InvoiceDetailPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const transactionsId = searchParams.get("id");

    const { data: detailData, isLoading } = useGetTransactionDetail(Number(transactionsId));
    const { data: transactionType } = useGetTransactionType();

    const type = transactionType?.find(item => item.loaiGiaoDichTaiChinhId === detailData?.loaiGiaoDichTaiChinhId);
    const typeColor = TransactionColor[type?.tenLoaiGiaoDichTaiChinh] || "var(--gray-color)";

    return (
        <Page className="relative flex-1 flex flex-col !bg-[#f4f5f6]">
            <Box>
                <HeaderSub title="Chi tiết khoản thu/chi" />
                <Box p={4}>
                    <Box p={4} className="bg-white rounded-lg">
                        <Box pb={4} mb={4} className="dashed-border-bottom relative">
                            <div className="w-[22px] h-[22px] bg-[#f4f5f6] rounded-full absolute bottom-[-12px] left-[-25px]"></div>
                            <div className="w-[22px] h-[22px] bg-[#f4f5f6] rounded-full absolute bottom-[-12px] right-[-25px]"></div>
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[12px] font-medium text-gray-color">Họ tên</div>
                                        <div className="text-[16px] font-semibold">Huỳnh Minh Hải</div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[12px] font-medium text-gray-color">Số điện thoại</div>
                                        <div className="text-[16px] font-semibold">0848551112</div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[12px] font-medium text-gray-color">Địa chỉ</div>
                                        <div className="text-[16px] font-semibold">123, KP9, Thị trấn Bến Lức, Long An</div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <hr />
                                </div>
                                <div className="col-span-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[12px] font-medium text-gray-color">Ngày lập hóa đơn</div>
                                        <div className="text-[16px] font-semibold">01/04/2025</div>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[12px] font-medium text-gray-color">Hạn thanh toán</div>
                                        <div className="text-[16px] font-semibold">28/04/2025</div>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[12px] font-medium text-gray-color">Loại thanh toán</div>
                                        <div className="text-[16px] font-semibold">Rác sinh hoạt</div>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[12px] font-medium text-gray-color">Mã hóa đơn</div>
                                        <div className="text-[16px] font-semibold">RSH123456789</div>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[12px] font-medium text-gray-color">Số tiền</div>
                                        <div className="text-[20px] font-semibold text-primary-color">340.000đ</div>
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-[12px] font-medium text-gray-color">Trạng thái</div>
                                        <div className={`bg-[#f5f1ee] text-[#c7373e] text-[12px] font-semibold leading-[1] text-center px-3 py-[6px] rounded-xl w-fit`}>
                                            Chưa thanh toán
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                        <Box>
                            <div className="flex flex-col gap-1">
                                <div className="text-[12px] font-medium text-gray-color">QR code</div>
                                <div>
                                    <img className="w-full h-auto" src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="qrcode" />
                                </div>
                            </div>
                        </Box>
                    </Box>
                    <Box mt={4}>
                        <Button className="!bg-white !text-gray-color" size="large" fullWidth>
                            <div className="flex items-center gap-2 justify-center">
                                <Icon className="mt-1" fontSize={16} icon='line-md:download' />
                                <span className="font-semibold">Lưu mã QR Code</span>
                            </div>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default InvoiceDetailPage