import { Icon } from "@iconify/react";
import React, { useEffect, useState, useRef } from "react";
import http from "services/http";
import { openUrlInWebview } from "services/zalo";
import { useStoreApp } from "store/store";
import { getFullImageUrl } from "utils/file";

interface TypingTextProps {
    text: string;
    speed?: number; // ms per character, default 50ms
}

export const convertSpacesToEncoded = (text: string): string => {
    return text.replace(/ /g, '%20');
};

const TypingText = ({ text, speed = 10 }: TypingTextProps) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let index = 0;
        setDisplayed("");
        const interval = setInterval(() => {
            index++;
            setDisplayed(text.substring(0, index));
            if (index >= text.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <div className="whitespace-pre-line">{displayed}</div>;
};

const TypingEffect = () => {
    const letters = ['Đ', 'a', 'n', 'g', '...'];
    return (
        <div className="flex items-center space-x-1 text-primary font-medium text-[11px]">
            {letters.map((char, idx) => (
                <span
                    key={idx}
                    className="animate-bounce"
                    style={{ animationDelay: `${(idx + 1) * 150}ms` }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
};

const SpeakingEffect = () => {
    return (
        <div className="flex items-center gap-[2px] ml-2 speaking-effect">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="w-[2px] bg-primary-color animate-wave"
                    style={{ animationDelay: `${i * 100}ms`, height: `${8 + i * 4}px` }}
                />
            ))}
        </div>
    );
};

interface FileSummaryItemProps {
    file: any;
}

const FileSummaryItem: React.FC<FileSummaryItemProps> = ({ file }) => {

    const { currentPlayingVideo, setCurrentPlayingVideo, playingVideoId, setPlayingVideoId } = useStoreApp();

    const [showSummary, setShowSummary] = useState(false);
    const [summaryData, setSummaryData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSummary, setHasSummary] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const fetchSummary = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await http.get<any>(`/vanban/tomtat/${id}`);
            const summary = res.data?.tomTat || null;
            setSummaryData(summary);
            setHasSummary(!!summary); // Set hasSummary to true if summary exists
        } catch (err) {
            setError("Đọc tóm tắt văn bản thất bại.");
            setHasSummary(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch summary when component mounts
        fetchSummary(file.tapTinVanBanId);
        setPlayingVideoId(null);
    }, [file.tapTinVanBanId]);

    const handleSummarize = (videoId: string) => {
        setShowSummary(true);

        if (!videoRef.current || !summaryData) return;

        // Nếu đang bấm lại chính video đang phát
        if (currentPlayingVideo === videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setPlayingVideoId(videoId);
            } else {
                videoRef.current.pause();
                setPlayingVideoId(null); // ✅ reset khi pause
            }
            return;
        }

        // Nếu bấm vào video khác
        if (currentPlayingVideo && currentPlayingVideo !== videoRef.current) {
            currentPlayingVideo.pause();
            currentPlayingVideo.currentTime = 0;
            setPlayingVideoId(null);
        }

        // Sau đó play video mới
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setCurrentPlayingVideo(videoRef.current);
        setPlayingVideoId(videoId); // ✅ set video mới đang phát

    };

    return (
        <div className="mb-3">
            <div
                className="flex items-center justify-between mb-2 p-3 bg-gray-100 rounded-lg text-secondary-color font-medium"
                onClick={() => openUrlInWebview(getFullImageUrl(file.tapTin))}
            >
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <Icon icon="codex:file" fontSize={22} />
                    </div>
                    <span className="text-sm font-medium">{file.tenTapTin}</span>
                </div>
            </div>

            {hasSummary && !error && (
                <div className="flex gap-3 mt-3">
                    <div className="rounded-lg p-[2px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full">
                        <button
                            onClick={() => handleSummarize(file.tapTinVanBanId)}
                            className="flex-1 flex items-center justify-center gap-1 rounded-md bg-white px-2 py-2 text-[13px] font-semibold text-primary-color w-full play-button"
                        >
                            <Icon icon="mingcute:ai-line" fontSize={16} />
                            Đọc tóm tắt văn bản
                            {
                                playingVideoId === file.tapTinVanBanId && <SpeakingEffect />
                            }
                        </button>
                        {summaryData && (
                            <video
                                ref={videoRef}
                                controls
                                hidden
                                onEnded={() => setPlayingVideoId(null)}
                            >
                                <source src={`https://wf.vnpt.me/api/tts?Text=${convertSpacesToEncoded(summaryData)}`} />
                            </video>
                        )}
                    </div>
                </div>
            )}

            {showSummary && (
                <div
                    className="mt-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-800 text-[14px] leading-[22px] whitespace-pre-line animate-fadeIn font-medium"
                >
                    {loading ? (
                        <TypingEffect />
                    ) : error ? (
                        <span className="text-red-500 font-semibold">{error}</span>
                    ) : (
                        <>
                            <TypingText text={summaryData as string} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileSummaryItem;