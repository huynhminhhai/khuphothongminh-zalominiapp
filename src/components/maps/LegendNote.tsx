import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";

const LegendNote = (props?: any) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="absolute bottom-5 left-3 z-[9999]">
            {/* Nút Toggle */}
            {
                !isOpen &&
                <button
                    className="opacity-80 bg-white p-1 shadow-md rounded-full flex items-center justify-center hover:bg-gray-100 transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Icon fontSize={24} icon='mingcute:information-fill' className="text-gray-600" />
                </button>
            }

            {/* Nội dung chú thích */}
            {isOpen && (
                <div className="mt-2 bg-white p-3 shadow-md rounded-md w-fit min-w-48 relative">
                    <button onClick={() => setIsOpen(false)} className="opacity-80 absolute right-2 top-2 p-1 bg-black text-white rounded-full">
                        <Icon icon='ic:round-close' />
                    </button>
                    <h3 className="text-sm font-semibold">Chú thích:</h3>
                    <ul className="text-xs mt-2 space-y-1">
                        {
                            props?.filter === 'poor' &&
                            <>
                                <li className="flex items-center">
                                    <span className="inline-block w-3 h-3 bg-[#018abe] rounded-full mr-2"></span> Hộ bình thường
                                </li>
                                <li className="flex items-center">
                                    <span className="inline-block w-3 h-3 bg-[#ff6d00] rounded-full mr-2"></span> Hộ cận nghèo
                                </li>
                                <li className="flex items-center">
                                    <span className="inline-block w-3 h-3 bg-[#c1121f] rounded-full mr-2"></span> Hộ nghèo
                                </li>
                            </>
                        }
                        {
                            props?.filter === 'culture' &&
                            <>
                                <li className="flex items-center">
                                    <span className="inline-block w-3 h-3 bg-[#008000] rounded-full mr-2"></span> Đạt chuẩn gia đình văn hóa
                                </li>
                                <li className="flex items-center">
                                    <span className="inline-block w-3 h-3 bg-[#e66f5c] rounded-full mr-2"></span> Chưa đạt chuẩn gia đình văn hóa
                                </li>
                            </>
                        }
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LegendNote;
