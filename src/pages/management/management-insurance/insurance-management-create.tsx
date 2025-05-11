import { HeaderSub } from "components/header-sub"
import { InsuranceManagementAddForm } from "components/insurance"
import React from "react"
import { Box, Page } from "zmp-ui"

const InsuranceManagementAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm thẻ BHYT" />
                <InsuranceManagementAddForm />
            </Box>
        </Page>
    )
}

export default InsuranceManagementAddPage