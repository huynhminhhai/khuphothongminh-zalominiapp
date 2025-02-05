import { HeaderSub } from "components/header-sub"
import { ReportFinanceUpdateForm } from "components/report-finance"
import React from "react"
import { Box, Page } from "zmp-ui"

const ReportFinanceUpdatePage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật báo cáo" />
                <ReportFinanceUpdateForm />
            </Box>
        </Page>
    )
}

export default ReportFinanceUpdatePage