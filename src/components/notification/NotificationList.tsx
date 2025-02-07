import { NOTIFICATIONDATA } from "constants/utinities"
import React from "react"
import { Box } from "zmp-ui"
import NotificationItem from "./NotificationItem"

const NotificationList: React.FC = () => {

    return (
        <Box>
            <div className="grid grid-cols-1">
                {
                    NOTIFICATIONDATA.map((item, index) => (
                        <NotificationItem key={index} data={item} />
                    ))
                }
            </div>
        </Box>
    )
}

export default NotificationList