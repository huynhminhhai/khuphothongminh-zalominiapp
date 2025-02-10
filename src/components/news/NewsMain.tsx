import images from "assets/images";
import { News } from "constants/utinities";
import React from "react";
import { Box, Text, useNavigate } from "zmp-ui";

type NewsMainProps = {
    data: News
}

const NewsMain: React.FC<NewsMainProps> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Box>
            <div
                className="news-item"
                onClick={() => navigate(`/news-detail/?id=${data.id}`)}
            >
                <div className="w-[100%] h-auto">
                    <img className="h-[100%] w-[100%] object-cover" src={data.imageUrl || images.thumbnailNews} alt={data.title} />
                </div>
                <Box px={4}>
                    <div className="flex-1 flex flex-col justify-center mt-3 border-b-[1px] pb-4">
                        <h3 className="text-[18px] leading-[22px] font-semibold line-clamp-2 mb-1">{data.title}</h3>
                        <div className="line-clamp-3 text-[16px] leading-[20px] font-normal text-[#7c7c7c] mb-2">{data.description}</div>
                        <div className="text-end text-[14px] leading-[1] text-[#7c7c7c]">{data.publishedDate}</div>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

export default NewsMain;