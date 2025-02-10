import images from "assets/images"
import TitleSection from "components/titleSection"
import { NEWSDATA } from "constants/utinities"
import React from "react"
import { Box, Swiper, useNavigate } from "zmp-ui"

const NewsSection: React.FC = () => {

    const firstFourNews = NEWSDATA.slice(0, 4);

    const navigate = useNavigate()

    return (
        <Box p={4} className="news-section">
            <TitleSection title="Tin tức mới nhất" handleClick={() => navigate('/news')}/>
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
                        firstFourNews.map((item, index) => (
                            <Swiper.Slide key={index}>
                                <div onClick={() => navigate(`/news-detail/?id=${item.id}`)}>
                                    <img
                                        className="slide-img h-[200px] w-full object-cover rounded-xl"
                                        src={item.imageUrl || images.thumbnailNews}
                                        alt={item.title}
                                    />
                                    <h3 className="text-[16px] font-medium whitespace-normal mt-2 line-clamp-2">{item.title}</h3>
                                </div>
                            </Swiper.Slide>
                        ))
                    }
                </Swiper>
            </Box>
        </Box>
    )
}

export default NewsSection