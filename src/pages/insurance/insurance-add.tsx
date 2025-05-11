import { HeaderSub } from "components/header-sub"
import { InsuranceAddForm } from "components/insurance"
import React from "react"
import { Box, Page } from "zmp-ui"

const InsuranceAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <HeaderSub title="Thêm thẻ BHYT" />
            <Box>
                <Box>
                    <InsuranceAddForm />
                </Box>
            </Box>
        </Page>
    )
}

export default InsuranceAddPage