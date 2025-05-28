import { DocumentList } from "components/document"
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, Page, useNavigate } from "zmp-ui"

const DocumentPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Văn bản cần biết" onBackClick={() => navigate('/')} />
                <Box>
                    <DocumentList />
                </Box>
            </Box>
        </Page>
    )
}

export default DocumentPage