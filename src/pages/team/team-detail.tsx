import { Icon } from "@iconify/react";
import images from "assets/images";
import { PrimaryButton } from "components/button";
import { HeaderSub } from "components/header-sub";
import { TEAMDATA, TeamType, TERMDATA, TermType } from "constants/utinities";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { getUser, openChatScreen, openUrlInWebview } from "services/zalo";
import { Avatar, Box, Page, useNavigate, useSnackbar } from "zmp-ui";

const TeamDetailPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<TeamType>()
    const [termData, setTermData] = useState<TermType[]>()

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const memberId = searchParams.get("id");

    useEffect(() => {
        const fetchResidentData = async () => {
            setLoading(true);
            try {

                const data = TEAMDATA.find(resident => resident.id === Number(memberId))

                if (data) {
                    setDetailData(data)
                }

            } catch (error) {
                console.error("Failed to fetch resident data:", error);
                openSnackbar({
                    text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                    type: "error",
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchResidentData();
        fetchTermData();
    }, [memberId]);

    const fetchTermData = async () => {
        setLoading(true);
        try {

            const data = TERMDATA.filter(term => term.staff_id === Number(memberId))

            setTermData(data)

        } catch (error) {
            console.error("Failed to fetch resident data:", error);
            openSnackbar({
                text: "Không thể tải thông tin. Vui lòng thử lại sau.",
                type: "error",
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết nhân sự/cán bộ" />
                <Box p={4}>
                    {
                        detailData &&
                        <Box>
                            <div className="relative bg-[#f6f7fb] mt-[60px] rounded-lg px-6 pb-10">
                                <div className="absolute top-[-60px] left-[50%] translate-x-[-50%]">
                                    <Avatar size={120} src={detailData.avatar || images.avatar} />
                                </div>
                                <div className="pt-[72px]">
                                    <Box className="text-center">
                                        <h3 className="text-[20px] font-semibold mb-1">{detailData.fullname}</h3>
                                        <h4 className="text-[16px] text-[#808080] font-medium">{detailData.position}</h4>
                                    </Box>
                                    <Box mt={4}>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3">
                                                <Icon fontSize={20} className="text-[#808080]" icon='mingcute:birthday-2-fill' />
                                                <span className="text-[16px] font-medium">{detailData.birthDate}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Icon fontSize={20} className="text-[#808080]" icon='vaadin:office' />
                                                <span className="text-[16px] font-medium">{detailData.officeAddress}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Icon fontSize={20} className="text-[#808080]" icon='icon-park-solid:phone' />
                                                <span className="text-[16px] font-medium">{detailData.phoneNumber}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Icon fontSize={20} className="text-[#808080]" icon='ic:baseline-email' />
                                                <span className="text-[16px] font-medium">{detailData.email}</span>
                                            </div>
                                        </div>
                                    </Box>
                                    <div className="flex items-center gap-4 mt-6">
                                        <div
                                            onClick={async () => {
                                                try {
                                                    await openUrlInWebview('https://zalo.me/1683224831267326017')
                                                } catch (error) {
                                                    console.error("error: ", error);
                                                }
                                            }}
                                            className="rounded-3xl text-[16px] bg-blue-600 text-[#fff] font-medium w-full text-center px-4 py-3"
                                        >
                                            Liên hệ Zalo
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <Box mt={8} pb={8}>
                                    <div className="flex flex-col border-l-[1px] border-[#808080]">
                                        {
                                            termData &&
                                            termData.map((term, index) => (
                                                <div key={index} className="bg-white p-4 ml-6 relative border-b-[1px] border-dashed">
                                                    <div className="absolute left-[-38px] top-[50%] translate-y-[-50%]">
                                                        <Icon color={term.isCurrent ? '#731611' : '#808080'} icon='stash:circle-dot' fontSize={27} />
                                                    </div>
                                                    <div className="flex">
                                                        <Box className="flex-1">
                                                            <h3 className="text-[18px] font-semibold mb-1" style={{color: term.isCurrent ? '#731611' : ''}}>{term.position}</h3>
                                                            <h4 className="text-[14px] font-medium text-[#808080]">{term.start_date} - {term.end_date}</h4>
                                                        </Box>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </Page>
    )
}

export default TeamDetailPage