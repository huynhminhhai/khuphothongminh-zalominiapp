import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
    rootMargin?: string;
}

export const useInfiniteScroll = ({ hasMore, loading, onLoadMore, rootMargin = "100px" }: UseInfiniteScrollProps) => {
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    onLoadMore();
                }
            },
            { rootMargin }
        );

        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [loading, hasMore, onLoadMore, rootMargin]);

    return observerRef;
};
