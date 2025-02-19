import React, { useState } from 'react'
import { Box, Select } from 'zmp-ui'
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { optionsPercent } from './type';
import { monthOptions } from 'constants/mock';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);

const initParam = {
    month: 0,
    year: 0
}

const PieChart: React.FC = () => {

    const [param, setParam] = useState(initParam)

    const { Option } = Select

    const HouseHolData = {
        totalHouseholds: 200,
        poorHouseholds: 40,
        nearPoorHouseholds: 60,
        culturalHouseholds: 150
    }

    const otherHouseholds = HouseHolData.totalHouseholds - (HouseHolData.poorHouseholds + HouseHolData.nearPoorHouseholds);
    const poorPercentage = ((HouseHolData.poorHouseholds / HouseHolData.totalHouseholds) * 100).toFixed(2);
    const nearPoorPercentage = ((HouseHolData.nearPoorHouseholds / HouseHolData.totalHouseholds) * 100).toFixed(2);
    const otherPercentage = ((otherHouseholds / HouseHolData.totalHouseholds) * 100).toFixed(2);

    const pieHouseholdData = {
        labels: [
            `Hộ nghèo: ${HouseHolData.poorHouseholds} hộ`,
            `Hộ cận nghèo: ${HouseHolData.nearPoorHouseholds} hộ`,
            `Hộ khác: ${otherHouseholds} hộ`,
        ],
        datasets: [
            {
                data: [poorPercentage, nearPoorPercentage, otherPercentage],
                backgroundColor: ['#fc7d71', '#47c9d8', '#D1D5DB'],
            },
        ],
    };

    return (
        <Box>
            <div className="text-[18px] font-medium mb-1 text-center">Tỉ lệ hộ nghèo</div>
            <div className="grid grid-cols-2 gap-4 my-2">
                <div>
                    <Select
                        className="h-[32px]"
                        placeholder="Chọn tháng"
                        closeOnSelect
                        onChange={(value) => {
                            setParam((prevParam) => ({
                                ...prevParam,
                                month: value as number
                            }));
                        }}
                    >
                        <Option title={'Tất cả'} value={0} />
                        {
                            monthOptions.map((item) => (
                                <Option key={item.value} title={item.label} value={item.value} />
                            ))
                        }
                    </Select>
                </div>
                <div>
                    <Select
                        className="h-[32px]"
                        placeholder="Chọn năm"
                        closeOnSelect
                        onChange={(value) => {
                            setParam((prevParam) => ({
                                ...prevParam,
                                year: value as number
                            }));
                        }}
                    >
                        <Option title={'Tất cả'} value={0} />
                        <Option title={'2024'} value={2024} />
                        <Option title={'2025'} value={2025} />

                    </Select>
                </div>
            </div>
            <Doughnut data={pieHouseholdData} options={optionsPercent} />
        </Box>
    )
}

export default PieChart