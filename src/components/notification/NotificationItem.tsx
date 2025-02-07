import { Icon } from "@iconify/react"
import { NotificationType } from "constants/utinities"
import React, { useState } from "react"
import { timeAgo } from "utils/date"
import { Box, useNavigate } from "zmp-ui"

type NotificationItemProps = {
    data: NotificationType
}

const NotificationItem: React.FC<NotificationItemProps> = ({ data }) => {

    const [detailNoti, setDetailNoti] = useState<NotificationType>(data)

    const navigate = useNavigate()

    return (
        <Box style={{backgroundColor: detailNoti.status === 1 ? '#f7f4fb' : '#fff'}} className="border-b-[1px]">
            <Box p={4}>
                <div className="flex gap-2">
                    {
                        detailNoti.status === 1 ?
                        <Icon fontSize={18} color="#ff4045" icon='icon-park-outline:dot' /> :
                        <div className="w-[18px] h-[18px]"></div>
                    }
                    <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-[18px] font-semibold text-[#731611]">{detailNoti.title}</h3>
                            <div className="text-[14px] font-medium text-[#731611]">{timeAgo(detailNoti.created_at)}</div>
                        </div>
                        <p className="text-[14px] leading-[22px] mt-2">{detailNoti.content}</p>
                        <div className="flex items-center gap-1 font-medium mt-2 text-[#776a96]">
                            {
                                detailNoti.status === 1 &&
                                <>
                                    <div onClick={() => setDetailNoti({...detailNoti, status: 2})}>Đánh dấu đã đọc</div>
                                    <Icon icon='radix-icons:dot-filled' />
                                </>
                            }
                            <div onClick={() => navigate('/meeting-detail?id=1')}>Xem chi tiết</div>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default NotificationItem