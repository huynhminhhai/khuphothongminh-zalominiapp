import { DocumentUpdateForm } from "components/document"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"

const DocumentUpdatePage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Cập nhật văn bản triển khai" />
                <DocumentUpdateForm />
            </Box>
        </Page>
    )
}

export default DocumentUpdatePage