import TitleSection from "components/titleSection"
import React, { useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import { useStoreApp } from "store/store"
import { TaskSectionSkeleton } from "components/skeleton"
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import { useGetSurveyPublicListNormal } from "apiRequest/survey"
import SurveyItem from "./SurveyItem"

const SurveySection: React.FC<any> = () => {

    const navigate = useNavigate()
    const { account } = useStoreApp()

    const [param, setParam] = useState({
        page: 1,
        pageSize: 4,
        ApId: account?.apId,
        MaXa: account?.maXa
    })

    const { data, isLoading } = useGetSurveyPublicListNormal(param);

    if (isLoading) {
        return <TaskSectionSkeleton count={1} />
    }

    return (
        <Box>
            <Box px={4} pt={4} pb={0}>
                <TitleSection title="Khảo sát đang diễn ra" handleClick={() => navigate('/survey')} mB={0} />
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
                                            <SurveyItem key={index} data={item} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            :
                            <Box py={4} className="text-center">Chưa có khảo sát nào</Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default SurveySection