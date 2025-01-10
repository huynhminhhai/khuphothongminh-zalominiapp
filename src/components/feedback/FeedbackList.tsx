import React from "react"
import { Box, Button, useNavigate } from "zmp-ui"
import FeedbackItem from "./FeedbackItem"
import { Feedback } from "constants/utinities"
import images from "assets/images"

type FeedbackListProps = {
    data: Feedback[]
}

const FeedbackList: React.FC<FeedbackListProps> = ({data}) => {

    const navigate = useNavigate()

    return (
        <Box>
            {
                data && data.length > 0 ? 
                <Box>
                    <div className="grid grid-cols-1">
                        {
                            data.map((item, index) => (
                                <FeedbackItem key={index} data={item} />
                            ))
                        }
                    </div>
                    <div className="flex items-center justify-center gap-3 pt-6 pb-2">
                        <Button onClick={() => console.log('call api')} size="medium">Xem thêm</Button>
                    </div>
                </Box>
                :
                <Box mt={10}>
                    <Box flex justifyContent="center">
                        <img src={images.empty} alt="Không có dữ liệu" />
                    </Box>
                    <Box mt={4}>
                        <h3 className="text-[18px] leading-[1] font-medium text-center">Bạn chưa gửi phản ánh nào !</h3>
                        <p className="text-[14px] leading-[20px] text-[#555] mt-2 text-center">
                            Nếu bạn có vấn đề cần phản ánh. Hãy gửi phản ánh với địa phương qua ứng dụng này.
                        </p>
                    </Box>
                    <Box mt={4}>
                        <Button size="medium" fullWidth onClick={() => navigate('/feedback-add')}>Gửi phản ánh</Button>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default FeedbackList