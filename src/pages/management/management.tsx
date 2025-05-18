import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useStoreApp } from "store/store";
import { Box, Page, useNavigate } from "zmp-ui"
import { motion } from "framer-motion";

const ManagementItem = ({ title, prefix, onClick }: any) => {
    return (
        <motion.div
            className="flex flex-col items-center gap-2 bg-white rounded-lg px-2 py-3"
            onClick={onClick}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="w-[60px] h-[60px] rounded-full bg-blue-50 flex-center">
                {prefix}
            </div>
            <div className="text-[14px] leading-[18px] font-medium text-center">
                {title}
            </div>
        </motion.div>
    )
}

const ManagementTitle = ({ title }: any) => {
    return (
        <div className="pt-1 text-primary-color text-[16px] leading-[1] font-semibold">
            {title}
        </div>
    )
}

const ManagementPage: React.FC = () => {

    const { hasPermission } = useStoreApp()
    const navigate = useNavigate()

    return (
        <Page className="relative flex-1 flex flex-col pb-[72px]" style={{ backgroundColor: '#f0f0f0' }}>
            <Box>
                <HeaderSub title="Quản lý" onBackClick={() => navigate('/')} />

                <Box mx={4} mb={2} mt={3}>
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12">
                            <ManagementTitle title="Tổng quan tình hình hộ dân" />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Bản đồ"
                                prefix={<img src={images.map}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/maps')}
                            />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Biểu đồ"
                                prefix={<img src={images.chart}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/resident-household')}
                            />
                        </div>
                    </div>
                </Box>

                <Box mx={4} mb={2} mt={3}>
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12">
                            <ManagementTitle title="Tổ chức, dân cư" />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Tổ chức"
                                prefix={<img src={images.team}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/team-management')}
                            />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Dân cư"
                                prefix={<img src={images.resident}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/resident-management')}
                            />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Thẻ BHYT"
                                prefix={<img src={images.safety}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/insurance-management')}
                            />
                        </div>
                    </div>
                </Box>

                <Box mx={4} mb={2} mt={3}>
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12">
                            <ManagementTitle title="Tuyên truyền, phản ánh" />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Tin tức"
                                prefix={<img src={images.news}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/news-management')}
                            />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Khảo sát"
                                prefix={<img src={images.survey}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/survey-management')}
                            />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Phản ánh"
                                prefix={<img src={images.idea}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/feedback-management')}
                            />
                        </div>
                    </div>
                </Box>

                <Box mx={4} mb={2} mt={3}>
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12">
                            <ManagementTitle title="Công việc, nhiệm vụ" />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Nhiệm vụ"
                                prefix={<img src={images.todo}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/task-management')}
                            />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Cuộc họp"
                                prefix={<img src={images.meeting}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/meeting-management')}
                            />
                        </div>
                        <div className="col-span-4">
                            <ManagementItem
                                title="Thu/chi"
                                prefix={<img src={images.money}
                                    alt='news'
                                    className="w-[30px] h-auto"
                                />}
                                onClick={() => navigate('/transactions-management')}
                            />
                        </div>
                    </div>
                </Box>

                {/* <Box mx={4} mb={2} mt={3}>
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