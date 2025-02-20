import { NEWSDATA } from "constants/utinities";
import React, { useState } from "react";
import { Box, useNavigate } from "zmp-ui";
import NewsItem from "./NewsItem";
import NewsMain from "./NewsMain";
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { NewsSkeleton } from "components/skeleton";
import { EmptyData } from "components/data";
import images from "assets/images";
import { useGetNewsList } from "apiRequest/news";

const initParam = {
    page: 1,
    pageSize: 10,
};

const NewsList: React.FC = () => {
    const [param, setParam] = useState(initParam);
    const navigate = useNavigate()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetNewsList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || [];

    const loaderRef = useInfiniteScroll({
        hasMore: hasNextPage,
        loading: isFetchingNextPage,
        onLoadMore: fetchNextPage,
    });

    if (isLoading) {
        return <Box px={4}><NewsSkeleton count={5} /></Box>
    }

    return (
        <Box>
            <Box>
                <div className="grid grid-cols-1">
                    {(listData.length === 0 && !isFetchingNextPage && !isLoading) ? (
                        <Box px={4}>
                            <EmptyData title="Hiện chưa có tin tức nào!" desc="Khi có tin tức, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                        </Box>
                    ) : (
                        <>
                            {/* {listData.length > 0 && <NewsMain data={listData[0]} />} */}
                            {listData.length > 0 &&
                                <Box>
                                    <div
                                        className="news-item"
                                        onClick={() => navigate(`/news-detail/?id=${listData[0].id}`)}
                                    >
                                        <div className="w-[100%] h-[220px]">
                                            <img className="h-[100%] w-[100%] object-cover" src={images.thumbnailNews} alt={listData[0].title} />
                                        </div>
                                        <Box px={4}>
                                            <div className="flex-1 flex flex-col justify-center mt-3 border-b-[1px] pb-4">
                                                <h3 className="text-[18px] leading-[22px] font-semibold line-clamp-2 mb-1">{listData[0].id} - {listData[0].title}</h3>
                                                <div className="line-clamp-3 text-[16px] leading-[20px] font-normal text-[#7c7c7c] mb-2">{listData[0].body}</div>
                                                <div className="text-end text-[14px] leading-[1] text-[#7c7c7c]">12/12/2025</div>
                                            </div>
                                        </Box>
                                    </div>
                                </Box>
                            }
                            <Box px={4}>
                                {listData.slice(1).map((item, index) => (
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
                        </>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4">
                {isFetchingNextPage && <NewsSkeleton count={1} />}
                {listData.length > 0 && !hasNextPage && <p className="text-center pt-4">Đã hiển thị tất cả tin tức</p>}
            </div>
        </Box>
    );
};

export default NewsList;