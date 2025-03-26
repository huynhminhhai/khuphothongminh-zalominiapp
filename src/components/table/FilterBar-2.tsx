import React, { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Box } from "zmp-ui";
import { Icon } from "@iconify/react";

interface FilterBar2Props {
    showFilter?: boolean;
    onFilterToggle?: () => void;
    children?: ReactNode;
    searchComponent?: ReactNode;
}

const FilterBar2: React.FC<FilterBar2Props> = ({
    showFilter = true,
    onFilterToggle,
    children,
    searchComponent
}) => {
    const [filterVisible, setFilterVisible] = useState(false);

    return (
        <div className="bg-[#fff] flex flex-col px-4 py-2 gap-2 filter-bar-2">
            {/* Filter & View Toggle */}
            <Box flex alignItems="center" className="gap-2">
                {searchComponent && <Box className="flex-1">{searchComponent}</Box>}
                {
                    showFilter &&
                    <Box>
                        {showFilter && (
                            <div
                                className="bg-[#ffffff] border-[#b9bdc1] w-[38px] h-[38px] flex items-center justify-center border cursor-pointer rounded-lg"
                                onClick={() => {
                                    setFilterVisible(!filterVisible);
                                    onFilterToggle?.();
                                }}
                            >
                                <Icon color="#222222" icon="line-md:filter-alt" fontSize={22} />
                            </div>
                        )}
                    </Box>
                }
            </Box>


            {/* Filter Content */}
            {showFilter && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: filterVisible ? 1 : 0, height: filterVisible ? "auto" : 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="grid grid-cols-12 gap-3 pb-2">{children}</div>
                </motion.div>
            )}
        </div>
    );
};

export default FilterBar2;
