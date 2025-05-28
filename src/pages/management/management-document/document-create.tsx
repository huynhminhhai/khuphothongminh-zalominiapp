import { DocumentCreateForm } from "components/document"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page } from "zmp-ui"

const DocumentAddPage: React.FC = () => {
    return (
        <Page className="relative flex-1 flex flex-col bg-white pb-[72px]">
            <Box>
                <HeaderSub title="Thêm văn bản triển khai" />
                <DocumentCreateForm />
            </Box>
        </Page>
    )
}

export default DocumentAddPage