import React, { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Box, Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

interface FilterBarProps {
    showAddButton?: boolean;
    showFilter?: boolean;
    showViewToggle?: boolean;
    onFilterToggle?: () => void;
    onViewToggle?: () => void;
    onAddButtonClick?: () => void;  // Prop để tùy chỉnh hành động nút thêm
    children?: ReactNode; // Cho phép truyền nội dung tùy chỉnh vào bộ lọc
    setViewCard: React.Dispatch<React.SetStateAction<boolean>>;
    viewCard: boolean
}

const FilterBar: React.FC<FilterBarProps> = ({
    showAddButton = true,
    showFilter = true,
    showViewToggle = true,
    onFilterToggle,
    onViewToggle,
    onAddButtonClick,  // Nhận prop này
    children, // Nhận nội dung custom
    setViewCard,
    viewCard
}) => {
    const navigate = useNavigate();
    const [filterVisible, setFilterVisible] = useState(false);

    return (
        <div className="bg-[#f9f9f9] flex flex-col px-4 py-2 gap-2">
            {/* Add Button */}
            {showAddButton && (
                <Box flex justifyContent="flex-end">
                    <Button
                        fullWidth
                        size="medium"
                        variant="secondary"
                        onClick={onAddButtonClick || (() => navigate("/"))}  // Nếu có onAddButtonClick thì dùng, nếu không thì navigate mặc định
                        className="!rounded-3xl"
                    >
                        <div className="flex items-center justify-center gap-1">
                            <Icon fontSize={18} icon="material-symbols:add-rounded" />
                            Thêm
                        </div>
                    </Button>
                </Box>
            )}

            {/* Filter & View Toggle */}
            {(showFilter || showViewToggle) && (
                <Box>
                    <div className="grid grid-cols-2 gap-2">
                        {showFilter && (
                            <div
                                className="bg-white flex items-center justify-center gap-2 px-8 py-1 border rounded-3xl cursor-pointer"
                                onClick={() => {
                                    setFilterVisible(!filterVisible);
                                    onFilterToggle?.();
                                }}
                            >
                                <Icon icon="lets-icons:filter" fontSize={26} />
                                <span className="text-[14px] font-semibold">Lọc</span>
                            </div>
                        )}
                        {showViewToggle && (
                            <div
                                className="bg-white flex items-center justify-center gap-2 px-8 py-1 border rounded-3xl cursor-pointer"
                                onClick={() =>
                                    setViewCard(!viewCard)
                                }
                            >
                                <Icon icon="material-symbols-light:view-apps-outline-rounded" fontSize={26} />
                                <span className="text-[14px] font-semibold">{viewCard ? "Bảng" : "Dọc"}</span>
                            </div>
                        )}
                    </div>
                </Box>
            )}

            {/* Filter Content */}
            {showFilter && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: filterVisible ? 1 : 0, height: filterVisible ? "auto" : 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="grid grid-cols-12 gap-3">{children}</div>
                </motion.div>
            )}
        </div>
    );
};

export default FilterBar;
