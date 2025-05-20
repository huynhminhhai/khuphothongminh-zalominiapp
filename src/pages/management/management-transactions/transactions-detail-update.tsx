import { HeaderSub } from "components/header-sub"
import { TransactionsDetailUpdateForm } from "components/transactions"
import React from "react"
import { Box, Page } from "zmp-ui"

const TransactionsDetailUpdatePage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật chi tiết khoản thu chi" />
                <TransactionsDetailUpdateForm />
            </Box>
        </Page>
    )
}

export default TransactionsDetailUpdatePage