import { Icon } from "@iconify/react";
import { useGetTeamDetail } from "apiRequest/team";
import images from "assets/images";
import { PrimaryButton } from "components/button";
import { EmptyData } from "components/data";
import { HeaderSub } from "components/header-sub";
import { NewsDetailSkeleton } from "components/skeleton";
import { TEAMDATA, TeamType, TERMDATA, TermType } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { getUser, openChatScreen, openUrlInWebview } from "services/zalo";
import { formatDate } from "utils/date";
import { getFullImageUrl } from "utils/file";
import { Avatar, Box, Page, useNavigate, useSnackbar } from "zmp-ui";

const TeamDetailPage: React.FC = () => {

    const [searchParams] = useSearchParams();

    const memberId = searchParams.get("id");

    const { data: detailData, isLoading } = useGetTeamDetail(Number(memberId));

    console.log(detailData)

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết nhân sự/cán bộ" />
                <Box p={4}>
                    {
                        isLoading ?
                            <NewsDetailSkeleton count={1} /> :
                            detailData ?
                                <Box>
                                    <div className="relative bg-[#f6f7fb] mt-[60px] rounded-lg px-6 pb-10">
                                        <img src={images.shape2} alt="shape" className="absolute top-0 left-0 w-fit h-auto opacity-[0.06] z-0" />
                                        <div className="absolute top-[-60px] left-[50%] translate-x-[-50%] z-10">
                                            <Avatar size={120} src={detailData?.anhDaiDien?.trim() ? getFullImageUrl(detailData.anhDaiDien) : images.avatar} />
                                        </div>
                                        <div className="pt-[72px] relative z-10">
                                            <Box className="text-center">
                                                <h3 className="text-[22px] leading-[28px] font-semibold mb-1">{detailData.hoTen}</h3>
                                                <h4 className="text-[18px] leading-[22px] text-[#3737737] font-semibold">{detailData.tenChucVu}</h4>
                                            </Box>
                                            <Box mt={4}>
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <Icon fontSize={20} className="text-[#808080]" icon='ix:work-case-filled' />
                                                        <span className="text-[14px] font-medium">{[detailData?.tenAp, detailData?.tenXa, detailData?.tenHuyen, detailData?.tenTinh].filter(Boolean).join(', ')}</span>
                                                    </div>
                                                    {
                                                        detailData.dienThoai &&
                                                        <div className="flex items-center gap-3">
                                                            <Icon fontSize={20} className="text-[#808080]" icon='ri:phone-fill' />
                                                            <span className="text-[14px] font-medium">{detailData.dienThoai}</span>
                                                        </div>
                                                    }
                                                    
                                                    <div className="flex items-center gap-3">
                                                        <Icon fontSize={20} className="text-[#808080]" icon='lsicon:calendar-filled' />
                                                        <span className="text-[14px] font-medium">{formatDate(detailData.tuNgay)} - {formatDate(detailData.denNgay)}</span>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <Icon fontSize={20} className="text-[#808080]" icon='mdi:account' />
                                                        <span className="text-[14px] font-medium">{detailData.tenDangNhap}</span>
                                                    </div>
                                                </div>
                                            </Box>
                                            {
                                                detailData.dienThoai &&
                                                <div className="flex items-center gap-4 mt-6">
                                                    <div
                                                        onClick={async () => {
                                                            try {
                                                                await openUrlInWebview(`https://zalo.me/${detailData.dienThoai}`);
                                                            } catch (error) {
                                                                console.error("error: ", error);
                                                            }
                                                        }}
                                                        className="rounded-3xl text-[14px] bg-secondary-color text-[#fff] font-medium w-full text-center px-3 py-2"
                                                    >
                                                        Liên hệ Zalo
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {/* <Box ml={3} mt={8} pb={8}>
                                        <div className="flex flex-col border-l-[1px] border-[#808080]">
                                            {
                                                termData &&
                                                termData.map((term, index) => (
                                                    <div key={index} className="bg-white p-4 ml-6 relative border-b-[1px] border-dashed">
                                                        <div className="absolute left-[-38px] top-[50%] translate-y-[-50%]">
                                                            <Icon color={term.isCurrent ? 'var(--primary-color)' : '#808080'} icon='stash:circle-dot' fontSize={27} />
                                                        </div>
                                                        <div className="flex">
                                                            <Box className="flex-1">
                                                                <h3 className="text-[18px] font-semibold mb-1" style={{ color: term.isCurrent ? 'var(--primary-color)' : '' }}>{term.position}</h3>
                                                                <h4 className="text-[14px] font-medium text-[#808080]">{term.start_date} - {term.end_date}</h4>
                                                            </Box>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Box> */}
                                </Box>
                                :
                                <EmptyData title="Không tìm thấy thông tin thành viên" />
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default TeamDetailPage