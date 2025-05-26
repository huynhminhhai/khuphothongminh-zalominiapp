import { HeaderSub } from "components/header-sub"
import { InforResidentSection } from "components/inforResident"
import React from "react"
import { Box, Page, useNavigate } from "zmp-ui"

const ResidentPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[0px]">
            <Box>
                <HeaderSub title="Hộ gia đình" onBackClick={() => navigate('/')} />
                <InforResidentSection />
            </Box>
        </Page>
    )
}

export default ResidentPage