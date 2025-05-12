import React from "react";
import { Avatar, Box, useNavigate } from "zmp-ui";
import { BanDieuHanh } from "./type";
import images from "assets/images";

type TeamItemType = {
    data: BanDieuHanh;
}

const TeamItem: React.FC<TeamItemType> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Box px={3} py={6} className="box-shadow-3 rounded-lg" onClick={() => navigate(`/team-detail?id=${data.banDieuHanhId}`)}>
            <div className="flex flex-col items-center gap-3">
                <Avatar src={data.anhDaiDien || images.avatar} size={60}/>
                <Box className="text-center">
                    <h3 className="text-[13px] font-semibold">
                        {data.hoTen}
                    </h3>
                    <h4 className="text-[11px] text-[#808080] font-medium">
                        {data.tenChucVu}
                    </h4>
                </Box>
            </div>
        </Box>
    )
}

export default TeamItem;