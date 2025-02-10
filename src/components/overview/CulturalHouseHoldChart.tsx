import React, { useState } from 'react'
import { Box, Select } from 'zmp-ui'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { monthsChart, optionsBarChart } from './type';
import { monthOptions } from 'constants/mock';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);

const initParam = {
    month: 0,
    year: 0
}

const CulturalHouseHoldChart: React.FC = () => {

    const [param, setParam] = useState(initParam)

    const { Option } = Select

    const culturalData = {
        labels: monthsChart,
        datasets: [
            {
                label: 'Gia đình văn hóa',
                data: [20, 22, 25, 28, 30, 33, 36, 38, 41, 43, 45, 48],
                backgroundColor: '#8497fc',
            },
        ],
    };

    return (
        <Box>
            <div className="text-[18px] font-medium mb-1 text-center">Thống kê hộ gia đình văn hóa</div>
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
            <Bar data={culturalData} options={optionsBarChart} />
        </Box>
    )
}

export default CulturalHouseHoldChart