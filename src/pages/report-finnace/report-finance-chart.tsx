import { HeaderSub } from "components/header-sub"
import { ChartCategories, ChartCompareMonth, ChartRemainingBalance } from "components/report-finance"
import React from "react"
import { Box, Page } from "zmp-ui"

const ReportFinanceChartPage: React.FC = () => {

    return (
        <Page className="relative flex-1 flex flex-col" style={{ backgroundColor: '#f5f6f7' }}>
            <Box>
                <HeaderSub title="Tổng quan tài chính" />
                <Box>
                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 pt-4 pb-[80px]">
                        <ChartCompareMonth />
                        </div>
                    </Box>

                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                        <ChartCategories />
                        </div>
                    </Box>

                    <Box p={4}>
                        <div className="bg-white box-shadow-4 rounded-xl px-3 py-4">
                        <ChartRemainingBalance />
                        </div>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default ReportFinanceChartPage