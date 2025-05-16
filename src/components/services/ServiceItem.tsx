import React from "react";
import { useLoginWithZalo } from "services/loginWithZalo";
import { Box, useNavigate } from "zmp-ui";
import { ServicesType } from "./ServiceList";

type ServiceItemType = {
    data: ServicesType;
}

const ServiceItem: React.FC<ServiceItemType> = ({data}) => {

    const navigate = useNavigate()
    const { loginWithZalo } = useLoginWithZalo();

    const handleNavigate = (url: string) => {
        if (data.isCheckLogin) {
            loginWithZalo(url)
        } else {
            navigate(url)
        }
    }

    return (
        <Box onClick={() => navigate(data.url)}>
            <div className="flex-center flex-col gap-2">
                <Box>
                    <div className="rounded-full flex-center w-[44px] h-[44px] relative">
                        <img className="w-[44px] h-[44px]" src={data.icon} alt={data.label} />
                    </div>
                </Box>
                <Box>
                    <h4 className="text-[14px] leading-[18px] text-center font-medium">{data.label}</h4>
                </Box>
            </div>
        </Box>
    )
}

export default ServiceItem;