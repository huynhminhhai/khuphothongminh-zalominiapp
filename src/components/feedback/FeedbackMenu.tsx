import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "zmp-ui";

const FeedbackMenu: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Box>
            <Box pb={4}>
                <div className="flex items-center justify-center gap-3">
                    <Button variant="primary" size="small" fullWidth onClick={() => navigate('/feedback-add')}>
                        <div className="flex items-center justify-center gap-1">
                            <Icon fontSize={16} icon='tabler:edit' />
                            <span>Gửi phản ánh</span>
                        </div>
                    </Button>
                    <Button variant="secondary" size="small" fullWidth onClick={() => navigate('/feedback-history')}>
                        <div className="flex items-center justify-center gap-1">
                            <Icon fontSize={16} icon='material-symbols:history' />
                            <span>Phản ánh đã gửi</span>
                        </div>
                    </Button>
                </div>
            </Box>
        </Box>
    )
}

export default FeedbackMenu;