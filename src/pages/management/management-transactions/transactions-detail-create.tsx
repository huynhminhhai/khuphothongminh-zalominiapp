import { HeaderSub } from "components/header-sub"
import { TransactionsDetailCreateForm } from "components/transactions"
import React from "react"
import { Box, Page } from "zmp-ui"

const TransactionsDetailAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm chi tiết khoản thu chi" />
                <TransactionsDetailCreateForm />
            </Box>
        </Page>
    )
}

export default TransactionsDetailAddPage