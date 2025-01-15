import { HeaderSub } from "components/header-sub"
import { NewsAddForm } from "components/news"
import React from "react"
import { Box, Page } from "zmp-ui"

const NewsAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm tin tức" />
                <NewsAddForm />
            </Box>
        </Page>
    )
}

export default NewsAddPage