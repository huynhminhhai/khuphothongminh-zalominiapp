import TitleSection from "components/titleSection"
import React, { useState } from "react"
import { Box, useNavigate } from "zmp-ui"
import MeetingItem from "./MeetingItem"
import { useStoreApp } from "store/store"
import { MeetingSectionSkeleton } from "components/skeleton"
import { useGetMeetingTodayList } from "apiRequest/meeting"
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';

const MeetingSection: React.FC<any> = () => {

    const navigate = useNavigate()
    const { account } = useStoreApp()
    const [param, setParam] = useState({
        page: 1,
        pageSize: 4,
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: ''
    });

    const { data, isLoading } = useGetMeetingTodayList();

    if (isLoading) {
        return <MeetingSectionSkeleton count={1} />
    }

    return (
        <Box>
            <Box px={4} pt={4} pb={0}>
                <TitleSection title="Cuộc họp hôm nay" handleClick={() => navigate('/meeting')} />
                <Box>

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
                                    data.data.map((item: any, index: number) => (
                                        <SwiperSlide key={`${item.tinTucId}-${index}`}>
                                            <MeetingItem data={item} />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            :
                            <Box py={4} className="text-center">Chưa có cuộc họp nào</Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default MeetingSection