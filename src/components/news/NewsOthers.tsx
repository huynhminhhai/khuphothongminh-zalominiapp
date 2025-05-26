import React, { useState } from "react"
import { Box } from "zmp-ui"
import NewsItem from "./NewsItem"
import { useGetNewsPublicListNormal } from "apiRequest/news"
import { NewsSkeleton } from "components/skeleton"
import { useStoreApp } from "store/store"
import { NewsType } from "./type"

type NewsOthersProps = {
    idNews: number
}
const NewsOthers: React.FC<NewsOthersProps> = ({ idNews }) => {

    const { account } = useStoreApp()
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        ApId: account?.apId,
        MaXa: account?.maXa,
        keyword: '',
        NgayXuatBanTuNgay: '',
        NgayXuatBanDenNgay: '',
        TacGia: '',
        TieuDe: '',
    });

    const { data, isLoading } = useGetNewsPublicListNormal(param);

    if (isLoading) {
        return <NewsSkeleton count={4} />
    }

    return (
        <Box>
            {
                data.data && data.data.length > 0 ?
                    <>
                        {
                            data.data
                            .filter((item: NewsType) => item.tinTucId !== idNews)
                            .map((item: NewsType, index: number) => (
                                <NewsItem key={index} data={item} />
                            ))
                        }
                    </>
                    :
                    <>Chưa có thông tin cần biết nào!</>
            }
        </Box>
    )
}

export default NewsOthers