import { NEWSDATA } from "constants/utinities"
import React, { useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import NewsItem from "./NewsItem"
import { useGetNewsList } from "apiRequest/news"
import { EmptyData } from "components/data"
import images from "assets/images"
import { NewsSkeleton } from "components/skeleton"

type NewsOthersProps = {
    idNews: number
}

const initParam = {
    page: 1,
    pageSize: 5,
};

const NewsOthers: React.FC<NewsOthersProps> = ({ idNews }) => {

    const [param, setParam] = useState(initParam);
    const navigate = useNavigate()

    const { data, isLoading } = useGetNewsList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || []

    const othersNews = listData.filter(item => item.id !== idNews);

    if (isLoading) {
        return <NewsSkeleton count={5} />
    }

    return (
        <Box>
            <div className="grid grid-cols-1">
                {(othersNews.length === 0 && !isLoading) ? (
                    <EmptyData title="Hiện chưa có tin tức nào!" desc="Khi có tin tức, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                ) : (
                    <Box>
                        {othersNews.map((item, index) => (
                            // <NewsItem key={index} data={item} />
                            <Box key={index}
                                onClick={() => navigate(`/news-detail/?id=${item.id}`)}
                            >
                                <div
                                    className="flex items-center gap-3 news-item py-4 border-b-[1px]"
                                >
                                    <div className="w-[150px] h-[110px]">
                                        <img className="h-[100%] w-[100%] object-cover" src={images.thumbnailNews} alt={item.title} />
                                    </div>
                                    <div className='flex-1 flex flex-col justify-center'>
                                        <h3 className="text-[16px] leading-[20px] font-semibold line-clamp-2 mb-1">{item.id} - {item.title}</h3>
                                        <div className="line-clamp-3 text-[14px] leading-[18px] font-normal text-[#7c7c7c] mb-2">{item.body}</div>
                                        <div className="text-end text-[12px] text-[#7c7c7c] font-normal leading-[1] ">12/12/2025</div>
                                    </div>
                                </div>
                            </Box>
                        ))}
                    </Box>
                )}
            </div>
        </Box>
    )
}

export default NewsOthers