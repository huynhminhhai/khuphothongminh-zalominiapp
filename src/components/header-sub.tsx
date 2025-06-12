import React from "react";
import { Box, Header } from "zmp-ui";

type HeaderSubProps = {
    title: string;
    onBackClick?: () => void;
}

export const HeaderSub: React.FC<HeaderSubProps> = ({title, onBackClick}) => {
    return (
        <Header 
            className="sub shadow-sm"
            {...(onBackClick ? { onBackClick } : {})}
            title={
                (
                    <Box flex alignItems="center">
                        <h4 className="text-[18px] leading-[22px] font-semibold mt-1 mr-6">{title}</h4>
                    </Box>
                ) as unknown as string
            }
        />
    )
}