import React from "react"
import { Box } from "zmp-ui"
import StatisticList from "./StatisticList"
import StatisticMain from "./StatisticMain"
import { useStoreApp } from "store/store"
import { PermissionActions, permissionsList } from "utils/permission"

const StatisticSection: React.FC<any> = () => {

    const { hasPermission } = useStoreApp()

    return (
        <Box>
            <Box px={4} pb={4}>
                {
                    hasPermission(permissionsList.homeBangDieuKhien, PermissionActions.XEM) &&
                    <StatisticList />
                }
                <StatisticMain />
            </Box>
        </Box>
    )
}

export default StatisticSection