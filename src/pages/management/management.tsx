import images from "assets/images";
import { HeaderSub } from "components/header-sub"
import React from "react"
import { useStoreApp } from "store/store";
import { Box, Page, useNavigate } from "zmp-ui"
import { motion } from "framer-motion";
import { PermissionActions, permissionsList } from "utils/permission";

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
            <div className="text-[14px] leading-[18px] font-medium text-center min-h-[36px]">
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

                {
                    (
                        hasPermission(permissionsList.bandodancu, PermissionActions.XEM) ||
                        hasPermission(permissionsList.thongKeBaoCaoTongHopTinhHinhDanCu, PermissionActions.XEM)
                    ) &&

                    <Box mx={4} mb={2} mt={3}>
                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-12">
                                <ManagementTitle title="Tổng quan tình hình hộ gia đình" />
                            </div>

                            {
                                hasPermission(permissionsList.thongKeBaoCaoTongHopTinhHinhDanCu, PermissionActions.XEM) &&
                                <div className="col-span-4">
                                    <ManagementItem
                                        title="Tổng quan"
                                        prefix={<img src={images.chart}
                                            alt='news'
                                            className="w-[30px] h-auto"
                                        />}
                                        onClick={() => navigate('/resident-household')}
                                    />
                                </div>
                            }

                            {
                                hasPermission(permissionsList.bandodancu, PermissionActions.XEM) &&
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
                            }

                        </div>
                    </Box>
                }

                {
                    hasPermission(permissionsList.khuPhoToChucDanCu, PermissionActions.XEM) &&
                    <Box mx={4} mb={2} mt={3}>
                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-12">
                                <ManagementTitle title="Hộ gia đình, thành viên" />
                            </div>

                            {
                                hasPermission(permissionsList.khuPhoToChucDanCuDanCu, PermissionActions.XEM) &&
                                <div className="col-span-4">
                                    <ManagementItem
                                        title="Hộ gia đình"
                                        prefix={<img src={images.household}
                                            alt='news'
                                            className="w-[30px] h-auto"
                                        />}
                                        onClick={() => navigate('/household-management')}
                                    />
                                </div>
                            }

                            {
                                hasPermission(permissionsList.khuPhoToChucDanCuDanCu, PermissionActions.XEM) &&
                                <div className="col-span-4">
                                    <ManagementItem
                                        title="Thành viên hộ gia đình"
                                        prefix={<img src={images.resident}
                                            alt='news'
                                            className="w-[30px] h-auto"
                                        />}
                                        onClick={() => navigate('/resident-management')}
                                    />
                                </div>
                            }

                            {
                                hasPermission(permissionsList.khuPhoCongViecBaoHiemYTe, PermissionActions.XEM) &&
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
                            }
                        </div>
                    </Box>
                }

                {
                    hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnh, PermissionActions.XEM) &&
                    <Box mx={4} mb={2} mt={3}>
                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-12">
                                <ManagementTitle title="Tuyên truyền, ý kiến" />
                            </div>
                            {
                                hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhTinTucSuKien, PermissionActions.XEM) &&
                                <div className="col-span-4">
                                    <ManagementItem
                                        title="Thông tin cần biết"
                                        prefix={<img src={images.news}
                                            alt='news'
                                            className="w-[30px] h-auto"
                                        />}
                                        onClick={() => navigate('/news-management')}
                                    />
                                </div>
                            }

                            {
                                hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhKhaoSat, PermissionActions.XEM) &&
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
                            }

                            {
                                hasPermission(permissionsList.khuPhoTuyenTruyenPhanAnhPhanAnh, PermissionActions.XEM) &&
                                <div className="col-span-4">
                                    <ManagementItem
                                        title="Ý kiến người dân"
                                        prefix={<img src={images.idea}
                                            alt='news'
                                            className="w-[30px] h-auto"
                                        />}
                                        onClick={() => navigate('/feedback-management')}
                                    />
                                </div>
                            }
                        </div>
                    </Box>
                }

                {
                    hasPermission(permissionsList.khuPhoCongViec, PermissionActions.XEM) &&
                    <>
                        <Box mx={4} mb={2} mt={3}>
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-12">
                                    <ManagementTitle title="Công việc, nhiệm vụ" />
                                </div>
                                {
                                    hasPermission(permissionsList.khuPhoNhiemVuGiaoNhiemVu, PermissionActions.XEM) &&
                                    <div className="col-span-4">
                                        <ManagementItem
                                            title="Giao nhiệm vụ"
                                            prefix={<img src={images.todo}
                                                alt='news'
                                                className="w-[30px] h-auto"
                                            />}
                                            onClick={() => navigate('/task-management')}
                                        />
                                    </div>
                                }

                                {
                                    hasPermission(permissionsList.khuPhoCongViecCuocHop, PermissionActions.XEM) &&
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
                                }

                                {
                                    hasPermission(permissionsList.khuPhoCongViecTaiChinh, PermissionActions.XEM) &&
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
                                }
                            </div>
                        </Box>
                        <Box mx={4} mb={2} mt={3}>
                            <div className="grid grid-cols-12 gap-3">
                                {
                                    hasPermission(permissionsList.khuPhoNhiemVuNhiemVuCuaToi, PermissionActions.XEM) &&
                                    <div className="col-span-4">
                                        <ManagementItem
                                            title="Nhiệm vụ của tôi"
                                            prefix={<img src={images.todo}
                                                alt='news'
                                                className="w-[30px] h-auto"
                                            />}
                                            onClick={() => navigate('/task')}
                                        />
                                    </div>
                                }

                                {
                                    hasPermission(permissionsList.khuPhoCongViecCuocHop, PermissionActions.XEM) &&
                                    <div className="col-span-4">
                                        <ManagementItem
                                            title="Cuộc họp của tôi"
                                            prefix={<img src={images.meeting}
                                                alt='news'
                                                className="w-[30px] h-auto"
                                            />}
                                            onClick={() => navigate('/meeting')}
                                        />
                                    </div>
                                }
                            </div>
                        </Box>
                    </>
                }

                {
                    hasPermission(permissionsList.khuPhoToChucDanCuBanDieuHanh, PermissionActions.XEM) &&
                    <Box mx={4} mb={2} mt={3}>
                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-12">
                                <ManagementTitle title="Ban điều hành khu phố/ấp" />
                            </div>
                            <div className="col-span-4">
                                <ManagementItem
                                    title="Ban điều hành"
                                    prefix={<img src={images.team}
                                        alt='news'
                                        className="w-[30px] h-auto"
                                    />}
                                    onClick={() => navigate('/team-management')}
                                />
                            </div>
                        </div>
                    </Box>
                }
            </Box>
        </Page>
    )
}

export default ManagementPage