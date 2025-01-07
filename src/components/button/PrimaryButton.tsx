import { Icon } from "@iconify/react"
import React from "react"
import { Box, Button } from "zmp-ui"

type ButtonProps = {
    label: string;
    handleClick: () => void;
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
}

const PrimaryButton: React.FC<ButtonProps> = ({label, handleClick, iconLeft, iconRight}) => {
    return (
        <Box>
            <Button variant="primary" size="large" onClick={handleClick}>
                <div className="flex items-center justify-center gap-2 h-[100%]">
                    {iconLeft}
                    <div className="text-[14px] leading-[1]">{label}</div>
                    {iconRight}
                </div>
            </Button>
        </Box>
    )
}

export default PrimaryButton