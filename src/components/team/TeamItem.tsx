import { TeamType } from "constants/utinities";
import React from "react";
import { Avatar, Box, useNavigate } from "zmp-ui";

type TeamItemType = {
    data: TeamType;
}

const TeamItem: React.FC<TeamItemType> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Box px={3} py={6} className="box-shadow-3 rounded-lg" onClick={() => navigate(`/team-detail?id=${data.id}`)}>
            <div className="flex flex-col items-center gap-3">
                <Avatar src={data.avatar} size={60}/>
                <Box className="text-center">
                    <h3 className="text-[16px] font-semibold">
                        {data.fullname}
                    </h3>
                    <h4 className="text-[12px] text-[#808080] font-medium">
                        {data.position}
                    </h4>
                </Box>
            </div>
        </Box>
    )
}

export default TeamItem;