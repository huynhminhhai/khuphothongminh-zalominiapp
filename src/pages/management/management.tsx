import { Icon } from "@iconify/react";
import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, List, Page, useNavigate } from "zmp-ui"

const { Item } = List;
const ManagementPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col" style={{backgroundColor: '#f0f0f0'}}>
            <Box>
                <HeaderSub title="Quản trị ứng dụng" />
                <Box p={4}>
                    <List className="bg-white rounded-lg overflow-hidden">
                        <Item
                            title="Quản lý tin tức"
                            prefix={<img src={images.newss} alt='news' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/news-management')}
                        />
                        <Item
                            title="Quản lý khảo sát"
                            prefix={<img src={images.survey} alt='survey' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/survey-management')}
                        />
                        <Item
                            title="Quản lý phản ánh"
                            prefix={<img src={images.idea} alt='feedback' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/feedback-management')}
                        />
                    </List>
                </Box>
            </Box>
        </Page>
    )
}

export default ManagementPage