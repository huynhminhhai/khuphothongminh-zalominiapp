import React, { useEffect, useState } from "react"
import { Box, Button, Input } from "zmp-ui"
import TeamItem from "./TeamItem"
import { TEAMDATA, TeamType } from "constants/utinities"
import { useInfiniteScroll } from "utils/useInfiniteScroll"
import { EmptyData } from "components/data"
import { TeamSkeleton } from "components/skeleton"

const initParam = {
    pageIndex: 1,
    pageSize: 6,
    keyword: '',
}

const ServiceList: React.FC<any> = () => {

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

    const fetchTeam = async () => {

        if (loading && !hasMore) return;

        setLoading(true);

        try {
            const data = TEAMDATA.slice(listData.length, listData.length + param.pageSize);

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
            fetchTeam();
        }
    }, [param]);

    return (
        <Box px={4}>
            <Box>
                <Input.Search size="small" className="rounded-3xl" placeholder="Tìm kiếm nhân sự/ cán bộ" value={param.keyword} onChange={(e) => {
                    setParam((prevParam) => ({
                        ...prevParam,
                        keyword: e.target.value
                    }));
                }} />
            </Box>
            <Box mt={6} mb={4}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {listData.length === 0 && !loading ? (
                        <EmptyData title="Hiện chưa có nhân viên/cán bộ nào!" desc="Khi có nhân viên/cán bộ, bạn có thể thao tác ngay tại đây. Vui lòng quay lại sau!" />
                    ) : (
                        listData.map((item, index) => (
                            <TeamItem key={index} data={item} />
                        ))
                    )}
                </div>
            </Box>
            <div ref={loaderRef}>
                {loading && <TeamSkeleton count={listData.length === 0 ? 6 : 2} />}
                {listData.length > 0 && !hasMore && <p className="text-center pt-4">Đã hiển thị tất cả nhân viên/cán bộ</p>}
            </div>
        </Box>
    )
}

export default ServiceList