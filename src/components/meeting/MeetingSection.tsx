import TitleSection from "components/titleSection"
import React from "react"
import { Box, Swiper, useNavigate } from "zmp-ui"
import { MEETINGDATA } from "constants/utinities"
import MeetingItem from "./MeetingItem"

const MeetingSection: React.FC<any> = () => {

    const navigate = useNavigate()

    const firstTwoMeetings = MEETINGDATA.slice(0, 2);

    return (
        <Box>
            <Box p={4}>
                <TitleSection title="Cuộc họp hôm nay" handleClick={() => navigate('/meeting')} />
                <Box>
                    <Swiper
                        loop
                        duration={12000}
                        autoplay
                    >
                        {
                            firstTwoMeetings.map((item, index) => (
                                <Swiper.Slide key={index}>
                                    <MeetingItem key={index} data={item} />
                                </Swiper.Slide>
                            ))
                        }
                    </Swiper>
                </Box>
            </Box>
        </Box>
    )
}

export default MeetingSection