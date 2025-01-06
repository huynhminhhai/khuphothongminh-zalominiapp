import React from "react"
import { Box } from "zmp-ui"

type TitleSectionType = {
    title: string;
}

const TitleSection: React.FC<TitleSectionType> = ({title}) => {
    return (
        <Box>
            <h3 className="text-[18px] font-semibold mb-4">{title}</h3>
        </Box>
    )
}

export default TitleSection