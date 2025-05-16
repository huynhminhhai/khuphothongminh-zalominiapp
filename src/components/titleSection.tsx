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
                <h3 className="text-primary-color text-[18px] font-semibold">{title}</h3>
                {
                    handleClick &&
                    <div
                        className="text-[13px] text-gray-500 leading-[1] font-semibold flex items-center gap-[2px]"
                        onClick={handleClick}
                    ><span>Xem tất cả</span> <Icon fontSize={16} icon='mingcute:right-line' /></div>
                }
            </div>
        </Box>
    )
}

export default TitleSection