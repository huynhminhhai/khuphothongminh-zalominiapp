import { HeaderSub } from "components/header-sub"
import { TransactionsUpdateForm } from "components/transactions"
import React from "react"
import { Box, Page } from "zmp-ui"

const TransactionsUpdatePage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật khoản thu chi" />
                <TransactionsUpdateForm />
            </Box>
        </Page>
    )
}

export default TransactionsUpdatePage