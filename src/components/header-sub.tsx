import React from "react";
import { Box, Header } from "zmp-ui";

type HeaderSubProps = {
    title: string;
}

export const HeaderSub: React.FC<HeaderSubProps> = ({title}) => {
    return (
        <Header 
            className="sub"
            title={
                (
                    <Box flex alignItems="center" justifyContent="center">
                        <h4 className="text-[18px] font-semibold mt-1 mr-6">{title}</h4>
                    </Box>
                ) as unknown as string
            }
        />
    )
}