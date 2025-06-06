import { NotificationType } from "constants/utinities"
import React, { useEffect, useRef, useState } from "react"
import { timeAgo } from "utils/date"
import { Box, useNavigate } from "zmp-ui"
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import images from "assets/images";
import { useReadNotification, useUnReadNotification } from "apiRequest/notification";

type NotificationItemProps = {
    data: any
}

const NotificationItem: React.FC<NotificationItemProps> = ({ data }) => {

    const navigate = useNavigate()

    const [expanded, setExpanded] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);
    const [fullHeight, setFullHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const LINE_HEIGHT = 22; // tương ứng leading-[22px]
    const MAX_HEIGHT = LINE_HEIGHT * 2;

    useEffect(() => {
        if (contentRef.current) {
            const scrollHeight = contentRef.current.scrollHeight;
            setFullHeight(scrollHeight);
            setIsOverflow(scrollHeight > MAX_HEIGHT);
        }
    }, [data?.noiDung]);

    const { mutate: readNotification, isPending: isReadPending } = useReadNotification();
    const { mutate: unReadNotification, isPending: isUnReadPending } = useUnReadNotification();


    return (
        <Box className="border-b-[1px] border-gray-200 bg-[#e3ecf9]"
            style={{
                backgroundColor: !data?.chiTietThongBao || data?.chiTietThongBao?.tinhTrangId === 7 ? "#e3ecf9" : "#fff"
            }}
        >
            <Box p={4}>
                <div className="flex gap-2">
                    <div>
                        {
                            <div className="flex items-center w-[18px] mt-1">
                                {
                                    !data?.chiTietThongBao || data?.chiTietThongBao?.tinhTrangId === 7 ?
                                        <Icon fontSize={18} color="#c46574" icon='icon-park-outline:dot' />
                                        :
                                        <div className="w-[18px] h-[18px]"></div>
                                }
                                {/* <img
                                    style={{
                                        filter: !data?.chiTietThongBao || data?.chiTietThongBao?.tinhTrangId === 7 ? "none" : "grayscale(80%)",
                                    }}
                                    className="w-[32px] h-[32px] mb-2" src={images.speaker} alt="alerts" /> */}
                            </div>
                        }
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-[18px] leading-[24px] font-semibold text-primary-color">{data?.tieuDe}</h3>
                            {/* <div className="text-[14px] font-medium text-primary-color">{timeAgo(data.created_at)}</div> */}
                        </div>
                        <div>
                            {/* <motion.div
                                initial={false}
                                animate={{
                                    height: expanded ? fullHeight : MAX_HEIGHT,
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                            > */}
                            <div ref={contentRef} className="mt-[2px]">
                                <p className="text-[16px] text-gray-color leading-[22px] font-medium line-clamp-2">
                                    {data?.noiDung}
                                </p>
                            </div>
                            {/* </motion.div> */}

                            <div className="flex items-center gap-1 mt-[3px]">
                                <button
                                    disabled={isReadPending || isUnReadPending}
                                    onClick={() => {
                                        if (!data?.chiTietThongBao || data?.chiTietThongBao?.tinhTrangId === 7) {
                                            readNotification(data?.thongBaoId)
                                        } else {
                                            unReadNotification(data?.thongBaoId)
                                        }
                                    }}
                                    className="text-[#4c66af] font-medium text-[15px] mt-1 leading-[1]"
                                >
                                    {!data?.chiTietThongBao || data?.chiTietThongBao?.tinhTrangId === 7 ? "Đánh dấu đã xem" : "Đánh dấu chưa xem"}
                                </button>
                                <Icon className="mt-1 text-[#4c66af]" icon='radix-icons:dot-filled' />
                                <button
                                    onClick={() => navigate(`/notification-detail?id=${data.thongBaoId}`)}
                                    className="text-[#4c66af] font-medium text-[15px] mt-1 leading-[1]"
                                >
                                    Xem chi tiết
                                </button>
                                {/* <Icon className="mt-1 text-blue-600" icon='radix-icons:dot-filled' />
                                {isOverflow && (
                                    <button
                                        onClick={() => setExpanded(!expanded)}
                                        className="text-blue-600 font-medium text-[12px] mt-1 leading-[1]"
                                    >
                                        {expanded ? "Thu gọn" : "Xem thêm"}
                                    </button>
                                )} */}
                            </div>
                        </div>
                        {/* <div className="flex items-center gap-1 font-medium mt-2 text-primary-color">
                            {
                                data.status === 1 &&
                                <>
                                    <div onClick={() => setDetailNoti({...data, status: 2})}>Đánh dấu đã đọc</div>
                                    <Icon icon='radix-icons:dot-filled' />
                                </>
                            }
                            <div onClick={() => navigate('/meeting-detail?id=44')}>Xem chi tiết</div>
                        </div> */}
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default NotificationItem