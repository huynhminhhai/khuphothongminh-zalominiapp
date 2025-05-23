import { useGetNewsDetail } from "apiRequest/news"
import { EmptyData } from "components/data"
import { HeaderSub } from "components/header-sub"
import { NewsOthers } from "components/news"
import { NewsDetailSkeleton } from "components/skeleton"
import TitleSection from "components/titleSection"
import React from "react"
import { useSearchParams } from "react-router-dom"
import { formatDate } from "utils/date"
import { getFullImageUrl } from "utils/file"
import { Box, Page, useNavigate } from "zmp-ui"

const NewsDetailPage: React.FC = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    const newsId = searchParams.get("id");

    const { data, isLoading } = useGetNewsDetail(Number(newsId));

    return (
        <Page className="relative flex-1 flex flex-col bg-white">
            <Box>
                <HeaderSub title="Chi tiết tin tức" />
                {
                    isLoading ?
                        <NewsDetailSkeleton count={1} /> :
                        data ?
                            <Box p={4}>
                                <Box pb={4} className="border-b-[1px] border-primary-color text-primary-color">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="h-[24px] w-[3px] bg-primary-color border-primary-color block"></div>
                                        <h3 className="text-[16px] leading-[1] font-semibold">Tin tức</h3>
                                    </div>
                                    <h2 className="title-page mb-3 text-primary-cborder-primary-color">
                                        {data.tieuDe || data.moTa}
                                    </h2>
                                    <h4 className="text-[13px] leading-[1] font-semibold">{formatDate(data.ngayXuatBan)}</h4>
                                </Box>
                                <Box mt={4} pb={4} mb={2} className="border-b-[1px] border-primary-color">
                                    {/* <div className="mb-3">
                                        <img src={getFullImageUrl(data.anhDaiDien)} alt={data.tieuDe} />
                                    </div> */}
                                    <div className="detail-content mb-3" dangerouslySetInnerHTML={{ __html: data.noiDung }}></div>
                                    <Box className="text-end text-black font-semibold">{data.tacGia}</Box>
                                </Box>
                            </Box>
                            :
                            <Box px={4} pb={10}>
                                <EmptyData
                                    title="Bài viết không tồn tại!"
                                    desc="Không thể tìm thấy bài viết bạn yêu cầu"
                                />
                            </Box>
                }
                <Box px={4}>
                    <TitleSection title="Tin tức khác" mB={0} handleClick={() => navigate('/news')} />
                    <NewsOthers idNews={Number(newsId)} />
                </Box>

            </Box>
        </Page>
    )
}

export default NewsDetailPage