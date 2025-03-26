import { ServicesType } from "constants/utinities";
import React from "react";
import { useLoginWithZalo } from "services/loginWithZalo";
import { Box, useNavigate } from "zmp-ui";

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
        <Box onClick={() => handleNavigate(data.url)}>
            <div className="flex-center flex-col gap-2">
                <Box>
                    <div className="rounded-full flex-center w-[60px] h-[60px] relative">
                        <img className="w-[54px] h-[54px]" src={data.icon} alt={data.label} />
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