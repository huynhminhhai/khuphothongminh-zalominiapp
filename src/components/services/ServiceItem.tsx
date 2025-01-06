import { ServicesType } from "constants/utinities";
import React from "react";
import { Box, useNavigate } from "zmp-ui";

type ServiceItemType = {
    data: ServicesType;
}

const ServiceItem: React.FC<ServiceItemType> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Box onClick={() => navigate(data.url)}>
            <div className="flex-center flex-col gap-2">
                <Box>
                    <div className="bg-[#731611] rounded-full flex-center p-4 w-[65px] h-[65px]">
                        <img src={data.icon} alt={data.label} />
                    </div>
                </Box>
                <Box>
                    <h4 className="text-[14px] leading-[20px] text-center font-medium">{data.label}</h4>
                </Box>
            </div>
        </Box>
    )
}

export default ServiceItem;