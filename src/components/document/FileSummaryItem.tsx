import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import http from "services/http";
import { openUrlInWebview } from "services/zalo";
import { getFullImageUrl } from "utils/file";

interface TypingTextProps {
    text: string;
    speed?: number; // ms cho mỗi ký tự, mặc định 50ms
}

const TypingText = ({ text, speed = 10 }) => {
    const [displayed, setDisplayed] = React.useState("");

    React.useEffect(() => {
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

const FileSummaryItem: React.FC<any> = ({ file }) => {
    const [showSummary, setShowSummary] = useState(false);
    const [summaryData, setSummaryData] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSummary = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await http.get<any>(`/vanban/tomtat/${id}`);
            setSummaryData(res.data?.tomTat || "Không có nội dung tóm tắt.");
        } catch (err) {
            setError("Đọc tóm tắt văn bản thất bại.");
        } finally {
            setLoading(false);
        }
    };

    const handleSummarize = () => {
        setShowSummary(true);
        fetchSummary(file.tapTinVanBanId);
    };

    const handleVoiceSummary = () => {
        alert("Tính năng tóm tắt bằng giọng nói đang phát triển...");
    };

    return (
        <div className="mb-3">
            <div
                className="flex items-center justify-between mb-2 p-3 bg-gray-100 rounded-lg text-secondary-color font-medium"
                onClick={() => openUrlInWebview(getFullImageUrl(file.tapTin))}
            >
                <div className="flex items-center gap-2">
                    <div className="flex-1" >
                        <Icon icon="codex:file" fontSize={22} />
                    </div>
                    <span className="text-sm font-medium">{file.tenTapTin}</span>
                </div>
            </div>

            <div className="flex gap-3 mt-3">
                <div className="rounded-lg p-[2px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full">
                    <button
                        onClick={handleSummarize}
                        className="flex-1 flex items-center justify-center gap-1 rounded-md bg-white px-2 py-2 text-[13px] font-semibold text-primary-color w-full"
                    >
                        <Icon icon="mingcute:ai-line" fontSize={16} />
                        Đọc tóm tắt văn bản
                    </button>
                </div>
                {/* <button
                    onClick={handleVoiceSummary}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg border px-2 py-2 text-[13px] font-semibold"
                >
                    <div className="w-full">
                        Tóm tắt bằng giọng nói
                    </div>
                </button> */}
            </div>

            {showSummary && (
                <div
                    className="mt-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-800 text-[14px] leading-[22px] whitespace-pre-line animate-fadeIn font-medium"
                >
                    {loading ? (
                        <TypingEffect />
                    ) : error ? (
                        <span className="text-red-500 font-semibold">{error}</span>
                    ) : (
                        <TypingText text={summaryData as string} />
                    )}
                </div>
            )}

        </div>
    );
};

export default FileSummaryItem;
