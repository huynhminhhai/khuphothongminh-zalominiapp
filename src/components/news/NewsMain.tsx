import images from "assets/images";
import React from "react";
import { Box, useNavigate } from "zmp-ui";
import { NewsType } from "./type";
import { getFullImageUrl } from "utils/file";
import { formatDate } from "utils/date";

type NewsMainProps = {
    data: NewsType
}

const NewsMain: React.FC<NewsMainProps> = ({ data }) => {

    const navigate = useNavigate()

    return (
        <Box>
            <div
                className="news-item"
                onClick={() => navigate(`/news-detail/?id=${data.tinTucId}`)}
            >
                <div className="w-[100%] h-[220px]">
                    <img className="h-[100%] w-[100%] object-cover" src={getFullImageUrl(data.anhDaiDien)} alt={data.tieuDe} />
                </div>
                <Box px={4}>
                    <div className="flex-1 flex flex-col justify-center mt-3 border-b-[1px] pb-4">
                        <h3 className="text-[17px] leading-[22px] font-semibold line-clamp-2 mb-2">{data.tieuDe || data.moTa}</h3>
                        <div className="line-clamp-3 text-[15px] leading-[20px] font-medium text-[#666666] mb-2">{data.moTa}</div>
                        <div className="text-end text-[14px] leading-[1] text-[#666666] font-medium">{formatDate(data.ngayXuatBan)}</div>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

export default NewsMain;