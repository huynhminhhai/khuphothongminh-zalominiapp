import React, { useState } from "react"
import { Box } from "zmp-ui"
import NewsItem from "./NewsItem"
import { useGetNewsListNormal } from "apiRequest/news"
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
        pageSize: 4,
        ApId: account ? account.thongTinDanCu?.apId : 0,
        keyword: ''
    });

    const { data, isLoading } = useGetNewsListNormal(param);

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
                    <>Chưa có tin tức</>
            }
        </Box>
    )
}

export default NewsOthers