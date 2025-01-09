import { Icon } from "@iconify/react"
import { Divider } from "components/divider"
import { HeaderSub } from "components/header-sub"
import { NewsOthers } from "components/news"
import TitleSection from "components/titleSection"
import { News, NEWSDATA } from "constants/utinities"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Box, Page, Text, useNavigate, useSnackbar } from "zmp-ui"

const NewsDetailPage: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState<News>()

    const { openSnackbar } = useSnackbar();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const newsId = searchParams.get("id");

    useEffect(() => {
            // Hàm gọi API để lấy thông tin thành viên
            const fetchResidentData = async () => {
                setLoading(true);
                try {
                    // Giả sử API trả về thông tin thành viên
                    // const response = await fetch(`/api/residents/${residentId}`);
                    // const data = await response.json();
    
                    const data = NEWSDATA.find(resident => resident.id === Number(newsId))
                    
                    setDetailData(data)
    
                } catch (error) {
                    console.error("Failed to fetch resident data:", error);
                    openSnackbar({
                        text: "Không thể tải thông tin thành viên. Vui lòng thử lại sau.",
                        type: "error",
                        duration: 5000,
                    });
                } finally {
                    setLoading(false);
                }
            };
    
            fetchResidentData();
    }, [newsId]);

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết tin tức" />
                <Box p={4}>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-[24px] w-[5px] bg-[#731611] block"></div>
                        <h3 className="text-[16px] leading-[1] font-medium">Tin tức</h3>
                    </div>
                    <h2 className="text-[22px] leading-[28px] font-semibold mb-2 text-[#731611]">
                        {detailData?.title}
                    </h2>
                    <h4 className="text-[14px] leading-[1] font-medium">{detailData?.publishedDate}</h4>
                    {/* <ul className="text-[#555555] mt-6">
                        <li className="flex items-start gap-3 mb-4">
                            <Icon fontSize={28} icon='icon-park-solid:people' />
                            <div>
                                <Text size="small" className="uppercase mb-1 text-[#949697]">Tác giả</Text>
                                <Text size="small">{detailData?.author}</Text>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 mb-4">
                            <Icon fontSize={28} icon='lets-icons:date-fill' />
                            <div>
                                <Text size="small" className="uppercase mb-1 text-[#949697]">Ngày tạo</Text>
                                <Text size="small">{detailData?.publishedDate}</Text>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Icon fontSize={28} icon='mdi:eye' />
                            <div>
                                <Text size="small" className="uppercase mb-1 text-[#949697]">Lượt xem</Text>
                                <Text size="small">{detailData?.views} lượt xem</Text>
                            </div>
                        </li>
                    </ul> */}
                    <Box mt={6}>
                        <div className="detail-content" dangerouslySetInnerHTML={{__html: detailData?.content || ''}}></div>
                    </Box>
                    <div className="block h-[1px] w-[100%] bg-[#731611] my-4"></div>
                </Box>
                <Box px={4}>
                    <TitleSection title="Tin tức khác" mB={2} handleClick={() => navigate('/news')} />
                    <NewsOthers idNews={Number(newsId)} />
                </Box>
            </Box>
        </Page>
    )
}

export default NewsDetailPage