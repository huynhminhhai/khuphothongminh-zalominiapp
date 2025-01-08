import images from "assets/images"
import { News } from "constants/utinities"
import React from "react"
import { Box, Text, useNavigate } from "zmp-ui"

type NewsItemProps = {
    data: News
}

const NewsItem: React.FC<NewsItemProps> = ({ data }) => {

    const navigate = useNavigate()

    return (
        <Box>
            <div
                className="flex items-center gap-3 news-item py-4 border-b-[1px]"
                onClick={() => navigate(`/news-detail/?id=${data.id}`)}
            >
                <div className="w-[150px] h-[110px]">
                    <img className="h-[100%] w-[100%] object-cover" src={data.imageUrl || images.thumbnailNews} alt={data.title} />
                </div>
                <div className='flex-1 flex flex-col justify-center'>
                    <h3 className="text-[16px] leading-[20px] font-semibold line-clamp-2 mb-1">{data.title}</h3>
                    <div className="line-clamp-3 text-[14px] leading-[18px] font-normal text-[#7c7c7c] mb-2">{data.description}</div>
                    <div className="text-end text-[12px] text-[#7c7c7c] font-normal leading-[1] ">{data.publishedDate}</div>
                </div>
            </div>
        </Box>
    )
}

export default NewsItem