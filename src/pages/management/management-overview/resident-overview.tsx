import { useGetResidentListNormal } from "apiRequest/resident"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { AgeChart, JobChart, PercentInsuranceChart } from "components/overview"
import { ChartSkeleton } from "components/skeleton"
import { StatisticList2 } from "components/statistics"
import React, { useState } from "react"
import { useStoreApp } from "store/store"
import { Box, Page } from "zmp-ui"


const ResidentOverviewPage = () => {

    const { account } = useStoreApp()

    const [param, setParam] = useState({
        page: 1,
        pageSize: 9999999,
        ApId: account ? account?.apId : 0,
        keyword: '',
        HoTen: '',
        HoTenChuHo: '',
        SoGiayTo: '',
        LaChuHo: false
    })

    const { data, isLoading } = useGetResidentListNormal(param);

    return (
        <Page className="relative flex-1 flex flex-col bg-white" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Tổng quan" />
                <Box>
                    <Box px={4} py={2}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                            <StatisticList2 />
                        </div>

                    </Box>
                    {
                        isLoading ?
                            <ChartSkeleton count={3} /> :
                            data?.data?.length > 0 ?
                                <>
                                    <Box px={4} py={2}>
                                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                                            <AgeChart data={data.data} />
                                        </div>
                                    </Box>
                                    <Box px={4} py={2}>
                                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                                            <JobChart data={data.data} />
                                        </div>
                                    </Box>
                                    <Box px={4} py={2}>
                                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                                            <PercentInsuranceChart data={data.data} />
                                        </div>
                                    </Box>
                                </>

                                :

                                <EmptyData title="Không có dữ liệu" />
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default ResidentOverviewPage