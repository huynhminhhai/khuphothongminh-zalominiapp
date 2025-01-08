import React from "react"
import { Box } from "zmp-ui"
import NewsList from "./NewsList"

const NewsSection: React.FC = () => {
    return (
        <Box>
            <Box p={4}>
                <NewsList />
            </Box>
        </Box>
    )
}

export default NewsSection