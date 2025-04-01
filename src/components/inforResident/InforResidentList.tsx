import React, { useState } from "react"
import { Box, Select } from "zmp-ui"
// import { RESIDENT, RESIDENTCRAFT, ResidentType } from "constants/utinities"
import { Divider } from "components/divider"
import { InforResidentItemSub } from "."

const initParam = {
    type: 1,
    parentId: 1,
    status: 3
}

const InforResidentList: React.FC = () => {

    const { Option } = Select

    const [param, setParam] = useState(initParam)

    console.log(RESIDENT)

    const fetchData = [...RESIDENT, ...RESIDENTCRAFT].filter(item => item.parentId === param.parentId && item.residenceType === param.type);

    const filteredData = fetchData.filter(item => {
        const matchesStatus = param.status === 3 || (param.status === 1 && item.status === 1) || (param.status === 2 && item.status !== 1);
        return matchesStatus;
    });

    return (
        <Box>
            <Box pb={2} px={4} flex alignItems="center" justifyContent="space-between" className="gap-3">
                <h3 className="text-[16px] font-semibold whitespace-nowrap">Thành viên thường trú</h3>
                <div className="w-[150px]">
                    <Select
                        className="select-member"
                        defaultValue={3}
                        placeholder="Chọn tổ dân cư"
                        closeOnSelect
                        onChange={(value) => {
                            setParam((prevParam) => ({
                                ...prevParam,
                                status: value as number
                            }));
                        }}
                    >
                        <Option title={'Tất cả'} value={3} />
                        <Option title={'Chưa duyệt'} value={2} />
                        <Option title={'Đã duyệt'} value={1} />

                    </Select>
                </div>
            </Box>
            <div className="grid grid-cols-1">
                {
                    filteredData && filteredData.length > 0 ?
                        filteredData.map((item: ResidentType, index: React.Key) => (
                            <Box key={index}>
                                <InforResidentItemSub data={item} />
                                <Divider />
                            </Box>
                        )) :
                        <div className="text-center pt-2">Chưa có dữ liệu</div>
                }
            </div>
        </Box>
    )
}

export default InforResidentList