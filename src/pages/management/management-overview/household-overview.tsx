import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"
import { CulturalHouseHoldChart, PercentCulturalChart, PercentPoorChart, PoorHouseHoldChart } from "components/overview";


const HouseHoldOverviewPage = () => {

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Tổng quan hộ gia đình" />
                <Box>
                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                            <PercentPoorChart />
                        </div>
                    </Box>
                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                            <PoorHouseHoldChart />
                        </div>
                    </Box>
                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                            <PercentCulturalChart />
                        </div>
                    </Box>
                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                            <CulturalHouseHoldChart />
                        </div>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default HouseHoldOverviewPage