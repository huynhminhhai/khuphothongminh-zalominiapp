import TitleSection from "components/titleSection"
import React from "react"
import { Box, Swiper, useNavigate } from "zmp-ui"
import { MEETINGDATA } from "constants/utinities"
import MeetingItem from "./MeetingItem"

const MeetingSection: React.FC<any> = () => {

    const navigate = useNavigate()

    const firstTwoMeetings = MEETINGDATA.slice(0, 3);

    return (
        <Box>
            <Box px={4} pt={4} pb={0}>
                <TitleSection title="Cuộc họp hôm nay" handleClick={() => navigate('/meeting')} />
                <Box>
                    <Swiper
                        loop
                        duration={12000}
                        autoplay
                        className="pb-6"
                    >
                        {
                            firstTwoMeetings.map((item, index) => (
                                <Swiper.Slide key={index}>
                                    <Box key={index}>
                                        <MeetingItem data={item} />
                                    </Box>
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