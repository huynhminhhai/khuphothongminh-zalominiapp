import { useGetNewsListNormal, useGetNewsPublicListNormal } from "apiRequest/news"
import images from "assets/images"
import { Divider } from "components/divider"
import { NewsSectionSkeleton } from "components/skeleton"
import TitleSection from "components/titleSection"
import React, { useState } from "react"
import { useStoreApp } from "store/store"
import { Box, useNavigate } from "zmp-ui"
import { NewsType } from "./type"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getFullImageUrl } from "utils/file"

const NewsSection: React.FC = () => {

    const navigate = useNavigate()
    const { account } = useStoreApp()
    const [param, setParam] = useState({
        page: 1,
        pageSize: 4,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
        NgayXuatBanTuNgay: '',
        NgayXuatBanDenNgay: '',
        TacGia: '',
        TieuDe: '',
    });

    const { data, isLoading } = useGetNewsPublicListNormal(param);

    if (isLoading) {
        return <NewsSectionSkeleton count={1}/>
    }

    return (
        <>
            <Divider />
            <Box p={4} className="news-section">
                <TitleSection title="Thông tin cần biết mới nhất" handleClick={() => navigate('/news')} />
                <Box
                    flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    className="w-full"
                >

                    {
                        data.data && data.data.length > 0 ?
                            <Swiper
                                modules={[Pagination]}
                                spaceBetween={12}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                loop
                                className="max-w-[100%]"
                            >
                                {
                                    data.data.map((item: NewsType, index: number) => (
                                        <SwiperSlide key={`${item.tinTucId}-${index}`}>
                                            <div onClick={() => navigate(`/news-detail/?id=${item.tinTucId}`)}>
                                                <img
                                                    className="slide-img h-[200px] w-full object-cover rounded-xl"
                                                    src={ getFullImageUrl(item.anhDaiDien) }
                                                    alt={item.tieuDe}
                                                />
                                                <h3 className="text-[16px] leading-[22px] font-semibold whitespace-normal mt-2 line-clamp-2">{item.tieuDe || item.moTa}</h3>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            :
                            <Box py={4} className="text-center">Chưa có thông tin cần biết nào!</Box>
                    }

                </Box>
            </Box>
        </>
    )
}

export default NewsSection