import { HeaderSub } from "components/header-sub"
import { ChartCategories, ChartCompareMonth, ChartRemainingBalance } from "components/report-finance"
import React from "react"
import { Box, Page } from "zmp-ui"

const ReportFinanceChartPage: React.FC = () => {

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Tổng quan tài chính" />
                <Box p={4}>
                    <div className="mb-[100px]">
                        <Box>
                            <ChartCompareMonth />
                        </Box>
                    </div>
                    <Box>
                        <ChartCategories />
                    </Box>
                    <Box pt={8}>
                        <ChartRemainingBalance />
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default ReportFinanceChartPage