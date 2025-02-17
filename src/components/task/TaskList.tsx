import React, { useEffect, useState } from "react"
import { Box } from "zmp-ui"
import { TASKS, TaskType } from "constants/utinities"
import images from "assets/images"
import TaskItem from "./TaskItem"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { NewsSkeleton } from "components/skeleton"
import { EmptyData } from "components/data"

type TaskListProps = {
    data: TaskType[]
}

const initParam = {
    pageSize: 6,
};

const TaskList: React.FC = () => {

    const [param, setParam] = useState(initParam);
    const [listData, setListData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
        setParam((prev) => ({
            ...prev,
            pageSize: prev.pageSize + 6,
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
            const data = TASKS.slice(listData.length, listData.length + param.pageSize);

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
            <Box>
                <div className="grid grid-cols-1 gap-4">
                    {listData.length === 0 && !loading ? (
                        <EmptyData title="Hiện chưa có nhiệm vụ nào!" desc="Khi có nhiệm vụ, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                    ) : (
                        <Box px={4}>
                            {listData.map((item, index) => (
                                <TaskItem key={index} data={item} />
                            ))}
                        </Box>
                    )}
                </div>
            </Box>
            <div ref={loaderRef} className="px-4 pb-4">
                {loading && <NewsSkeleton count={listData.length === 0 ? 4 : 1} />}
                {listData.length > 0 && !hasMore && <p className="text-center pt-4">Đã hiển thị tất cả nhiệm vụ</p>}
            </div>
        </Box>
    )
}

export default TaskList