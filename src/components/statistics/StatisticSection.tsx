import React from "react"
import { Box } from "zmp-ui"
import StatisticList from "./StatisticList"
import StatisticMain from "./StatisticMain"
import { useStoreApp } from "store/store"
import { PermissionActions, permissionsList } from "utils/permission"
import StatisticListForResident from "./StatisticListForResident"

const StatisticSection: React.FC<any> = () => {

    const { hasPermission } = useStoreApp()

    return (
        <Box>
            <Box px={3} pb={4}>
                {
                    hasPermission(permissionsList.homeBangDieuKhien, PermissionActions.XEM) ?
                    <StatisticList />
                    :
                    <StatisticListForResident />
                }
                <StatisticMain />
            </Box>
        </Box>
    )
}

export default StatisticSection