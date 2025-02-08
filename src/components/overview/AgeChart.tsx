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

const AgeChart: React.FC = () => {

    const [param, setParam] = useState(initParam)

    const { Option } = Select

    const ageData = {
        labels: ['0-18', '19-35', '36-60', '60+'],
        datasets: [
            {
                label: 'Nam',
                data: [300, 500, 400, 200],
                backgroundColor: '#3B82F6',
            },
            {
                label: 'Nữ',
                data: [280, 450, 380, 250],
                backgroundColor: '#EC4899',
            },
        ],
    };

    const customOptions = {
        ...optionsBarChart,
        scales: {
            ...optionsBarChart.scales,
            x: {
                ...optionsBarChart.scales.x,
                ticks: {
                    ...optionsBarChart.scales.x.ticks,
                    display: true
                },
            },
        },
    }

    return (
        <Box>
            <div className="text-[18px] font-medium mb-1 text-center">Thống kê độ tuổi</div>
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
            <Bar data={ageData} options={customOptions} />
        </Box>
    )
}

export default AgeChart