import TitleSection from "components/titleSection"
import React, { useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import { useStoreApp } from "store/store"
import { FeedbackSkeleton, TaskSectionSkeleton } from "components/skeleton"
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import { useGetFeedbackListNormal } from "apiRequest/feeback"
import FeedbackItem from "./FeedbackItem"

const FeedbackSection: React.FC<any> = () => {

    const navigate = useNavigate()
    const { account } = useStoreApp()

    const [param, setParam] = useState({
        page: 1,
        pageSize: 4,
        ApId: account?.apId,
        MaXa: account?.maXa,
    });

    const { data, isLoading } = useGetFeedbackListNormal(param);

    if (isLoading) {
        return <FeedbackSkeleton count={1} />
    }

    return (
        <Box>
            <Box px={4} pt={4} pb={0}>
                <TitleSection title="Phản ánh gần đây (từ 1022)" handleClick={() => navigate('/feedback')} mB={4} />
                <Box>
                    {
                        data?.data && data?.data.length > 0 ?
                            <Swiper
                                modules={[Pagination]}
                                spaceBetween={12}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                loop
                                className="max-w-[100%]"
                            >
                                {
                                    data.data.map((item: any, index: number) => (
                                        <SwiperSlide key={`${item.tinTucId}-${index}`} className="mb-4">
                                            <FeedbackItem key={index} data={item} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            :
                            <Box py={4} className="text-center">Chưa có phản ánh nào</Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default FeedbackSection