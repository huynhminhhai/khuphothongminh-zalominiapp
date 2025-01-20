import { HeaderSub } from "components/header-sub"
import { MemberResidentSection } from "components/inforResident"
import React from "react"
import { Box, Page } from "zmp-ui"

const ResidentMemberPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thông tin các thành viên" />
                <MemberResidentSection />
            </Box>
        </Page>
    )
}

export default ResidentMemberPage