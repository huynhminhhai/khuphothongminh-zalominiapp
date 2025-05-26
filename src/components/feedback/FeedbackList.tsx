import React from "react"
import { Box, Button, useNavigate } from "zmp-ui"
import FeedbackItem from "./FeedbackItem"
import images from "assets/images"

type FeedbackListProps = {
    data: any[]
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
                </Box>
                :
                <Box mt={10}>
                    <Box flex justifyContent="center">
                        <img src={images.empty} alt="Không có dữ liệu" />
                    </Box>
                    <Box mt={4}>
                        <h3 className="text-[18px] leading-[1] font-medium text-center">Chưa có ý kiến nào!</h3>
                    </Box>
                    <Box mt={4}>
                        <Button size="medium" fullWidth onClick={() => navigate('/feedback-add')}>Gửi ý kiến</Button>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default FeedbackList