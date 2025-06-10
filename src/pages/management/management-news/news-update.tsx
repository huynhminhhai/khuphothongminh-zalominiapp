import { HeaderSub } from "components/header-sub"
import { NewsUpdateForm } from "components/news"
import React from "react"
import { Box, Page } from "zmp-ui"

const NewsUpdatePage: React.FC = () => {

    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật bản tin Khu phố/Ấp" />
                <NewsUpdateForm />
            </Box>
        </Page>
    )
}

export default NewsUpdatePage