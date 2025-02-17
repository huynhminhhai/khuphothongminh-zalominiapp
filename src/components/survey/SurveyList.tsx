import React, { useEffect, useState } from "react"
import { Box, Button } from "zmp-ui"
import { Feedback, SURVEYDATA, SurveyType } from "constants/utinities"
import images from "assets/images"
import SurveyItem from "./SurveyItem"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { EmptyData } from "components/data"
import { NewsSkeleton } from "components/skeleton"

// type SurveyListProps = {
//     data: SurveyType[]
// }

const initParam = {
    pageSize: 5,
};

const SurveyList: React.FC = () => {

    const [param, setParam] = useState(initParam);
    const [listData, setListData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
        setParam((prev) => ({
            ...prev,
            pageSize: prev.pageSize + 5,
        }));
    };

    const loaderRef = useInfiniteScroll({
        hasMore: hasMore && listData.length > 0,
        loading,
        onLoadMore: loadMore,
    });

    const fetchSurvey = async () => {

        if (loading && !hasMore) return;

        setLoading(true);

        try {
            const data = SURVEYDATA.slice(listData.length, listData.length + param.pageSize);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            setListData(prevList => [...prevList, ...data]);

            setHasMore(data.length > 0 && data.length === param.pageSize);

        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasMore) {
            fetchSurvey();
        }
    }, [param]);

    return (
        <Box>
            <Box>
                <div className="grid grid-cols-1">
                    {listData.length === 0 && !loading ? (
                        <EmptyData title="Hiện chưa có khảo sát nào!" desc=" Khi có khảo sát từ ban quản lý, bạn có thể tham gia và đóng góp ý kiến ngay tại đây. Vui lòng quay lại sau!" />
                    ) : (
                        <Box px={4}>
                            {listData.map((item, index) => (
                                <SurveyItem key={index} data={item} />
                            ))}
                        </Box>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4">
                {loading && <NewsSkeleton count={listData.length === 0 ? 4 : 1} />}
                {listData.length > 0 && !hasMore && <p className="text-center pt-4">Đã hiển thị tất cả khảo sát</p>}
            </div>
        </Box>
    )
}

export default SurveyList