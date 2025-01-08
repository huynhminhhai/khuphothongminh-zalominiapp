import React from "react"
import { Box, Button } from "zmp-ui"

type ButtonProps = {
    label: string;
    handleClick: () => void;
    iconLeft?: React.ReactElement;
    iconRight?: React.ReactElement;
    size?: 'small' | 'large' | 'medium';
    disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({label, handleClick, iconLeft, iconRight, size='large', disabled=false}) => {
    return (
        <Box>
            <Button variant="primary" size={size} onClick={handleClick} disabled={disabled}>
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