import { HeaderSub } from "components/header-sub"
import { NewsList } from "components/news"
import React from "react"
import { Box, Page, useNavigate } from "zmp-ui"

const NewsPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Thông tin cần biết" onBackClick={() => navigate('/')} />
                <Box pb={4}>
                    <NewsList />
                </Box>
            </Box>
        </Page>
    )
}

export default NewsPage