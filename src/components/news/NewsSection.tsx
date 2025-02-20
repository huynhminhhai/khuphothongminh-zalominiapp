import { useGetNewsList } from "apiRequest/news"
import images from "assets/images"
import { Divider } from "components/divider"
import { NewsSectionSkeleton } from "components/skeleton"
import TitleSection from "components/titleSection"
import { NEWSDATA } from "constants/utinities"
import React, { useState } from "react"
import { Box, Swiper, useNavigate } from "zmp-ui"

const initParam = {
    page: 1,
    pageSize: 5,
};

const NewsSection: React.FC = () => {

    const [param, setParam] = useState(initParam);
    const navigate = useNavigate()

    const { data, isLoading } = useGetNewsList(param);

    const listData = data?.pages.reduce((acc, page) => [...acc, ...page], []) || []

    if (isLoading) {
        return <NewsSectionSkeleton count={1} />
    }

    return (
        <>
            {
                listData && listData.length > 0 ?
                    <>
                        <Divider />
                        <Box p={4} className="news-section">
                            <TitleSection title="Tin tức mới nhất" handleClick={() => navigate('/news')} />
                            <Box
                                flex
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                            >

                                <Swiper
                                    loop
                                    duration={12000}
                                    autoplay
                                >
                                    {
                                        listData.map((item, index) => (
                                            <Swiper.Slide key={index}>
                                                <div onClick={() => navigate(`/news-detail/?id=${item.id}`)}>
                                                    <img
                                                        className="slide-img h-[200px] w-full object-cover rounded-xl"
                                                        src={item.imageUrl || images.thumbnailNews}
                                                        alt={item.title}
                                                    />
                                                    <h3 className="text-[16px] font-medium whitespace-normal mt-2 line-clamp-2">{item.id} - {item.title}</h3>
                                                </div>
                                            </Swiper.Slide>
                                        ))
                                    }
                                </Swiper>
                            </Box>
                        </Box>
                    </>
                    :
                    <></>
            }
        </>
    )
}

export default NewsSection