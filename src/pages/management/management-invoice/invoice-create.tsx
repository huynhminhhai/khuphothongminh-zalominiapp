import { HeaderSub } from "components/header-sub"
import { TransactionsAddForm } from "components/transactions"
import React from "react"
import { Box, Page } from "zmp-ui"

const InvoiceAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm khoản thu chi" />
                <TransactionsAddForm />
            </Box>
        </Page>
    )
}

export default InvoiceAddPage