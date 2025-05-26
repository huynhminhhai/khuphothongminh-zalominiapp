import React from "react";
import { Box, useNavigate } from "zmp-ui";
import { ServicesType } from "./ServiceList";
import { motion } from "framer-motion";
import { useCheckRequireApId } from "utils/permission";

type ServiceItemType = {
    data: ServicesType;
}

const ServiceItem: React.FC<ServiceItemType> = ({ data }) => {

    const navigate = useNavigate()
    const checkRequireApId = useCheckRequireApId();

    const handleClick = () => {
        if (data.isRequireApId) {
            checkRequireApId(() => navigate(data.url));
        } else {
            navigate(data.url);
        }
    };

    return (
        <motion.div
            onClick={handleClick}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        >
            <div className="flex-center flex-col gap-1">
                <Box>
                    <div className="rounded-full flex-center w-[44px] h-[44px] relative">
                        <img className="w-[44px] h-[44px]" src={data.icon} alt={data.label} />
                    </div>
                </Box>
                <Box>
                    <h4 className="text-[14px] leading-[18px] text-center font-medium">{data.label}</h4>
                </Box>
            </div>
        </motion.div>
    )
}

export default ServiceItem;