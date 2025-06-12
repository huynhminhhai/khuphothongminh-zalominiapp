import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCheckRequireApId } from "utils/permission";
import { Box, Button } from "zmp-ui";

const FeedbackMenu: React.FC = () => {

    const navigate = useNavigate()
    const checkRequireApId = useCheckRequireApId();

    return (
        <Box>
            <Box pb={4} pt={2}>
                <div className="flex items-center justify-center gap-3 mt-2">
                    <Button
                        variant="primary"
                        size="small"
                        fullWidth
                        onClick={() => checkRequireApId(() => {
                            navigate('/feedback-add');
                        })}
                    >
                        <div className="flex items-center justify-center gap-1">
                            <Icon fontSize={16} icon='line-md:edit' />
                            <span>Gửi ý kiến</span>
                        </div>
                    </Button>
                    {/* <Button variant="secondary" size="small" fullWidth onClick={() => navigate('/feedback-history')}>
                        <div className="flex items-center justify-center gap-1">
                            <Icon fontSize={16} icon='line-md:telegram' />
                            <span>Ý kiến đã gửi</span>
                        </div>
                    </Button> */}
                </div>
            </Box>
        </Box>
    )
}

export default FeedbackMenu;