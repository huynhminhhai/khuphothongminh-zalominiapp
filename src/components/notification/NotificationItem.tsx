import { NotificationType } from "constants/utinities"
import React, { useEffect, useRef, useState } from "react"
import { timeAgo } from "utils/date"
import { Box, useNavigate } from "zmp-ui"
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import images from "assets/images";

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

    return (
        <Box className="border-b-[3px] border-gray-100 bg-[#e3ecf9]">
            <Box p={4}>
                <div className="flex gap-3">
                    <div className="mt-[2px]">
                        {
                            <img className="w-[36px] h-[36px]" src={images.speaker} alt="alerts" />
                            // <Icon fontSize={18} color="#c46574" icon='icon-park-outline:dot' />
                            // :
                            // <div className="w-[18px] h-[18px]"></div>
                        }
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-[16px] leading-[22px] font-semibold text-primary-color">{data?.tieuDe}</h3>
                            {/* <div className="text-[14px] font-medium text-primary-color">{timeAgo(data.created_at)}</div> */}
                        </div>
                        <div>
                            <motion.div
                                initial={false}
                                animate={{
                                    height: expanded ? fullHeight : MAX_HEIGHT,
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                            >
                                <div ref={contentRef} className="mt-[2px]">
                                    <p className="text-[14px] text-gray-color leading-[22px] font-medium">
                                        {data?.noiDung}
                                    </p>
                                </div>
                            </motion.div>

                            <div className="flex items-center gap-1 mt-[2px]">
                                <button
                                    onClick={() => navigate(`/notification-detail?id=${data.thongBaoId}`)}
                                    className="text-blue-600 font-medium text-[12px] mt-1 leading-[1]"
                                >
                                    Xem chi tiết
                                </button>
                                <Icon className="mt-1 text-blue-600" icon='radix-icons:dot-filled' />
                                {isOverflow && (
                                    <button
                                        onClick={() => setExpanded(!expanded)}
                                        className="text-blue-600 font-medium text-[12px] mt-1 leading-[1]"
                                    >
                                        {expanded ? "Thu gọn" : "Xem thêm"}
                                    </button>
                                )}
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