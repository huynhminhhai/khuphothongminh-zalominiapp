import { HeaderSub } from "components/header-sub"
import { ReportFinanceCreateForm } from "components/report-finance"
import React from "react"
import { Box, Page } from "zmp-ui"

const ReportFinanceAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Tạo báo cáo" />
                <ReportFinanceCreateForm />
            </Box>
        </Page>
    )
}

export default ReportFinanceAddPage