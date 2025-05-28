import { Icon } from "@iconify/react"
import images from "assets/images"
import React from "react"
import { formatDate } from "utils/date"
import { Box, useNavigate } from "zmp-ui"

type DocumentItemProps = {
    data: any
}

const DocumentItem: React.FC<DocumentItemProps> = ({ data }) => {

    const navigate = useNavigate()

    return (
        <Box
            onClick={() => navigate(`/document-detail?id=${data.vanBanId}`)}
        >
            <Box py={4} className="border-b-[1px]" flex alignItems="center" justifyContent="space-between">
                <Box flex alignItems="center" className="gap-3 w-[100%]">
                    <Box>
                        <img className="w-[60px]" src={images.document} alt={data.trichYeu} />
                    </Box>
                    <Box className="flex-1 w-[100%]">
                        <div className="flex flex-col">
                            <div className="flex flex-col mb-2">
                                <h3 className="text-[16px] leading-[20px] font-semibold line-clamp-2 mb-2">{data?.trichYeu}</h3>
                                <div className="flex items-center justify-between w-[100%] mb-2">
                                    <h4 className="flex items-center gap-2 text-[14px] font-medium text-gray-color"><Icon fontSize={16} icon='uiw:date' /> {data?.ngayBanHanh ? formatDate(data.ngayBanHanh) : ''}</h4>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default DocumentItem