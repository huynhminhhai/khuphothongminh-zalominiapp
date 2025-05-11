import { HeaderSub } from "components/header-sub"
import { InsuranceUpdateForm } from "components/insurance"
import React from "react"
import { Box, Page } from "zmp-ui"

const InsuranceUpdatePage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <HeaderSub title="Cập nhật thẻ BHYT" />
            <Box>
                <Box>
                    <InsuranceUpdateForm />
                </Box>
            </Box>
        </Page>
    )
}

export default InsuranceUpdatePage