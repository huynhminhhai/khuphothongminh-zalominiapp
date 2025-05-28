import images from "assets/images"
import React from "react"
import { Box, Button } from "zmp-ui"

type EmptyDataProps = {
    title?: string;
    desc?: string;
    handleClick?: () => void;
    textBtn?: string;
}

const EmptyData: React.FC<EmptyDataProps> = ({ title, desc, handleClick, textBtn }) => {

    return (
        <Box>
            <Box flex justifyContent="center">
                <img className="w-[180px] h-auto" src={images.empty} alt="Không có dữ liệu" />
            </Box>
            <Box mt={4}>
                {
                    title &&
                    <h3 className="text-[18px] leading-[26px] font-medium text-center">{title}</h3>
                }
                {
                    desc &&
                    <p className="text-[14px] leading-[20px] text-[#555] mt-2 text-center">
                        {desc}
                    </p>
                }
            </Box>
            {
                handleClick && textBtn &&
                <Box mt={4}>
                    <Button size="medium" variant="secondary" fullWidth onClick={handleClick}>{textBtn}</Button>
                </Box>
            }
        </Box>
    )
}

export default EmptyData