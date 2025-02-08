import { Icon } from "@iconify/react";
import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { Box, List, Page, useNavigate } from "zmp-ui"

const { Item } = List;
const ManagementPage: React.FC = () => {

    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col pb-[66px]" style={{ backgroundColor: '#f0f0f0' }}>
            <Box>
                <HeaderSub title="Quản trị ứng dụng" />
                
                <Box m={4}>
                    <List className="bg-white rounded-lg">
                        <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Tuyên truyền, phản ánh</div>
                        <Item
                            title="Quản lý tin tức"
                            prefix={<img src={images.news} alt='news' className="w-[30px] h-auto" />}
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

                <Box m={4}>
                    <List className="bg-white rounded-lg">
                        <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Tổ chức, dân cư</div>
                        <Item
                            title="Quản lý tổ chức"
                            prefix={<img src={images.team} alt='staff' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/team-management')}
                        />
                        <Item
                            title="Quản lý dân cư"
                            prefix={<img src={images.home} alt='feedback' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/resident-management')}
                        />
                    </List>
                </Box>

                <Box m={4}>
                    <List className="bg-white rounded-lg">
                        <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Công việc, nhiệm vụ</div>
                        <Item
                            title="Quản lý nhiệm vụ"
                            prefix={<img src={images.todo} alt='feedback' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/task-management')}
                        />
                        <Item
                            title="Nhiệm vụ của tôi"
                            prefix={<img src={images.todo2} alt='feedback' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/task-management')}
                        />
                        <Item
                            title="Quản lý cuộc họp"
                            prefix={<img src={images.meeting} alt='feedback' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/meeting-management')}
                        />
                        <Item
                            title="Quản lý tài chính"
                            prefix={<img src={images.money} alt='feedback' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/transactions-management')}
                        />
                        <Item
                            title="Báo cáo tài chính"
                            prefix={<img src={images.report} alt='feedback' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/report-finance-management')}
                        />
                    </List>
                </Box>

                <Box m={4}>
                    <List className="bg-white rounded-lg">
                        <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Thống kê báo cáo</div>
                        <Item
                            title="Tình hình dân cư"
                            prefix={<img src={images.statistics} alt='staff' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/resident-household')}
                        />
                        <Item
                            title="Hộ gia đình"
                            prefix={<img src={images.research} alt='staff' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/overview-household')}
                        />
                    </List>
                </Box>
            </Box>
        </Page>
    )
}

export default ManagementPage