import { HeaderSub } from "components/header-sub"
import { NewsList } from "components/news"
import React from "react"
import { Box, Page } from "zmp-ui"

const NewsPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Tin tức" />
                <Box p={4}>
                    <NewsList />
                </Box>
            </Box>
        </Page>
    )
}

export default NewsPage