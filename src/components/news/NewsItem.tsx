import images from "assets/images"
import React from "react"
import { Box, useNavigate } from "zmp-ui"
import { NewsType } from "./type"
import { getFullImageUrl } from "utils/file"
import { formatDate } from "utils/date"

type NewsItemProps = {
    data: NewsType
}

const NewsItem: React.FC<NewsItemProps> = ({ data }) => {

    const navigate = useNavigate()

    return (
        <Box onClick={() => navigate(`/news-detail/?id=${data.tinTucId}`)}>
            <div
                className="flex items-center gap-3 news-item py-4 border-b-[1px]"
            >
                <div className="w-[150px] h-[110px]">
                    <img className="h-[100%] w-[100%] object-cover" src={getFullImageUrl(data.anhDaiDien)} alt={data.tieuDe} />
                </div>
                <div className='flex-1 flex flex-col justify-center'>
                    <h3 className="text-[15px] leading-[20px] font-semibold line-clamp-2 mb-1">{data.tieuDe || data.moTa}</h3>
                    <div className="line-clamp-3 text-[13px] leading-[18px] font-medium text-gray-color mb-2">{data.moTa}</div>
                    <div className="text-end text-[12px] text-gray-color font-medium leading-[1] ">{formatDate(data.ngayXuatBan)}</div>
                </div>
            </div>
        </Box>
    )
}

export default NewsItem