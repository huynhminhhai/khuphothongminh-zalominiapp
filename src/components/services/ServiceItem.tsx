import React, { useState } from "react";
import { Box, useNavigate } from "zmp-ui";
import { ServicesType } from "./ServiceList";
import { motion } from "framer-motion";
import { useCheckRequireApId } from "utils/permission";
import { IsComingSoonModal } from "components/modal";
import { useStoreApp } from "store/store";

type ServiceItemType = {
    data: ServicesType;
}

const ServiceItem: React.FC<ServiceItemType> = ({ data }) => {

    const navigate = useNavigate()
    const checkRequireApId = useCheckRequireApId();
    const { setIsShowModalIsComingSoon, setIsShowModalIsLogin, accessToken } = useStoreApp();


    const handleClick = () => {
        if (data.isRequireLogin && !accessToken) {
            setIsShowModalIsLogin(true);
        }
        else if(data.isRequireApId) {
            checkRequireApId(() => navigate(data.url));
        } else if (data.isComingSoon) {
            setIsShowModalIsComingSoon(true);
        }
        else {
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
            <div className="flex-center flex-col gap-1"
                style={{
                    opacity: data.isComingSoon ? 0.6 : 1
                }}
            >
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