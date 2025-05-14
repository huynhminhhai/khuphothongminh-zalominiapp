import { Icon } from "@iconify/react";
import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useStoreApp } from "store/store";
import { Box, List, Page, useNavigate } from "zmp-ui"

const { Item } = List;
const ManagementPage: React.FC = () => {

    const { hasPermission } = useStoreApp()
    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col pb-[72px]" style={{ backgroundColor: '#f0f0f0' }}>
            <Box>
                <HeaderSub title="Quản lý" onBackClick={() => navigate('/')} />

                <Box m={4}>
                    <List className="bg-white rounded-lg">
                        <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Tổng quan</div>
                        {
                            // hasPermission('Lấy danh sách bài viết có phân trang', 'XEM') &&
                            <Item
                                title="Bản đồ dân cư"
                                prefix={<img src={images.map} alt='news' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/maps')}
                            />
                        }
                    </List>
                </Box>

                <Box m={4}>
                    <List className="bg-white rounded-lg">
                        <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Tổ chức, dân cư</div>
                        <Item
                            title="Tổ chức"
                            prefix={<img src={images.team} alt='staff' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/team-management')}
                        />
                        {
                            // hasPermission('Lấy danh sách dân cư có phân trang', 'XEM') &&
                            <Item
                                title="Dân cư"
                                prefix={<img src={images.home} alt='feedback' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/resident-management')}
                            />
                        }
                        {
                            // hasPermission('Lấy danh sách dân cư có phân trang', 'XEM') &&
                            <Item
                                title="Thẻ BHYT"
                                prefix={<img src={images.safety} alt='feedback' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/insurance-management')}
                            />
                        }
                        {/* {
                            // hasPermission('Lấy danh sách giao dịch thu chi có phân trang', 'XEM') &&
                            <Item
                                title="Thu phí"
                                prefix={<img src={images.invoice} alt='feedback' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/invoice-management')}
                            />
                        } */}

                    </List>
                </Box>

                <Box m={4}>
                    <List className="bg-white rounded-lg">
                        <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Tuyên truyền, phản ánh</div>
                        {
                            // hasPermission('Lấy danh sách bài viết có phân trang', 'XEM') &&
                            <Item
                                title="Tin tức"
                                prefix={<img src={images.news} alt='news' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/news-management')}
                            />
                        }
                        {
                            // hasPermission('Lấy danh sách khảo sát có phân trang', 'XEM') &&
                            <Item
                                title="Khảo sát"
                                prefix={<img src={images.survey} alt='survey' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/survey-management')}
                            />
                        }
                        {
                            // hasPermission('Lấy danh sách phản ánh có phân trang', 'XEM') &&
                            <Item
                                title="Phản ánh"
                                prefix={<img src={images.idea} alt='feedback' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/feedback-management')}
                            />
                        }
                    </List>
                </Box>

                <Box m={4}>
                    <List className="bg-white rounded-lg">
                        <div className="px-4 pt-4 pb-2 text-[18px] leading-[1] font-medium">Công việc, nhiệm vụ</div>
                        {
                            // hasPermission('Lấy danh sách nhiệm vụ có phân trang', 'XEM') &&
                            <Item
                                title="Nhiệm vụ"
                                prefix={<img src={images.todo} alt='feedback' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/task-management')}
                            />
                        }
                        {/* <Item
                            title="Nhiệm vụ của tôi"
                            prefix={<img src={images.todo2} alt='feedback' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/task')}
                        /> */}
                        {
                            // hasPermission('Lấy danh sách cuộc họp có phân trang', 'XEM') &&
                            <Item
                                title="Cuộc họp"
                                prefix={<img src={images.meeting} alt='feedback' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/meeting-management')}
                            />
                        }
                        {
                            // hasPermission('Lấy danh sách giao dịch thu chi có phân trang', 'XEM') &&
                            <Item
                                title="Thu/chi"
                                prefix={<img src={images.money} alt='feedback' className="w-[30px] h-auto" />}
                                suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                                onClick={() => navigate('/transactions-management')}
                            />
                        },
                        {/* <Item
                            title="Báo cáo tài chính"
                            prefix={<img src={images.report} alt='feedback' className="w-[30px] h-auto" />}
                            suffix={<Icon icon="mingcute:right-line" fontSize={22} />}
                            onClick={() => navigate('/report-finance-management')}
                        /> */}
                    </List>
                </Box>

                {/* <Box m={4}>
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
                </Box> */}
            </Box>
        </Page>
    )
}

export default ManagementPage