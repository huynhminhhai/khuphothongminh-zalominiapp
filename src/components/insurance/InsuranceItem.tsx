import { Icon } from "@iconify/react"
import React, { useState } from "react"
import { formatDate } from "utils/date"
import { Box, useNavigate } from "zmp-ui"
import { InsuranceItemType } from "./type"

type InsuranceItemProps = {
    data: InsuranceItemType,
    canEdit?: boolean
}

const InsuranceItem: React.FC<InsuranceItemProps> = ({ data, canEdit }) => {

    const navigator = useNavigate()

    const isExpired = new Date(data.denNgay) < new Date();

    return (
        <Box>
            <Box
                className="border-b-[1px] rounded-lg"
                style={canEdit ? { backgroundColor: '#fff' } : {backgroundColor: '#ededed'}}
                p={4}
                mb={3}
            >
                <Box flex alignItems="flex-start" justifyContent="space-between">
                    <Box flex flexDirection="column" className="gap-[2px]">
                        <span className="text-[18px] font-semibold">BHYT</span>
                    </Box>
                    {
                        canEdit && !isExpired && (
                            <div className="relative">
                                <Icon fontSize={22} icon={'nimbus:edit'} className="cursor-pointer" onClick={() => navigator(`/insurance-update?id=${data?.danCuId}`)} />
                            </div>
                        )
                    }
                </Box>
                <div className="grid grid-cols-2 pt-2 gap-2">
                    <div className="col-span-2">
                        <div className="flex flex-col gap-1">
                            <span className="text-[14px] font-medium text-gray-color">Mã số BHYT</span>
                            <span className="text-[16px] font-semibold text-primary-color">{data.maSo}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-medium text-gray-color">Ngày bắt đầu</span>
                        <span className="text-[16px] font-semibold text-primary-color">{formatDate(data.tuNgay)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-medium text-gray-color">Ngày hết hiệu lực</span>
                        <span className="text-[16px] font-semibold text-primary-color">{formatDate(data.denNgay)}</span>
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default InsuranceItem