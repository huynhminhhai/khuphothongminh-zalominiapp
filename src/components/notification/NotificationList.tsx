import { NOTIFICATIONDATA } from "constants/utinities"
import React from "react"
import { Box } from "zmp-ui"
import NotificationItem from "./NotificationItem"
import { EmptyData } from "components/data"

const NotificationList: React.FC = () => {

    return (
        <Box>
            <div className="grid grid-cols-1">
                {
                    NOTIFICATIONDATA.length > 0 ?
                    NOTIFICATIONDATA.map((item, index) => (
                        <NotificationItem key={index} data={item} />
                    )) :
                    <Box mt={8}>
                        <EmptyData title="Chưa có thông báo" />
                    </Box>
                }
            </div>
        </Box>
    )
}

export default NotificationList