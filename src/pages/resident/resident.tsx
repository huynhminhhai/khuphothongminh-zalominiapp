import { HeaderSub } from "components/header-sub"
import { InforResidentSection } from "components/inforResident"
import React from "react"
import { Box, Page } from "zmp-ui"

const ResidentPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thông tin hộ dân" />
                <InforResidentSection />
            </Box>
        </Page>
    )
}

export default ResidentPage