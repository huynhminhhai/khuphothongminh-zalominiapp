import React, { useState } from "react"
import { Box, Button, Input } from "zmp-ui"
import TeamItem from "./TeamItem"
import { TEAMDATA, TeamType } from "constants/utinities"

const initParam = {
    pageIndex: 1,
    pageSize: 10,
    keyword: '',
}

const ServiceList: React.FC<any> = () => {

    const [param, setParam] = useState(initParam)

    const filteredData = TEAMDATA.filter(item =>
        item.fullname.toLowerCase().includes(param.keyword.toLowerCase())
    );

    return (
        <Box>
            <Box>
                <Input.Search size="small" className="rounded-3xl" placeholder="Tìm kiếm nhân sự/ cán bộ" value={param.keyword} onChange={(e) => {
                    setParam((prevParam) => ({
                        ...prevParam,
                        keyword: e.target.value
                    }));
                }} />
            </Box>
            <Box mt={6} mb={4}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {
                        filteredData.map((item: TeamType, index: React.Key) => (
                            <TeamItem key={index} data={item} />
                        ))
                    }
                </div>
            </Box>
            <div className="flex items-center justify-center gap-3 pt-6 pb-2">
                <Button onClick={() => console.log('call api list news')} size="medium">Xem thêm</Button>
            </div>
        </Box>
    )
}

export default ServiceList