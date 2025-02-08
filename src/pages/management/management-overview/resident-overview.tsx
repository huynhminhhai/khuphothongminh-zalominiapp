import { HeaderSub } from "components/header-sub"
import { AgeChart, JobChart, PercentInsuranceChart, TotalResidentChart } from "components/overview"
import React from "react"
import { Box, Page } from "zmp-ui"


const ResidentOverviewPage = () => {

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Tổng quan tình hình cư" />
                <Box>
                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                            <TotalResidentChart />
                        </div>
                    </Box>
                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                            <AgeChart />
                        </div>
                    </Box>
                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                            <JobChart />
                        </div>
                    </Box>
                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                            <PercentInsuranceChart />
                        </div>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default ResidentOverviewPage