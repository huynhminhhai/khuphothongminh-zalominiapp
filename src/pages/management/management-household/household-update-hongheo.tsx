import { HeaderSub } from "components/header-sub"
import { HouseholdHoNgheoUpdateForm } from "components/household"
import React from "react"
import { Box, Page } from "zmp-ui"

const HouseholdHoNgheoUpdatePage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật thông tin hộ dân" />
                <HouseholdHoNgheoUpdateForm />
            </Box>
        </Page>
    )
}

export default HouseholdHoNgheoUpdatePage