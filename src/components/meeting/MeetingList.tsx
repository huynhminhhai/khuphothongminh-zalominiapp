import React, { useEffect, useState } from "react"
import { Box } from "zmp-ui"
import MeetingItem from "./MeetingItem"
import { FormDataMeeting } from "./type"
import { MEETINGDATA } from "constants/utinities";
import { useInfiniteScroll } from "utils/useInfiniteScroll";
import { NewsSkeleton } from "components/skeleton";
import { EmptyData } from "components/data";

const initParam = {
    pageSize: 5,
};

const MeetingList: React.FC = () => {

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

    const fetchMeetings = async () => {

        if (loading && !hasMore) return;

        setLoading(true);

        try {
            const data = MEETINGDATA.slice(listData.length, listData.length + param.pageSize);

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
            fetchMeetings();
        }
    }, [param]);

    return (
        <Box>
            <Box px={4}>
                <div className="grid grid-cols-1 gap-4">
                    {listData.length === 0 && !loading ? (
                        <EmptyData title="Hiện chưa có cuộc họp nào!" desc="Khi có cuộc họp, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                    ) : (
                        <Box>
                            {listData.map((item, index) => (
                                <MeetingItem key={index} data={item} />
                            ))}
                        </Box>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4 pb-4">
                {loading && <NewsSkeleton count={listData.length === 0 ? 4 : 1} />}
                {listData.length > 0 && !hasMore && <p className="text-center pt-4">Đã hiển thị tất cả cuộc họp</p>}
            </div>
        </Box>
    )
}

export default MeetingList