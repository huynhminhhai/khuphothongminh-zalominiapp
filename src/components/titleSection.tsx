import { Icon } from "@iconify/react";
import React from "react"
import { Box } from "zmp-ui"

type TitleSectionType = {
    title: string;
    mB?: number;
    handleClick?: () => void;
}

const TitleSection: React.FC<TitleSectionType> = ({ title, mB = 4, handleClick }) => {
    return (
        <Box mb={mB}>
            <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold">{title}</h3>
                {
                    handleClick &&
                    <div
                        className="text-primary-color text-[16px] leading-[1] font-semibold flex items-center gap-1"
                        onClick={handleClick}
                    ><span>Xem tất cả</span> <Icon fontSize={16} icon='mingcute:right-line' /></div>
                }
            </div>
        </Box>
    )
}

export default TitleSection