import { HeaderSub } from "components/header-sub"
import { InvoiceList } from "components/invoice"
import React from "react"
import { Box, Page, useNavigate } from "zmp-ui"

const InVoicePage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col !bg-[#f4f5f6]">
            <Box>
                <HeaderSub title="Hóa đơn" onBackClick={() => navigate('/')} />
                <Box>
                    <InvoiceList />
                </Box>
            </Box>
        </Page>
    )
}

export default InVoicePage