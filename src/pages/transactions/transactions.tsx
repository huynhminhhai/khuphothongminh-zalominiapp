import { HeaderSub } from "components/header-sub"
import { TransactionsList } from "components/transactions"
import React from "react"
import { Box, Page } from "zmp-ui"

const TransactionsPage: React.FC = () => {

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Khoản thu/chi" />
                <Box>
                    <TransactionsList />
                </Box>
            </Box>
        </Page>
    )
}

export default TransactionsPage